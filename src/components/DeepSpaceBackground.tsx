import React, { useEffect, useRef } from "react";

const DeepSpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars: { x: number; y: number; size: number; speed: number; opacity: number; twinkleSpeed: number }[] = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const nebulas = [
      { x: 0.2, y: 0.3, color: "rgba(111, 208, 255, 0.08)", size: 400 },
      { x: 0.8, y: 0.7, color: "rgba(100, 150, 255, 0.05)", size: 500 },
      { x: 0.5, y: 0.5, color: "rgba(139, 92, 246, 0.04)", size: 600 },
    ];

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) / 100;
      mouseY = (e.clientY - height / 2) / 100;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw nebulas
      nebulas.forEach((nebula) => {
        const nx = nebula.x * width + mouseX * 2;
        const ny = nebula.y * height + mouseY * 2;
        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, nebula.size);
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      ctx.fillStyle = "white";

      stars.forEach((star) => {
        // Parallax effect
        const x = star.x + mouseX * star.speed;
        const y = star.y + mouseY * star.speed;

        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Smoother Twinkle effect
        star.opacity += star.twinkleSpeed;
        if (star.opacity < 0.1 || star.opacity > 0.9) star.twinkleSpeed *= -1;

        // Wrap around
        if (x < -50) star.x = width + 50;
        if (x > width + 50) star.x = -50;
        if (y < -50) star.y = height + 50;
        if (y > height + 50) star.y = -50;
      });

      requestAnimationFrame(animate);
    };


    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
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
    />
  );
};

export default DeepSpaceBackground;
