const fs = require("fs");
const path = require("path");
const {
  contact,
  nav,
  listingCategories,
  listings,
  soldProperties,
  developments,
  assets
} = require("../src/site-data");

const root = path.resolve(__dirname, "..");
const siteUrl = "https://malcolmhasman.com";
const builtPages = [];

const esc = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const slugToPath = (slug = "") => `/${slug.replace(/^\/|\/$/g, "")}/`;

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFile(filePath, contents) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, contents);
}

function writePage(pagePath, html) {
  const cleanPath = pagePath === "/" ? "" : pagePath.replace(/^\/|\/$/g, "");
  const filePath = cleanPath ? path.join(root, cleanPath, "index.html") : path.join(root, "index.html");
  writeFile(filePath, html);
  builtPages.push(pagePath);
}

function moneyToNumber(price) {
  if (!price || price.toLowerCase().includes("request") || price.toLowerCase().includes("sold")) return undefined;
  const lower = price.toLowerCase().replace(/[, $]/g, "");
  if (lower.includes("m")) return Math.round(parseFloat(lower) * 1000000);
  return Number(lower.replace(/[^\d.]/g, "")) || undefined;
}

function image(src, alt, className = "", eager = false, lazy = false) {
  const loading = eager ? 'loading="eager" fetchpriority="high"' : lazy ? 'loading="lazy"' : 'loading="eager"';
  return `<img src="${esc(src)}" alt="${esc(alt)}" class="${esc(className)}" width="1600" height="1067" ${
    loading
  } decoding="async">`;
}

function agentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteUrl}/#agent`,
    name: contact.name,
    url: siteUrl,
    image: assets.portrait,
    telephone: contact.phoneDisplay,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "West Vancouver",
      addressRegion: "BC",
      postalCode: "V7V 1H8",
      addressCountry: "CA"
    },
    areaServed: ["Vancouver", "West Vancouver", "Point Grey", "Whistler", "Okanagan"],
    worksFor: {
      "@type": "RealEstateAgent",
      name: contact.brokerage
    }
  };
}

function listingSchema(listing) {
  const schemaType = listing.type.toLowerCase().includes("penthouse") || listing.category === "luxury-apartments"
    ? "Apartment"
    : "SingleFamilyResidence";
  const price = moneyToNumber(listing.price);

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: listing.title,
    url: `${siteUrl}${slugToPath(listing.slug)}`,
    image: [listing.hero, ...listing.gallery],
    description: listing.summary,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: listing.area,
      addressRegion: "BC",
      addressCountry: "CA"
    },
    numberOfBedrooms: listing.beds,
    numberOfBathroomsTotal: listing.baths,
    floorSize: {
      "@type": "QuantitativeValue",
      value: listing.sqft.replace(/[^\d.]/g, ""),
      unitCode: "FTK"
    },
    offers: price
      ? {
          "@type": "Offer",
          priceCurrency: "CAD",
          price,
          availability: listing.status === "Sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock"
        }
      : undefined,
    broker: { "@id": `${siteUrl}/#agent` }
  };
}

function header(currentPath) {
  const navLinks = nav
    .map((item) => {
      const isActive = currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href));
      return `<a href="${item.href}" ${isActive ? 'aria-current="page"' : ""}>${esc(item.label)}</a>`;
    })
    .join("");

  return `<header class="site-header">
    <div class="contact-strip">
      <a href="${contact.phoneHref}">${contact.phoneDisplay}</a>
      <span aria-hidden="true">/</span>
      <a href="${contact.emailHref}">${contact.email}</a>
    </div>
    <div class="nav-shell">
      <a class="brand" href="/" aria-label="Malcolm Hasman home">
        <span>Malcolm Hasman</span>
        <small>Vancouver Luxury Real Estate</small>
      </a>
      <nav class="desktop-nav" aria-label="Primary navigation">${navLinks}</nav>
      <div class="nav-actions">
        <a class="nav-phone" href="${contact.phoneHref}">${contact.phoneDisplay}</a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" hidden>
      ${navLinks}
      <div class="mobile-menu__contact">
        <a href="${contact.phoneHref}">${contact.phoneDisplay}</a>
        <a href="${contact.emailHref}">${contact.email}</a>
      </div>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="footer-inner">
      <div>
        <p class="footer-brand">Malcolm Hasman</p>
        <p>${esc(contact.brokerage)}</p>
        <p>${esc(contact.address)}<br>${esc(contact.city)}</p>
      </div>
      <div>
        <p><a href="${contact.phoneHref}">${contact.phoneDisplay} mobile</a></p>
        <p><a href="${contact.officeHref}">${contact.officeDisplay} office</a></p>
        <p><a href="${contact.emailHref}">${contact.email}</a></p>
      </div>
      <div>
        <p>Luxury representation for Vancouver, West Vancouver, Point Grey, Whistler, and select British Columbia properties.</p>
        <p class="legal">Buyers to verify all details. This prototype is not an offer for sale and is not intended to induce breach of an existing agency agreement.</p>
      </div>
    </div>
  </footer>`;
}

