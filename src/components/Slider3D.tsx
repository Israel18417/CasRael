import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../css/Slider3D.css";
import { projects, profile, featuredWorks } from "../js/data";
import Logo from "./Logo";
import DeepSpaceBackground from "./DeepSpaceBackground";
import ScrollProgress from "./ScrollProgress";
import ProjectModal from "./ProjectModal";
import Hero from "./Hero";
import Expertise from "./Expertise";
import Services from "./Services";
import ContactForm from "./ContactForm";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
}

export default function Slider3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Swipe logic
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrev = (): void => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlay(false);
  };

  const handleNext = (): void => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setIsAutoPlay(false);
  };

  const handleDotClick = (index: number): void => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const getCardPosition = (index: number): string => {
    const diff = index - currentIndex;
    if (diff === 0) return "active";
    if (diff === 1 || diff === -projects.length + 1) return "next";
    if (diff === -1 || diff === projects.length - 1) return "prev";
    return "hidden";
  };

  return (
    <div className="slider-container">
      <DeepSpaceBackground />
      <ScrollProgress />

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <Logo />
        <nav className="site-nav">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <Hero profile={profile} />

      <motion.div 
        className="slider-wrapper" id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Featured Work</h2>
          <p>Browse sample projects and case studies showcasing technology, branding, media production, and business strategy.</p>
        </motion.div>

        <div className="slider-viewport" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          {projects.map((project: Project, index: number) => (
            <div
              key={project.id}
              className={`slide ${getCardPosition(index)}`}
              style={
                {
                  "--accent-color": project.color,
                } as any
              }
            >
              <div className="flip-card" onClick={() => setSelectedProject(project)}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={project.image} alt={project.title} />
                    <div className="overlay">
                      <h3>{project.title}</h3>
                      <span className="category">{project.category}</span>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="back-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <button className="btn-view" onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button className="nav-btn prev" onClick={handlePrev} aria-label="Previous slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="nav-btn next" onClick={handleNext} aria-label="Next slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </motion.div>

      <div className="slider-controls">
        <div className="dots-nav">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          className={`autoplay-toggle ${isAutoPlay ? "active" : ""}`}
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          title={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
          type="button"
        >
          {isAutoPlay ? "Pause" : "Play"}
        </button>
      </div>

      <section className="work-showcase">
        <div className="section-heading">
          <h2>More Work</h2>
          <p>See additional live projects with real screenshots, including website launches and portfolio demos.</p>
        </div>

        <div className="work-grid">
          {featuredWorks.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="work-card"
            >
              <div className="work-card-image">
                <img src={item.image} alt={`${item.title} screenshot`} />
              </div>
              <div className="work-card-body">
                <span className="work-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="work-link">{item.link.replace(/^https?:\/\//, "")}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Expertise profile={profile} />
      <Services profile={profile} />
      <ContactForm profile={profile} />

      <button
        className="back-to-top"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

    </div>
  );
}
