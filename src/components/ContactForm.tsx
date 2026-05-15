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


  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
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
              onChange={(event) => setContactMessage(event.target.value)}
              placeholder="Tell me about your project"
              rows={5}
              required
              disabled={isSubmitting || isSuccess}
            />
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
          <a href="#" className="btn-secondary">
            Download Resume
          </a>
        </div>
      </div>
    </motion.section>
  );
}
