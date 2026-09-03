import { motion } from "framer-motion";
import { type Profile } from "../js/data";

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-inner">
        <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, letterSpacing: "0.08em" }}>
          CASRAEL
        </span>

        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#projects">Projects</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="social-row" style={{ marginTop: 0 }}>
          <a href="https://linkedin.com/in/israelogunnaike" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href="https://github.com/Israel18417" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <a href={profile.whatsapp} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.99 0C5.374 0 0 5.373 0 11.988c0 2.103.549 4.083 1.508 5.798L.06 23.94l6.304-1.654A11.944 11.944 0 0 0 11.988 24C18.626 24 24 18.627 24 12.012 24 5.374 18.626 0 11.99 0zm.001 21.785a9.77 9.77 0 0 1-4.986-1.365l-.357-.212-3.705.972.987-3.608-.233-.37a9.781 9.781 0 0 1-1.5-5.204c0-5.408 4.4-9.807 9.81-9.807 5.408 0 9.807 4.399 9.807 9.807 0 5.407-4.399 9.787-9.823 9.787z"/>
            </svg>
          </a>
        </div>
      </div>

      <p className="footer-copy">
        &copy; {year} CasRael by {profile.owner}. All rights reserved. &nbsp;·&nbsp; Built with React &amp; Framer Motion.
      </p>
    </motion.footer>
  );
}
