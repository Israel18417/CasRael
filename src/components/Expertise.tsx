import { motion } from "framer-motion";
import { personalProfile, projects, type Profile } from "../js/data";

interface ExpertiseProps {
  profile: Profile;
}

export default function Expertise({ profile }: ExpertiseProps) {
  const stats = [
    { number: String(projects.length).padStart(2, "0"), label: "Projects in this portfolio" },
    { number: String(profile.serviceExamples.filter((service) => service.scope !== "additional").length).padStart(2, "0"), label: "Core service areas" },
    { number: String(personalProfile.languages.length).padStart(2, "0"), label: `Languages: ${personalProfile.languages.join(" & ")}` },
  ];

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
      className="brand-story-panel"
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="brand-story-copy">
        <motion.span className="eyebrow" variants={itemVariants}>
          About CasRael
        </motion.span>
        <motion.h2 variants={itemVariants}>A studio and portfolio led by Israel.</motion.h2>
        <motion.p variants={itemVariants}>{profile.brandStory}</motion.p>

        <motion.div className="stats-row" variants={itemVariants}>
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.ul className="brand-values" variants={itemVariants}>
          {profile.brandValues.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </motion.ul>

        <div className="expertise-section">
          <motion.h3 variants={itemVariants}>Core Expertise</motion.h3>
          <motion.div className="expertise-grid">
            {profile.coreExpertise.map((area) => (
              <motion.article
                key={area.title}
                className="expertise-card"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
              >
                <h4>{area.title}</h4>
                <ul>
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
