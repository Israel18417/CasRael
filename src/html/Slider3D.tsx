import { useState, useEffect, type FormEvent } from "react";
import "../css/Slider3D.css";
import { projects } from "../js/data";
import Logo from "../components/Logo";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
}

export default function Slider3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const profile = {
    name: "CasRael",
    owner: "Israel Ogunnaike",
    role: "Technology, Brand & Media Innovation",
    location: "Based in Lagos and Ondo state, Nigeria",
    description:
      "CasRael brings together web technology, strategic brand management, storytelling, and global business experience to build meaningful digital products.",
    brandStory:
      "CasRael is the creative brand of Israel Ogunnaike, delivering technology-led branding, product strategy, media coverage, and global trade services for ambitious clients.",
    coreExpertise: [
      {
        title: "Technology & Innovation",
        items: [
          "Frontend & full-stack development",
          "Creative web design",
          "Tech innovation",
        ],
      },
      {
        title: "Management & Strategy",
        items: [
          "Product management",
          "Brand management",
          "Business management / entrepreneurship",
        ],
      },
      {
        title: "Media & Events",
        items: [
          "Event coverage",
          "Digital storytelling",
          "Media production",
        ],
      },
      {
        title: "Global Business",
        items: [
          "Importation",
          "Exportation",
          "International trade support",
        ],
      },
    ],
    brandValues: [
      "Creative digital storytelling",
      "3D-inspired interface motion",
      "Polished web experiences for visionary clients",
    ],
    serviceExamples: [
      {
        title: "Web & App Development",
        description:
          "Building responsive web apps, landing pages, and full-stack products with modern frontend and backend tools.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-icon" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M8 8h8" />
            <path d="M8 12h.01" />
            <path d="M12 12h.01" />
            <path d="M16 12h.01" />
          </svg>
        ),
      },
      {
        title: "Brand & Product Strategy",
        description:
          "Defining positioning, visual identity, and product direction that make CasRael clients stand out.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-icon" aria-hidden="true">
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
          </svg>
        ),
      },
      {
        title: "Media, Events & Coverage",
        description:
          "Documenting events, crafting digital stories, and producing media assets for campaigns and launches.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-icon" aria-hidden="true">
            <rect x="3" y="7" width="18" height="12" rx="2" />
            <path d="M7 7l3-3h4l3 3" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        ),
      },
      {
        title: "Trade & Global Business",
        description:
          "Supporting import/export workflows and international market entry for ambitious businesses.",
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-icon" aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 4v16" />
            <path d="M4 12h16" />
            <path d="M7 7l3 3" />
            <path d="M14 14l3 3" />
          </svg>
        ),
      },
    ],
    contactEmail: "mycasrael@gmail.com",
    phone: "+234 904 698 8683",
    website: "casrael.dev",
    skills: ["React", "TypeScript", "3D UI", "Motion Design", "Responsive Layout"],
  };

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handlePrev = (): void => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlay(false);
  };

  const handleNext = (): void => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setIsAutoPlay(false);
  };

  const [contactName, setContactName] = useState("");
  const [contactEmailInput, setContactEmailInput] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDotClick = (index: number): void => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const buildMailtoLink = (): string => {
    const subject = encodeURIComponent(`CasRael Inquiry from ${contactName || "Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${contactName}\nEmail: ${contactEmailInput}\nPhone: ${contactPhone}\n\n${contactMessage}`
    );
    return `mailto:${profile.contactEmail}?subject=${subject}&body=${body}`;
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setContactStatus("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmailInput,
          phone: contactPhone,
          message: contactMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setContactStatus("Message sent! I’ll follow up shortly.");
      setContactName("");
      setContactEmailInput("");
      setContactPhone("");
      setContactMessage("");
    } catch (error) {
      console.error(error);
      const mailto = buildMailtoLink();
      window.location.href = mailto;
      setContactStatus("Server send failed, opening your email app to complete the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCardPosition = (index: number): string => {
    const diff = index - currentIndex;
    if (diff === 0) return "active";
    if (diff === 1 || diff === -projects.length + 1) return "next";
    if (diff === -1 || diff === projects.length - 1) return "prev";
    return "hidden";
  };

  return (
    <div className="slider-container">
      <header className="site-header">
        <Logo />
        <nav className="site-nav">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Brand & Contact</span>
          <h1>{profile.name}</h1>
          <p className="hero-owner">by {profile.owner}</p>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-description">{profile.description}</p>
          <div className="hero-story">
            <h2>About CasRael</h2>
            <p>{profile.brandStory}</p>
          </div>
          <div className="hero-actions">
            <a href={`mailto:${profile.contactEmail}`} className="btn-primary">
              Contact Me
            </a>
            <a
              href={`https://${profile.website}`}
              className="btn-secondary"
              target="_blank"
              rel="noreferrer"
            >
              Visit CasRael
            </a>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <strong>Location</strong>
              <span>{profile.location}</span>
            </div>
            <div className="hero-meta-item">
              <strong>Email</strong>
              <span>{profile.contactEmail}</span>
            </div>
            <div className="hero-meta-item">
              <strong>Website</strong>
              <span>{profile.website}</span>
            </div>
          </div>
          <div className="hero-skills" id="skills">
            {profile.skills.map((skill) => (
              <span key={skill} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="slider-wrapper" id="projects">
        <div className="slider-viewport">
          {projects.map((project: Project, index: number) => (
            <div
              key={project.id}
              className={`slide ${getCardPosition(index)}`}
              style={
                {
                  "--accent-color": project.color,
                } as any
              }
            >
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={project.image} alt={project.title} />
                    <div className="overlay">
                      <h3>{project.title}</h3>
                      <span className="category">{project.category}</span>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="back-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <a href="#" className="btn-view">
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button className="nav-btn prev" onClick={handlePrev} aria-label="Previous slide">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="nav-btn next" onClick={handleNext} aria-label="Next slide">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="dots-nav">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <section className="brand-story-panel">
        <div className="brand-story-copy">
          <span className="eyebrow">Brand Story</span>
          <h2>CasRael is more than a portfolio.</h2>
          <p>{profile.brandStory}</p>
          <ul className="brand-values">
            {profile.brandValues.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>

          <div className="expertise-section">
            <h3>Core Expertise</h3>
            <div className="expertise-grid">
              {profile.coreExpertise.map((area) => (
                <article key={area.title} className="expertise-card">
                  <h4>{area.title}</h4>
                  <ul>
                    {area.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="service-panel">
        <div className="service-copy">
          <span className="eyebrow">CasRael Services</span>
          <h2>How CasRael brings your vision to life</h2>
          <div className="service-grid">
            {profile.serviceExamples.map((service) => (
              <article key={service.title} className="service-card">
                {service.icon}
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-panel" id="contact">
        <div className="contact-copy">
          <span className="eyebrow">Get in Touch</span>
          <h2>Let’s build something great together.</h2>
          <p>
            Whether you have a project idea, want to collaborate, or just want to say
            hello, use the form below or reach out directly through the contact details.
          </p>

          <div className="contact-details">
            <div className="contact-card">
              <strong>Email</strong>
              <a href={`mailto:${profile.contactEmail}`}>{profile.contactEmail}</a>
            </div>
            <div className="contact-card">
              <strong>Phone</strong>
              <span>{profile.phone}</span>
            </div>
            <div className="contact-card">
              <strong>Location</strong>
              <span>{profile.location}</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-row">
              <label>
                Name
                <input
                  type="text"
                  value={contactName}
                  onChange={(event) => setContactName(event.target.value)}
                  placeholder="Your name"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={contactEmailInput}
                  onChange={(event) => setContactEmailInput(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>
            <label>
              Phone
              <input
                type="tel"
                value={contactPhone}
                onChange={(event) => setContactPhone(event.target.value)}
                placeholder="Your phone number"
              />
            </label>
            <label>
              Message
              <textarea
                value={contactMessage}
                onChange={(event) => setContactMessage(event.target.value)}
                placeholder="Tell me about your project"
                rows={5}
                required
              />
            </label>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {contactStatus && <p className="contact-status">{contactStatus}</p>}
          </form>

          <div className="contact-actions">
            <a
              href={`mailto:${profile.contactEmail}?subject=Contact%20CasRael`}
              className="btn-secondary"
            >
              Email Directly
            </a>
            <a href="#" className="btn-secondary">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Autoplay toggle */}
      <button
        className={`autoplay-toggle ${isAutoPlay ? "active" : ""}`}
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        title={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
      >
        {isAutoPlay ? "⏸" : "▶"}
      </button>
    </div>
  );
}
