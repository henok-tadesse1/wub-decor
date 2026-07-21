import { useEffect, useRef, useState } from "react";
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
import PromotionBar from "./components/PromotionBar";

const JOTFORM_APP_URL = "https://app.jotform.com/261272926529363";
const JOTFORM_CONSULTATION_URL = "https://form.jotform.com/261273285360052";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Request a Consultation", href: "#consultation" },
  { label: "Open App", href: "#app" },
  { label: "Contact", href: "#contact" }
];

const services = [
  {
    title: "Weddings",
    selectedService: "Wedding Planning",
    description: "Purposeful wedding planning, styling, and coordination for a graceful celebration.",
    icon: HeartHandshake
  },
  {
    title: "Birthday Celebrations",
    selectedService: "Birthday Celebration",
    description: "Beautifully styled milestone birthdays with smooth planning from start to finish.",
    icon: Gift
  },
  {
    title: "Anniversaries",
    selectedService: "Anniversary Celebration",
    description: "Meaningful anniversary moments designed with warmth, romance, and detail.",
    icon: CalendarHeart
  },
  {
    title: "Graduation Celebrations",
    selectedService: "Graduation Celebration",
    description: "Elegant graduation gatherings that honour achievement with family and friends.",
    icon: GraduationCap
  },
  {
    title: "Bridal Showers",
    selectedService: "Bridal Shower",
    description: "Soft, polished bridal shower styling with thoughtful guest experiences.",
    icon: Sparkles
  },
  {
    title: "Baby Showers",
    selectedService: "Baby Shower",
    description: "Gentle, joyful baby shower decor and planning for a memorable welcome.",
    icon: Baby
  },
  {
    title: "Engagement Parties",
    selectedService: "Engagement Party",
    description: "Romantic engagement celebrations shaped around your love story.",
    icon: PartyPopper
  },
  {
    title: "Private and Special Celebrations",
    selectedService: "Private and Special Celebration",
    description: "Bespoke support for intimate gatherings, family occasions, and personal milestones.",
    icon: Music
  }
];

const coordinationItems = [
  "Initial consultation",
  "Planning and coordination",
  "Supplier and vendor coordination",
  "Event timeline management",
  "Guest coordination",
  "On-the-day support",
  "Photographers, decorators, venues, caterers and entertainers",
  "Unexpected situations during the event"
];

