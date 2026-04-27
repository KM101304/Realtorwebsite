const mediaHost = "https://malcolmhasman.com";

const mh = (path) => (path.startsWith("http") ? path : `${mediaHost}${path}`);

const contact = {
  name: "Malcolm Hasman",
  brokerage: "Angell Hasman & Associates (Malcolm Hasman) Realty Ltd.",
  address: "203-1544 Marine Drive",
  city: "West Vancouver, BC, V7V 1H8",
  phoneDisplay: "604.290.1679",
  phoneHref: "tel:+16042901679",
  officeDisplay: "604.921.1188",
  officeHref: "tel:+16049211188",
  email: "malcolm@malcolmhasman.com",
  emailHref: "mailto:malcolm@malcolmhasman.com",
  website: "https://malcolmhasman.com"
};

const nav = [
  { label: "Home", href: "/" },
  { label: "Luxury Properties", href: "/luxury-properties/" },
  { label: "Luxury Apartments", href: "/luxury-apartments/" },
  { label: "Whistler Properties", href: "/whistler-properties/" },
  { label: "Okanagan Properties", href: "/okanagan-properties/" },
  { label: "New Developments", href: "/new-developments/" },
  { label: "Luxury Marketing", href: "/luxury-marketing/" },
  { label: "Gallery of Solds", href: "/gallery-of-solds/" },
  { label: "About Malcolm", href: "/about-malcolm-hasman/" },
  { label: "Contact", href: "/contact-malcolm/" },
  { label: "Join the A-List", href: "/join-the-a-list/" }
];

const listingCategories = [
  {
    slug: "luxury-properties",
    label: "Luxury Properties",
    eyebrow: "Current estate collection",
    title: "Luxury Properties",
    description:
      "A curated selection of Vancouver, West Vancouver, Point Grey, White Rock, and Lower Mainland luxury homes represented with discretion and editorial care."
  },
  {
    slug: "luxury-apartments",
    label: "Luxury Apartments",
    eyebrow: "Penthouses and residences",
    title: "Luxury Apartments",
    description:
      "Signature penthouses, waterfront residences, and private hotel residences in Vancouver's most established luxury addresses."
  },
  {
    slug: "whistler-properties",
    label: "Whistler Properties",
    eyebrow: "Alpine and lakefront",
    title: "Whistler Properties",
    description:
      "Select Whistler chalets, estate homes, and private mountain properties for buyers seeking architecture, privacy, and year-round access."
  },
  {
    slug: "okanagan-properties",
    label: "Okanagan Properties",
    eyebrow: "Lake country estates",
    title: "Okanagan Properties",
    description:
      "Okanagan lakefront and resort-style properties selected for privacy, outlook, architecture, and long-term lifestyle value."
  }
];

