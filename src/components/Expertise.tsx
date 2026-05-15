import { motion } from "framer-motion";
import { type Profile } from "../js/data";

interface ExpertiseProps {
  profile: Profile;
}

export default function Expertise({ profile }: ExpertiseProps) {
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="brand-story-copy">
        <motion.span className="eyebrow" variants={itemVariants}>
          Brand Story
        </motion.span>
        <motion.h2 variants={itemVariants}>CasRael is more than a portfolio.</motion.h2>
        <motion.p variants={itemVariants}>{profile.brandStory}</motion.p>
        <motion.ul className="brand-values" variants={itemVariants}>
          {profile.brandValues.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </motion.ul>

        <div className="expertise-section">
          <motion.h3 variants={itemVariants}>Core Expertise</motion.h3>
          <motion.div className="expertise-grid">
            {profile.coreExpertise.map((area, idx) => (
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
