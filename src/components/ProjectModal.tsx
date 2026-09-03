import React, { type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  fullDescription?: string;
  techStack?: string[];
  color: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={
              {
                "--project-color": project.color,
              } as CSSProperties
            }
          >
            <button className="modal-close" onClick={onClose} aria-label="Close modal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-body">
              <div className="modal-image">
                <img src={project.image} alt={project.title} />
                <motion.div 
                  className="modal-category" 
                  style={{ backgroundColor: project.color }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {project.category}
                </motion.div>
              </div>
              
              <motion.div 
                className="modal-info"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 variants={itemVariants}>{project.title}</motion.h2>
                <motion.p className="modal-short-desc" variants={itemVariants}>{project.description}</motion.p>
                
                {project.fullDescription && (
                  <motion.div className="modal-full-desc" variants={itemVariants}>
                    <h3>About Project</h3>
                    <p>{project.fullDescription}</p>
                  </motion.div>
                )}

                {project.techStack && (
                  <motion.div className="modal-tech" variants={itemVariants}>
                    <h3>Technologies</h3>
                    <div className="tech-chips">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="tech-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div className="modal-actions" variants={itemVariants}>
                  <a href="#" className="btn-primary" style={{ background: project.color, color: "#fff" }}>
                    Live Preview
                  </a>
                  <a href="#" className="btn-secondary">
                    View Source
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default ProjectModal;
