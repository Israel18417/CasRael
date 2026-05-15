import { motion } from "framer-motion";
import { type Profile } from "../js/data";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="hero-panel"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="hero-copy">
        <motion.span className="eyebrow" variants={itemVariants}>
          Brand & Contact
        </motion.span>
        <motion.h1 variants={itemVariants}>{profile.name}</motion.h1>
        <motion.p className="hero-owner" variants={itemVariants}>
          by {profile.owner}
        </motion.p>
        <motion.p className="hero-role" variants={itemVariants}>
          {profile.role}
        </motion.p>
        <motion.p className="hero-description" variants={itemVariants}>
          {profile.description}
        </motion.p>

        <motion.div className="hero-actions" variants={itemVariants}>

          <a href={`mailto:${profile.contactEmail}`} className="btn-primary">
            Contact Me
          </a>
          <a
            href={profile.website}
            className="btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Visit CasRael
          </a>
        </motion.div>

        <motion.div className="hero-meta" variants={itemVariants}>
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
        </motion.div>

        <motion.div className="hero-skills" id="skills" variants={itemVariants}>
          {profile.skills.map((skill) => (
            <span key={skill} className="skill-chip">
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