const listings = [
  {
    slug: "view-listing/address-on-request-west-vancouver-948",
    category: "luxury-properties",
    featured: true,
    status: "Current",
    title: "A World Class Waterfront Estate on Radcliffe Avenue",
    address: "Address on Request",
    area: "West Vancouver",
    location: "West Bay",
    price: "$58.8M",
    beds: "5",
    baths: "5 full, 2 half",
    sqft: "9,944",
    lot: "39,180 sq ft",
    type: "Waterfront Estate",
    year: "2000",
    taxes: "$193,705.60",
    image: mh("/library/members/M/1240/galleries/27999/artgallerypic-1240-27999-800x533.jpeg"),
    hero: mh("/library/members/M/1240/galleries/27999/artgallerypic-1240-27999-2400x1601.jpeg"),
    gallery: [
      mh("/library/members/M/1240/galleries/28000/artgallerypic-1240-28000-2400x1600.jpeg"),
      mh("/library/members/M/1240/galleries/28008/artgallerypic-1240-28008-2400x1600.jpeg"),
      mh("/library/members/M/1240/galleries/28010/artgallerypic-1240-28010-2400x1600.jpeg"),
      mh("/library/members/M/1240/galleries/28009/artgallerypic-1240-28009-2400x1602.jpeg"),
      mh("/library/members/M/1240/galleries/28011/artgallerypic-1240-28011-2400x1600.jpeg"),
      mh("/library/members/M/1240/galleries/28041/artgallerypic-1240-28041-2400x1600.jpeg")
    ],
    summary:
      "A private oceanfront estate on one of West Vancouver's most coveted shoreline settings, with exceptional water frontage, mature landscaping, and a resort-calibre outdoor program.",
    description: [
      "Designed for privacy, scale, and a true indoor-outdoor waterfront lifestyle, this West Bay estate pairs expansive south-facing outlooks with refined entertaining spaces and intimate family areas.",
      "The residence includes generous principal rooms, five private bedroom suites, a guest suite, wine storage, media, fitness, office, and secure gated arrival with garage parking.",
      "Every part of the presentation should feel quiet, qualified, and personal: detailed plans, private showings, and supporting property information are positioned as direct-inquiry experiences."
    ]
  },
  {
    slug: "view-listing/address-on-request-west-vancouver-981",
    category: "luxury-properties",
    featured: true,
    status: "Current",
    title: "McLeod Bovell Waterfront Masterpiece on Bellevue Avenue",
    address: "Address on Request",
    area: "West Vancouver",
    location: "Bellevue Avenue",
    price: "$39,980,000",
    beds: "5",
    baths: "7",
    sqft: "8,120",
    lot: "17,200 sq ft",
    type: "Waterfront Residence",
    year: "2024",
    taxes: "Available on request",
    image: mh("/library/members/M/1240/galleries/30642/artgallerypic-1240-30642-800x533.jpeg"),
    hero: mh("/library/members/M/1240/galleries/30642/artgallerypic-1240-30642-800x533.jpeg"),
    gallery: [
      mh("/library/members/M/1240/galleries/30642/artgallerypic-1240-30642-800x533.jpeg"),
      mh("/library/members/M/1240/galleries/29900/artgallerypic-1240-29900-800x599.jpeg"),
      mh("/library/members/M/1240/galleries/30083/artgallerypic-1240-30083-800x533.jpeg")
    ],
    summary:
      "A contemporary waterfront residence with architectural pedigree, ocean outlooks, and direct proximity to West Vancouver's most prized shoreline.",
    description: [
      "A rare Bellevue Avenue offering where architecture, waterfront setting, and privacy are treated as a single composed experience.",
      "The redesign presents this listing as a property feature, giving imagery, address confidentiality, and private inquiry clear space to breathe."
    ]
  },
  {
    slug: "view-listing/3478-marine-drive-west-vancouver-973",
    category: "luxury-properties",
    featured: true,
    status: "Current",
    title: "McLeod Bovell Architectural Ocean View Residence",
    address: "3478 Marine Drive",
    area: "West Vancouver",
    location: "West Bay",
    price: "$15.8M",
    beds: "4",
    baths: "6",
    sqft: "5,362",
    lot: "14,000 sq ft",
    type: "Architectural Residence",
    year: "2023",
    taxes: "Available on request",
    image: mh("/library/members/M/1240/galleries/29900/artgallerypic-1240-29900-800x599.jpeg"),
    hero: mh("/library/members/M/1240/galleries/29900/artgallerypic-1240-29900-800x599.jpeg"),
    gallery: [
      mh("/library/members/M/1240/galleries/29900/artgallerypic-1240-29900-800x599.jpeg"),
      mh("/library/members/M/1240/articles/29250/artpic-1240-29250-800x533.jpeg"),
      mh("/library/members/M/1240/articles/29788/artpic-1240-29788-800x600.jpeg")
    ],
    summary:
      "A modern West Vancouver residence composed around ocean views, architectural restraint, and walkable access to the beach.",
    description: [
      "This feature treatment emphasizes the property's architectural discipline and its relationship to light, outlook, and coastline.",
      "Quick facts remain visible while the page gives the photography and editorial description a more premium cadence."
    ]
  },
  {
    slug: "view-listing/2958-mathers-crescent-west-vancouver-bc-1021",
    category: "luxury-properties",
    featured: false,
    status: "Current",
    title: "Californian Inspired Altamont Estate",
    address: "2958 Mathers Crescent",
    area: "West Vancouver, BC",
    location: "Altamont",
    price: "$10.5M",
    beds: "6",
    baths: "8",
    sqft: "8,500",
    lot: ".81 acre",
    type: "Gated Estate",
    year: "2018",
    taxes: "Available on request",
    image: mh("/library/members/M/1240/galleries/33415/artgallerypic-1240-33415-800x533.jpeg"),
    hero: mh("/library/members/M/1240/galleries/33415/artgallerypic-1240-33415-800x533.jpeg"),
    gallery: [
      mh("/library/members/M/1240/galleries/33415/artgallerypic-1240-33415-800x533.jpeg"),
      mh("/library/members/M/1240/galleries/33327/artgallerypic-1240-33327-800x594.jpeg"),
      mh("/library/members/M/1240/galleries/33134/artgallerypic-1240-33134-800x599.jpeg")
    ],
    summary:
      "A private gated estate in Altamont with relaxed Californian influence, mature grounds, and generous entertaining scale.",
    description: [
      "The listing page is intentionally calm: the address, price, core facts, and inquiry paths stay prominent without overwhelming the imagery."
    ]
  },
  {
    slug: "view-listing/4374-erwin-drive-west-vancouver-1019",
    category: "luxury-properties",
    featured: false,
    status: "Current",
    title: "Family Residence Steps from Erwin Drive Beach",
    address: "4374 Erwin Drive",
    area: "West Vancouver",
    location: "Cypress / Erwin Drive",
    price: "$7,680,000",
    beds: "5",
    baths: "6",
    sqft: "5,200",
    lot: "12,000 sq ft",
    type: "Family Residence",
    year: "2019",
    taxes: "Available on request",
    image: mh("/library/members/M/1240/galleries/33134/artgallerypic-1240-33134-800x599.jpeg"),
    hero: mh("/library/members/M/1240/galleries/33134/artgallerypic-1240-33134-800x599.jpeg"),
    gallery: [
      mh("/library/members/M/1240/galleries/33134/artgallerypic-1240-33134-800x599.jpeg"),
      mh("/library/members/M/1240/galleries/32947/artgallerypic-1240-32947-800x530.jpeg"),
      mh("/library/members/M/1240/galleries/32955/artgallerypic-1240-32955-800x533.jpeg")
    ],
    summary:
      "A refined West Vancouver family home near the beach, balancing everyday comfort with a quiet luxury setting.",
    description: [
      "This page treats the home as a lifestyle proposition with straightforward facts and a direct path to private showing requests."
    ]
  },
  {
    slug: "view-listing/4346-locarno-crescent-point-grey-vancouver-bc-966",
    category: "luxury-properties",
    featured: false,
    status: "Current",
    title: "Modern Ocean View Home in Point Grey",
    address: "4346 Locarno Crescent",
    area: "Point Grey, Vancouver",
    location: "Locarno Beach",
    price: "$8,880,000",
    beds: "4",
    baths: "5",
    sqft: "4,900",
    lot: "7,920 sq ft",
    type: "Ocean View Residence",
    year: "2020",
    taxes: "Available on request",
    image: mh("/library/members/M/1240/articles/29788/artpic-1240-29788-800x600.jpeg"),
    hero: mh("/library/members/M/1240/articles/29788/artpic-1240-29788-800x600.jpeg"),
    gallery: [
      mh("/library/members/M/1240/articles/29788/artpic-1240-29788-800x600.jpeg"),
      mh("/library/members/M/1240/articles/27898/artpic-1240-27898-800x599.jpeg"),
      mh("/library/members/M/1240/articles/31982/artpic-1240-31982-800x573.jpeg")
    ],
    summary:
      "A Point Grey residence steps to Locarno Beach with ocean outlooks, modern interiors, and a highly established Vancouver address.",
    description: [
      "The redesign gives Point Grey listings a magazine-like treatment while keeping the browsing and inquiry path direct."
    ]
  },
  {
    slug: "view-listing/4801-667-howe-street-vancouver-301",
    category: "luxury-apartments",
    featured: true,
    status: "Current",
    title: "The Hotel Georgia Penthouse Residence",
    address: "4801 667 Howe Street",
    area: "Vancouver",
    location: "Downtown Vancouver",
    price: "$15.75M",
    beds: "4",
    baths: "5 full, 2 half",
    sqft: "7,736",
    lot: "Five terraces",
    type: "Penthouse",
    year: "2012 approx.",
    taxes: "$85,721.60",
    image: mh("/library/members/M/1240/galleries/29635/artgallerypic-1240-29635-800x534.jpeg"),
    hero: mh("/library/members/M/1240/galleries/29635/artgallerypic-1240-29635-2400x1602.jpeg"),
    gallery: [
      mh("/library/members/M/1240/galleries/28451/artgallerypic-1240-28451-2400x1600.jpeg"),
      mh("/library/members/M/1240/galleries/28455/artgallerypic-1240-28455-2400x1600.jpeg"),
      mh("/library/members/M/1240/galleries/29636/artgallerypic-1240-29636-2400x1600.jpeg"),
      mh("/library/members/M/1240/galleries/29632/artgallerypic-1240-29632-2400x1602.jpeg")
    ],
    summary:
      "A landmark penthouse residence above the Hotel Georgia, offering hotel-level service, privacy, terraces, and panoramic city, ocean, and mountain views.",
    description: [
      "This penthouse page is composed like a private brochure: a strong hero, clear ownership facts, concierge lifestyle notes, and highly visible inquiry options.",
      "The copy focuses on convenience, security, service, and scale without adding promotional noise."
    ]
  },
  {
    slug: "view-listing/3403-1568-alberni-street-vancouver-1011",
    category: "luxury-apartments",
    featured: false,
    status: "Current",
    title: "Kengo Kuma Residence near Coal Harbour",
    address: "3403 1568 Alberni Street",
    area: "Vancouver",
    location: "Alberni / Coal Harbour",
    price: "$2,880,000",
    beds: "2",
    baths: "2",
    sqft: "1,200",
    lot: "Balcony",
    type: "Luxury Residence",
    year: "2023",
    taxes: "Available on request",
    image: mh("/library/members/M/1240/articles/11515/artpic-1240-11515-2400x1714.jpg"),
    hero: mh("/library/members/M/1240/articles/11515/artpic-1240-11515-2400x1714.jpg"),
    gallery: [
      mh("/library/members/M/1240/articles/11515/artpic-1240-11515-2400x1714.jpg"),
      mh("/library/members/M/1240/articles/11564/artpic-1240-11564-2400x1300.jpg"),
      mh("/library/members/M/1240/articles/11273/artpic-1240-11273-2400x1285.png")
    ],
    summary:
      "A refined residence in the Alberni luxury zone with access to Coal Harbour, marina life, shopping, and dining.",
    description: [
      "The page keeps the apartment listing concise and polished, foregrounding address, building context, and private inquiry."
    ]
  },
  {
    slug: "view-listing/2901-2378-alpha-avenue-brentwood-burnaby-1009",
    category: "luxury-apartments",
    featured: false,
    status: "Current",
    title: "Milano Penthouse by Solterra",
    address: "2901 2378 Alpha Avenue",
    area: "Brentwood, Burnaby",
    location: "Brentwood",
    price: "$2,688,900 + GST",
    beds: "3",
    baths: "3",
    sqft: "2,050",
    lot: "Terrace",
    type: "Penthouse",
    year: "2024",
    taxes: "Available on request",
    image: mh("/library/members/M/1240/articles/11312/artpic-1240-11312-2400x1228.jpg"),
    hero: mh("/library/members/M/1240/articles/11312/artpic-1240-11312-2400x1228.jpg"),
    gallery: [
      mh("/library/members/M/1240/articles/11312/artpic-1240-11312-2400x1228.jpg"),
      mh("/library/members/M/1240/articles/11273/artpic-1240-11273-2400x1285.png"),
      mh("/library/members/M/1240/articles/11619/artpic-1240-11619-2400x1680.jpg")
    ],
    summary:
      "A new penthouse opportunity in Brentwood with elevated views, new-home convenience, and generous outdoor living.",
    description: [
      "The redesign lets new apartment opportunities sit comfortably beside established Vancouver penthouses without feeling like a generic condo index."
    ]
  },
  {
    slug: "view-listing/3296-archibald-way-whistler-bc-864",
    category: "whistler-properties",
    featured: true,
    status: "Current",
    title: "Architectural Alta Lake Residence",
    address: "3296 Archibald Way",
    area: "Whistler, BC",
    location: "Alta Lake",
    price: "$16,489,000",
    beds: "5",
    baths: "6",
    sqft: "5,900",
    lot: "Lakefront",
    type: "Lakefront Residence",
    year: "2017",
    taxes: "Available on request",
    image: mh("/library/members/M/1240/galleries/23629/artgallerypic-1240-23629-800x621.jpeg"),
    hero: mh("/library/members/M/1240/galleries/23629/artgallerypic-1240-23629-800x621.jpeg"),
    gallery: [
      mh("/library/members/M/1240/galleries/23629/artgallerypic-1240-23629-800x621.jpeg"),
      mh("/library/members/M/1240/articles/31984/artpic-1240-31984-800x599.jpeg"),
      mh("/library/members/M/1240/articles/31985/artpic-1240-31985-800x600.jpeg")
    ],
    summary:
      "A private Whistler lakefront residence with architectural presence, mountain atmosphere, and direct waterfront lifestyle.",
    description: [
      "This page emphasizes alpine privacy and four-season use, keeping the inquiry path direct for qualified buyers."
    ]
  },
  {
    slug: "view-listing/address-on-request-whistler-998",
    category: "whistler-properties",
    featured: false,
    status: "Sold",
    title: "Mountain Chalet on Whistler's Most Exclusive Street",
    address: "Address on Request",
    area: "Whistler",
    location: "Private address",
    price: "Sold $13.4M",
    beds: "6",
    baths: "7",
    sqft: "7,100",
    lot: "Estate setting",
    type: "Mountain Chalet",
    year: "2016",
    taxes: "Sold record",
    image: mh("/library/members/M/1240/articles/31984/artpic-1240-31984-800x599.jpeg"),
    hero: mh("/library/members/M/1240/articles/31984/artpic-1240-31984-800x599.jpeg"),
    gallery: [
      mh("/library/members/M/1240/articles/31984/artpic-1240-31984-800x599.jpeg"),
      mh("/library/members/M/1240/articles/31985/artpic-1240-31985-800x600.jpeg"),
      mh("/library/members/M/1240/galleries/26086/artgallerypic-1240-26086-800x577.jpeg")
    ],
    summary:
      "A sold Whistler chalet used in the redesign as proof of Malcolm's reach beyond Metro Vancouver estate homes.",
    description: [
      "Sold records are presented with the same restraint as active inventory, supporting trust without shouting."
    ]
  },
  {
    slug: "view-listing/20-180-sheerwater-court-kelowna-bc-1023",
    category: "okanagan-properties",
    featured: true,
    status: "Current",
    title: "Sheerwater Architectural Lakefront Estate",
    address: "20 - 180 Sheerwater Court",
    area: "Kelowna, BC",
    location: "Sheerwater",
    price: "$13.95M",
    beds: "5",
    baths: "7",
    sqft: "10,568",
    lot: "Gated lakefront",
    type: "Lakefront Estate",
    year: "2022",
    taxes: "Available on request",
    image: mh("/library/members/M/1240/articles/33535/artpic-1240-33535-800x533.jpeg"),
    hero: mh("/library/members/M/1240/articles/33535/artpic-1240-33535-2400x1600.jpeg"),
    gallery: [
      mh("/library/members/M/1240/galleries/33553/artgallerypic-1240-33553-2400x1600.jpeg"),
      mh("/library/members/M/1240/galleries/33554/artgallerypic-1240-33554-2400x1600.jpeg"),
      mh("/library/members/M/1240/galleries/33555/artgallerypic-1240-33555-2400x1600.jpeg"),
      mh("/library/members/M/1240/galleries/33556/artgallerypic-1240-33556-2400x1600.jpeg")
    ],
    summary:
      "An award-winning Kelowna lakefront residence in a premier gated community, with privacy, scale, and Okanagan lake views.",
    description: [
      "This Okanagan feature page expands the brand beyond Vancouver while preserving the same tone of discretion, architecture, and qualified access.",
      "The property is treated as a private lakefront retreat rather than a standard listing record."
    ]
  }
];

