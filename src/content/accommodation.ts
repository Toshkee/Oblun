import { images as i } from "./images";
import type { AmenityId, Category, CategoryId, Localized, Unit } from "./types";

/*
 * Prices are in EUR per night and were read from the old booking system (October 2026).
 * Season boundaries were sampled once per month, so double-check the exact start/end
 * dates before relying on them.
 */

export const amenityLabels: Record<AmenityId, Localized> = {
  wifi: { en: "WiFi", me: "WiFi" },
  parking: { en: "Parking", me: "Parking" },
  dishes: { en: "Dishes", me: "Posuđe" },
  bedding: { en: "Bedding", me: "Posteljina" },
  fireplace: { en: "Fireplace", me: "Kamin" },
  wardrobe: { en: "Clothing storage", me: "Garderober" },
  "coffee-machine": { en: "Coffee machine", me: "Aparat za kafu" },
  "washing-machine": { en: "Washing machine", me: "Veš mašina" },
  refrigerator: { en: "Refrigerator", me: "Frižider" },
  dishwasher: { en: "Dishwasher", me: "Mašina za suđe" },
  "hair-dryer": { en: "Hair dryer", me: "Fen" },
  iron: { en: "Iron", me: "Pegla" },
  grill: { en: "Grill", me: "Roštilj" },
  oven: { en: "Oven", me: "Rerna" },
  "outdoor-furniture": { en: "Outdoor furniture", me: "Baštenski namještaj" },
  "first-aid": { en: "First aid kit", me: "Prva pomoć" },
  toilet: { en: "Toilet", me: "Toalet" },
  electricity: { en: "Electricity", me: "Struja" },
  water: { en: "Water", me: "Voda" },
  shower: { en: "Shower", me: "Tuš" },
  trash: { en: "Trash", me: "Kanta za otpad" },
  ac: { en: "Air conditioning", me: "Klima uređaj" },
  "portable-fan": { en: "Portable fan", me: "Prenosivi ventilator" },
  wastewater: { en: "Grey water disposal", me: "Ispust otpadnih voda" },
  "black-water": { en: "Black water disposal", me: "Ispust fekalnih voda" },
  "ev-charging": { en: "EV charging station", me: "Punjač za električna vozila" },
  laundry: { en: "Laundry", me: "Vešeraj" },
  "underfloor-heating": { en: "Underfloor heating", me: "Podno grijanje" },
  kitchenette: { en: "Kitchenette", me: "Čajna kuhinja" },
};

