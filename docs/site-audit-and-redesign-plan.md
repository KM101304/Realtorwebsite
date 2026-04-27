# Malcolm Hasman Website Audit and Redesign Plan

Audit date: April 27, 2026  
Audited site: https://malcolmhasman.com/

## Executive Summary

The current website has the right strategic foundation: clear property categories, direct contact access, prominent listing inventory, a solds archive, a property evaluation path, and the A-List lead capture concept. The redesign should not change the site into a complex portal. It should make the same simple flows feel more premium, more editorial, and more trustworthy for Vancouver, West Vancouver, Point Grey, Whistler, and Okanagan luxury real estate.

The most important shift is hierarchy. Listings should remain easy to browse, but the homepage and property pages need stronger image treatment, calmer typography, cleaner spacing, better CTA placement, and more confidence in Malcolm's authority.

## Current Site Findings

### What Works

- The current navigation is familiar and direct, with core categories for Luxury Properties, Luxury Apartments, Whistler Properties, Okanagan Properties, New Developments, Luxury Marketing, Gallery of Solds, About, Contact, and Join the A-List.
- Phone and email are highly visible across the site, which is important for high-value listing inquiries.
- Listing pages already contain the necessary content pattern: hero media, title, address, price, description, property facts, video/floor plan/info CTAs, and contact blocks.
- The Gallery of Solds is a strong trust asset and should be treated as proof of market experience rather than hidden archive content.
- Luxury Marketing has valuable positioning content around global reach, social distribution, professional media, and private property events.
- The A-List concept is commercially useful and should be reframed as private access rather than a generic newsletter.

### Main Issues

- The visual language feels dated: black-heavy pages, compressed layouts, older typography, mixed image treatments, and a catalog-like presentation.
- The homepage has many image buttons and promotional tiles competing for attention. The user can still find things, but the hierarchy does not feel as refined as the properties being represented.
- Listing category pages read like database output. They need larger imagery, quieter metadata, clearer price/address treatment, and more editorial spacing.
- Listing detail pages have strong raw content, but the structure needs to feel like a luxury property feature: full-width hero image, elegant title block, scannable facts, large gallery, refined details, and obvious private inquiry CTAs.
- Some content is duplicated, especially in marketing copy, which weakens confidence.
- The current technical stack includes older dependencies and patterns such as legacy jQuery/UI, XHTML markup, inline CSS, and dated font loading. This adds weight and makes modern Core Web Vitals harder to protect.
- SEO foundations exist, but there is room for clearer H1/H2 hierarchy, richer property schema, better meta descriptions, sitemap, and cleaner page structure.

## Redesign Strategy

### Preserve

- The existing URL-style structure where practical, especially category pages and `/view-listing/.../` listing detail URLs.
- Simple top-level navigation.
- Easy access to Malcolm's phone number and email.
- The main content categories.
- Direct conversion paths: Current Listings, Property Evaluation, Private Showing, Inquiry, Contact, and A-List.

### Improve

- Use a warm ivory background, near-black text, stone gray borders, and muted gold accents.
- Use an elegant serif for headlines and a clean sans-serif for body/interface copy.
- Make property imagery large, calm, and editorial.
- Replace cluttered tile/button clusters with clear sections that still map to the current site structure.
- Turn listing pages into feature pages without adding unnecessary interactions.
- Reposition Malcolm as a trusted luxury market specialist with copy focused on experience, discretion, marketing discipline, and relationships.
- Convert A-List into a premium private access form.
- Add JSON-LD schema for `RealEstateAgent` and property pages.

## Page Plan

### Home

- Full-bleed luxury property hero.
- H1: "Vancouver Luxury Real Estate, Curated by Malcolm Hasman".
- Trust-focused subheadline.
- Primary CTA: View Current Listings.
- Secondary CTA: Request a Property Evaluation.
- Featured listings with large image cards.
- Recently sold preview.
- Malcolm authority section with portrait.
- Luxury marketing teaser.
- A-List/private access prompt.
- Bottom contact CTA.

### Listing Categories

- Keep category URLs: `/luxury-properties/`, `/luxury-apartments/`, `/whistler-properties/`, `/okanagan-properties/`.
- Simple editorial intro.
- Large, clickable listing cards.
- Minimal metadata: price, address, area, beds/baths/sqft.
- No cluttered filters in this first pass.

### Listing Detail Pages

- Preserve `/view-listing/.../` style URLs.
- Full-width property hero image.
- Address, area, price.
- Quick facts.
- Editorial description.
- Large lazy-loaded gallery.
- Details table.
- Location panel.
- Inquiry CTA and private showing form.
- Malcolm contact block.

### New Developments

- Preserve `/new-developments/`.
- Present as a curated development index rather than a dense directory.
- Feature selected developments with image-led cards and concise descriptions.

### Luxury Marketing

- Preserve `/luxury-marketing/`.
- Remove duplication.
- Organize around private buyer access, editorial property media, targeted launch strategy, global reach, private events, and digital visibility.

### Gallery of Solds

- Preserve `/gallery-of-solds/`.
- Treat as proof of performance with a concise intro and large sold cards.

### About Malcolm

- Preserve `/about-malcolm-hasman/`.
- Position Malcolm around experience, market specialization, luxury marketing, client discretion, and relationship-driven service.

### Contact

- Preserve `/contact-malcolm/` and provide `/contact/` as a friendly alias.
- Make contact information unmistakable.
- Include contact form and property evaluation form.

### Join the A-List

- Preserve `/join-the-a-list/`.
- Reframe as private access to select opportunities, exclusive listings, market updates, and luxury property releases.

## Execution Notes

- Build as a fast static site in this empty repository.
- Use generated static HTML for SEO-friendly pages.
- Avoid heavy dependencies and unnecessary JavaScript.
- Add responsive CSS, accessible navigation, clear form validation, lazy-loaded galleries, sitemap, robots file, and schema markup.
- Use current site image URLs for prototype continuity. Before production launch, final licensed assets should be confirmed and locally optimized or served from the client's approved image CDN.

## Sources Reviewed

- Homepage: https://malcolmhasman.com/
- Luxury Properties: https://malcolmhasman.com/luxury-properties/
- Luxury Apartments: https://malcolmhasman.com/luxury-apartments/
- Whistler Properties: https://malcolmhasman.com/whistler-properties/
- Okanagan Properties: https://malcolmhasman.com/okanagan-properties/
- New Developments: https://malcolmhasman.com/new-developments/
- Luxury Marketing: https://malcolmhasman.com/luxury-marketing/
- Gallery of Solds: https://malcolmhasman.com/gallery-of-solds/
- About Malcolm: https://malcolmhasman.com/about-malcolm-hasman/
- Sample listing detail: https://malcolmhasman.com/view-listing/address-on-request-west-vancouver-948/
- Sample apartment detail: https://malcolmhasman.com/view-listing/4801-667-howe-street-vancouver-301/
