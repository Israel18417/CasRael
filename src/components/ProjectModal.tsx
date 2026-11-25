import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../js/data";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

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
  }, [project, onClose]);

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
          transition={{ duration: 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <button
              ref={closeButtonRef}
              className="modal-close"
              type="button"
              onClick={onClose}
              aria-label="Close modal"
            >
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
                <motion.h2 id="project-modal-title" variants={itemVariants}>{project.title}</motion.h2>
                <motion.p className="modal-short-desc" variants={itemVariants}>{project.description}</motion.p>
                
                {project.fullDescription && (
                  <motion.div className="modal-full-desc" variants={itemVariants}>
                    <h3>About Project</h3>
                    <p>{project.fullDescription}</p>
                  </motion.div>
                )}

                {project.projectRole && (
                  <motion.div className="modal-full-desc" variants={itemVariants}>
                    <h3>My role</h3>
                    <p>{project.projectRole}</p>
                  </motion.div>
                )}

                <motion.div className="modal-full-desc" variants={itemVariants}>
                  <h3>Project highlights</h3>
                  <ul className="modal-highlights">
                    {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </motion.div>

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
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="btn-primary"
                      style={{ background: project.color, color: "#fff" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Preview
                    </a>
                  )}
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
