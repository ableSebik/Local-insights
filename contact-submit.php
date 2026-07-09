<?php
declare(strict_types=1);

const CONTACT_RECIPIENT = 'info@localinsightsgh.com';
const CONTACT_FROM = 'no-reply@localinsightsgh.com';

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
$dates = post_value('dates', 160);
$travellers = post_value('travellers', 20);
$interests = message_value('interests', 4000);

if ($name === '' || $email === '' || $interests === '') {
    respond(false, 'Please add your name, email address, and trip interests.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
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
    'Country: ' . ($country !== '' ? $country : 'Not provided'),
    'Travel dates: ' . ($dates !== '' ? $dates : 'Not provided'),
    'Number of travellers: ' . ($travellers !== '' ? $travellers : 'Not provided'),
    '',
    'Interests:',
    $interests,
    '',
    'Submitted: ' . gmdate('Y-m-d H:i:s') . ' UTC',
    'IP address: ' . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown'),
];

$body = implode("\n", $lines);
$headers = [
    'From: Local Insights Ghana <' . CONTACT_FROM . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail(CONTACT_RECIPIENT, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(false, 'Sorry, we could not send your enquiry right now. Please email info@localinsightsgh.com directly.', 500);
}

respond(true, 'Thank you. Your enquiry has been sent to info@localinsightsgh.com.');