function shell({ title, description, currentPath, body, schema = [], preloadImage }) {
  const allSchema = [agentSchema(), ...schema].filter(Boolean);
  const canonical = `${siteUrl}${currentPath}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${esc(preloadImage || assets.hero)}">
  <meta name="theme-color" content="#f6f1e8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://malcolmhasman.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  ${preloadImage ? `<link rel="preload" as="image" href="${esc(preloadImage)}">` : ""}
  <link rel="stylesheet" href="/assets/css/styles.css">
  ${allSchema.map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n  ")}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${header(currentPath)}
  <main id="main">
    ${body}
  </main>
  ${footer()}
  <script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

function ctaBand({ title = "Request a Private Conversation", text, primary = "Contact Malcolm", href = "/contact-malcolm/" }) {
  return `<section class="section cta-band">
    <div class="container cta-band__inner">
      <div>
        <p class="eyebrow">Discreet next step</p>
        <h2>${esc(title)}</h2>
        <p>${esc(text)}</p>
      </div>
      <div class="button-row">
        <a class="button button--dark" href="${href}">${esc(primary)}</a>
        <a class="button button--ghost" href="${contact.phoneHref}">${contact.phoneDisplay}</a>
      </div>
    </div>
  </section>`;
}

function listingCard(listing) {
  return `<a class="listing-card" href="${slugToPath(listing.slug)}">
    <figure>${image(listing.image, `${listing.address}, ${listing.area}`)}</figure>
    <div class="listing-card__body">
      <p class="listing-price">${esc(listing.price)}</p>
      <h3>${esc(listing.address)}</h3>
      <p>${esc(listing.area)}</p>
      <ul class="mini-facts" aria-label="Property facts">
        <li>${esc(listing.beds)} beds</li>
        <li>${esc(listing.baths)} baths</li>
        <li>${esc(listing.sqft)} sq ft</li>
      </ul>
    </div>
  </a>`;
}

function soldCard(item) {
  return `<article class="sold-card">
    <figure>${image(item.image, item.title)}</figure>
    <div class="sold-card__body">
      <p class="listing-price">${esc(item.price)}</p>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.address)} / ${esc(item.area)}</p>
    </div>
  </article>`;
}

function developmentCard(item) {
  return `<a class="listing-card development-card" href="${slugToPath(item.slug)}">
    <figure>${image(item.image, item.title)}</figure>
    <div class="listing-card__body">
      <p class="listing-price">${esc(item.location)}</p>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.summary)}</p>
    </div>
  </a>`;
}

function contactForm(kind = "contact") {
  const isEval = kind === "evaluation";
  const isAList = kind === "alist";
  const title = isEval ? "Request Property Evaluation" : isAList ? "Join the A-List" : "Send a Message";
  const messageLabel = isEval
    ? "Property address or message"
    : isAList
      ? "What would you like private access to?"
      : "Message";

  return `<form class="form" data-form novalidate>
    <h2>${title}</h2>
    <div class="form-grid">
      <label>First and last name
        <input name="name" autocomplete="name" required>
      </label>
      <label>Phone
        <input name="phone" autocomplete="tel" required>
      </label>
      <label>Email
        <input name="email" type="email" autocomplete="email" required>
      </label>
      <label>${messageLabel}
        <textarea name="message" rows="5" required></textarea>
      </label>
    </div>
    ${
      isAList
        ? `<fieldset class="choice-row">
            <legend>Please assist me with the following</legend>
            <label><input type="checkbox" name="interests" value="exclusive-listings"> Exclusive listings</label>
            <label><input type="checkbox" name="interests" value="private-opportunities"> Private opportunities</label>
            <label><input type="checkbox" name="interests" value="market-updates"> Market updates</label>
          </fieldset>`
        : ""
    }
    <label class="consent"><input type="checkbox" required> I approve sending me information via email.</label>
    <button class="button button--dark" type="submit">${esc(title)}</button>
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>`;
}

function homePage(currentPath = "/") {
  const featured = listings.filter((item) => item.featured && item.status === "Current").slice(0, 4);

  const body = `<section class="hero">
    ${image(assets.hero, "West Vancouver waterfront estate", "hero__image", true)}
    <div class="hero__overlay" aria-hidden="true"></div>
    <div class="hero__content">
      <p class="eyebrow">Vancouver / West Vancouver / Whistler</p>
      <h1>Vancouver Luxury Real Estate, Curated by Malcolm Hasman</h1>
      <p>Discreet representation, trusted market guidance, and refined presentation for some of British Columbia's most significant homes.</p>
      <div class="button-row">
        <a class="button button--light" href="/luxury-properties/">View Current Listings</a>
        <a class="button button--outline-light" href="/contact-malcolm/#evaluation">Request a Property Evaluation</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container section-heading">
      <p class="eyebrow">Current listings</p>
      <h2>Featured Luxury Properties</h2>
      <p>Large-format property features with the essential facts buyers need first: price, address, area, beds, baths, and scale.</p>
    </div>
    <div class="container listing-grid">${featured.map(listingCard).join("")}</div>
  </section>

  <section class="section section--stone">
    <div class="container split">
      <div>
        <p class="eyebrow">Gallery of solds</p>
        <h2>Quiet Proof of Performance</h2>
        <p>Recent and notable sales should support confidence without overwhelming the browsing experience. The solds preview acts as market proof, then leads clearly into the full gallery.</p>
        <a class="text-link" href="/gallery-of-solds/">View Gallery of Solds</a>
      </div>
      <div class="sold-preview">${soldProperties.slice(0, 3).map(soldCard).join("")}</div>
    </div>
  </section>

  <section class="section">
    <div class="container authority">
      <figure>${image(assets.portrait, "Malcolm Hasman portrait")}</figure>
      <div>
        <p class="eyebrow">About Malcolm</p>
        <h2>Established Representation for Vancouver's Luxury Market</h2>
        <p>Malcolm Hasman is positioned as a calm, experienced guide for clients who value discretion, market specialization, and disciplined property marketing. The tone is confident and relationship-driven, never loud.</p>
        <div class="stat-row">
          <div><strong>25+</strong><span>years focused on luxury real estate</span></div>
          <div><strong>$5M-$30M+</strong><span>premium property positioning</span></div>
          <div><strong>Private</strong><span>qualified inquiry process</span></div>
        </div>
        <a class="button button--ghost" href="/about-malcolm-hasman/">About Malcolm</a>
      </div>
    </div>
  </section>

  <section class="section marketing-teaser">
    <div class="container split split--center">
      <div>
        <p class="eyebrow">Luxury marketing</p>
        <h2>A Private Brochure Approach to Significant Homes</h2>
        <p>Photography, video, editorial property positioning, private buyer outreach, and selective launch strategy work together to make each home feel considered, protected, and properly represented.</p>
        <a class="button button--dark" href="/luxury-marketing/">Explore Luxury Marketing</a>
      </div>
      <figure>${image(assets.marketing, "Luxury home marketing presentation")}</figure>
    </div>
  </section>

  <section class="section a-list-band">
    <div class="container split split--center">
      <div>
        <p class="eyebrow">Private access</p>
        <h2>Join the A-List</h2>
        <p>Join the A-List for private opportunities, exclusive listings, market updates, and select luxury property releases.</p>
      </div>
      <a class="button button--light" href="/join-the-a-list/">Join the A-List</a>
    </div>
  </section>

  ${ctaBand({
    title: "Considering a Sale or Private Purchase?",
    text: "Speak directly with Malcolm about current opportunities, market value, and the right next step for your property.",
    primary: "Contact Malcolm"
  })}`;

  return shell({
    title: "Malcolm Hasman | Vancouver Luxury Real Estate",
    description:
      "Luxury Vancouver real estate curated by Malcolm Hasman. Explore current listings, sold properties, private opportunities, and property evaluation requests.",
    currentPath,
    body,
    preloadImage: assets.hero
  });
}

function listingCategoryPage(category) {
  const items = listings.filter((item) => item.category === category.slug);
  const body = `<section class="page-hero page-hero--quiet">
    <div class="container">
      <p class="eyebrow">${esc(category.eyebrow)}</p>
      <h1>${esc(category.title)}</h1>
      <p>${esc(category.description)}</p>
    </div>
  </section>
  <section class="section">
    <div class="container listing-grid">${items.map(listingCard).join("")}</div>
  </section>
  ${ctaBand({
    title: "Request a Private Showing or Valuation",
    text: "Every inquiry stays clear, direct, and discreet. Contact Malcolm for property details, private showings, or value guidance.",
    primary: "Contact Malcolm"
  })}`;

  return shell({
    title: `${category.title} | Malcolm Hasman`,
    description: category.description,
    currentPath: `/${category.slug}/`,
    body
  });
}

function listingDetailPage(listing) {
  const facts = [
    ["Beds", listing.beds],
    ["Baths", listing.baths],
    ["Interior", `${listing.sqft} sq ft`],
    ["Lot / Outdoor", listing.lot],
    ["Type", listing.type]
  ];
  const details = [
    ["Address", listing.address],
    ["Area", listing.area],
    ["Neighbourhood", listing.location],
    ["Price", listing.price],
    ["Year Built", listing.year],
    ["Taxes", listing.taxes],
    ["Property Type", listing.type],
    ["Status", listing.status]
  ];

  const body = `<article>
    <section class="property-hero">
      ${image(listing.hero, listing.title, "property-hero__image", true)}
    </section>
    <section class="property-intro">
      <div class="container property-intro__inner">
        <div>
          <p class="eyebrow">${esc(listing.area)}</p>
          <h1>${esc(listing.title)}</h1>
          <p class="property-address">${esc(listing.address)} / ${esc(listing.location)}</p>
        </div>
        <p class="property-price">${esc(listing.price)}</p>
      </div>
    </section>
    <section class="section">
      <div class="container property-layout">
        <aside class="quick-facts" aria-label="Property quick facts">
          ${facts.map(([label, value]) => `<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("")}
          <a class="button button--dark" href="#inquiry">Inquire About This Property</a>
          <a class="button button--ghost" href="#inquiry">Book a Private Showing</a>
        </aside>
        <div class="property-copy">
          <p class="lead">${esc(listing.summary)}</p>
          ${listing.description.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
        </div>
      </div>
    </section>
    <section class="section section--gallery">
      <div class="container section-heading">
        <p class="eyebrow">Property gallery</p>
        <h2>Large Image Gallery</h2>
      </div>
      <div class="container gallery-grid">
        ${[listing.hero, ...listing.gallery].map((src, index) => image(src, `${listing.title} image ${index + 1}`, "", false, true)).join("")}
      </div>
    </section>
    <section class="section section--stone">
      <div class="container split">
        <div>
          <p class="eyebrow">Property details</p>
          <h2>Essential Information</h2>
          <dl class="details-list">
            ${details.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join("")}
          </dl>
        </div>
        <div class="location-panel">
          <p class="eyebrow">Location</p>
          <h2>${esc(listing.location)}</h2>
          <p>${esc(listing.address === "Address on Request" ? "Private address available upon qualified inquiry." : `${listing.address}, ${listing.area}`)}</p>
          <p>Map and precise showing details can be provided directly by Malcolm for qualified inquiries.</p>
        </div>
      </div>
    </section>
    <section class="section" id="inquiry">
      <div class="container contact-layout">
        <div>
          <p class="eyebrow">Private inquiry</p>
          <h2>Inquire About This Property</h2>
          <p>For detailed floor plans, private showing availability, or additional information, contact Malcolm directly.</p>
          <div class="contact-card">
            <strong>${contact.name}</strong>
            <a href="${contact.phoneHref}">${contact.phoneDisplay}</a>
            <a href="${contact.emailHref}">${contact.email}</a>
          </div>
        </div>
        ${contactForm("contact")}
      </div>
    </section>
  </article>`;

  return shell({
    title: `${listing.address} | ${listing.area} | Malcolm Hasman`,
    description: `${listing.title}. ${listing.summary}`,
    currentPath: slugToPath(listing.slug),
    body,
    schema: [listingSchema(listing)],
    preloadImage: listing.hero
  });
}

function newDevelopmentsPage() {
  const body = `<section class="page-hero page-hero--quiet">
    <div class="container">
      <p class="eyebrow">Curated development index</p>
      <h1>New Developments</h1>
      <p>Selected Vancouver and North Shore developments presented with the same quiet, image-led approach as individual properties.</p>
    </div>
  </section>
  <section class="section">
    <div class="container listing-grid">${developments.map(developmentCard).join("")}</div>
  </section>
  ${ctaBand({
    title: "Interested in a Development Release?",
    text: "Request details on current availability, private previews, or comparable resale opportunities.",
    primary: "Request Details"
  })}`;

  return shell({
    title: "New Developments | Malcolm Hasman",
    description: "Selected Vancouver and North Shore new developments represented through Malcolm Hasman's luxury real estate platform.",
    currentPath: "/new-developments/",
    body
  });
}

function developmentDetailPage(item) {
  const body = `<article>
    <section class="property-hero property-hero--development">
      ${image(item.image, item.title, "property-hero__image", true)}
    </section>
    <section class="section">
      <div class="container narrow">
        <p class="eyebrow">${esc(item.location)}</p>
        <h1>${esc(item.title)}</h1>
        <p class="lead">${esc(item.summary)}</p>
        <p>For availability, private previews, comparable resale opportunities, or current market context, contact Malcolm directly.</p>
        <div class="button-row">
          <a class="button button--dark" href="/contact-malcolm/">Request Details</a>
          <a class="button button--ghost" href="/new-developments/">Back to New Developments</a>
        </div>
      </div>
    </section>
  </article>`;

  return shell({
    title: `${item.title} | New Developments | Malcolm Hasman`,
    description: item.summary,
    currentPath: slugToPath(item.slug),
    body,
    preloadImage: item.image
  });
}

function marketingPage() {
  const pillars = [
    ["Private buyer access", "Direct outreach to qualified local, national, and international buyers with careful control over property exposure."],
    ["Editorial property media", "Large-format photography, video, floor plans, and written positioning that make each property feel considered."],
    ["Launch strategy", "Pricing, sequencing, private previews, and public presentation are calibrated to the property and market conditions."],
    ["Global visibility", "Digital distribution supports international reach without making the experience feel mass-market."],
    ["Private events", "Selective showings and invitation-based previews can create momentum for the right properties."],
    ["Performance clarity", "Owners need clear communication, disciplined follow-up, and a marketing path that protects long-term value."]
  ];

  const body = `<section class="page-hero page-hero--image">
    ${image(assets.marketing, "Luxury property marketing", "page-hero__image", true)}
    <div class="page-hero__content container">
      <p class="eyebrow">Luxury marketing</p>
      <h1>Marketing Significant Homes with Discipline and Discretion</h1>
      <p>Premium property marketing should feel like a private luxury brochure: precise, visual, selective, and trusted.</p>
    </div>
  </section>
  <section class="section">
    <div class="container editorial-grid">
      ${pillars.map(([title, text]) => `<article><h2>${esc(title)}</h2><p>${esc(text)}</p></article>`).join("")}
    </div>
  </section>
  ${ctaBand({
    title: "Request an Evaluation of Your Home",
    text: "Discuss value, presentation, and launch strategy for a luxury property in Vancouver or select BC markets.",
    primary: "Request Property Evaluation",
    href: "/contact-malcolm/#evaluation"
  })}`;

  return shell({
    title: "Luxury Marketing | Malcolm Hasman",
    description: "Luxury real estate marketing by Malcolm Hasman: private buyer access, editorial media, global reach, and disciplined property launches.",
    currentPath: "/luxury-marketing/",
    body,
    preloadImage: assets.marketing
  });
}

function soldsPage() {
  const body = `<section class="page-hero page-hero--quiet">
    <div class="container">
      <p class="eyebrow">Gallery of solds</p>
      <h1>A Record of Significant Sales</h1>
      <p>A calm, visual archive of notable luxury property sales across Vancouver, West Vancouver, Point Grey, Coal Harbour, Whistler, and beyond.</p>
    </div>
  </section>
  <section class="section">
    <div class="container sold-grid">${soldProperties.map(soldCard).join("")}</div>
  </section>
  ${ctaBand({
    title: "Considering Selling a Significant Property?",
    text: "Request a confidential opinion of value and a clear marketing path.",
    primary: "Request Property Evaluation",
    href: "/contact-malcolm/#evaluation"
  })}`;

  return shell({
    title: "Gallery of Solds | Malcolm Hasman",
    description: "Notable sold luxury properties represented by Malcolm Hasman across Vancouver, West Vancouver, Whistler, and select BC markets.",
    currentPath: "/gallery-of-solds/",
    body
  });
}

function aboutPage() {
  const body = `<section class="page-hero page-hero--quiet">
    <div class="container">
      <p class="eyebrow">About Malcolm Hasman</p>
      <h1>Trusted Luxury Real Estate Representation in Vancouver</h1>
      <p>Calm, experienced, and highly specialized guidance for owners and buyers of significant homes.</p>
    </div>
  </section>
  <section class="section">
    <div class="container authority authority--about">
      <figure>${image(assets.portrait, "Malcolm Hasman portrait")}</figure>
      <div>
        <h2>Experience with a Narrow Focus</h2>
        <p>Malcolm's role is not to make the process louder. It is to make it clearer, more selective, and more effective for clients navigating the luxury market.</p>
        <p>His specialization spans Vancouver, West Vancouver, Point Grey, Whistler, and select British Columbia properties where privacy, presentation, and market knowledge matter.</p>
      </div>
    </div>
  </section>
  <section class="section section--stone">
    <div class="container editorial-grid">
      <article><h2>Market specialization</h2><p>Deep familiarity with waterfront estates, architectural homes, penthouses, gated properties, and private addresses.</p></article>
      <article><h2>Luxury marketing approach</h2><p>Editorial property presentation, qualified buyer outreach, and disciplined launch timing.</p></article>
      <article><h2>Client discretion</h2><p>Private conversations, confidential addresses where appropriate, and careful control over property exposure.</p></article>
      <article><h2>Relationship-driven service</h2><p>Clear advice and direct communication before, during, and after a transaction.</p></article>
    </div>
  </section>
  ${ctaBand({
    title: "Speak with Malcolm",
    text: "For a private sale, property evaluation, or purchase conversation, direct contact remains the simplest path.",
    primary: "Contact Malcolm"
  })}`;

  return shell({
    title: "About Malcolm Hasman | Vancouver Luxury Real Estate",
    description: "About Malcolm Hasman, a trusted Vancouver luxury real estate specialist focused on discretion, marketing, and relationship-driven service.",
    currentPath: "/about-malcolm-hasman/",
    body
  });
}

function contactPage(currentPath = "/contact-malcolm/") {
  const body = `<section class="page-hero page-hero--quiet">
    <div class="container">
      <p class="eyebrow">Contact</p>
      <h1>Contact Malcolm Hasman</h1>
      <p>Direct contact for private showings, property evaluations, listing inquiries, and confidential luxury real estate conversations.</p>
    </div>
  </section>
  <section class="section">
    <div class="container contact-layout">
      <div>
        <h2>${contact.name}</h2>
        <p>${contact.brokerage}</p>
        <address>
          ${contact.address}<br>
          ${contact.city}
        </address>
        <div class="contact-lines">
          <a href="${contact.phoneHref}">${contact.phoneDisplay} mobile</a>
          <a href="${contact.officeHref}">${contact.officeDisplay} office</a>
          <a href="${contact.emailHref}">${contact.email}</a>
        </div>
      </div>
      ${contactForm("contact")}
    </div>
  </section>
  <section class="section section--stone" id="evaluation">
    <div class="container contact-layout">
      <div>
        <p class="eyebrow">Property evaluation</p>
        <h2>Request a Property Evaluation</h2>
        <p>Share the property address and any relevant timing. Malcolm can advise on value, presentation, and the most appropriate launch path.</p>
      </div>
      ${contactForm("evaluation")}
    </div>
  </section>`;

  return shell({
    title: "Contact Malcolm Hasman | Vancouver Luxury Real Estate",
    description: "Contact Malcolm Hasman for private showings, property evaluations, luxury listing inquiries, and direct real estate guidance.",
    currentPath,
    body
  });
}

function aListPage() {
  const body = `<section class="page-hero page-hero--image">
    ${image(assets.aList, "Private luxury property access", "page-hero__image", true)}
    <div class="page-hero__content container">
      <p class="eyebrow">Private access</p>
      <h1>Join the A-List</h1>
      <p>Join the A-List for private opportunities, exclusive listings, market updates, and select luxury property releases.</p>
    </div>
  </section>
  <section class="section">
    <div class="container contact-layout">
      <div>
        <h2>Selective Opportunities, Sent with Care</h2>
        <p>The A-List should feel like private access, not a generic newsletter. This form is intentionally short, direct, and respectful of the client's time.</p>
        <p>Use it for early awareness of select releases, market guidance, and carefully matched property opportunities.</p>
      </div>
      ${contactForm("alist")}
    </div>
  </section>`;

  return shell({
    title: "Join the A-List | Malcolm Hasman",
    description: "Join Malcolm Hasman's A-List for private opportunities, exclusive listings, market updates, and select luxury property releases.",
    currentPath: "/join-the-a-list/",
    body,
    preloadImage: assets.aList
  });
}

function notFoundPage() {
  return shell({
    title: "Page Not Found | Malcolm Hasman",
    description: "The page could not be found. Browse current luxury listings or contact Malcolm Hasman directly.",
    currentPath: "/404.html",
    body: `<section class="page-hero page-hero--quiet"><div class="container narrow"><p class="eyebrow">404</p><h1>Page Not Found</h1><p>The page may have moved. Current listings, solds, and contact paths remain available.</p><div class="button-row"><a class="button button--dark" href="/luxury-properties/">View Current Listings</a><a class="button button--ghost" href="/contact-malcolm/">Contact Malcolm</a></div></div></section>`
  });
}

function redirectPage(target) {
  const safeTarget = esc(target);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=${safeTarget}">
  <link rel="canonical" href="${siteUrl}${safeTarget}">
  <title>Redirecting | Malcolm Hasman</title>
  <script>window.location.replace(${JSON.stringify(target)});</script>
</head>
<body>
  <p>Redirecting to <a href="${safeTarget}">${safeTarget}</a>.</p>
</body>
</html>`;
}

function writeSitemap() {
  const urls = [...new Set(builtPages)]
    .filter((page) => page !== "/404.html")
    .map((page) => `  <url><loc>${siteUrl}${page}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  writeFile(path.join(root, "sitemap.xml"), xml);
}

function writeStaticSupport() {
  writeFile(
    path.join(root, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
  );
  writeFile(
    path.join(root, "_redirects"),
    `/home/ /\n/view-my-listings/ /luxury-properties/ 301\n/contact-home-evaluation/ /contact-malcolm/#evaluation 301\n/contact/ /contact-malcolm/ 200\n`
  );

  const redirects = {
    "view-my-listings": "/luxury-properties/",
    "contact-home-evaluation": "/contact-malcolm/#evaluation",
    "contact-malcolm/request-more-info": "/contact-malcolm/",
    "contact-malcolm/schedule-a-viewing": "/contact-malcolm/",
    "the-malcolm-hasman-team": "/about-malcolm-hasman/",
    "exclusive-events": "/luxury-marketing/",
    "exclusive-magazine": "/luxury-marketing/",
    "foundation": "/about-malcolm-hasman/",
    "social-feeds": "/"
  };

  Object.entries(redirects).forEach(([from, to]) => {
    writeFile(path.join(root, from, "index.html"), redirectPage(to));
  });
}

function build() {
  writePage("/", homePage("/"));
  writePage("/home/", homePage("/home/"));

  listingCategories.forEach((category) => writePage(`/${category.slug}/`, listingCategoryPage(category)));
  listings.forEach((listing) => writePage(slugToPath(listing.slug), listingDetailPage(listing)));

  writePage("/new-developments/", newDevelopmentsPage());
  developments.forEach((item) => writePage(slugToPath(item.slug), developmentDetailPage(item)));

  writePage("/luxury-marketing/", marketingPage());
  writePage("/gallery-of-solds/", soldsPage());
  writePage("/about-malcolm-hasman/", aboutPage());
  writePage("/contact-malcolm/", contactPage("/contact-malcolm/"));
  writePage("/contact/", contactPage("/contact/"));
  writePage("/join-the-a-list/", aListPage());
  writeFile(path.join(root, "404.html"), notFoundPage());
  builtPages.push("/404.html");

  writeSitemap();
  writeStaticSupport();
}

build();

console.log(`Built ${builtPages.length} pages.`);
