const tours = [
  {
    id: "accra-heritage-walk",
    title: "Accra Heritage Walk",
    category: "culture",
    region: "greater-accra",
    durationGroup: "1",
    duration: "1 or Half day",
    style: "Cultural",
    image: "images/kwame-nkrumah-refurbished-3.jpg",
    summary: "Independence landmarks, markets, art, and stories from local Accra.",
    description:
      "A grounded introduction to Ghana's capital through independence history, everyday city life, markets, public art, and neighbourhood stories.",
    highlights: [
      "Black Star Square and independence landmarks",
      "Kwame Nkrumah Memorial Park",
      "Osu Castle",
      "Art Center",
      "Makola Market walk-through",
      "Contemporary art and neighbourhood stories",
    ],
    itinerary: ["Morning heritage route", "Market and food stop", "Afternoon art and local life"],
    included: "Guide, local transport during the experience, tastings, and entry support.",
  },
  {
    id: "ashanti-cultural-roots",
    title: "Ashanti Cultural Roots",
    category: "culture",
    region: "ashanti",
    durationGroup: "2-3",
    duration: "2 days",
    style: "Culture",
    image: "images/client-cultural-adinkra.jpeg",
    summary: "A two-day Ashanti Region journey through Kumasi history, royal memory, naming traditions, kente, and Adinkra craft villages.",
    description:
      "A culture-rich Ashanti Region experience connecting Kumasi heritage with the Okomfo Anokye Sword, traditional naming ceremonies, Bonwire kente weaving, Ntonso Adinkra craft, and local storytelling.",
    highlights: [
      "Okomfo Anokye Sword site",
      "Traditional naming ceremony experience",
      "Bonwire kente weaving village",
      "Ntonso Adinkra craft and symbolism",
      "Kumasi cultural storytelling and local food stops",
    ],
    itinerary: [
      "Day 1: Travel to Kumasi, Okomfo Anokye Sword site, cultural orientation, and local food stop",
      "Day 2: Naming ceremony experience, Bonwire kente, Ntonso Adinkra, and return or onward travel",
    ],
    included: "Guide, accommodation, transport support, entrance coordination, selected meals, water, craft-village coordination, and itinerary planning.",
  },
  {
    id: "cape-coast-heritage",
    title: "Cape Coast Heritage Experience",
    category: "culture",
    region: "central",
    durationGroup: "2-3",
    duration: "2 days",
    style: "Heritage",
    image: "images/client-cape-coast-door-return.jpeg",
    summary: "A two-day heritage journey through Cape Coast, Kakum, food, and coastal history.",
    description:
      "A thoughtful Central Region experience connecting Ghana's coastal history with local storytelling, food, nature, and reflection.",
    highlights: [
      "Cape Coast Castle guided visit",
      "Elmina Castle visit",
      "Kakum canopy walkway",
      "Local history storytelling",
      "Traditional cuisine and community stop",
    ],
    itinerary: [
      "Day 1: Accra departure, Cape Coast arrival, castle visit",
      "Day 2: Kakum experience, local lunch, return to Accra",
    ],
    included: "Accommodation, transport, guide, entrance fees, selected meals, water, and itinerary support.",
  },
  {
    id: "wli-waterfalls-adventure",
    title: "Volta Nature Adventure",
    category: "adventure",
    region: "volta",
    durationGroup: "2-3",
    duration: "3 days",
    style: "Nature",
    image: "images/wli-waterfalls.jpg",
    summary: "Waterfalls, Tafi Atome Monkey Sanctuary, mountain air, village rhythm, and scenic Volta Region roads.",
    description:
      "A nature-forward Volta Region escape for travellers who want waterfalls, wildlife encounters, calm landscapes, hikes, and community connection.",
    highlights: [
      "Wli Falls visit",
      "Tafi Atome Monkey Sanctuary",
      "Optional Afadjato hiking extension",
      "Village-hosted experience",
      "Scenic Volta road trip",
    ],
    itinerary: [
      "Day 1: Accra to Volta with scenic stops",
      "Day 2: Wli Falls and village experience",
      "Day 3: Slow morning and return",
    ],
    included: "Accommodation, transport, guide, selected meals, and attraction fees.",
  },
  {
    id: "ghana-food-discovery",
    title: "Ghana Food Discovery Tour",
    category: "food",
    region: "greater-accra",
    durationGroup: "1",
    duration: "1 day",
    style: "Food",
    image: "images/client-food-cooking.jpeg",
    summary: "Markets, street food, cooking stories, and local flavours across Accra.",
    description:
      "A guided food experience for travellers who want to understand Ghana through markets, ingredients, family recipes, and street-side favourites.",
    highlights: [
      "Guided market visit",
      "Street food tastings",
      "Ingredient and spice storytelling",
      "Optional cooking add-on",
    ],
    itinerary: ["Market orientation", "Tasting route", "Lunch or cooking add-on"],
    included: "Guide, tastings, water, local transport, and dietary planning support.",
  },
  {
    id: "mole-safari-experience",
    title: "Mole Safari Experience",
    category: "adventure",
    region: "northern",
    durationGroup: "4+",
    duration: "5 days",
    style: "Wildlife",
    image: "images/mole-elephant.jpg",
    summary: "Wildlife, northern culture, craft villages, and ancient landmarks.",
    description:
      "A longer northern Ghana journey built around Mole National Park, traditional architecture, craft, and cultural encounters.",
    highlights: [
      "Mole National Park safari",
      "Larabanga Mosque visit",
      "Northern craft and culture stops",
      "Slow-paced private itinerary",
    ],
    itinerary: [
      "Day 1: Travel north",
      "Days 2-3: Mole safari experiences",
      "Day 4: Culture and craft stops",
      "Day 5: Return or onward travel",
    ],
    included: "Accommodation, planning support, local guide, transfers, park coordination, and selected meals.",
  },
  {
    id: "weekend-volta-escape",
    title: "Akosombo Weekend Escape",
    category: "escape",
    region: "volta",
    durationGroup: "2-3",
    duration: "2 days",
    style: "Short Escape",
    image: "images/client-boat-ride.jpeg",
    summary: "A short Akosombo break with Volta Lake time, Adome Bridge views, sporting activities, local food, and easy nature.",
    description:
      "A compact Akosombo weekend reset for travellers based in Accra or passing through Ghana, focused on Volta Lake, Adome Bridge, sporting activities, easy scenery, and local hospitality.",
    highlights: [
      "Boat or jet ski ride on the Volta Lake",
      "Adome Bridge views",
      "Sporting activities",
      "Local lunch stop",
      "Scenic photo stops",
      "Flexible private pacing",
    ],
    itinerary: [],
    included: "Accommodation, transport, guide, attraction fees, water, and selected meals.",
  },
];

