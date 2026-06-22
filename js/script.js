const tours = [
  {
    id: "accra-heritage-walk",
    title: "Accra Heritage Walk",
    category: "culture",
    region: "accra",
    durationGroup: "1",
    duration: "1 day",
    price: "From $85",
    style: "Cultural",
    image: "images/makola-market.jpg",
    summary: "Independence landmarks, markets, art, food stops, and stories from local Accra.",
    description:
      "A grounded introduction to Ghana's capital through independence history, everyday city life, markets, local food, public art, and neighbourhood stories.",
    highlights: [
      "Black Star Square and independence landmarks",
      "Makola Market walk-through",
      "Local food tasting stop",
      "Contemporary art and neighbourhood stories",
    ],
    itinerary: ["Morning heritage route", "Market and food stop", "Afternoon art and local life"],
    included: "Guide, local transport during the experience, tastings, and entry support.",
  },
  {
    id: "cape-coast-heritage",
    title: "Cape Coast Heritage Experience",
    category: "culture",
    region: "central",
    durationGroup: "2-3",
    duration: "2 days",
    price: "From $240",
    style: "Heritage",
    image: "images/cape-coast-castle.jpg",
    summary: "A two-day heritage journey through Cape Coast, Kakum, food, and coastal history.",
    description:
      "A thoughtful Central Region experience connecting Ghana's coastal history with local storytelling, food, nature, and reflection.",
    highlights: [
      "Cape Coast Castle guided visit",
      "Kakum canopy walkway",
      "Local history storytelling",
      "Traditional cuisine and community stop",
    ],
    itinerary: [
      "Day 1: Accra departure, Cape Coast arrival, castle visit",
      "Day 2: Kakum experience, local lunch, return to Accra",
    ],
    included: "Transport, guide, entrance fees, selected meals, water, and itinerary support.",
  },
  {
    id: "wli-waterfalls-adventure",
    title: "Wli Waterfalls Adventure",
    category: "adventure",
    region: "volta",
    durationGroup: "2-3",
    duration: "3 days",
    price: "From $320",
    style: "Nature",
    image: "images/wli-waterfalls.jpg",
    summary: "Waterfalls, mountain air, village rhythm, and scenic Volta Region roads.",
    description:
      "A nature-forward escape for travellers who want Ghana's waterfalls, calm landscapes, hikes, and community connection.",
    highlights: [
      "Wli Falls visit",
      "Optional Afadjato hiking extension",
      "Village-hosted experience",
      "Scenic Volta road trip",
    ],
    itinerary: [
      "Day 1: Accra to Volta with scenic stops",
      "Day 2: Wli Falls and village experience",
      "Day 3: Slow morning and return",
    ],
    included: "Transport, guide, accommodation coordination, selected meals, and attraction fees.",
  },
  {
    id: "ghana-food-discovery",
    title: "Ghana Food Discovery Tour",
    category: "food",
    region: "accra",
    durationGroup: "1",
    duration: "1 day",
    price: "From $95",
    style: "Food",
    image: "images/makola-market.jpg",
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
    region: "north",
    durationGroup: "4+",
    duration: "5 days",
    price: "From $690",
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
    included: "Planning support, local guide, transfers, park coordination, and selected meals.",
  },
  {
    id: "weekend-volta-escape",
    title: "Weekend Volta Escape",
    category: "escape",
    region: "volta",
    durationGroup: "2-3",
    duration: "2 days",
    price: "From $210",
    style: "Short Escape",
    image: "images/wli-waterfalls.jpg",
    summary: "A short, scenic break with waterfalls, local food, and easy nature.",
    description:
      "A compact reset for travellers based in Accra or passing through Ghana, focused on fresh air, easy scenery, and local hospitality.",
    highlights: [
      "Waterfall visit",
      "Local lunch stop",
      "Scenic photo stops",
      "Flexible private pacing",
    ],
    itinerary: ["Day 1: Depart Accra and explore", "Day 2: Slow morning and return"],
    included: "Transport, guide, attraction fees, water, and selected meals.",
  },
];

const grid = document.querySelector("[data-tour-grid]");
const panel = document.querySelector("[data-tour-panel]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");

function titleCase(value) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function renderTours(filter = "all") {
  if (!grid) return;
  const filteredTours = tours.filter((tour) => filter === "all" || tour.category === filter);

  grid.innerHTML = filteredTours
    .map(
      (tour) => `
        <article class="tour-card" data-category="${tour.category}" data-region="${tour.region}" data-duration="${tour.durationGroup}">
          <div class="tour-card-image" style="background-image:url('${tour.image}')"></div>
          <div class="tour-card-body">
            <div class="tag-row">
              <span>${titleCase(tour.category)}</span>
              <span>${tour.duration}</span>
              <span>${titleCase(tour.region)}</span>
            </div>
            <h3>${tour.title}</h3>
            <p>${tour.summary}</p>
            <div class="card-bottom">
              <span class="price">${tour.price}</span>
              <button class="text-link" type="button" data-tour-link="${tour.id}">View details</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function openTour(id) {
  const tour = tours.find((item) => item.id === id);
  if (!tour || !panel) return;

  panel.querySelector("[data-detail-image]").style.backgroundImage = `url('${tour.image}')`;
  panel.querySelector("[data-detail-region]").textContent = titleCase(tour.region);
  panel.querySelector("[data-detail-title]").textContent = tour.title;
  panel.querySelector("[data-detail-duration]").textContent = tour.duration;
  panel.querySelector("[data-detail-price]").textContent = tour.price;
  panel.querySelector("[data-detail-style]").textContent = tour.style;
  panel.querySelector("[data-detail-description]").textContent = tour.description;
  panel.querySelector("[data-detail-highlights]").innerHTML = tour.highlights
    .map((item) => `<li>${item}</li>`)
    .join("");
  panel.querySelector("[data-detail-itinerary]").innerHTML = tour.itinerary
    .map((item) => `<li>${item}</li>`)
    .join("");
  panel.querySelector("[data-detail-included]").textContent = tour.included;
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
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
              <div class="tour-card-image" style="background-image:url('${tour.image}')"></div>
              <div class="tour-card-body">
                <div class="tag-row">
                  <span>${titleCase(tour.category)}</span>
                  <span>${tour.duration}</span>
                  <span>${titleCase(tour.region)}</span>
                </div>
                <h3>${tour.title}</h3>
                <p>${tour.summary}</p>
                <div class="card-bottom">
                  <span class="price">${tour.price}</span>
                  <button class="text-link" type="button" data-tour-link="${tour.id}">View details</button>
                </div>
              </div>
            </article>
          `
        )
        .join("")
    : `<p>No tours match those filters yet. Use the trip planner and Local Insight can create a custom Ghana experience.</p>`;

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
  planForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    button.textContent = "Request Ready to Send";
    button.style.background = "#1e6b4f";
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeTour();
});

renderTours();
