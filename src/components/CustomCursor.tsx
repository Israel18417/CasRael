import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);


  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isClickable = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.flip-card') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        left: -16,
        top: -16,
      }}
      animate={{
        scale: isPointer ? 2.5 : 1,
        backgroundColor: isPointer ? "hsla(199, 100%, 72%, 0.15)" : "hsla(0, 0%, 100%, 0.1)",
        border: isPointer ? "1px solid hsla(199, 100%, 72%, 0.5)" : "1px solid hsla(0, 0%, 100%, 0.2)",
        boxShadow: isPointer ? "0 0 20px hsla(199, 100%, 72%, 0.3)" : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
    >
      <div className="cursor-dot" style={{ backgroundColor: isPointer ? "var(--clr-primary)" : "white" }} />

    </motion.div>
  );
};

export default CustomCursor;