const soldProperties = [
  {
    title: "Point Grey Estate with Ocean and Mountain Views",
    address: "Drummond Drive, Point Grey",
    area: "Vancouver",
    price: "$51.8M",
    image: mh("/library/members/M/1240/articles/27898/artpic-1240-27898-800x599.jpeg")
  },
  {
    title: "World Class Beachfront Estate",
    address: "Address on Request",
    area: "West Vancouver",
    price: "$32.8M",
    image: mh("/library/members/M/1240/landingpage/24553/landingpage-1240-24553-2400x1600.jpeg")
  },
  {
    title: "Fairmont Pacific Rim Penthouse One",
    address: "4701 1011 West Cordova Street",
    area: "Coal Harbour, Vancouver",
    price: "$25M",
    image: mh("/library/members/M/1240/articles/6145/artpic-1240-6145-1200x801.jpg")
  },
  {
    title: "Hotel Georgia Penthouse Residence",
    address: "4801 667 Howe Street",
    area: "Vancouver",
    price: "$17.8M",
    image: mh("/library/members/M/1240/galleries/29635/artgallerypic-1240-29635-800x534.jpeg")
  },
  {
    title: "First Shaughnessy Estate",
    address: "First Shaughnessy",
    area: "Vancouver",
    price: "$17.4M",
    image: mh("/library/members/M/1240/articles/31982/artpic-1240-31982-800x573.jpeg")
  },
  {
    title: "Whistler Mountain Chalet",
    address: "Address on Request",
    area: "Whistler",
    price: "$13.4M",
    image: mh("/library/members/M/1240/articles/31984/artpic-1240-31984-800x599.jpeg")
  }
];

