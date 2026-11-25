import React, { useEffect, useRef } from "react";

const DeepSpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars: { x: number; y: number; z: number }[] = [];
    const starCount = 150;
    const speed = 0.8;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.5;
      mouseY = (e.clientY - height / 2) * 0.5;
    };

    let animationFrame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const sx = (star.x - mouseX) * (width / star.z) + width / 2;
        const sy = (star.y - mouseY) * (width / star.z) + height / 2;

        const depth = 1 - star.z / width;
        const previousZ = star.z + speed;
        const previousX = (star.x - mouseX) * (width / previousZ) + width / 2;
        const previousY = (star.y - mouseY) * (width / previousZ) + height / 2;
        const opacity = 0.18 + depth * 0.62;

        ctx.strokeStyle = `hsla(199, 100%, 78%, ${opacity * 0.55})`;
        ctx.lineWidth = Math.max(0.35, depth * 1.4);
        ctx.beginPath();
        ctx.moveTo(previousX, previousY);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        ctx.fillStyle = `hsla(199, 100%, 82%, ${opacity})`;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.45, depth * 1.8), 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        background: "transparent",
      }}
        aria-hidden="true"
    />
  );
};

export default DeepSpaceBackground;
