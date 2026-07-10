<?php
declare(strict_types=1);

const CONTACT_RECIPIENT = 'info@localinsightsgh.com';
const CONTACT_FROM = 'no-reply@localinsightsgh.com';
const CONTACT_FROM_NAME = 'Local Insights Ghana';

function wants_json(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    $requestedWith = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '';

    return stripos($accept, 'application/json') !== false || strtolower($requestedWith) === 'xmlhttprequest';
}

function respond(bool $ok, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);

    if (wants_json()) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['ok' => $ok, 'message' => $message]);
        exit;
    }

    $query = $ok ? 'sent=1' : 'error=1';
    header('Location: contact?' . $query);
    exit;
}

function post_value(string $key, int $maxLength = 1000): string
{
    $value = $_POST[$key] ?? '';
    if (is_array($value)) {
        return '';
    }

    $value = trim((string) $value);
    $value = str_replace(["\r", "\n"], ' ', $value);

    if (strlen($value) > $maxLength) {
        $value = substr($value, 0, $maxLength);
    }

    return $value;
}

function message_value(string $key, int $maxLength = 4000): string
{
    $value = $_POST[$key] ?? '';
    if (is_array($value)) {
        return '';
    }

    $value = trim((string) $value);
    $value = str_replace(["\r\n", "\r"], "\n", $value);

    if (strlen($value) > $maxLength) {
        $value = substr($value, 0, $maxLength);
    }

    return $value;
}

function is_valid_date(string $value): bool
{
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);

    return $date !== false && $date->format('Y-m-d') === $value;
}

function smtp_config(): ?array
{
    $envHost = getenv('LOCALINSIGHTS_SMTP_HOST');
    $envUser = getenv('LOCALINSIGHTS_SMTP_USER');
    $envPass = getenv('LOCALINSIGHTS_SMTP_PASS');
    if ($envHost !== false && $envUser !== false && $envPass !== false && $envHost !== '' && $envUser !== '' && $envPass !== '') {
        return [
            'host' => $envHost,
            'port' => (int) (getenv('LOCALINSIGHTS_SMTP_PORT') ?: 465),
            'encryption' => getenv('LOCALINSIGHTS_SMTP_ENCRYPTION') ?: 'ssl',
            'username' => $envUser,
            'password' => $envPass,
            'from_email' => getenv('LOCALINSIGHTS_SMTP_FROM') ?: CONTACT_FROM,
            'from_name' => getenv('LOCALINSIGHTS_SMTP_FROM_NAME') ?: CONTACT_FROM_NAME,
            'timeout' => (int) (getenv('LOCALINSIGHTS_SMTP_TIMEOUT') ?: 20),
        ];
    }

    $paths = [
        dirname(__DIR__) . DIRECTORY_SEPARATOR . 'localinsights-smtp.php',
        __DIR__ . DIRECTORY_SEPARATOR . 'localinsights-smtp.php',
    ];

    foreach ($paths as $path) {
        if (!is_file($path)) {
            continue;
        }

        $config = require $path;
        if (is_array($config)) {
            return $config;
        }
    }

    return null;
}

function smtp_read($socket): string
{
    $response = '';

    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }

    return $response;
}

function smtp_expect($socket, array $codes, string $context): string
{
    $response = smtp_read($socket);
    $code = substr($response, 0, 3);

    if (!in_array($code, $codes, true)) {
        throw new RuntimeException($context . ' failed: ' . trim($response));
    }

    return $response;
}

function smtp_command($socket, string $command, array $codes, string $context): string
{
    fwrite($socket, $command . "\r\n");

    return smtp_expect($socket, $codes, $context);
}

function smtp_header_value(string $value): string
{
    return str_replace(["\r", "\n"], ' ', $value);
}

function smtp_address(string $email, string $name = ''): string
{
    $email = smtp_header_value($email);
    $name = trim(smtp_header_value($name));

    if ($name === '') {
        return '<' . $email . '>';
    }

    $name = addcslashes($name, '\\"');

    return '"' . $name . '" <' . $email . '>';
}

function smtp_message_data(string $to, string $subject, string $body, string $fromEmail, string $fromName, string $replyToEmail, string $replyToName): string
{
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'To: ' . smtp_address($to),
        'From: ' . smtp_address($fromEmail, $fromName),
        'Reply-To: ' . smtp_address($replyToEmail, $replyToName),
        'Subject: ' . smtp_header_value($subject),
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: Local Insights SMTP',
    ];

    $body = str_replace(["\r\n", "\r"], "\n", $body);
    $body = str_replace("\n.", "\n..", $body);

    return implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n", "\r\n", $body);
}

