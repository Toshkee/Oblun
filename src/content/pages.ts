import { images as i } from "./images";
import type { Localized, Page, PageKey } from "./types";

const t = (en: string, me: string): Localized => ({ en, me });
const bookNow = t("Book now", "Rezerviši");
const learnMore = t("Learn more", "Saznaj više");

export const pages: Page[] = [
  {
    key: "home",
    slug: t("", ""),
    navTitle: t("Homepage", "Naslovna"),
    seo: {
      title: t(
        "Oblun Eco Resort – Glamping, Villa & Camping near Lake Skadar, Montenegro",
        "Oblun Eco Resort – glamping, vila i kamp kod Skadarskog jezera",
      ),
      description: t(
        "Eco resort in the heart of Montenegro: luxury glamping tents, a restored 120-year-old stone villa, a mirror cabin, autocamp and campsite near Lake Skadar.",
        "Eco resort u srcu Crne Gore: luksuzni glamping šatori, obnovljena kamena vila stara 120 godina, mirror cabin, auto-kamp i kamp kod Skadarskog jezera.",
      ),
      image: i.homeHero,
    },
    modules: [
      {
        type: "hero",
        item: {
          title: t("Awaken nature within yourself", "Probudi prirodu u sebi"),
          html: t(
            "<p>Welcome to Eco Resort Oblun, located in the heart of Montenegro. Our resort offers a unique blend of luxury and nature, providing an unforgettable experience for all our guests. Whether you seek a tranquil retreat, an adventurous glamping experience, or a family-friendly getaway, you'll find it here. Enjoy a peaceful nature escape or go completely off-grid while still experiencing the luxury and comfort of glamping, all in the stunning Montenegrin landscape.</p>",
            "<p>Dobro došli u Oblun Eco Resort, koji se nalazi u srcu Crne Gore. Naš resort nudi jedinstven spoj luksuza i prirode, pružajući nezaboravno iskustvo svim našim gostima. Bilo da tražite mirno utočište, avanturističko glamping iskustvo ili porodični odmor, naći ćete ga ovdje. Uživajte u mirnom bjekstvu u prirodu ili budite potpuno van mreže, a da i dalje uživate u luksuzu i udobnosti glampinga, sve u zadivljujućem crnogorskom pejzažu.</p>",
          ),
          image: i.homeHero,
        },
      },
      {
        type: "split",
        imageSide: "left",
        item: {
          title: t("Immerse yourself in nature", "Osjeti topli zagrljaj prirode"),
          html: t(
            "<p>Experience comfort in harmony with Montenegro's natural beauty. Come and rejuvenate at our resort, where you will find a blend of comfort, adventure, and sustainability.</p><p>Oblun Eco Resort offers a multitude of accommodation options. Choose between the elegance of our beautifully restored historic villa, cosy glamping tents, the mirror cabin, our autocamp, or pitch your own tent for an immersive nature retreat.</p>",
            "<p>Doživi istinsku harmoniju koja slavi osjećaj jedinstva i pripadnosti – na mjestu koje ti pripada. Oblun Resort nudi različite smještajne jedinice, privatnost i beskompromisnu udobnost svima koji tragaju za avanturom koja pruža doživljaj stapanja sa ljepotom prirode.</p><p>Biraj između elegancije naše obnovljene kamene vile, udobnih glamping šatora, mirror cabin kuće, auto-kampa ili podigni svoj šator i prepusti se prirodi.</p>",
          ),
          image: i.villaEntrance,
          cta: { to: { page: "accommodation" }, label: bookNow },
        },
      },
      { type: "accommodation-overview" },
      {
        type: "cards",
        items: [
          {
            title: t("A taste of authentic tradition", "Ukus autentične tradicije"),
            html: t(
              "<p>Experience authentic cuisine and farm-to-table dining at our eco resort's restaurant, Odiva. We prioritise fresh, locally sourced ingredients, with many grown on-site in the resort's own garden for ultimate freshness. Our menu features family-recipe dishes prepared with our homegrown fruits and vegetables as the main ingredients, perfectly complemented by our delicious homemade wine, Odiva.</p>",
              "<p>Razmazi svoja čula uživajući u tradicionalnim jelima pripremljenim od pažljivo biranih darova blistavog Mediterana i blaga sjevernih planina Crne Gore. Podijeli užitak prepoznatljive crnogorske gastronomije, čiji su bogati lokalni ukusi, sa akcentom na organsku proizvodnju, utkani u svako jelo – uz naše domaće vino Odiva.</p>",
            ),
            image: i.breakfast,
            cta: { to: { page: "restaurant" }, label: t("Restaurant Odiva", "Restoran Odiva") },
          },
          {
            title: t("An experience that belongs to you", "Iskustvo koje ti pripada"),
            html: t(
              "<p>Embark on an exploration of the resort's stunning surroundings with independent or organised hiking tours and trips. From traversing Montenegro trails and exploring Lovćen National Park to kayaking adventures, there's an abundance of outdoor activities to engage in. Experience the unique perspective of Montenegro's natural wonders and wild beauty through Lake Skadar boat tours, which showcase charming spots like Rijeka Crnojevića and the serene Karuč village. Committed to sustainability, we also welcome you to visit our resort's garden and pick your own fruit or vegetables, adding to your eco-friendly experience.</p>",
              "<p>Prepusti se obilju prirode i doživi autentičan spoj avanture i odmora, na mjestu koje pruža nezaboravna iskustva. Istraži okolinu samostalno ili uz organizovane ture: od staza Nacionalnog parka Lovćen i kajaka, do vožnje čamcem po Skadarskom jezeru kroz Rijeku Crnojevića i mirno selo Karuč. Posjeti i našu baštu i uberi svoje voće i povrće.</p>",
            ),
            image: i.boat,
            cta: { to: { page: "experiences" }, label: t("Experiences", "Iskustva") },
          },
        ],
      },
      { type: "video", vimeoId: t("692311353", "693171993"), poster: i.homeHero },
      { type: "pattern" },
      { type: "contact-form" },
    ],
  },

  {
    key: "accommodation",
    slug: t("accommodation", "smjestaj"),
    navTitle: t("Accommodation", "Smještaj"),
    seo: {
      title: t("Accommodation – Glamping Tents, Villa, Mirror Cabin & Camping", "Smještaj – glamping šatori, vila, mirror cabin i kamp"),
      description: t(
        "Oblun Resort offers various accommodation units, privacy and uncompromising comfort to all those looking for adventure in wild nature.",
        "Oblun Resort nudi različite smještajne jedinice, privatnost i beskompromisnu udobnost svima koji tragaju za avanturom u divljoj prirodi.",
      ),
      image: i.mirror3,
    },
    modules: [
      {
        type: "hero",
        item: {
          title: t("Accommodation", "Smještaj"),
          html: t(
            "<p>Discover the perfect blend of nature and comfort at Oblun Eco Resort in Montenegro. Enjoy a rejuvenating escape set against stunning landscapes with a variety of accommodations. Choose from a restored historic villa, a mirror cabin, glamping tents, or spaces for caravans and personal tents. Each option guarantees a relaxing and immersive experience in nature for all.</p>",
            "<p>Otkrij savršen spoj prirode i udobnosti u Oblun Eco Resortu. Uživaj u odmoru okružen zadivljujućim pejzažima i biraj između obnovljene istorijske vile, mirror cabin kuće, glamping šatora ili mjesta za kampere i šatore. Svaka opcija garantuje opuštajući doživljaj potpune uronjenosti u prirodu.</p>",
          ),
          image: i.mirror3,
        },
      },
      { type: "availability-search" },
      {
        type: "split",
        imageSide: "left",
        item: {
          title: t("Luxury glamping tents", "Luksuzni glamping šatori"),
          html: t(
            "<p>Experience a unique getaway in our luxurious glamping tents, perfect for those looking to connect with nature without sacrificing comfort. Tucked away in a scenic natural setting, each tent is thoughtfully designed with a cozy bed and stylish decor. Whether you're traveling as a couple, with family, or solo, our glamping accommodations provide the ideal balance of adventure and relaxation.</p>",
            "<p>Prepusti se veličanstvenosti divlje prirode i doživi potpuno novo iskustvo odmora u našim luksuzno opremljenim glamping šatorima, smještenim među bogatim krošnjama drveća. Bilo da putuješ u paru, sa porodicom ili sam, naši šatori nude idealan balans avanture i odmora. Tvoj idilični raj te čeka!</p>",
          ),
          image: i.mediumTent5,
          cta: { to: { category: "tents" }, label: bookNow },
        },
      },
      {
        type: "split",
        imageSide: "right",
        item: {
          title: t("Villa Oblun", "Vila Oblun"),
          html: t(
            "<p>Step back in time and enjoy a stay in our beautifully restored 120-year-old stone villa, Villa Oblun. This retreat offers a unique blend of historic charm and modern amenities, nestled in Montenegro's breathtaking landscapes overlooking Lake Skadar. Perfect for families and groups seeking seclusion in nature, it combines traditional Montenegrin architecture with all the comforts for a memorable stay immersed in the region's rich cultural heritage.</p>",
            "<p>Dopusti da te ponese šarm vile Oblun, čiji kameni zidovi kriju vrijednosti vanvremenske tradicije. Smještena među šarmantnim brdima sa pogledom na Skadarsko jezero, vila Oblun nudi osamu u srcu netaknute prirode, dok se meki tonovi lokalnog kamena harmonično prožimaju sa okruženjem. Idealna je za porodice i grupe.</p>",
          ),
          image: i.villa1,
          cta: { to: { category: "villa" }, label: bookNow },
        },
      },
      {
        type: "split",
        imageSide: "left",
        item: {
          title: t("Mirror Cabin", "Mirror Cabin"),
          html: t(
            "<p>Experience a modern retreat in our mirror cabin, where contemporary design harmonises with the outdoors. The cabin's reflective glass windows blend seamlessly with the surrounding landscape, providing privacy while offering expansive views of the natural surroundings. Inside, you'll find a small kitchen and bathroom, allowing you to enjoy the sensation of being immersed in nature with all the comforts of home.</p>",
            "<p>Doživi moderno utočište u našoj kući od ogledala, gdje se savremeni dizajn spaja sa prirodom. Reflektujuća staklena okna stapaju se sa pejzažem, čuvajući tvoju privatnost, a pružaju širok pogled na okolinu. Unutra se nalaze čajna kuhinja i kupatilo, pa možeš uživati u osjećaju potpune uronjenosti u prirodu, uz sav komfor doma.</p>",
          ),
          image: i.mirror2,
          cta: { to: { category: "mirror-cabin" }, label: bookNow },
        },
      },
      {
        type: "split",
        imageSide: "right",
        item: {
          title: t("AutoCamp", "Auto-kamp"),
          html: t(
            "<p>Experience the joy of sleeping under the stars at our resort. Wake up to the peaceful sounds of nature surrounding our AutoCamp. Whether you prefer the comforts of home or the flexibility of traveling in your own vehicle, our AutoCamp is designed for both. Park your caravan or motorhome in our spacious, secure area with amenities like electricity hookups, and enjoy the convenience of modern facilities while taking in the natural beauty of Montenegro.</p>",
            "<p>Koje iskustvo može biti magičnije od spavanja na otvorenom pod zvijezdama? Iskusi buđenje uz osjećaj mira, mirise i zvukove zadivljujuće prirode. Parkiraj kamp prikolicu ili kamper u našem prostranom i bezbjednom prostoru sa priključcima za struju i savremenim sadržajima, okružen ljepotom crnogorske prirode.</p>",
          ),
          image: i.autocamp1,
          cta: { to: { category: "autocamp" }, label: bookNow },
        },
      },
      {
        type: "split",
        imageSide: "left",
        item: {
          title: t("Campsite", "Kamp"),
          html: t(
            "<p>Escape the urban hustle and reconnect with nature under the stars at our eco resort. Discover untouched landscapes where you can pitch your tent and unwind from the busy world. Ideal for nature lovers and traditional campers, our serene campsite offers a picturesque setting for family vacations or solo adventures. Explore Montenegro's stunning landscapes, enjoy hiking, or embark on Lake Skadar tours from our perfect base in nature.</p>",
            "<p>Pobjegni od gradske vreve i ponovo se poveži sa prirodom pod zvijezdama. Otkrij netaknute pejzaže u kojima možeš podići svoj šator i odmoriti se od užurbanog svijeta. Idealan za ljubitelje prirode i tradicionalnog kampovanja, naš mirni kamp savršena je polazna tačka za planinarenje i ture po Skadarskom jezeru.</p>",
          ),
          image: i.campsite1,
          cta: { to: { category: "campsite" }, label: bookNow },
        },
      },
      { type: "pattern" },
    ],
  },

  {
    key: "restaurant",
    slug: t("restaurant", "restoran"),
    navTitle: t("Restaurant", "Restoran"),
    seo: {
      title: t("Restaurant Odiva – Farm-to-table Montenegrin cuisine", "Restoran Odiva – domaća crnogorska kuhinja"),
      description: t(
        "Traditional dishes prepared from carefully selected gifts of the sparkling Mediterranean and the treasures of the northern mountains of Montenegro.",
        "Tradicionalna jela pripremljena od pažljivo biranih darova blistavog Mediterana i blaga sjevernih planina Crne Gore.",
      ),
      image: i.breakfast,
    },
    modules: [
      {
        type: "hero",
        item: {
          title: t("The taste of tradition", "Ukus autentične tradicije"),
          html: t(
            "<p>Pamper your senses by enjoying traditional dishes prepared from carefully selected gifts of the glittering Mediterranean and the treasures of the northern mountains of Montenegro.</p>",
            "<p>Razmazi svoja čula uživajući u tradicionalnim jelima pripremljenim od pažljivo biranih darova blistavog Mediterana i blaga sjevernih planina Crne Gore.</p>",
          ),
          image: i.breakfast,
        },
      },
      {
        type: "split",
        imageSide: "right",
        item: {
          title: t("Homegrown ingredients", "Namirnice iz naše bašte"),
          html: t(
            "<p>Experience the true taste of nature with homegrown ingredients from our organic garden. Every meal is crafted with fresh, sustainably grown produce, bringing wholesome goodness from our garden directly to your table.</p>",
            "<p>Osjeti pravi ukus prirode uz namirnice iz naše organske bašte. Svaki obrok pripremamo od svježih plodova uzgojenih na održiv način, koji iz bašte stižu pravo na tvoj sto.</p>",
          ),
          image: i.garden2,
        },
      },
      {
        type: "gallery-split",
        item: {
          title: t("Rich local flavors", "Bogati lokalni ukusi"),
          html: t(
            "<p>Share the pleasure of recognizable modern Montenegrin gastronomy, whose rich local flavors, with an emphasis on organic production, are woven into every dish. We combine seasonal products from our organic garden with the best local ingredients, ensuring freshness and a unique taste.</p>",
            "<p>Podijeli užitak prepoznatljive moderne crnogorske gastronomije, čiji su bogati lokalni ukusi, sa akcentom na organsku proizvodnju, utkani u svako jelo. Sezonske proizvode iz naše organske bašte kombinujemo sa najboljim lokalnim sastojcima, osiguravajući vrhunsku svježinu i jedinstven ukus.</p>",
          ),
          image: i.villa4,
          image2: i.garden1,
        },
      },
      {
        type: "split",
        imageSide: "right",
        item: {
          title: t("Odiva products", "Odiva proizvodi"),
          html: t(
            "<p>Get to know Montenegro through our handmade products, in which production we poured a part of ourselves. We turn the rich harvest from our vineyard with love and care into extraordinary wine and brandy, while organic vegetables, fruits and herbs from our garden are the main ingredients of other products, prepared with love and according to a traditional family recipe.</p>",
            "<p>Upoznaj Crnu Goru kroz naše domaće proizvode, u čiju proizvodnju smo pretočili dio sebe. Bogatu berbu iz našeg vinograda sa ljubavlju i pažnjom pretvaramo u izvanredno vino i rakiju, dok su organsko povrće, voće i začinsko bilje iz naše bašte osnovni sastojak ostalih proizvoda, pripremljenih s ljubavlju i po tradicionalnoj porodičnoj recepturi.</p>",
          ),
          image: i.picnic,
          cta: { to: { href: "https://www.instagram.com/odivarestaurant/" }, label: t("@odivarestaurant on Instagram", "@odivarestaurant na Instagramu") },
        },
      },
      { type: "pattern" },
    ],
  },

  {
    key: "experiences",
    slug: t("experiences", "iskustva"),
    navTitle: t("Experiences", "Iskustva"),
    seo: {
      title: t("Experiences – Lake Skadar, Lovćen, Cetinje & more", "Iskustva – Skadarsko jezero, Lovćen, Cetinje i više"),
      description: t(
        "Kayaking and boat tours on Lake Skadar, Rijeka Crnojevića, Cetinje, Lovćen and its cable car, hiking, picnics and our organic garden.",
        "Kajak i vožnja čamcem po Skadarskom jezeru, Rijeka Crnojevića, Cetinje, Lovćen i žičara, planinarenje, piknik i naša organska bašta.",
      ),
      image: i.experiencesHero,
    },
    modules: [
      {
        type: "hero",
        item: {
          title: t("Experiences", "Iskustva"),
          html: t(
            "<p>Embark on a unique journey of discovery and experience the dynamic environment, vivid history and culture of Montenegro.</p>",
            "<p>Kreni na jedinstveno putovanje otkrića i iskusi dinamično okruženje, živopisnu istoriju i kulturu Crne Gore.</p>",
          ),
          image: i.experiencesHero,
        },
      },
      {
        type: "split",
        imageSide: "right",
        item: {
          title: t("Lake Skadar kayaking tour", "Kajakom po Skadarskom jezeru"),
          html: t(
            "<p>Embarking on a kayaking tour of NP Lake Skadar promises an unforgettable adventure, immersing you in the breathtaking natural beauty and rich biodiversity of one of Europe's largest bird reserves, which is home to around 270 different species of birds.</p><p>Discover the largest lake in Southern Europe, and take a scenic kayak ride, while soaking up the marvelous natural beauty. Surrender to the serenity of the majestic hills, the gentle rustle of the breeze among the reeds and the view of the monasteries and historic fortresses along the lake shore.</p>",
            "<p>Kajak tura po Nacionalnom parku Skadarsko jezero obećava nezaboravnu avanturu u zadivljujućoj prirodi i bogatom biodiverzitetu jednog od najvećih staništa ptica u Evropi, doma za oko 270 različitih vrsta ptica.</p><p>Otkrij najveće jezero na Balkanu i prepusti se spokoju veličanstvenih brda, nježnom šumu povjetarca među trskama i pogledu na manastire i istorijske tvrđave duž obale jezera.</p>",
          ),
          image: i.lakeSkadar,
          cta: { to: { href: "/files/oblun-experience-kayaking.pdf" }, label: learnMore },
        },
      },
      {
        type: "split",
        imageSide: "left",
        item: {
          title: t("Rijeka Crnojevića and Lake Skadar boat tour", "Rijeka Crnojevića i vožnja čamcem po Skadarskom jezeru"),
          html: t(
            "<p>The fairytale landscapes of Rijeka Crnojevića, a small village of long and rich history established in the Middle Ages as the place of the first printing house of the South Slavs, invite you to an endless adventure. A boat tour of Rijeka Crnojevića and Lake Skadar offers a mesmerizing journey through some of Montenegro's most picturesque and historically rich landscapes.</p>",
            "<p>Bajkoviti pejzaži Rijeke Crnojevića, mjesta duge i bogate istorije i prve štamparije kod Južnih Slovena, pozivaju te u beskrajnu avanturu. Vožnja čamcem kroz Rijeku Crnojevića i po Skadarskom jezeru otkriva zadivljujuće prizore, šarmantna sela sa lokalnim vinarijama i ostatke skrivenih istorijskih tvrđava.</p>",
          ),
          image: i.rijeka,
          cta: { to: { href: "/files/oblun-experience-boating.pdf" }, label: learnMore },
        },
      },
      {
        type: "cards",
        items: [
          {
            title: t("Cetinje", "Cetinje"),
            html: t(
              "<p>Wander into the past by exploring numerous museums and walking through the charming streets of the city of Cetinje, the historical and cultural center of Montenegro. Enjoy the striking architecture and visit the castle of King Nikola, the Cetinje Monastery and the Lipska Cave.</p>",
              "<p>Odlutaj u prošlost dok istražuješ brojne muzeje i šetaš šarmantnim ulicama Cetinja, istorijskog i kulturnog centra Crne Gore. Uživaj u upečatljivoj arhitekturi i posjeti dvorac kralja Nikole, Cetinjski manastir i Lipsku pećinu.</p>",
            ),
            image: i.cetinje,
          },
          {
            title: t("Lovćen and cable car", "Lovćen i vožnja žičarom"),
            html: t(
              "<p>Explore the wonders of Lovćen National Park, a treasure trove of Montenegrin cultural and historical heritage. Visit the impressive Njegoš mausoleum, which is reached by 461 steps, from the top of which there is an unreal view of the dramatic mountain ranges and the Bay of Kotor. After that, go on the cable car ride and enjoy the panoramic view of the magnificent Bay of Kotor from 1,350 m above sea level.</p>",
              "<p>Istraži čuda Nacionalnog parka Lovćen, riznice crnogorskog kulturno-istorijskog nasljeđa. Posjeti impresivni Njegošev mauzolej do kojeg vodi 461 stepenik, sa čijeg vrha se pruža nestvaran pogled na dramatične planinske lance i Boku. Nakon toga kreni na nezaobilaznu vožnju žičarom i uživaj u panoramskom pogledu na Bokokotorski zaliv sa 1.350 m nadmorske visine.</p>",
            ),
            image: i.lovcen,
          },
        ],
      },
      {
        type: "cards",
        items: [
          {
            title: t("Picnic", "Piknik"),
            html: t(
              "<p>Celebrate the beauty of life with an unforgettable picnic in lush nature. Choose a corner for yourself and relax in stunning surroundings, bathed by the warm sun.</p>",
              "<p>Proslavi ljepotu života uz nezaboravan piknik u raskošnoj prirodi. Odaberi kutak za sebe i opusti se obavijen zadivljujućom okolinom i toplim suncem.</p>",
            ),
            image: i.picnic,
          },
          {
            title: t("Hiking", "Planinarenje"),
            html: t(
              "<p>Explore the stunning surroundings in the endless beauty of untamed nature and enchanting corners at every turn.</p>",
              "<p>Kreni i istraži zadivljujuću okolinu u beskrajnoj ljepoti neukroćene prirode i očaravajućih kutaka na svakom koraku.</p>",
            ),
            image: i.hiking,
          },
        ],
      },
      {
        type: "split",
        imageSide: "left",
        item: {
          title: t("Organic garden", "Organska bašta"),
          html: t(
            "<p>Surrender to the natural rhythm of the seasons in our rich organic garden, get to know different herbs and participate in the careful selection and harvesting of the most delicious fresh fruits and vegetables from our organic garden.</p>",
            "<p>Prepusti se prirodnom ritmu godišnjih doba u našoj bogatoj organskoj bašti, upoznaj se sa različitim začinskim biljem i učestvuj u pažljivom odabiru i berbi najukusnijih svježih plodova.</p>",
          ),
          image: i.garden1,
        },
      },
      { type: "pattern" },
    ],
  },

  {
    key: "events",
    slug: t("events", "dogadaji"),
    navTitle: t("Events", "Događaji"),
    seo: {
      title: t("Events – Meetings, team building & group dining", "Događaji – sastanci, team building i grupne proslave"),
      description: t(
        "Host meetings, team building, celebrations and group dinners in the authentic setting of Oblun Eco Resort, Restaurant Odiva and the stone Villa Oblun.",
        "Organizujte sastanke, team building, proslave i grupne večere u autentičnom ambijentu Oblun Eco Resorta, restorana Odiva i kamene vile Oblun.",
      ),
      image: i.villa3,
    },
    modules: [
      {
        type: "hero",
        item: {
          title: t("Celebrate in style", "Proslavi sa stilom"),
          html: t(
            "<p>With its unique and secluded location in the heart of nature, the authentic ambience of Oblun Eco Resort is the perfect setting to host your events. From toasting new beginnings to hosting meetings with business partners or enjoying intimate gatherings with loved ones, we would be delighted to welcome you in an environment where tranquility, comfort, and natural beauty come together to create unforgettable moments.</p>",
            "<p>Sa svojom jedinstvenom lokacijom u srcu prirode, autentična atmosfera Oblun Eco Resorta predstavlja savršeno okruženje za organizaciju vaših događaja. Bilo da nazdravljate novim počecima, održavate sastanke sa poslovnim partnerima ili uživate u intimnim okupljanjima sa voljenima, biće nam zadovoljstvo da vas ugostimo u ambijentu gdje se spokoj, udobnost i prirodna ljepota spajaju u nezaboravne trenutke.</p>",
          ),
          image: i.villa3,
        },
      },
      {
        type: "quote",
        item: {
          title: t("Meeting room", "Sala za sastanke"),
          html: t(
            "<p>Our dedicated meeting room located within Restaurant Odiva offers a tranquil yet professional environment for team meetings, strategic sessions, workshops, and private presentations. It is the ideal space for focused, high-quality collaboration as it combines modern amenities with natural surroundings.</p>",
            "<p>Naša sala za sastanke, smještena unutar restorana Odiva, pruža mirno, a istovremeno profesionalno okruženje za timske sastanke, strateške sesije, radionice i privatne prezentacije. Idealan je prostor za fokusiranu i kvalitetnu saradnju, koji spaja savremene sadržaje sa prirodnim okruženjem.</p>",
          ),
          cta: { to: { page: "contact" }, label: t("Send an enquiry", "Pošalji upit") },
        },
      },
      {
        type: "split",
        imageSide: "left",
        item: {
          title: t("Experiences & activities", "Aktivnosti i iskustva"),
          html: t(
            "<p>At Oblun Eco Resort, we believe that meaningful experiences foster stronger connections. We can provide the perfect space for you to host group activities designed to inspire creativity, encourage collaboration or promote well-being. Whether you're planning team building activities for a company retreat or a relaxing day of art and movement with friends, our flexible outdoor and indoor spaces can accommodate a wide range of events designed and led by you.</p>",
            "<p>U Oblun Eco Resortu vjerujemo da značajna iskustva podstiču jače veze među ljudima. Nudimo savršen prostor za grupne aktivnosti koje inspirišu kreativnost, podstiču saradnju ili doprinose ličnom razvoju. Bilo da planirate team building ili opuštajući dan ispunjen umjetnošću sa prijateljima, naši prilagodljivi spoljašnji i unutrašnji prostori mogu ugostiti širok spektar događaja koje sami osmislite i vodite.</p>",
          ),
          image: i.hiking,
        },
      },
      {
        type: "split",
        imageSide: "right",
        item: {
          title: t("Group dining", "Grupni događaji"),
          html: t(
            "<p>Whether you're planning a heartfelt family celebration or a professional corporate gathering, our versatile spaces can cater to every occasion. In Restaurant Odiva, enjoy a relaxed atmosphere with informal finger food or buffet-style service, or elevate your event with a refined sit-down meal. For those seeking a more private and homely experience, our secluded stone villa provides a warm, inviting setting perfect for memorable moments shared with loved ones or colleagues.</p>",
            "<p>Bilo da planirate emotivno porodično slavlje ili profesionalno korporativno okupljanje, naši svestrani prostori odgovaraju svakoj prilici. U restoranu Odiva uživajte u opuštenoj atmosferi uz finger food ili švedski sto, ili podignite događaj na viši nivo pažljivo pripremljenim obrokom. Za one koji žele privatniji i domaćinski ambijent, naša osamljena kamena vila pruža toplu i prijatnu atmosferu za nezaboravne trenutke sa voljenima ili kolegama.</p>",
          ),
          image: i.villa4,
          cta: { to: { page: "contact" }, label: t("Plan your event", "Isplaniraj događaj") },
        },
      },
      { type: "pattern" },
    ],
  },

  {
    key: "about",
    slug: t("about-us", "o-nama"),
    navTitle: t("About us", "O nama"),
    seo: {
      title: t("About us – Montenegrin tradition in untouched nature", "O nama – crnogorska tradicija u netaknutoj prirodi"),
      description: t(
        "We create a unique experience of the dynamic environment, rich history and culture of Montenegro.",
        "Stvaramo jedinstven doživljaj dinamičnog okruženja, živopisne istorije i kulture Crne Gore.",
      ),
      image: i.lakeSkadar,
    },
    modules: [
      {
        type: "hero",
        item: {
          title: t("About us", "O nama"),
          html: t(
            "<p>Located in the heart of magnificent nature, Oblun Eco Resort brings an authentic combination of adventure and relaxation, referring to the rich Montenegrin tradition, drawing inspiration from untouched nature.</p>",
            "<p>Smješten u srcu veličanstvene prirode, Oblun Eco Resort donosi autentičan spoj odmora i avanture, pozivajući se na bogatu crnogorsku tradiciju i crpeći inspiraciju iz netaknutih prirodnih bogatstava.</p>",
          ),
          image: i.lakeSkadar,
        },
      },
      {
        type: "quote",
        item: {
          title: t("Awaken nature within yourself", "Probudi prirodu u sebi"),
          html: t(
            "<p>The charm of rolling, sun-drenched hills, shady olive groves, and the diversity of the landscape brings an overwhelming sense of the wild at your fingertips. A place where you can take a deep breath and let yourself wake up to the sights, scents and sounds of pristine nature.</p>",
            "<p>Šarm valovitih, suncem okupanih brda, sjenovitih maslinjaka i raznolikost pejzaža donosi neodoljiv osjećaj divljine na dohvat ruke. Mjesto gdje možete duboko udahnuti i prepustiti se buđenju uz prizore, mirise i zvuke netaknute prirode.</p>",
          ),
        },
      },
      {
        type: "split",
        imageSide: "right",
        item: {
          title: t("Montenegrin culture and tradition", "Crnogorska kultura i njegovanje tradicije"),
          html: t(
            "<p>We create a unique experience of the dynamic environment, rich history and culture of our country. In the world of fast trends, we have turned to timeless values with a constant aspiration to create harmony in a contrasting relationship with the needs of the modern guest.</p><p>Montenegrin culture and tradition passed through generations celebrate the sense of unity and belonging. Friendly and generous hospitality contributes to the warm atmosphere that our people selflessly provide. The charm of Montenegro is reflected in its diversity, contrast and enchanting wild nature, which offers its unexplored corners to the bold and curious visitor.</p>",
            "<p>Stvaramo jedinstven doživljaj dinamičnog okruženja, živopisne istorije i kulture naše zemlje. U svijetu brzih trendova, okrenuli smo se vanvremenskim vrijednostima sa konstantnom težnjom stvaranja harmonije u kontrastnom odnosu sa potrebama savremenog gosta.</p><p>Crnogorska kultura i tradicija koja se prenosi kroz generacije slavi osjećaj jedinstva i pripadnosti. Toplo i velikodušno gostoprimstvo doprinosi srdačnoj atmosferi koju naš narod nesebično pruža. Šarm Crne Gore ogleda se u raznolikosti, kontrastu i raskošnoj divljoj prirodi, koja nudi svoje neistražene kutke smjelom i radoznalom posjetiocu.</p>",
          ),
          image: i.villa5,
        },
      },
      { type: "photo", image: i.lovcen },
      {
        type: "split",
        imageSide: "left",
        item: {
          title: t("Wild spirit of adventure", "Divlji duh avanture"),
          html: t(
            "<p>This is just the beginning of an exciting story and an introduction to what awaits guests in the future: seven imposing locations that offer a wild spirit of adventure at every turn. Take a peek at the beginning of this story and unearth an unexpected experience full of discoveries, where you will be greeted by a new adventure with each new visit.</p><p>Thanks to our recognizable hospitality and the feeling of family warmth, we awaken in our guests the desire to return to the place where they belong.</p>",
            "<p>Ovo je samo početak uzbudljive priče i uvod u ono što goste u budućnosti tek očekuje, a to je sedam impozantnih lokacija koje nude divlji duh avanture na svakom koraku. Zavirite u početak ove priče i naslutite neočekivano iskustvo prepuno otkrića, gdje će vas svakom novom posjetom dočekati nova avantura.</p><p>Zbog prepoznatljivog gostoprimstva i osjećaja porodične topline, kod gosta budimo želju ponovnog vraćanja na mjesto kojem pripada.</p>",
          ),
          image: i.hiking,
        },
      },
      {
        type: "split",
        imageSide: "right",
        item: {
          title: t("Odiva brand", "Brend Odiva"),
          html: t(
            "<p>Get to know Montenegro through our handmade products, where our commitment to quality, sustainability and unique flavors shine through every product. We turn the rich harvest from our vineyard with love and care into extraordinary wine and brandy, drawing inspiration from the courage of the women of Montenegro, their strength to survive and support their families in difficult times. Organic vegetables, fruits and herbs from our rich garden are the basic ingredients of other products, prepared with love and according to the traditional family recipe.</p>",
            "<p>Upoznaj Crnu Goru kroz naše ručno rađene proizvode, gdje naša posvećenost kvalitetu, održivosti i jedinstvenim ukusima blista kroz svaki proizvod. Bogatu berbu iz našeg vinograda s ljubavlju i pažnjom pretvaramo u izvanredno vino i rakiju, crpeći inspiraciju iz hrabrosti žena Crne Gore i njihove snage da prežive i podrže svoje porodice u teškim vremenima. Organsko povrće, voće i začinsko bilje iz naše bašte osnovni su sastojci ostalih proizvoda, pripremljenih s ljubavlju i po tradicionalnoj porodičnoj recepturi.</p>",
          ),
          image: i.picnic,
        },
      },
      { type: "pattern" },
    ],
  },

  {
    key: "contact",
    slug: t("contact", "kontakt"),
    navTitle: t("Contact", "Kontakt"),
    seo: {
      title: t("Contact & reservations", "Kontakt i rezervacije"),
      description: t(
        "Contact Oblun Eco Resort: info@oblun.com, +382 69 777 595, WhatsApp. Send us a message or a booking request.",
        "Kontaktirajte Oblun Eco Resort: info@oblun.com, +382 69 777 595, WhatsApp. Pošaljite nam poruku ili upit za rezervaciju.",
      ),
      image: i.contactHero,
    },
    modules: [
      {
        type: "hero",
        item: {
          title: t("Contact", "Kontakt"),
          html: t(
            "<p>Welcome to Oblun Resort, located in the very heart of magnificent nature, where together we create a unique experience of a dynamic environment, rich history, and the distinctive cultural charm of our country.</p>",
            "<p>Dobrodošli u Oblun resort, smješten u samom srcu veličanstvene prirode, gdje zajedno stvaramo neponovljiv doživljaj dinamičnog okruženja, živopisne istorije i nesvakidašnjeg kulturnog šarma naše zemlje.</p>",
          ),
          image: i.contactHero,
        },
      },
      { type: "contact-form" },
    ],
  },

  {
    key: "privacy",
    slug: t("privacy-policy", "politika-privatnosti"),
    navTitle: t("Privacy policy", "Politika privatnosti"),
    seo: {
      title: t("Privacy policy", "Politika privatnosti"),
      description: t(
        "How Oblun Eco Resort collects, uses and protects your personal information.",
        "Kako Oblun Eco Resort prikuplja, koristi i štiti vaše lične podatke.",
      ),
      image: i.homeHero,
    },
    modules: [],
  },

  {
    key: "terms",
    slug: t("terms-and-conditions", "uslovi-koriscenja"),
    navTitle: t("Terms of use", "Uslovi korišćenja"),
    seo: {
      title: t("Terms and conditions", "Uslovi korišćenja"),
      description: t(
        "Terms and conditions for using the Oblun Eco Resort website.",
        "Uslovi korišćenja web stranice Oblun Eco Resorta.",
      ),
      image: i.homeHero,
    },
    modules: [],
  },
];

export const getPage = (key: PageKey) => pages.find((p) => p.key === key)!;
