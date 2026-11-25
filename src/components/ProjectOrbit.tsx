import { useCallback, useEffect, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { projects, type Project } from "../js/data";
import ProjectModal from "./ProjectModal";

export default function ProjectOrbit() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const selectedProject = projects[selectedIndex];
  const closeModal = useCallback(() => setModalProject(null), []);

  useEffect(() => {
    if (prefersReducedMotion) setIsAutoPlay(false);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isAutoPlay || projects.length < 2) return;

    const interval = window.setInterval(() => {
      setSelectedIndex((index) => (index + 1) % projects.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isAutoPlay]);

  const selectProject = (index: number) => {
    setSelectedIndex(index);
  };

  const getCardAngle = (index: number) => {
    const step = 360 / projects.length;
    let distance = index - selectedIndex;

    if (distance > projects.length / 2) distance -= projects.length;
    if (distance < -projects.length / 2) distance += projects.length;

    return distance * step;
  };

  const moveSelection = (direction: -1 | 1) => {
    selectProject((selectedIndex + direction + projects.length) % projects.length);
  };

  return (
    <section className="project-section" id="projects">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow">Portfolio projects</span>
        <h2>Seven projects, one at a time</h2>
        <p>All seven projects are here. Select one to read about it and visit its live site.</p>
      </motion.div>

      <div className="project-orbit-layout">
        <div className="project-orbit-column">
          <div
            className="project-orbit"
            role="group"
            aria-label="Project carousel"
            aria-roledescription="carousel"
          >
            <div className="project-orbit-ring" aria-hidden="true" />
            {projects.map((project, index) => {
              const angle = getCardAngle(index);
              const distance = Math.abs(angle);
              const scale = Math.max(0.84, 1 - distance / 1200);
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={project.id}
                  type="button"
                  className={`project-orbit-card${isSelected ? " selected" : ""}`}
                  style={{
                    transform: `translate(-50%, -50%) rotateX(var(--orbit-tilt)) rotate(${angle}deg) translateY(calc(-1 * var(--orbit-radius))) rotate(${-angle}deg) rotateX(var(--orbit-counter-tilt)) scale(${scale})`,
                    zIndex: isSelected ? 2 : 1,
                  }}
                  onClick={() => selectProject(index)}
                  aria-pressed={isSelected}
                  aria-label={`${project.title}${isSelected ? ", selected" : ", select project"}`}
                >
                  <img src={project.image} alt="" loading="lazy" />
                  <span className="orbit-card-copy">
                    <span>{project.title}</span>
                    <small>{project.category}</small>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="project-orbit-controls">
            <button
              className="orbit-nav-btn"
              type="button"
              onClick={() => moveSelection(-1)}
              aria-label="Previous project"
            >
              <span aria-hidden="true">←</span>
            </button>
            <div className="orbit-dots" role="group" aria-label="Choose a project">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  className={`orbit-dot${index === selectedIndex ? " active" : ""}`}
                  onClick={() => selectProject(index)}
                  aria-label={`Select ${project.title}`}
                  aria-pressed={index === selectedIndex}
                />
              ))}
            </div>
            <button
              className="orbit-nav-btn"
              type="button"
              onClick={() => moveSelection(1)}
              aria-label="Next project"
            >
              <span aria-hidden="true">→</span>
            </button>
            <button
              className="orbit-autoplay"
              type="button"
              onClick={() => setIsAutoPlay((playing) => !playing)}
              aria-pressed={isAutoPlay}
            >
              {isAutoPlay ? "Pause rotation" : "Resume rotation"}
            </button>
          </div>
        </div>

        <motion.article
          key={selectedProject.id}
          className="project-detail-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
          aria-live={isAutoPlay ? "off" : "polite"}
        >
          <div className="project-detail-image">
            <img src={selectedProject.image} alt={`${selectedProject.title} website preview`} />
          </div>
          <div className="project-detail-copy">
            <span className="project-detail-meta">
              {String(selectedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              <span aria-hidden="true"> · </span>
              {selectedProject.category}
            </span>
            <h3>{selectedProject.title}</h3>
            <p>{selectedProject.fullDescription ?? selectedProject.description}</p>
            {selectedProject.projectRole && (
              <p className="project-role">
                <strong>My role:</strong> {selectedProject.projectRole}
              </p>
            )}
            <ul className="project-highlights">
              {selectedProject.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {selectedProject.techStack && (
              <div className="project-tech-list" aria-label="Technology used">
                {selectedProject.techStack.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            )}
            <div className="project-detail-actions">
              <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                Live site <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsAutoPlay(false);
                  setModalProject(selectedProject);
                }}
              >
                More details
              </button>
            </div>
          </div>
        </motion.article>
      </div>

      <ProjectModal project={modalProject} onClose={closeModal} />
    </section>
  );
}