function smtp_send(array $config, string $to, string $subject, string $body, string $replyToEmail, string $replyToName): void
{
    $host = (string) ($config['host'] ?? '');
    $port = (int) ($config['port'] ?? 465);
    $encryption = strtolower((string) ($config['encryption'] ?? 'ssl'));
    $username = (string) ($config['username'] ?? '');
    $password = (string) ($config['password'] ?? '');
    $fromEmail = (string) ($config['from_email'] ?? CONTACT_FROM);
    $fromName = (string) ($config['from_name'] ?? CONTACT_FROM_NAME);
    $timeout = (int) ($config['timeout'] ?? 20);

    if ($host === '' || $username === '' || $password === '') {
        throw new RuntimeException('SMTP host, username, and password are required.');
    }

    $transport = $encryption === 'ssl' ? 'ssl://' : '';
    $socket = @stream_socket_client($transport . $host . ':' . $port, $errorCode, $errorMessage, $timeout);
    if ($socket === false) {
        throw new RuntimeException('Could not connect to SMTP server: ' . $errorMessage . ' (' . $errorCode . ')');
    }

    stream_set_timeout($socket, $timeout);

    try {
        smtp_expect($socket, ['220'], 'SMTP greeting');
        smtp_command($socket, 'EHLO localinsightsgh.com', ['250'], 'EHLO');

        if ($encryption === 'tls') {
            smtp_command($socket, 'STARTTLS', ['220'], 'STARTTLS');
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('Could not enable TLS encryption.');
            }
            smtp_command($socket, 'EHLO localinsightsgh.com', ['250'], 'EHLO after STARTTLS');
        }

        smtp_command($socket, 'AUTH LOGIN', ['334'], 'AUTH LOGIN');
        smtp_command($socket, base64_encode($username), ['334'], 'SMTP username');
        smtp_command($socket, base64_encode($password), ['235'], 'SMTP password');
        smtp_command($socket, 'MAIL FROM:<' . $fromEmail . '>', ['250'], 'MAIL FROM');
        smtp_command($socket, 'RCPT TO:<' . $to . '>', ['250', '251'], 'RCPT TO');
        smtp_command($socket, 'DATA', ['354'], 'DATA');
        fwrite($socket, smtp_message_data($to, $subject, $body, $fromEmail, $fromName, $replyToEmail, $replyToName) . "\r\n.\r\n");
        smtp_expect($socket, ['250'], 'Message body');
        smtp_command($socket, 'QUIT', ['221'], 'QUIT');
    } finally {
        fclose($socket);
    }
}

function send_contact_message(string $to, string $subject, string $body, string $replyToEmail, string $replyToName): bool
{
    $config = smtp_config();
    if ($config !== null) {
        try {
            smtp_send($config, $to, $subject, $body, $replyToEmail, $replyToName);
            return true;
        } catch (Throwable $error) {
            error_log('Local Insights SMTP send failed: ' . $error->getMessage());
            return false;
        }
    }

    $headers = [
        'From: ' . CONTACT_FROM_NAME . ' <' . CONTACT_FROM . '>',
        'Reply-To: ' . $replyToName . ' <' . $replyToEmail . '>',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion(),
    ];

    return mail($to, $subject, $body, implode("\r\n", $headers), '-f' . CONTACT_FROM);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Please submit the contact form from the contact page.', 405);
}

$honeypot = post_value('website', 255);
if ($honeypot !== '') {
    respond(true, 'Thank you. Your enquiry has been received.');
}

$startedAt = (int) post_value('form_started_at', 32);
$now = time();
if ($startedAt <= 0 || ($now - $startedAt) < 3 || ($now - $startedAt) > 86400) {
    respond(false, 'Please refresh the page and try sending the form again.', 400);
}

$name = post_value('name', 120);
$email = post_value('email', 254);
$country = post_value('country', 120);
$expectedTourDate = post_value('dates', 32);
$travellers = post_value('travellers', 20);
$interests = message_value('interests', 4000);

if ($name === '' || $email === '' || $interests === '') {
    respond(false, 'Please add your name, email address, and tell us about your trip.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

if ($expectedTourDate !== '' && !is_valid_date($expectedTourDate)) {
    respond(false, 'Please choose a valid expected tour date.', 422);
}

if ($travellers !== '' && (!ctype_digit($travellers) || (int) $travellers < 1)) {
    respond(false, 'Please enter a valid number of travellers.', 422);
}

$subject = 'New Local Insights Ghana trip enquiry';
$lines = [
    'New trip enquiry from localinsightsgh.com',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Country of origin: ' . ($country !== '' ? $country : 'Not provided'),
    'Expected tour date: ' . ($expectedTourDate !== '' ? $expectedTourDate : 'Not provided'),
    'Number of travellers: ' . ($travellers !== '' ? $travellers : 'Not provided'),
    '',
    'Tell us about your trip:',
    $interests,
    '',
    'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC',
    'IP address: ' . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown'),
];

$body = implode("\n", $lines);
$sent = send_contact_message(CONTACT_RECIPIENT, $subject, $body, $email, $name);

if (!$sent) {
    error_log('Local Insights contact form mail() failed for recipient ' . CONTACT_RECIPIENT);
    respond(false, 'Sorry, we could not send your enquiry right now. Please email info@localinsightsgh.com directly.', 500);
}

respond(true, 'Thank you. Your enquiry has been sent to info@localinsightsgh.com.');
