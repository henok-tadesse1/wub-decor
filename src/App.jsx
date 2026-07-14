import { useState } from "react";
import {
  Baby,
  CalendarHeart,
  ChevronRight,
  ExternalLink,
  Gift,
  GraduationCap,
  HeartHandshake,
  Mail,
  Menu,
  Music,
  PartyPopper,
  Phone,
  Sparkles,
  Users,
  X
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const JOTFORM_APP_URL = "https://app.jotform.com/261272926529363";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Open App", href: "#app" },
  { label: "Contact", href: "#contact" }
];

const services = [
  {
    title: "Weddings",
    description: "Purposeful wedding planning, styling, and coordination for a graceful celebration.",
    icon: HeartHandshake
  },
  {
    title: "Birthday Celebrations",
    description: "Beautifully styled milestone birthdays with smooth planning from start to finish.",
    icon: Gift
  },
  {
    title: "Anniversaries",
    description: "Meaningful anniversary moments designed with warmth, romance, and detail.",
    icon: CalendarHeart
  },
  {
    title: "Graduation Celebrations",
    description: "Elegant graduation gatherings that honour achievement with family and friends.",
    icon: GraduationCap
  },
  {
    title: "Bridal Showers",
    description: "Soft, polished bridal shower styling with thoughtful guest experiences.",
    icon: Sparkles
  },
  {
    title: "Baby Showers",
    description: "Gentle, joyful baby shower decor and planning for a memorable welcome.",
    icon: Baby
  },
  {
    title: "Engagement Parties",
    description: "Romantic engagement celebrations shaped around your love story.",
    icon: PartyPopper
  },
  {
    title: "Private and Special Celebrations",
    description: "Bespoke support for intimate gatherings, family occasions, and personal milestones.",
    icon: Music
  }
];

const coordinationItems = [
  "Photographers and videographers",
  "Master of ceremonies",
  "Decorators",
  "Entertainment and performers",
  "Vendors and suppliers",
  "Event schedules and timing",
  "Guest coordination",
  "Unexpected situations during the event"
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasJotformAppUrl = !JOTFORM_APP_URL.includes("PASTE_YOUR_JOTFORM_APP_LINK_HERE");
  const currentYear = new Date().getFullYear();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
          aria-label="Wub Christian Wedding Planner home"
        >
          Wub Christian Wedding Planner
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav
          id="primary-navigation"
          className={isMenuOpen ? "primary-nav is-open" : "primary-nav"}
          aria-label="Primary navigation"
        >
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home" aria-labelledby="hero-title">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Christian wedding and event planning in Manchester</p>
            <h1 id="hero-title">Beautiful Events, Planned with Purpose</h1>
            <p>
              Wub Christian Wedding Planner creates elegant, meaningful and stress-free weddings and
              special celebrations in Manchester and surrounding areas.
            </p>
            <div className="hero-actions" aria-label="Hero actions">
              <a className="button button-primary" href="#services">
                View Our Services
                <ChevronRight aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="#app">
                Open Wub Christian Wedding Planner App
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">What we create</p>
            <h2 id="services-title">Our Services</h2>
            <p>
              From intimate family moments to full wedding days, Wub Christian Wedding Planner brings
              calm planning, elegant styling, and attentive coordination to each celebration.
            </p>
          </div>

          <div className="service-grid">
            {services.map(({ title, description, icon: Icon }) => (
              <article className="service-card" key={title}>
                <div className="icon-wrap">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <a className="offer-link" href="#contact">
                  Get a Personalised Offer
                </a>
              </article>
            ))}
          </div>

          <div className="offer-panel">
            <p className="eyebrow">Personalised packages</p>
            <h3>Looking for the best package for your celebration?</h3>
            <p>
              Contact Wub Christian Wedding Planner and tell us about your event. We will discuss
              your requirements and provide a personalised offer based on your event type, location,
              number of guests and services needed.
            </p>
            <a className="button button-primary" href="#contact">
              Contact Us for an Offer
            </a>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="about-copy">
            <p className="eyebrow">About Wub Christian Wedding Planner</p>
            <h2 id="about-title">Spiritual planning for meaningful celebrations.</h2>
            <p>
              Wub Christian Wedding Planner is a Manchester-based spiritual wedding and event
              planning service focused on creating meaningful, elegant and memorable celebrations.
            </p>
            <p>
              From the first planning conversation to the final moments of the event, Wub Christian
              Wedding Planner coordinates the important details so clients can relax and enjoy their
              special occasion.
            </p>
          </div>

          <div className="coordination-panel" aria-labelledby="coordination-title">
            <div className="panel-heading">
              <Users aria-hidden="true" />
              <h3 id="coordination-title">We can help coordinate</h3>
            </div>
            <ul>
              {coordinationItems.map((item) => (
                <li key={item}>
                  <span aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="app-section" id="app" aria-labelledby="app-title">
          <div className="section-heading centered">
            <p className="eyebrow">Forms and services</p>
            <h2 id="app-title">Open the Wub Christian Wedding Planner App</h2>
            <p>
              Scan the QR code with your phone camera to open the Wub Christian Wedding Planner app
              and access our forms and services.
            </p>
          </div>

          {hasJotformAppUrl ? (
            <div className="qr-layout">
              <div className="qr-card" aria-label="Wub Christian Wedding Planner app QR code">
                <QRCodeSVG
                  value={JOTFORM_APP_URL}
                  size={300}
                  bgColor="#ffffff"
                  fgColor="#4b0926"
                  level="H"
                  includeMargin
                  title="QR code to open the Wub Christian Wedding Planner app"
                />
              </div>
              <div className="qr-copy">
                <h3>Scan to continue on your phone</h3>
                <p>
                  Open your phone camera, point it at the QR code, then tap the link that appears.
                </p>
                <a className="button button-primary" href={JOTFORM_APP_URL} target="_blank" rel="noreferrer">
                  Open App
                  <ExternalLink aria-hidden="true" />
                </a>
                <p className="small-note">You can also open the app directly using the button above.</p>
              </div>
            </div>
          ) : (
            <div className="setup-message" role="status">
              <Sparkles aria-hidden="true" />
              <h3>QR code setup needed</h3>
              <p>Add your Jotform app link in src/App.jsx to activate the QR code.</p>
            </div>
          )}
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Contact Wub Christian Wedding Planner</h2>
            <p>Based in Manchester, United Kingdom</p>
            <p>
              Tell us which service you are interested in and we will contact you to discuss a suitable
              package and personalised offer.
            </p>
          </div>

          <div className="contact-card">
            <a href="mailto:wubjesus05@gmail.com">
              <Mail aria-hidden="true" />
              <span>Email: wubjesus05@gmail.com</span>
            </a>
            <a href="tel:+447472221865">
              <Phone aria-hidden="true" />
              <span>Phone: +44 7472 221865</span>
            </a>
            <a className="button button-primary" href="#app">
              Open Wub Christian Wedding Planner App
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <h2>Wub Christian Wedding Planner</h2>
          <p>Christian Wedding and Event Planning</p>
          <p>Manchester, United Kingdom</p>
        </div>

        <nav aria-label="Footer navigation">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <p className="copyright">© {currentYear} Wub Christian Wedding Planner. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