const developments = [
  {
    slug: "development/1333-bellevue-avenue-west-vancouver-581",
    title: "Grosvenor Ambleside",
    location: "West Vancouver",
    image: mh("/library/members/M/1240/articles/11115/artpic-1240-11115-2400x1600.jpg"),
    summary: "Waterfront residences on Bellevue Avenue with a quiet, established Ambleside setting."
  },
  {
    slug: "development/2958-burfield-place-west-vancouver-585",
    title: "The Peak at Mulgrave Park",
    location: "West Vancouver",
    image: mh("/library/members/M/1240/articles/11222/artpic-1240-11222-2400x1208.jpg"),
    summary: "Elevated West Vancouver living with mountain, ocean, and city outlooks."
  },
  {
    slug: "development/arthur-erickson-place-west-vancouver-580",
    title: "Evelyn",
    location: "West Vancouver",
    image: mh("/library/members/M/1240/galleries/11108/artgallerypic-1240-11108-2400x1451.jpg"),
    summary: "A West Vancouver community shaped by landscape, architecture, and everyday ease."
  },
  {
    slug: "development/1633-capilano-road-north-vancouver-583",
    title: "Park West at Lions Gate Village",
    location: "North Vancouver",
    image: mh("/library/members/M/1240/galleries/11166/artgallerypic-1240-11166-2400x1201.jpg"),
    summary: "A North Shore development with access to parks, waterfront, and Vancouver connections."
  },
  {
    slug: "development/990-burrard-street-vancouver-352",
    title: "The Butterfly",
    location: "Downtown Vancouver",
    image: mh("/library/members/M/1240/articles/6057/artpic-1240-6057-1200x956.jpg"),
    summary: "A landmark downtown residence with sculptural architecture and luxury city access."
  },
  {
    slug: "development/1550-alberni-street-vancouver-596",
    title: "Alberni by Kengo Kuma",
    location: "Vancouver",
    image: mh("/library/members/M/1240/articles/11515/artpic-1240-11515-2400x1714.jpg"),
    summary: "An architectural address in Vancouver's Alberni luxury district."
  },
  {
    slug: "development/667-howe-street-vancouver-359",
    title: "Hotel Georgia Residences",
    location: "Vancouver",
    image: mh("/library/members/M/1240/articles/6145/artpic-1240-6145-1200x801.jpg"),
    summary: "Private residences connected to one of Vancouver's most recognized hotel addresses."
  },
  {
    slug: "development/2289-bellevue-avenue-west-vancouver-584",
    title: "Bellevue Dundarave",
    location: "West Vancouver",
    image: mh("/library/members/M/1240/articles/11202/artpic-1240-11202-2400x1600.jpg"),
    summary: "A Dundarave waterfront address with direct access to the seawall and village."
  }
];

module.exports = {
  contact,
  nav,
  listingCategories,
  listings,
  soldProperties,
  developments,
  assets: {
    portrait: "https://res.cloudinary.com/malcolmhasman/malcolm-1000px.jpg",
    brokerageLogo: "https://res.cloudinary.com/malcolmhasman/angellhasman-logo.jpg",
    hero: mh("/library/members/M/1240/landingpage/24553/landingpage-1240-24553-2400x1600.jpeg"),
    evaluation: mh("/library/members/M/1240/landingpage/14881/landingpage-1240-14881-2400x1600.jpg"),
    marketing: mh("/library/members/M/1240/landingpage/14884/landingpage-1240-14884-2400x1600.jpeg"),
    aList: mh("/library/members/S/1244/landingpage/8702/landingpage-1244-8702-2400x1220.jpg")
  }
};
