import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personalProfile, profile } from "../js/data";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="profile-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            className="profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <aside className="profile-modal-sidebar">
              <img
                className="profile-modal-portrait"
                src="/images/israel-ogunnaike-portrait.jpg"
                alt="Israel Ogunnaike"
              />
              <span className="eyebrow">Personal profile</span>
              <h2 id="profile-modal-title">{personalProfile.name}</h2>
              <p>{personalProfile.title}</p>
              <div className="profile-modal-contact">
                <a href={`mailto:${profile.contactEmail}`}>Email Israel</a>
                <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </aside>

            <div className="profile-modal-main">
              <button
                ref={closeButtonRef}
                className="modal-close profile-modal-close"
                type="button"
                onClick={onClose}
                aria-label="Close profile"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <section className="profile-modal-section">
                <h3>About</h3>
                <p>{personalProfile.summary}</p>
              </section>

              <section className="profile-modal-section">
                <h3>Experience</h3>
                <div className="profile-timeline">
                  {personalProfile.experience.map((item) => (
                    <article className="profile-timeline-item" key={`${item.organization}-${item.title}`}>
                      <div className="profile-timeline-heading">
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.organization}</p>
                        </div>
                        <span>{item.period}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="profile-modal-section">
                <h3>Education</h3>
                <div className="profile-education-list">
                  {personalProfile.education.map((item) => (
                    <article key={item.school}>
                      <div>
                        <h4>{item.school}</h4>
                        <p>{item.qualification}</p>
                      </div>
                      <span>{item.period}</span>
                    </article>
                  ))}
                </div>
              </section>

              <section className="profile-modal-section">
                <h3>Skills & languages</h3>
                <div className="profile-skill-list">
                  {personalProfile.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
                <p className="profile-languages">
                  <strong>Languages:</strong> {personalProfile.languages.join(", ")}
                </p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
