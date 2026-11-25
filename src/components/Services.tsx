import { motion } from "framer-motion";
import { type Profile } from "../js/data";

interface ServicesProps {
  profile: Profile;
}

const serviceConfig = [
  {
    glow: "rgba(111, 208, 255, 0.25)",
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
    glow: "rgba(139, 92, 246, 0.25)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-icon" aria-hidden="true">
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
      </svg>
    ),
  },
  {
    glow: "rgba(236, 72, 153, 0.25)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-icon" aria-hidden="true">
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M7 7l3-3h4l3 3" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    glow: "rgba(16, 185, 129, 0.25)",
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
];

export default function Services({ profile }: ServicesProps) {
  const coreServices = profile.serviceExamples.filter((service) => service.scope !== "additional");
  const additionalServices = profile.serviceExamples.filter((service) => service.scope === "additional");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
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
      className="service-panel"
      id="services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="service-copy">
        <motion.span className="eyebrow" variants={itemVariants}>
          Services
        </motion.span>
        <motion.h2 variants={itemVariants}>What CasRael can help with</motion.h2>
        <motion.p className="service-intro" variants={itemVariants}>
          A focused set of services for shaping, building, and sharing digital work.
        </motion.p>
        <motion.h3 className="service-group-title" variants={itemVariants}>
          Core services
        </motion.h3>
        <motion.div className="service-grid">
          {coreServices.map((service) => {
            const idx = profile.serviceExamples.indexOf(service);
            return (
              <motion.article
                key={service.title}
                className="service-card service-card-core"
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: "rgba(255, 255, 255, 0.3)" }}
                style={{ "--service-glow": serviceConfig[idx]?.glow } as React.CSSProperties}
              >
                <div className="service-icon-wrap">
                  {serviceConfig[idx]?.icon}
                </div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </motion.article>
            );
          })}
        </motion.div>

        {additionalServices.length > 0 && (
          <motion.div className="additional-service-group" variants={itemVariants}>
            <div>
              <span className="additional-service-label">Additional capability</span>
              <h3>Trade &amp; Global Business</h3>
              {additionalServices.map((service) => (
                <p key={service.title}>{service.description}</p>
              ))}
            </div>
            <span className="additional-service-mark" aria-hidden="true">
              +
            </span>
          </motion.div>
        )}

        <motion.a
          href="#contact"
          className="service-cta"
          variants={itemVariants}
        >
          Have a project in mind? Let’s talk →
        </motion.a>
      </div>
    </motion.section>
  );
}
