import type { Localized } from "./types";

/*
 * Legal texts (trusted HTML). Based on the texts from the old website; the
 * "information we collect" section and the parts about booking requests were
 * added because the new site accepts booking requests directly.
 * Please have these reviewed before going live.
 */

const contactBlock = `<p>Oblun Eco Resort<br>Bulevar Džordža Vašingtona 11, 81000 Podgorica<br><a href="mailto:info@oblun.com">info@oblun.com</a></p>`;

export const privacyPolicy: Localized = {
  en: `
<h2>Introduction</h2>
<p>At Oblun Eco Resort ("we", "us", "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website www.oblun.com ("Website") and interact with our services.</p>
<h2>Information we collect</h2>
<p>When you visit our Website, you may provide us with personal information, including but not limited to:</p>
<ul>
<li><strong>Contact details:</strong> your name, e-mail address and phone number when you send us a message or a booking request.</li>
<li><strong>Booking details:</strong> the dates of your stay, the number of guests and any message you include.</li>
<li><strong>Usage data:</strong> anonymous information about how the Website is used (for example pages visited and device type), collected through analytics tools.</li>
</ul>
<h2>How we use your information</h2>
<p>We use your personal information for the following purposes:</p>
<ul>
<li><strong>To respond to inquiries:</strong> to provide you with information and respond to your questions about our accommodation and services.</li>
<li><strong>To process bookings:</strong> to handle booking requests sent through our Website and to facilitate bookings made through third-party platforms linked on our Website.</li>
<li><strong>To improve our services:</strong> to analyze Website usage and improve our services, content, and user experience.</li>
<li><strong>To communicate with you:</strong> to send you updates, promotions, and information related to our resort. You can opt out of receiving marketing communications at any time.</li>
</ul>
<h2>Sharing your information</h2>
<p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
<ul>
<li><strong>Service providers:</strong> we may share your information with trusted third-party service providers who assist us in operating our Website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.</li>
<li><strong>Legal compliance:</strong> we may disclose your information when required by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
</ul>
<h2>Third-party links</h2>
<p>Our Website may contain links to third-party websites (e.g., booking platforms). This Privacy Policy does not apply to those websites. We encourage you to review the privacy policies of any third-party sites you visit, as we have no control over their content or practices.</p>
<h2>Data security</h2>
<p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.</p>
<h2>Your rights</h2>
<p>Depending on your location and applicable laws, you may have the following rights regarding your personal information:</p>
<ul>
<li><strong>Access:</strong> the right to request copies of your personal information.</li>
<li><strong>Correction:</strong> the right to request that we correct any information you believe is inaccurate or incomplete.</li>
<li><strong>Deletion:</strong> the right to request that we delete your personal information under certain conditions.</li>
<li><strong>Objection:</strong> the right to object to our processing of your personal information.</li>
</ul>
<p>To exercise any of these rights, please contact us using the information provided below.</p>
<h2>Changes to this Privacy Policy</h2>
<p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting the new Privacy Policy on this Website with a revised effective date.</p>
<h2>Contact us</h2>
<p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
${contactBlock}`,
  me: `
<h2>Uvod</h2>
<p>U Oblun Eco Resortu („mi“, „nas“, „naš“) posvećeni smo zaštiti vaše privatnosti. Ova Politika privatnosti objašnjava kako prikupljamo, koristimo i štitimo vaše lične podatke kada posjetite našu web stranicu www.oblun.com („Web stranica“) i koristite naše usluge.</p>
<h2>Podaci koje prikupljamo</h2>
<p>Kada posjetite našu Web stranicu, možete nam dostaviti lične podatke, uključujući, ali ne ograničavajući se na:</p>
<ul>
<li><strong>Kontakt podatke:</strong> ime, e-mail adresu i broj telefona kada nam pošaljete poruku ili upit za rezervaciju.</li>
<li><strong>Podatke o rezervaciji:</strong> datume boravka, broj gostiju i poruku koju nam ostavite.</li>
<li><strong>Podatke o korišćenju:</strong> anonimne informacije o tome kako se Web stranica koristi (npr. posjećene stranice i vrsta uređaja), prikupljene putem alata za analitiku.</li>
</ul>
<h2>Kako koristimo vaše podatke</h2>
<p>Vaše lične podatke koristimo u sljedeće svrhe:</p>
<ul>
<li><strong>Za odgovaranje na upite:</strong> da vam pružimo informacije i odgovorimo na vaša pitanja u vezi sa našim smještajem i uslugama.</li>
<li><strong>Za obradu rezervacija:</strong> da obradimo upite za rezervaciju poslate putem naše Web stranice i omogućimo rezervacije putem platformi trećih strana povezanih sa našom Web stranicom.</li>
<li><strong>Za unapređenje naših usluga:</strong> da analiziramo korišćenje Web stranice i unaprijedimo naše usluge, sadržaj i korisničko iskustvo.</li>
<li><strong>Za komunikaciju sa vama:</strong> da vam šaljemo obavještenja, promocije i informacije vezane za naš resort. U svakom trenutku možete se odjaviti od primanja marketinških poruka.</li>
</ul>
<h2>Dijeljenje vaših podataka</h2>
<p>Vaše lične podatke ne prodajemo, ne razmjenjujemo niti ih na drugi način prenosimo trećim stranama bez vašeg pristanka, osim u sljedećim slučajevima:</p>
<ul>
<li><strong>Pružaoci usluga:</strong> možemo dijeliti vaše podatke sa pouzdanim pružaocima usluga koji nam pomažu u upravljanju Web stranicom, vođenju poslovanja ili pružanju usluga vama, pod uslovom da se obavežu da će ove podatke čuvati kao povjerljive.</li>
<li><strong>Poštovanje zakonskih obaveza:</strong> vaše podatke možemo otkriti kada je to propisano zakonom ili kao odgovor na važeće zahtjeve nadležnih organa (npr. suda ili državnog organa).</li>
</ul>
<h2>Linkovi ka trećim stranama</h2>
<p>Naša Web stranica može sadržati linkove ka web stranicama trećih strana (npr. platformama za rezervaciju). Ova Politika privatnosti ne odnosi se na te web stranice. Preporučujemo vam da pregledate politike privatnosti svih web stranica trećih strana koje posjetite, jer nemamo kontrolu nad njihovim sadržajem niti praksama.</p>
<h2>Sigurnost podataka</h2>
<p>Primjenjujemo odgovarajuće sigurnosne mjere kako bismo zaštitili vaše lične podatke od neovlašćenog pristupa, otkrivanja, izmjene ili uništenja. Međutim, nijedan način prenosa podataka putem interneta ili elektronskog skladištenja nije 100% siguran. Iako nastojimo da zaštitimo vaše podatke, ne možemo garantovati njihovu apsolutnu sigurnost.</p>
<h2>Vaša prava</h2>
<p>U zavisnosti od vaše lokacije i važećih zakona, možete imati sljedeća prava u vezi sa vašim ličnim podacima:</p>
<ul>
<li><strong>Pristup:</strong> pravo da zatražite kopije svojih ličnih podataka.</li>
<li><strong>Ispravka:</strong> pravo da zatražite ispravku podataka za koje smatrate da su netačni ili nepotpuni.</li>
<li><strong>Brisanje:</strong> pravo da zatražite brisanje svojih ličnih podataka pod određenim uslovima.</li>
<li><strong>Prigovor:</strong> pravo da uložite prigovor na obradu vaših ličnih podataka.</li>
</ul>
<p>Da biste ostvarili bilo koje od ovih prava, molimo vas da nas kontaktirate koristeći dolje navedene podatke.</p>
<h2>Izmjene ove Politike privatnosti</h2>
<p>Ovu Politiku privatnosti možemo povremeno ažurirati kako bismo odrazili promjene u našim praksama ili iz drugih operativnih, pravnih ili regulatornih razloga. O svim značajnim izmjenama obavijestićemo vas objavljivanjem nove Politike privatnosti na ovoj Web stranici, uz naznačen novi datum stupanja na snagu.</p>
<h2>Kontaktirajte nas</h2>
<p>Ako imate bilo kakva pitanja, nedoumice ili zahtjeve u vezi sa ovom Politikom privatnosti ili našim praksama obrade podataka, molimo vas da nas kontaktirate na:</p>
${contactBlock}`,
};

