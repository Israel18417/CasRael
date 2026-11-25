import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import "../css/Slider3D.css";
import { profile } from "../js/data";
import Logo from "./Logo";
import DeepSpaceBackground from "./DeepSpaceBackground";
import ScrollProgress from "./ScrollProgress";
import Hero from "./Hero";
import Expertise from "./Expertise";
import Services from "./Services";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import ProjectOrbit from "./ProjectOrbit";
import ProfileModal from "./ProfileModal";

export default function Slider3D() {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const openProfile = useCallback(() => setIsProfileOpen(true), []);
  const closeProfile = useCallback(() => setIsProfileOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileNav = () => setNavOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="slider-container">
        <DeepSpaceBackground />
        <ScrollProgress />

        <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
          <Logo onOpenProfile={openProfile} />
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#projects">Projects</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <button
            className={`hamburger ${navOpen ? "open" : ""}`}
            type="button"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </header>

        <div
          className={`mobile-nav-overlay ${navOpen ? "open" : ""}`}
          aria-hidden="true"
          onClick={closeMobileNav}
        />
        <nav
          className={`mobile-nav-drawer ${navOpen ? "open" : ""}`}
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          aria-hidden={!navOpen}
        >
          <a href="#projects" onClick={closeMobileNav} tabIndex={navOpen ? 0 : -1}>
            Projects
          </a>
          <a href="#services" onClick={closeMobileNav} tabIndex={navOpen ? 0 : -1}>
            Services
          </a>
          <a href="#about" onClick={closeMobileNav} tabIndex={navOpen ? 0 : -1}>
            About
          </a>
          <a href="#contact" onClick={closeMobileNav} tabIndex={navOpen ? 0 : -1}>
            Contact
          </a>
        </nav>

        <Hero profile={profile} />
        <ProjectOrbit />
        <Expertise profile={profile} />
        <Services profile={profile} />
        <ContactForm profile={profile} />
        <Footer profile={profile} />

        <button
          className={`back-to-top ${isScrolled ? "visible" : ""}`}
          type="button"
          onClick={() => window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          })}
          aria-label="Back to top"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>

        <ProfileModal isOpen={isProfileOpen} onClose={closeProfile} />
      </div>
    </MotionConfig>
  );
}
