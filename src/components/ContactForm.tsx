import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { type Profile } from "../js/data";

interface ContactFormProps {
  profile: Profile;
}

export default function ContactForm({ profile }: ContactFormProps) {
  const [contactName, setContactName] = useState("");
  const [contactEmailInput, setContactEmailInput] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const MAX_CHARS = 1000;
  const charCount = contactMessage.length;

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 11000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
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
        const text = await response.text();
        let serverMessage = "Failed to send message.";

        try {
          const body = JSON.parse(text);
          if (body?.error) {
            serverMessage = body.error;
          }
        } catch {
          serverMessage = text || serverMessage;
        }

        if (response.status >= 500) {
          const mailto = buildMailtoLink();
          window.location.href = mailto;
          setContactStatus("Server send failed, opening your email app to complete the message.");
          return;
        }

        setContactStatus(serverMessage);
        return;
      }

      setIsSuccess(true);
      triggerConfetti();
      setContactName("");
      setContactEmailInput("");
      setContactPhone("");
      setContactMessage("");
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      const mailto = buildMailtoLink();
      window.location.href = mailto;
      setContactStatus("Server send failed, opening your email app to complete the message.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <motion.section
      className="contact-panel"
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
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
                disabled={isSubmitting || isSuccess}
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
                disabled={isSubmitting || isSuccess}
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
              disabled={isSubmitting || isSuccess}
            />
          </label>
          <label>
            Message
            <textarea
              value={contactMessage}
              onChange={(event) => {
                const val = event.target.value.slice(0, MAX_CHARS);
                setContactMessage(val);
              }}
              placeholder="Tell me about your project"
              rows={5}
              required
              disabled={isSubmitting || isSuccess}
            />
            <span style={{ fontSize: "0.78rem", color: charCount > MAX_CHARS * 0.85 ? "#f87171" : "rgba(255,255,255,0.35)", textAlign: "right", display: "block", marginTop: "4px" }}>
              {charCount} / {MAX_CHARS}
            </span>
          </label>
          <div style={{ position: "relative" }}>
            <button 
              type="submit" 
              className={`btn-primary ${isSuccess ? "success" : ""}`} 
              disabled={isSubmitting || isSuccess}
              style={{ width: "100%", transition: "all 0.4s ease" }}
            >
              {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
            </button>
            
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="success-badge"
                  style={{
                    position: "absolute",
                    top: "120%",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    color: "var(--clr-primary)",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>I'll get back to you shortly!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {contactStatus && <p className="contact-status">{contactStatus}</p>}
        </form>


        <div className="contact-actions">
          <a
            href={`mailto:${profile.contactEmail}?subject=Contact%20CasRael`}
            className="btn-secondary"
          >
            Email Directly
          </a>
          <a
            href={profile.whatsapp}
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Me
          </a>
        </div>

        <div className="social-row" style={{ marginTop: "24px" }}>
          <a href="https://linkedin.com/in/israelogunnaike" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href="https://github.com/Israel18417" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <a href={profile.whatsapp} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.99 0C5.374 0 0 5.373 0 11.988c0 2.103.549 4.083 1.508 5.798L.06 23.94l6.304-1.654A11.944 11.944 0 0 0 11.988 24C18.626 24 24 18.627 24 12.012 24 5.374 18.626 0 11.99 0zm.001 21.785a9.77 9.77 0 0 1-4.986-1.365l-.357-.212-3.705.972.987-3.608-.233-.37a9.781 9.781 0 0 1-1.5-5.204c0-5.408 4.4-9.807 9.81-9.807 5.408 0 9.807 4.399 9.807 9.807 0 5.407-4.399 9.787-9.823 9.787z"/>
            </svg>
          </a>
          <a href="https://instagram.com/casrael_official" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