export const termsOfUse: Localized = {
  en: `
<h2>Introduction</h2>
<p>Welcome to the Oblun Eco Resort website ("Website"). By accessing or using this Website, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with these Terms, please do not use this Website.</p>
<h2>Use of the Website</h2>
<p>This Website is designed to provide information about Oblun Eco Resort, including accommodation options and related services. By using this Website, you agree to use it for legitimate purposes only, such as exploring our offerings and submitting inquiries. You may be required to provide your personal information (such as your name, email, and phone number) to make inquiries or booking requests. You agree that all information you provide will be accurate and complete.</p>
<h2>Privacy and data collection</h2>
<p>When submitting your contact details via this Website, you acknowledge that Oblun Eco Resort may collect and process your personal information in accordance with our <a href="/privacy-policy">Privacy Policy</a>. Your contact information will be used solely for responding to inquiries, processing bookings, and providing updates about our services. We do not take or store payment information on our Website.</p>
<h2>Booking requests</h2>
<p>Prices and availability shown on this Website are informative. A booking request sent through the Website is not a confirmed reservation: your booking is confirmed only once our team confirms it to you by e-mail.</p>
<h2>Third-party booking platforms</h2>
<p>You can also book through third-party booking platforms (e.g., Booking.com, Airbnb) linked on this Website. Please note:</p>
<ul>
<li>Oblun Eco Resort is not responsible for the content, accuracy, or practices of third-party booking platforms.</li>
<li>Once you leave our Website and enter a third-party platform, you are subject to their terms and conditions, privacy policies, and booking procedures.</li>
<li>Any issues or concerns with a booking made on a third-party platform should be directed to the relevant provider.</li>
</ul>
<h2>Intellectual property</h2>
<p>All content on this Website, including text, images, logos, videos, and design elements, is the intellectual property of Oblun Eco Resort unless otherwise indicated. You may not use, reproduce, or distribute any content from this Website without prior written permission from Oblun Eco Resort.</p>
<h2>Limitation of liability</h2>
<p>To the fullest extent permitted by law, Oblun Eco Resort will not be liable for any damages arising from the use or inability to use this Website, including but not limited to technical issues, third-party website errors, or inaccurate information. We strive to ensure the Website is up to date, but we cannot guarantee uninterrupted access or the accuracy of all information at all times.</p>
<h2>Disclaimers</h2>
<p>This Website is provided "as is", without warranties of any kind, either express or implied. Oblun Eco Resort does not guarantee that the Website will be available at all times or free from errors, viruses, or other harmful elements.</p>
<h2>Changes to the Terms and Conditions</h2>
<p>Oblun Eco Resort reserves the right to modify these Terms and Conditions at any time. Any changes will take effect immediately upon posting on this Website. It is your responsibility to review these Terms periodically for updates.</p>
<h2>Contact information</h2>
<p>For any questions, concerns, or issues related to these Terms and Conditions or your use of this Website, please contact us at <a href="mailto:info@oblun.com">info@oblun.com</a>.</p>`,
  me: `
<h2>Uvod</h2>
<p>Dobrodošli na web stranicu Oblun Eco Resorta („Web stranica“). Pristupanjem ili korišćenjem ove Web stranice saglasni ste da ćete poštovati sljedeće Uslove korišćenja i biti njima obavezani. Ukoliko se ne slažete sa ovim Uslovima, molimo vas da ne koristite ovu Web stranicu.</p>
<h2>Korišćenje Web stranice</h2>
<p>Ova Web stranica je namijenjena pružanju informacija o Oblun Eco Resortu, uključujući opcije smještaja i povezane usluge. Korišćenjem ove Web stranice saglasni ste da ćete je koristiti isključivo u legitimne svrhe, kao što su upoznavanje sa našom ponudom i slanje upita. Možda će biti potrebno da dostavite svoje lične podatke (kao što su ime, e-mail adresa i broj telefona) kako biste poslali upit ili zahtjev za rezervaciju. Saglasni ste da će sve informacije koje dostavite biti tačne i potpune.</p>
<h2>Privatnost i prikupljanje podataka</h2>
<p>Slanjem svojih kontakt podataka putem ove Web stranice potvrđujete da Oblun Eco Resort može prikupljati i obrađivati vaše lične podatke u skladu sa našom <a href="/me/politika-privatnosti">Politikom privatnosti</a>. Vaši kontakt podaci koristiće se isključivo za odgovaranje na upite, obradu rezervacija i pružanje informacija o našim uslugama. Na našoj Web stranici ne vršimo plaćanja niti čuvamo podatke o plaćanju.</p>
<h2>Upiti za rezervaciju</h2>
<p>Cijene i dostupnost prikazane na ovoj Web stranici su informativne. Upit za rezervaciju poslat putem Web stranice nije potvrđena rezervacija: rezervacija je potvrđena tek kada vam je naš tim potvrdi putem e-maila.</p>
<h2>Platforme trećih strana za rezervaciju</h2>
<p>Rezervaciju možete izvršiti i putem platformi trećih strana (npr. Booking.com, Airbnb) čiji se linkovi nalaze na ovoj Web stranici. Molimo imajte u vidu:</p>
<ul>
<li>Oblun Eco Resort nije odgovoran za sadržaj, tačnost ili prakse platformi trećih strana za rezervaciju.</li>
<li>Nakon što napustite našu Web stranicu i pređete na platformu treće strane, podliježete njihovim uslovima korišćenja, politikama privatnosti i procedurama rezervacije.</li>
<li>Sva pitanja ili eventualni problemi u vezi sa rezervacijom napravljenom na platformi treće strane treba da budu upućeni odgovarajućem pružaocu usluga.</li>
</ul>
<h2>Intelektualna svojina</h2>
<p>Sav sadržaj na ovoj Web stranici, uključujući tekst, slike, logotipe, video zapise i elemente dizajna, predstavlja intelektualnu svojinu Oblun Eco Resorta, osim ako nije drugačije naznačeno. Ne smijete koristiti, reprodukovati niti distribuirati bilo koji sadržaj sa ove Web stranice bez prethodne pisane saglasnosti Oblun Eco Resorta.</p>
<h2>Ograničenje odgovornosti</h2>
<p>U najvećoj mjeri dozvoljenoj zakonom, Oblun Eco Resort neće biti odgovoran za bilo kakvu štetu nastalu korišćenjem ili nemogućnošću korišćenja ove Web stranice, uključujući, ali ne ograničavajući se na tehničke probleme, greške na web stranicama trećih strana ili netačne informacije. Nastojimo da Web stranica bude ažurna, ali ne možemo garantovati neprekidan pristup niti tačnost svih informacija u svakom trenutku.</p>
<h2>Odricanje od odgovornosti</h2>
<p>Ova Web stranica se pruža „takva kakva jeste“, bez bilo kakvih garancija, izričitih ili podrazumijevanih. Oblun Eco Resort ne garantuje da će Web stranica biti dostupna u svakom trenutku niti da je bez grešaka, virusa ili drugih štetnih elemenata.</p>
<h2>Izmjene Uslova korišćenja</h2>
<p>Oblun Eco Resort zadržava pravo da u bilo kom trenutku izmijeni ove Uslove korišćenja. Sve izmjene stupaju na snagu odmah po objavljivanju na ovoj Web stranici. Vaša je odgovornost da povremeno pregledate ove Uslove radi eventualnih izmjena.</p>
<h2>Kontakt informacije</h2>
<p>Za sva pitanja, nedoumice ili probleme u vezi sa ovim Uslovima korišćenja ili vašim korišćenjem ove Web stranice, molimo vas da nas kontaktirate na <a href="mailto:info@oblun.com">info@oblun.com</a>.</p>`,
};
