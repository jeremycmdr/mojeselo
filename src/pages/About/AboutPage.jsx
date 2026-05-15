import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AuthModal from '../../components/Auth/AuthModal';
import './AboutPage.css';

const AboutPage = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="about-page">
      <Header onOpenAuth={() => setIsAuthOpen(true)} />

      <main className="about-main">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-container">
            <h1>Naša Priča</h1>
            <p>Spajamo tradiciju bosanskohercegovačkog sela sa modernim dobom.</p>
          </div>
        </section>

        {/* History / Mission Section */}
        <section className="about-section mission-section">
          <div className="about-container">
            <div className="section-grid">
              <div className="text-content">
                <h2>Kako je sve počelo?</h2>
                <p>
                  SeloMoje.ba nije nastalo u kancelariji, već na prašnjavim putevima planine Vlašić, 
                  u mirisnim voćnjacima Semberije i pored kristalno čiste Une. Ideja se rodila iz jednog 
                  jednostavnog zapažanja: naša sela su prepuna vrednih ljudi koji proizvode hranu 
                  neverovatnog kvaliteta, ali ta hrana prečesto ne pronalazi put do gradskih trpeza.
                </p>
                <p>
                  Gledajući bake kako na pijacama satima stoje čekajući kupce za svoj savršeni pekmez 
                  ili mlade bračne parove koji pokušavaju da ožive stara porodična imanja, shvatili smo 
                  da im nedostaje most – digitalni most koji će njihovu ljubav i trud povezati sa 
                  ljudima koji cene pravo, domaće i zdravo. Tako je nastao SeloMoje.ba – ne samo kao 
                  platforma, već kao pokret za očuvanje našeg nasleđa.
                </p>
              </div>
              <div className="image-content">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" alt="BiH Pejzaž" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-section values-section">
          <div className="about-container">
            <h2 className="centered-title">Vrednosti u koje verujemo</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Direktna podrška</h3>
                <p>Svaki fening koji potrošite na našoj platformi ide direktno u ruke onih koji su proizvod napravili. Eliminišemo nepotrebne posrednike i osiguravamo fer trgovinu za naša domaćinstva.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🌿</div>
                <h3>Beskompromisni kvalitet</h3>
                <p>Domaće ne sme biti samo reč. Svaki proizvod na platformi prolazi kroz našu internu proveru. Verujemo u hranu koja ima ukus, miris i dušu, baš onakvu kakvu su jeli naši stari.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">🏔️</div>
                <h3>Očuvanje tradicije</h3>
                <p>Od starih recepata za ajvar do tradicionalnih načina tkanja, naša misija je da sačuvamo autentične BiH zanate i veštine od zaborava, čineći ih dostupnim novim generacijama.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">♻️</div>
                <h3>Održivi razvoj</h3>
                <p>Podstičemo ekološki osveštenu poljoprivredu. Naš cilj je da osnažimo sela kako bi mladi ljudi videli budućnost na svojim imanjima, čuvajući prirodu za one koji dolaze posle nas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="about-section vision-section">
          <div className="about-container">
            <div className="vision-banner">
              <div className="vision-text">
                <h2>Naša vizija za budućnost</h2>
                <p>
                  Sanjamo o Bosni i Hercegovini u kojoj svako selo ima svoju digitalnu tačku susreta. 
                  Gde je "kupujmo domaće" stil života, a ne samo slogan. Naš cilj je da u narednih 
                  pet godina digitalizujemo preko 1000 domaćinstava i omogućimo im da postanu 
                  samoodrživi biznisi koji ponosno predstavljaju svoju regiju.
                </p>
                <p>
                  Želimo da SeloMoje.ba postane prva asocijacija za poverenje. Kada vidite naš logo na 
                  pakovanju sira ili tegli meda, želimo da znate tačnu lokaciju odakle dolazi, 
                  ime porodice koja ga je napravila i da osetite sigurnost da unosite najbolje u 
                  svoj organizam.
                </p>
              </div>
              <div className="vision-quote">
                <blockquote>
                  "Zemlja je jedino što vredi, jer je ona jedino što ostaje. Naš zadatak je da joj vratimo dostojanstvo."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="about-section how-it-works">
          <div className="about-container">
            <h2 className="centered-title">Transparentnost na prvom mestu</h2>
            <div className="process-steps">
              <div className="step">
                <span className="step-num">01</span>
                <h3>Obilazak terena</h3>
                <p>Lično posećujemo svako domaćinstvo pre nego što postane deo platforme. Razgovaramo sa ljudima, vidimo proces proizvodnje i uverimo se u uslove rada.</p>
              </div>
              <div className="step">
                <span className="step-num">02</span>
                <h3>Verifikacija i kontrola</h3>
                <p>Proveravamo sertifikate (ako ih poseduju) i vršimo nasumične testove kvaliteta. Sigurnost naših kupaca je naš najveći prioritet.</p>
              </div>
              <div className="step">
                <span className="step-num">03</span>
                <h3>Digitalizacija ponude</h3>
                <p>Pomažemo domaćinstvima da predstave svoje proizvode na najbolji način – od fotografisanja do pisanja opisa i upravljanja narudžbama.</p>
              </div>
              <div className="step">
                <span className="step-num">04</span>
                <h3>Dostava do vaših vrata</h3>
                <p>Osiguravamo da sveži proizvodi stignu brzo i sigurno, čuvajući kvalitet koji je proizvođač uložio u svaku teglu ili kilogram proizvoda.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="about-container">
            <div className="cta-box">
              <h2>Postanite deo naše zajednice</h2>
              <p>Bilo da ste proizvođač koji želi da proširi svoje tržište, ili kupac koji traži kvalitet, vaša podrška menja lice BiH sela.</p>
              <div className="cta-btns">
                <button className="primary-btn">Prijavite svoje domaćinstvo</button>
                <button className="secondary-btn">Počnite sa kupovinom</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default AboutPage;