export const categories: Category[] = [
  {
    id: "villa",
    slug: { en: "villa-oblun", me: "vila-oblun" },
    title: { en: "Villa Oblun", me: "Vila Oblun" },
    description: {
      en: "Let yourself be carried away by the charm of Villa Oblun, whose stone walls hide the values of timeless tradition. Located among charming hills, Villa Oblun offers seclusion in the heart of untouched nature.",
      me: "Dopusti da te ponese šarm vile Oblun, čiji kameni zidovi kriju vrijednosti vanvremenske tradicije. Smještena među šarmantnim brdima, vila Oblun nudi osamu u srcu netaknute prirode, dok se meki tonovi lokalnog kamena harmonično prožimaju sa okruženjem.",
    },
    image: i.villa3,
  },
  {
    id: "tents",
    slug: { en: "tents", me: "sator" },
    title: { en: "Glamping Tents", me: "Glamping šatori" },
    description: {
      en: "Surrender to the majesty of wild nature and experience a whole new vacation experience in our luxuriously equipped glamping tents, nestled among the rich treetops. Your idyllic paradise awaits you here!",
      me: "Prepusti se veličanstvenosti divlje prirode i doživi potpuno novo iskustvo odmora u našim luksuzno opremljenim glamping šatorima, smještenim među bogatim krošnjama drveća. Tvoj idilični raj te čeka!",
    },
    image: i.mediumTent5,
  },
  {
    id: "mirror-cabin",
    slug: { en: "mirror-cabin", me: "mirror-cabin" },
    title: { en: "Mirror Cabin", me: "Mirror Cabin" },
    description: {
      en: "A modern retreat where contemporary design meets the outdoors. Reflective glass walls blend into the landscape, keeping you private while opening up views of the forest around you.",
      me: "Moderno utočište u kojem se savremeni dizajn spaja sa prirodom. Reflektujući stakleni zidovi stapaju se sa pejzažem, čuvajući tvoju privatnost, dok ti otvaraju pogled na šumu oko tebe.",
    },
    image: i.mirror1,
  },
  {
    id: "autocamp",
    slug: { en: "autocamp", me: "autokamp" },
    title: { en: "AutoCamp", me: "Auto-kamp" },
    description: {
      en: "What experience could be more magical than sleeping outdoors under the stars? Experience waking up with a sense of peace, scents and sounds of amazing nature at our campsite.",
      me: "Koje iskustvo može biti magičnije od spavanja na otvorenom pod zvijezdama? Iskusi buđenje uz osjećaj mira, mirise i zvukove zadivljujuće prirode na našoj kamping lokaciji.",
    },
    image: i.autocamp1,
  },
  {
    id: "campsite",
    slug: { en: "campsite", me: "kamp" },
    title: { en: "Campsite", me: "Kamp" },
    description: {
      en: "Connect with nature and escape the mass tourism. Sleeping under the stars is a great way to recharge and revel in the outdoors.",
      me: "Poveži se sa prirodom i pobjegni od masovnog turizma. Spavanje pod zvijezdama je najbolji način da se napuniš energijom i uživaš na otvorenom.",
    },
    image: i.campsite1,
  },
];

const tentsBooking = "https://www.booking.com/hotel/me/oblun-eco-resort-luxury-glamping-tents.html";
const summer = (price: number) => ({ from: "06-01", to: "09-30", price });

const campsiteText: Localized = {
  en: "If you are one with nature, we have the right thing for you. Undiscovered and untamed nature where you can pitch your tent and switch off from the hectic world around you. Ideal for traditional camping enthusiasts, our campsite offers a serene and picturesque setting. Whether you're planning a family vacation or a solo adventure, our campsite provides a perfect base for exploring the surrounding landscapes and engaging in outdoor activities like hiking in Montenegro and Lake Skadar tours.",
  me: "Ako si jedno sa prirodom, imamo pravu stvar za tebe. Neotkrivena i neukroćena priroda u kojoj možeš podići svoj šator i isključiti se iz užurbanog svijeta oko sebe. Idealan za ljubitelje tradicionalnog kampovanja, naš kamp nudi miran i slikovit ambijent. Bilo da planiraš porodični odmor ili solo avanturu, kamp je savršena polazna tačka za istraživanje okoline, planinarenje po Crnoj Gori i ture po Skadarskom jezeru.",
};