const grid = document.querySelector("[data-tour-grid]");
const panel = document.querySelector("[data-tour-panel]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const whatsappNumber = "233244317183";
const defaultWhatsappMessage = "Hello Local Insights, I want to plan a Ghana trip.";
const regionLabels = {
  ahafo: "Ahafo",
  ashanti: "Ashanti",
  bono: "Bono",
  "bono-east": "Bono East",
  central: "Central",
  eastern: "Eastern",
  "greater-accra": "Greater Accra",
  "north-east": "North East",
  northern: "Northern",
  oti: "Oti",
  savannah: "Savannah",
  "upper-east": "Upper East",
  "upper-west": "Upper West",
  volta: "Volta",
  western: "Western",
  "western-north": "Western North",
};

const revealSelectors = [
  ".hero-content",
  ".page-hero > div",
  ".section-heading",
  ".trip-finder",
  ".nationwide-panel",
  ".process-flow li",
  ".trust-strip div",
  ".info-card",
  ".tour-preview",
  ".tour-card",
  ".destination-card",
  ".faq-grid details",
  ".style-grid article",
  ".blog-grid article",
  ".impact-list div",
  ".about-stats div",
  ".plan-form",
  ".image-panel",
].join(",");

const scaleRevealSelectors = [".hero-media", ".about-image"].join(",");

const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
      )
    : null;

function prepareRevealItems(scope = document) {
  const revealItems = Array.from(scope.querySelectorAll(revealSelectors));
  const scaleItems = Array.from(scope.querySelectorAll(scaleRevealSelectors));

  [...revealItems, ...scaleItems].forEach((element) => {
    element.classList.toggle("reveal-scale", scaleItems.includes(element));
    element.classList.toggle("reveal-item", !scaleItems.includes(element));

    if (element.matches(".trust-strip div, .process-flow li, .info-card, .tour-preview, .tour-card, .destination-card, .faq-grid details, .style-grid article, .blog-grid article, .impact-list div, .about-stats div")) {
      const siblings = Array.from(element.parentElement.children).filter((child) =>
        child.matches(".trust-strip div, .process-flow li, .info-card, .tour-preview, .tour-card, .destination-card, .faq-grid details, .style-grid article, .blog-grid article, .impact-list div, .about-stats div")
      );
      const delay = Math.min(siblings.indexOf(element), 5);
      if (delay > 0) element.classList.add(`reveal-delay-${delay}`);
    }

    if (revealObserver) {
      revealObserver.observe(element);
    } else {
      element.classList.add("reveal-in");
    }
  });
}

function titleCase(value) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function regionName(value) {
  return regionLabels[value] || titleCase(value);
}