const faqItems = [
  {
    question: "Which areas do you cover?",
    answer:
      "Manchester and surrounding areas. Enquiries for events outside the area can be discussed individually."
  },
  {
    question: "What types of events do you plan?",
    answer:
      "Weddings, engagements, birthdays, anniversaries, bridal showers, baby showers, graduations and other private celebrations."
  },
  {
    question: "How do I request a consultation?",
    answer:
      "Use the consultation request button or form. Wub will review the information and contact you to discuss availability and next steps."
  },
  {
    question: "Can you coordinate the event on the day?",
    answer:
      "Yes. On-the-day coordination can include managing suppliers, timings, guests and important event details."
  },
  {
    question: "Do you work with the client's chosen suppliers?",
    answer:
      "Yes. Wub can coordinate with your selected photographers, decorators, venues, caterers, entertainers and other suppliers."
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Wedding Planning");
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const modalRef = useRef(null);
  const consultationTriggerRef = useRef(null);
  const hasJotformAppUrl = !JOTFORM_APP_URL.includes("PASTE_YOUR_JOTFORM_APP_LINK_HERE");
  const currentYear = new Date().getFullYear();
  const consultationFormUrl = `${JOTFORM_CONSULTATION_URL}${
    JOTFORM_CONSULTATION_URL.includes("?") ? "&" : "?"
  }selectedService=${encodeURIComponent(selectedService)}`;

  const closeMenu = () => setIsMenuOpen(false);
  const closeConsultationModal = () => {
    setIsConsultationModalOpen(false);
    window.requestAnimationFrame(() => {
      consultationTriggerRef.current?.focus?.();
    });
  };

  const requestConsultation = (serviceName = selectedService, triggerElement = null) => {
    setSelectedService(serviceName);
    consultationTriggerRef.current = triggerElement || document.activeElement;
    closeMenu();
    setIsConsultationModalOpen(true);
  };

  useEffect(() => {
    if (!isConsultationModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), iframe, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    window.requestAnimationFrame(() => {
      const focusableElements = modalRef.current?.querySelectorAll(focusableSelector);
      focusableElements?.[0]?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeConsultationModal();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusableElements = Array.from(modalRef.current.querySelectorAll(focusableSelector));
      if (focusableElements.length === 0) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isConsultationModalOpen]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a
          className="brand"
          href="#home"
          onClick={closeMenu}
          aria-label="Wub Christian Wedding & Event Planner home"
        >
          Wub Christian Wedding & Event Planner
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

      <PromotionBar />

      <main>
        <section className="hero-section" id="home" aria-labelledby="hero-title">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Wedding and event planner Manchester</p>
            <h1 id="hero-title">Beautiful Events, Planned with Purpose</h1>
            <p>
              Wub Christian Wedding & Event Planner creates elegant, meaningful and stress-free
              weddings and special celebrations in Manchester and surrounding areas.
            </p>
            <div className="hero-actions" aria-label="Hero actions">
              <a className="button button-primary" href="#services">
                View Our Services
                <ChevronRight aria-hidden="true" />
              </a>
              <button
                className="button button-secondary"
                type="button"
                onClick={(event) => requestConsultation(undefined, event.currentTarget)}
              >
                Request a Consultation
              </button>
            </div>
          </div>
        </section>

        <section className="section" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">What we create</p>
            <h2 id="services-title">Our Services</h2>
            <p>
              From intimate family moments to full wedding days, Wub Christian Wedding & Event
              Planner brings calm event planning in Manchester, elegant styling, and attentive
              coordination to each celebration.
            </p>
          </div>

          <div className="service-grid">
            {services.map(({ title, selectedService: serviceName, description, icon: Icon }) => (
              <article
                className="service-card"
                key={title}
                role="button"
                tabIndex={0}
                aria-label={`Request a Consultation for ${title}`}
                onClick={(event) => requestConsultation(serviceName, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    requestConsultation(serviceName, event.currentTarget);
                  }
                }}
              >
                <div className="icon-wrap">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <button
                  className="offer-link"
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    requestConsultation(serviceName, event.currentTarget);
                  }}
                >
                  Request a Consultation
                </button>
              </article>
            ))}
          </div>

          <div className="offer-panel">
            <p className="eyebrow">Personalised packages</p>
            <h3>Looking for the best package for your celebration?</h3>
            <p>
              Contact Wub Christian Wedding & Event Planner and tell us about your event. We will
              discuss your requirements and provide a personalised offer based on your event type,
              location, number of guests and services needed.
            </p>
            <h3>Wedding Planning</h3>
            <p>
              From intimate ceremonies to larger wedding celebrations, Wub supports couples with
              planning, supplier coordination, event schedules, guest arrangements and on-the-day
              coordination. Our aim is to create a beautiful and stress-free celebration centred on
              the couple's vision and values.
            </p>
            <h3>Other Celebrations</h3>
            <p>
              We also plan and coordinate engagements, birthdays, anniversaries, bridal showers, baby
              showers, graduations and other private celebrations. Every event is approached with
              care, professionalism and attention to detail.
            </p>
            <button
              className="button button-primary"
              type="button"
              onClick={(event) => requestConsultation(undefined, event.currentTarget)}
            >
              Request a Consultation
            </button>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="about-copy">
            <p className="eyebrow">About Wub Christian Wedding & Event Planner</p>
            <h2 id="about-title">Spiritual planning for meaningful celebrations.</h2>
            <p>
              Wub Christian Wedding & Event Planner creates elegant, meaningful and well-organised
              celebrations in Manchester and surrounding areas. We believe every event should reflect
              faith, love and purpose while allowing our clients to enjoy their special day without
              worrying about the details.
            </p>
            <p>
              From the first planning conversation to the final moments of the event, Wub Christian
              Wedding & Event Planner coordinates the important details so clients can relax and enjoy
              their special occasion across Manchester and surrounding areas.
            </p>
          </div>

          <div className="coordination-panel" aria-labelledby="coordination-title">
            <div className="panel-heading">
              <Users aria-hidden="true" />
              <h3 id="coordination-title">How Wub Helps</h3>
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

        <section className="consultation-section" id="consultation" aria-labelledby="consultation-title">
          <div className="section-heading centered">
            <p className="eyebrow">Subject to confirmation</p>
            <h2 id="consultation-title">Request a Consultation</h2>
            <p>
              Tell us about your special occasion and provide a few suitable consultation times. Our
              first consultation will normally take place by phone. If needed, an in-person meeting can
              be arranged afterwards.
            </p>
          </div>

          <div className="consultation-layout">
            <aside className="consultation-summary" aria-label="Consultation availability and selected service">
              <p className="selected-service">Selected service: {selectedService}</p>
              <div className="availability-note">
                <h3>Consultation availability:</h3>
                <p>Monday to Friday</p>
                <p>8:00 AM to 5:00 PM</p>
              </div>
              <p className="small-note">
                Please choose preferred dates and times only. Consultation requests are reviewed and
                remain subject to confirmation.
              </p>
            </aside>

            <div className="consultation-form-card">
              <h3>Ready to share your plans?</h3>
              <p>
                Open the consultation request form when you are ready. Your selected service will be
                included so Wub Christian Wedding & Event Planner can respond with the right support.
              </p>
              <button
                className="button button-primary"
                type="button"
                onClick={(event) => requestConsultation(selectedService, event.currentTarget)}
              >
                Request a Consultation
              </button>
            </div>
          </div>
        </section>

        <section className="app-section" id="app" aria-labelledby="app-title">
          <div className="section-heading centered">
            <p className="eyebrow">Forms and services</p>
            <h2 id="app-title">Open the Wub Christian Wedding & Event Planner App</h2>
            <p>
              Scan the QR code with your phone camera to open the Wub Christian Wedding & Event
              Planner app and access our forms and services.
            </p>
          </div>

          {hasJotformAppUrl ? (
            <div className="qr-layout">
              <div className="qr-card" aria-label="Wub Christian Wedding & Event Planner app QR code">
                <QRCodeSVG
                  value={JOTFORM_APP_URL}
                  size={300}
                  bgColor="#ffffff"
                  fgColor="#4b0926"
                  level="H"
                  includeMargin
                  title="QR code to open the Wub Christian Wedding & Event Planner app"
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
            <h2 id="contact-title">Contact Wub Christian Wedding & Event Planner</h2>
            <p>Based in Manchester, United Kingdom</p>
            <p>
              Tell us which service you are interested in and we will contact you to discuss a suitable
              package and personalised offer.
            </p>
          </div>

          <div className="contact-card">
            <a href="mailto:info.wub.event.planner@gmail.com">
              <Mail aria-hidden="true" />
              <span>Email: info.wub.event.planner@gmail.com</span>
            </a>
            <a href="tel:+447472221865">
              <Phone aria-hidden="true" />
              <span>Phone: +44 7472 221865</span>
            </a>
            <a className="button button-primary" href="#app">
              Open Wub Christian Wedding & Event Planner App
            </a>
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="section-heading centered">
            <p className="eyebrow">Helpful answers</p>
            <h2 id="faq-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-grid">
            {faqItems.map(({ question, answer }) => (
              <article className="faq-card" key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <h2>Wub Christian Wedding & Event Planner</h2>
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

        <p className="copyright">
          © {currentYear} Wub Christian Wedding & Event Planner. All rights reserved.
        </p>
      </footer>

      {isConsultationModalOpen ? (
        <div
          className="modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeConsultationModal();
            }
          }}
        >
          <section
            className="consultation-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
            aria-describedby="consultation-modal-description"
            ref={modalRef}
            tabIndex={-1}
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">Subject to confirmation</p>
                <h2 id="consultation-modal-title">Request a Consultation</h2>
              </div>
              <button
                className="modal-close"
                type="button"
                aria-label="Close consultation form"
                onClick={closeConsultationModal}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <p id="consultation-modal-description" className="modal-intro">
              Tell us about your special occasion and provide a few suitable consultation times.
            </p>

            <iframe
              className="consultation-modal-frame"
              src={consultationFormUrl}
              title="Wub Christian Wedding & Event Planner Consultation Request Form"
              loading="lazy"
            />

            <div className="modal-contact-note">
              <p>Having trouble? Contact us directly.</p>
              <a href="tel:+447472221865">Phone: +44 7472 221865</a>
              <a href="mailto:info.wub.event.planner@gmail.com">
                Email: info.wub.event.planner@gmail.com
              </a>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default App;