export const units: Unit[] = [
  {
    id: "villa",
    category: "villa",
    slug: { en: "entire-villa", me: "cijela-vila" },
    title: { en: "Villa Oblun", me: "Vila Oblun" },
    facts: {
      en: ["5 guests", "2 rooms", "3 beds", "2 bathrooms"],
      me: ["5 gostiju", "2 sobe", "3 kreveta", "2 kupatila"],
    },
    shortDescription: {
      en: "Spend days with friends or family in an airy interior that combines contemporary comfort with tradition-inspired aesthetics, creating a sense of belonging.",
      me: "Provedi dane sa prijateljima ili porodicom u prozračnom enterijeru koji kombinuje savremeni komfor sa estetikom nadahnutom tradicijom, stvarajući osjećaj pripadnosti.",
    },
    description: {
      en: "<p>Step back in time and enjoy a stay in our beautifully restored 120-year-old stone villa, Villa Oblun. This retreat offers a unique blend of historic charm and modern amenities, nestled in Montenegro's stunning landscapes overlooking Lake Skadar.</p><p>The spacious interior combines contemporary comfort with traditional touches, creating a warm and inviting atmosphere for families and groups. Relax on the large terrace and take in the views of the surrounding natural beauty. The villa is about 900 metres from the main resort site.</p>",
      me: "<p>Vrati se u prošlost i uživaj u boravku u našoj brižljivo obnovljenoj kamenoj vili staroj 120 godina. Vila Oblun nudi jedinstven spoj istorijskog šarma i savremenog komfora, smještena u zadivljujućem crnogorskom pejzažu sa pogledom na Skadarsko jezero.</p><p>Prostrani enterijer spaja savremenu udobnost sa tradicionalnim detaljima i stvara toplu, prijatnu atmosferu za porodice i grupe. Opusti se na velikoj terasi i uživaj u pogledu na prirodu koja te okružuje. Vila se nalazi oko 900 metara od glavnog dijela resorta.</p>",
    },
    maxGuests: 5,
    amenities: [
      "wifi",
      "parking",
      "dishes",
      "bedding",
      "fireplace",
      "wardrobe",
      "coffee-machine",
      "washing-machine",
      "refrigerator",
      "dishwasher",
      "hair-dryer",
      "iron",
      "grill",
      "oven",
      "outdoor-furniture",
      "first-aid",
      "toilet",
    ],
    gallery: [i.villa1, i.villa3, i.villa5, i.villa6, i.villa8, i.villa4, i.villa2, i.villa7, i.villa9],
    pricing: { base: 150, seasons: [summer(180)], minNights: 1, per: "unit" },
    links: {
      airbnb: "https://www.airbnb.com/h/ecoresortoblun-villaoblun",
      booking: "https://www.booking.com/Share-NlNf1QT",
    },
    reviewsWidget: "62eedcc9-263c-47a2-b750-91fa3ca2168c",
  },
  {
    id: "large-tent",
    category: "tents",
    slug: { en: "large-tent", me: "veliki-sator" },
    title: { en: "Large tent", me: "Veliki šator" },
    facts: {
      en: ["4 guests", "1 bed", "1 sofa bed", "private bathroom"],
      me: ["4 gosta", "1 krevet", "1 sofa na razvlačenje", "sopstveno kupatilo"],
    },
    shortDescription: {
      en: "Perfect for all nature lovers, this spacious, luxuriously equipped glamping tent is an ideal choice for the family.",
      me: "Savršen za sve zaljubljenike u prirodu, ovaj prostrani, luksuzno opremljen glamping šator idealan je izbor za porodicu.",
    },
    description: {
      en: "<p>Perfect for all nature lovers, this spacious, luxuriously equipped glamping tent is an ideal choice for the family. In front of the tent there is a wooden platform with garden furniture, where you can relax, read a book or enjoy the sunset.</p>",
      me: "<p>Savršen za sve zaljubljenike u prirodu, ovaj prostrani, luksuzno opremljen glamping šator idealan je izbor za porodicu. Ispred šatora se nalazi drvena platforma sa baštenskim namještajem, gdje se možete opustiti, čitati knjigu ili uživati u zalasku sunca.</p>",
    },
    maxGuests: 4,
    amenities: [
      "electricity",
      "water",
      "shower",
      "toilet",
      "bedding",
      "ac",
      "wifi",
      "refrigerator",
      "hair-dryer",
      "outdoor-furniture",
      "trash",
      "parking",
    ],
    gallery: [i.largeTent1, i.largeTent2, i.largeTent3, i.largeTent4],
    pricing: {
      base: 115,
      seasons: [{ from: "05-01", to: "05-31", price: 140 }, summer(150)],
      minNights: 1,
      per: "unit",
    },
    links: { airbnb: "https://www.airbnb.com/rooms/1186002931723043554", booking: tentsBooking },
    reviewsWidget: "a3916b0d-af36-43a5-86bb-42fb2639daf3",
  },
  {
    id: "medium-tent",
    category: "tents",
    slug: { en: "medium-tent", me: "srednji-sator" },
    title: { en: "Medium tent", me: "Srednji šator" },
    facts: {
      en: ["2 guests", "1 bed", "private bathroom"],
      me: ["2 gosta", "1 krevet", "sopstveno kupatilo"],
    },
    shortDescription: {
      en: "An idyllic hideaway that allows complete comfort and privacy in the heart of wild nature.",
      me: "Idilično skrovište koje omogućava potpunu udobnost i privatnost u srcu divlje prirode.",
    },
    description: {
      en: "<p>An idyllic hideaway that allows complete comfort and privacy in the heart of wild nature. Indulge in carefree days of lounging under the clear sky with a view of the lush beauty of nature – always accompanied by a gentle breeze and the chirping of birds.</p><p>In front of the tent there is a wooden platform with garden furniture, where you can relax, read a book or enjoy the sunset.</p>",
      me: "<p>Idilično skrovište koje omogućava potpunu udobnost i privatnost u srcu divlje prirode. Prepusti se bezbrižnim danima izležavanja pod vedrim nebom sa pogledom na bujnu ljepotu prirode – uvijek uz blagi povjetarac i cvrkut ptica.</p><p>Ispred šatora se nalazi drvena platforma sa baštenskim namještajem, gdje se možete opustiti, čitati knjigu ili uživati u zalasku sunca.</p>",
    },
    maxGuests: 2,
    amenities: [
      "electricity",
      "water",
      "shower",
      "toilet",
      "bedding",
      "ac",
      "wifi",
      "refrigerator",
      "hair-dryer",
      "outdoor-furniture",
      "first-aid",
      "trash",
      "parking",
    ],
    gallery: [i.mediumTent1, i.mediumTent5, i.mediumTent2, i.mediumTent3, i.mediumTent4, i.mediumTent6, i.mediumTent7],
    pricing: { base: 100, seasons: [{ from: "05-01", to: "09-30", price: 110 }], minNights: 1, per: "unit" },
    links: { airbnb: "https://www.airbnb.com/rooms/938981348180067636", booking: tentsBooking },
    reviewsWidget: "a3916b0d-af36-43a5-86bb-42fb2639daf3",
  },
  {
    id: "small-tent",
    category: "tents",
    slug: { en: "small-tent", me: "mali-sator" },
    title: { en: "Small tent", me: "Mali šator" },
    facts: {
      en: ["2 guests", "1 bed", "shared bathroom"],
      me: ["2 gosta", "1 krevet", "zajedničko kupatilo"],
    },
    shortDescription: {
      en: "Suitable for two people, this tent offers a unique retreat for those who are looking for a truly unforgettable experience.",
      me: "Pogodan za dvije osobe, ovaj šator nudi jedinstveno utočište za one koji traže istinski nezaboravno iskustvo.",
    },
    description: {
      en: "<p>Suitable for two people, this tent offers a unique retreat for those who are looking for a truly unforgettable experience. In front of the tent there is a wooden platform with garden furniture, where you can relax, read a book or enjoy the sunset.</p>",
      me: "<p>Pogodan za dvije osobe, ovaj šator nudi jedinstveno utočište za one koji traže istinski nezaboravno iskustvo. Ispred šatora se nalazi drvena platforma sa baštenskim namještajem, gdje se možete opustiti, čitati knjigu ili uživati u zalasku sunca.</p>",
    },
    maxGuests: 2,
    amenities: ["electricity", "water", "shower", "toilet", "bedding", "portable-fan", "first-aid", "trash", "parking"],
    gallery: [i.smallTent1, i.smallTent2],
    pricing: { base: 70, seasons: [summer(80)], minNights: 1, per: "unit" },
    links: { airbnb: "https://www.airbnb.com/rooms/1203344797878364475", booking: tentsBooking },
    reviewsWidget: "a3916b0d-af36-43a5-86bb-42fb2639daf3",
  },
  {
    id: "mirror-cabin",
    category: "mirror-cabin",
    slug: { en: "mirror-cabin", me: "mirror-cabin" },
    title: { en: "Mirror Cabin", me: "Mirror Cabin" },
    facts: {
      en: ["2 guests", "private bathroom", "kitchenette", "air conditioning"],
      me: ["2 gosta", "sopstveno kupatilo", "čajna kuhinja", "klima uređaj"],
    },
    shortDescription: {
      en: "Step into serenity at our eco resort's stunning mirror house, where nature and luxury reflect in perfect harmony.",
      me: "Zakorači u spokoj naše zadivljujuće kuće od ogledala, gdje se priroda i luksuz ogledaju u savršenoj harmoniji.",
    },
    description: {
      en: "<p>Step into serenity at our eco resort's stunning mirror house, where nature and luxury reflect in perfect harmony. Surrounded by lush greenery and designed with sustainability in mind, this unique retreat offers a tranquil escape that blends seamlessly with the environment.</p><p>The cabin's reflective glass windows provide privacy while offering expansive views of the natural surroundings. Inside, you'll find a small kitchen and bathroom, allowing you to enjoy the sensation of being immersed in nature with all the comforts of home.</p>",
      me: "<p>Zakorači u spokoj naše zadivljujuće kuće od ogledala, gdje se priroda i luksuz ogledaju u savršenoj harmoniji. Okružena bujnim zelenilom i osmišljena s mišlju o održivosti, ova jedinstvena kuća nudi mirno utočište koje se neprimjetno stapa sa okruženjem.</p><p>Reflektujuća staklena okna čuvaju tvoju privatnost, a istovremeno pružaju širok pogled na prirodu. Unutra se nalaze čajna kuhinja i kupatilo, pa možeš uživati u osjećaju potpune uronjenosti u prirodu, uz sav komfor doma.</p>",
    },
    maxGuests: 2,
    amenities: [
      "ac",
      "underfloor-heating",
      "kitchenette",
      "refrigerator",
      "wifi",
      "bedding",
      "shower",
      "toilet",
      "water",
      "electricity",
      "outdoor-furniture",
      "parking",
    ],
    gallery: [i.mirror1, i.mirror2, i.mirror3, i.mirror4, i.mirror5, i.mirror6, i.mirror7, i.mirror8],
    pricing: { base: 120, seasons: [summer(150)], minNights: 1, per: "unit" },
    links: {
      airbnb: "https://www.airbnb.com/rooms/1227950257973576306",
      booking: "https://www.booking.com/hotel/me/oblun-eco-resort-mirror-cabin.html",
    },
  },
  {
    id: "autocamp",
    category: "autocamp",
    slug: { en: "auto-camp", me: "autokamp" },
    title: { en: "AutoCamp", me: "Auto-kamp" },
    facts: {
      en: ["16 pitches", "electric hook-up", "shared bathroom"],
      me: ["16 mjesta", "priključak za struju", "zajedničko kupatilo"],
    },
    shortDescription: {
      en: "Park your caravan or motorhome in our spacious, secure area with electricity, water and modern facilities.",
      me: "Parkiraj kamp prikolicu ili kamper u našem prostranom i bezbjednom prostoru sa strujom, vodom i savremenim sadržajima.",
    },
    description: {
      en: "<p>What experience could be more magical than sleeping outdoors under the stars? Wake up to the peaceful sounds of nature surrounding our AutoCamp. Whether you prefer the comforts of home or the flexibility of traveling in your own vehicle, our AutoCamp is designed for both.</p><p>Park your caravan or motorhome in our spacious, secure area with electric hook-ups, water and waste disposal, and enjoy the convenience of modern facilities while taking in the natural beauty of Montenegro.</p>",
      me: "<p>Koje iskustvo može biti magičnije od spavanja na otvorenom pod zvijezdama? Probudi se uz mirne zvuke prirode koja okružuje naš auto-kamp. Bilo da više voliš udobnost doma ili slobodu putovanja sopstvenim vozilom, auto-kamp je osmišljen za oboje.</p><p>Parkiraj kamp prikolicu ili kamper u našem prostranom i bezbjednom prostoru sa priključcima za struju, vodom i ispustom otpadnih voda, i uživaj u savremenim sadržajima okružen ljepotom crnogorske prirode.</p>",
    },
    amenities: [
      "electricity",
      "water",
      "shower",
      "toilet",
      "wastewater",
      "black-water",
      "ev-charging",
      "laundry",
      "trash",
      "parking",
    ],
    gallery: [i.autocamp1, i.autocamp2, i.autocamp3, i.autocamp4, i.garden1, i.garden2],
    pricing: { base: 30, seasons: [], minNights: 1, per: "pitch" },
    links: { park4night: "https://park4night.com/en/place/422125" },
  },
  {
    id: "tent-pitch",
    category: "campsite",
    slug: { en: "tent-pitch", me: "mjesto-za-sator" },
    title: { en: "Tent pitch", me: "Mjesto za šator" },
    facts: {
      en: ["grass pitch", "electricity", "at the main resort site"],
      me: ["travnato mjesto", "struja", "u glavnom dijelu resorta"],
    },
    shortDescription: {
      en: "Grass pitches with electricity at the main resort site, a few steps from the amenities and the restaurant.",
      me: "Travnata mjesta sa strujom u glavnom dijelu resorta, na par koraka od sadržaja i restorana.",
    },
    description: {
      en: `<p>${campsiteText.en}</p><p>Our grass tent pitches with electricity are located at the main resort site.</p>`,
      me: `<p>${campsiteText.me}</p><p>Travnata mjesta za šator sa strujom nalaze se u glavnom dijelu resorta.</p>`,
    },
    amenities: ["electricity", "wifi", "toilet", "shower", "parking"],
    gallery: [i.campsite1, i.campsite2, i.campsite3, i.campsite4, i.campsite5],
    pricing: { base: 25, seasons: [], minNights: 1, per: "pitch" },
    links: {},
    reviewsWidget: "a6de7d8a-759f-43f7-ac19-fcb26e15ef6f",
  },
  {
    id: "countryside-pitch",
    category: "campsite",
    slug: { en: "countryside-pitch", me: "mjesto-u-prirodi" },
    title: { en: "Countryside pitch", me: "Mjesto u prirodi" },
    facts: {
      en: ["grass pitch", "no electricity", "500 m from the resort"],
      me: ["travnato mjesto", "bez struje", "500 m od resorta"],
    },
    shortDescription: {
      en: "Quiet grass pitches without electricity, just 500 metres from the main resort site, amenities and restaurant.",
      me: "Mirna travnata mjesta bez struje, samo 500 metara od glavnog dijela resorta, sadržaja i restorana.",
    },
    description: {
      en: `<p>${campsiteText.en}</p><p>Our countryside grass pitches have no electricity and are located just 500 metres from the main resort site, amenities and restaurant.</p>`,
      me: `<p>${campsiteText.me}</p><p>Travnata mjesta u prirodi nemaju struju i nalaze se samo 500 metara od glavnog dijela resorta, sadržaja i restorana.</p>`,
    },
    amenities: ["parking"],
    gallery: [i.campsite3, i.campsite2, i.garden1],
    pricing: { base: 10, seasons: [], minNights: 1, per: "pitch" },
    links: {},
    reviewsWidget: "a6de7d8a-759f-43f7-ac19-fcb26e15ef6f",
  },
];

export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;
export const unitsInCategory = (id: CategoryId) => units.filter((u) => u.category === id);