function renderTours(filter = "all") {
  if (!grid) return;
  const filteredTours = tours.filter((tour) => filter === "all" || tour.category === filter);

  grid.innerHTML = filteredTours
    .map(
      (tour) => `
        <article class="tour-card" data-category="${tour.category}" data-region="${tour.region}" data-duration="${tour.durationGroup}">
          <button class="tour-card-image tour-card-action" type="button" style="background-image:url('${tour.image}')" data-tour-link="${tour.id}" aria-label="View ${tour.title} details"></button>
          <div class="tour-card-body">
            <div class="tag-row">
              <span>${titleCase(tour.category)}</span>
              <span>${tour.duration}</span>
              <span>${regionName(tour.region)}</span>
            </div>
            <h3><button class="tour-title-button" type="button" data-tour-link="${tour.id}">${tour.title}</button></h3>
            <p>${tour.summary}</p>
            <div class="card-bottom">
              <button class="text-link" type="button" data-tour-link="${tour.id}">View details</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  prepareRevealItems(grid);
}

function openTour(id) {
  const tour = tours.find((item) => item.id === id);
  if (!tour || !panel) return;

  panel.querySelector("[data-detail-image]").style.backgroundImage = `url('${tour.image}')`;
  panel.querySelector("[data-detail-region]").textContent = regionName(tour.region);
  panel.querySelector("[data-detail-title]").textContent = tour.title;
  panel.querySelector("[data-detail-duration]").textContent = tour.duration;
  panel.querySelector("[data-detail-style]").textContent = tour.style;
  panel.querySelector("[data-detail-description]").textContent = tour.description;
  panel.querySelector("[data-detail-highlights]").innerHTML = tour.highlights
    .map((item) => `<li>${item}</li>`)
    .join("");
  const itinerarySection = panel.querySelector("[data-detail-itinerary-section]");
  const itineraryList = panel.querySelector("[data-detail-itinerary]");
  if (tour.itinerary.length) {
    itineraryList.innerHTML = tour.itinerary.map((item) => `<li>${item}</li>`).join("");
    itinerarySection.hidden = false;
  } else {
    itineraryList.innerHTML = "";
    itinerarySection.hidden = true;
  }
  panel.querySelector("[data-detail-included]").textContent = tour.included;
  const bookLink = panel.querySelector("[data-detail-book]");
  if (bookLink) {
    bookLink.href = `contact.html?tour=${encodeURIComponent(tour.id)}`;
  }
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
}

function openTourFromHash() {
  if (!grid || !window.location.hash) return;
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!tours.some((tour) => tour.id === id)) return;
  openTour(id);
}

function applyRegionFromUrl() {
  if (!grid || !applyFilters) return;

  const requestedRegion = new URLSearchParams(window.location.search).get("region");
  const regionAliases = { accra: "greater-accra", north: "northern" };
  const region = regionAliases[requestedRegion] || requestedRegion;
  const regionSelect = document.querySelector('[data-filter-select="region"]');

  if (!region || !regionLabels[region] || !regionSelect) return;
  regionSelect.value = region;
  applyFilters.click();
}

function getTourRequestText(tour) {
  return `I am interested in the ${tour.title}.

Tour details:
- Duration: ${tour.duration}
- Region: ${regionName(tour.region)}
- Style: ${tour.style}

Please help me plan this experience.`;
}

function prefillTourRequest() {
  if (!planForm) return;
  const selectedTourId = new URLSearchParams(window.location.search).get("tour");
  if (!selectedTourId) return;

  const selectedTour = tours.find((tour) => tour.id === selectedTourId);
  if (!selectedTour) return;

  const interests = planForm.querySelector('textarea[name="interests"]');
  if (interests && !interests.value.trim()) {
    interests.value = getTourRequestText(selectedTour);
  }

  const heading = document.querySelector(".plan-copy h2");
  if (heading) heading.textContent = `Plan ${selectedTour.title}`;
}

function closeTour() {
  if (!panel) return;
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (event) => {
  const filterButton = event.target.closest("[data-filter]");
  const tourLink = event.target.closest("[data-tour-link]");
  const closeButton = event.target.closest("[data-close-panel]");

  if (filterButton) {
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.remove("is-active"));
    filterButton.classList.add("is-active");
    renderTours(filterButton.dataset.filter);
  }

  if (tourLink) {
    event.preventDefault();
    openTour(tourLink.dataset.tourLink);
  }

  if (closeButton) closeTour();
});

const applyFilters = document.querySelector("[data-apply-filters]");

if (applyFilters) {
  applyFilters.addEventListener("click", () => {
  const category = document.querySelector('[data-filter-select="category"]').value;
  const duration = document.querySelector('[data-filter-select="duration"]').value;
  const region = document.querySelector('[data-filter-select="region"]').value;

  const filteredTours = tours.filter((tour) => {
    const categoryMatch = category === "all" || tour.category === category;
    const durationMatch = duration === "all" || tour.durationGroup === duration;
    const regionMatch = region === "all" || tour.region === region;
    return categoryMatch && durationMatch && regionMatch;
  });

  grid.innerHTML = filteredTours.length
    ? filteredTours
        .map(
          (tour) => `
            <article class="tour-card">
              <button class="tour-card-image tour-card-action" type="button" style="background-image:url('${tour.image}')" data-tour-link="${tour.id}" aria-label="View ${tour.title} details"></button>
              <div class="tour-card-body">
                <div class="tag-row">
                  <span>${titleCase(tour.category)}</span>
                  <span>${tour.duration}</span>
                  <span>${regionName(tour.region)}</span>
                </div>
                <h3><button class="tour-title-button" type="button" data-tour-link="${tour.id}">${tour.title}</button></h3>
                <p>${tour.summary}</p>
                <div class="card-bottom">
                  <button class="text-link" type="button" data-tour-link="${tour.id}">View details</button>
                </div>
              </div>
            </article>
          `
        )
        .join("")
    : `<p>No listed tour matches those filters yet. Use the trip planner and Local Insights can create a private Ghana experience across any of the 16 regions.</p>`;

    prepareRevealItems(grid);
    document.querySelector("#tours")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  nav.addEventListener("click", () => {
    nav.classList.remove("is-open");
  });
}

const planForm = document.querySelector(".plan-form");

if (planForm) {
  prefillTourRequest();

  planForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    button.textContent = "Request Ready to Send";
    button.style.background = "#1e6b4f";
  });
}

function createWhatsappChat() {
  if (document.querySelector("[data-whatsapp-chat]")) return;

  const chat = document.createElement("aside");
  chat.className = "whatsapp-chat";
  chat.setAttribute("data-whatsapp-chat", "");
  chat.setAttribute("aria-hidden", "true");
  chat.innerHTML = `
    <div class="whatsapp-chat-card" role="dialog" aria-modal="false" aria-labelledby="whatsapp-chat-title">
      <div class="whatsapp-chat-header">
        <div>
          <span>WhatsApp chat</span>
          <h2 id="whatsapp-chat-title">Local Insights</h2>
        </div>
        <button class="whatsapp-chat-close" type="button" data-whatsapp-close aria-label="Close WhatsApp chat">x</button>
      </div>
      <div class="whatsapp-chat-body">
        <div class="chat-bubble incoming">Hi, welcome to Local Insights. What would you like help planning?</div>
        <button class="chat-prompt" type="button" data-whatsapp-message="Hello Local Insights, I want to plan a Ghana trip.">Plan my Ghana trip</button>
        <button class="chat-prompt" type="button" data-whatsapp-message="Hello Local Insights, I would like to ask about your Ghana tours.">Ask about tours</button>
        <button class="chat-prompt" type="button" data-whatsapp-message="Hello Local Insights, I want a custom Ghana travel experience.">Request a custom trip</button>
      </div>
      <form class="whatsapp-chat-form" data-whatsapp-form>
        <input type="text" name="message" aria-label="WhatsApp message" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  `;
  document.body.appendChild(chat);
}

function openWhatsapp(message = defaultWhatsappMessage) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank", "noopener");
}

function openWhatsappChat() {
  createWhatsappChat();
  const chat = document.querySelector("[data-whatsapp-chat]");
  chat.classList.add("is-open");
  chat.setAttribute("aria-hidden", "false");
  chat.querySelector('input[name="message"]')?.focus();
}

function closeWhatsappChat() {
  const chat = document.querySelector("[data-whatsapp-chat]");
  if (!chat) return;
  chat.classList.remove("is-open");
  chat.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (event) => {
  const whatsappButton = event.target.closest(".whatsapp");
  const closeWhatsappButton = event.target.closest("[data-whatsapp-close]");
  const promptButton = event.target.closest("[data-whatsapp-message]");

  if (whatsappButton) {
    event.preventDefault();
    openWhatsappChat();
  }

  if (closeWhatsappButton) closeWhatsappChat();

  if (promptButton) {
    const chat = document.querySelector("[data-whatsapp-chat]");
    const input = chat?.querySelector('input[name="message"]');
    if (input) {
      input.value = promptButton.dataset.whatsappMessage;
      input.focus();
    }
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-whatsapp-form]");
  if (!form) return;

  event.preventDefault();
  const input = form.querySelector('input[name="message"]');
  const message = input?.value.trim() || defaultWhatsappMessage;
  openWhatsapp(message);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTour();
    closeWhatsappChat();
  }
});

prepareRevealItems();
renderTours();
applyRegionFromUrl();
openTourFromHash();

window.addEventListener("hashchange", openTourFromHash);
