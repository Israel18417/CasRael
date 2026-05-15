import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(to right, #6fd0ff, #1d9dff)",
        transformOrigin: "0%",
        zIndex: 10000,
        boxShadow: "0 0 10px rgba(111, 208, 255, 0.5)"
      }}
    />
  );
};

export default ScrollProgress;
