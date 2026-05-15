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

    const stars: { x: number; y: number; z: number; px: number; py: number }[] = [];
    const starCount = 400;
    const speed = 2;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        px: 0,
        py: 0,
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - width / 2) * 0.5;
      mouseY = (e.clientY - height / 2) * 0.5;
    };

    const animate = () => {
      ctx.fillStyle = "rgba(3, 3, 5, 0.2)"; // Trail effect
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "white";
      ctx.lineCap = "round";

      stars.forEach((star) => {
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const sx = (star.x - mouseX) * (width / star.z) + width / 2;
        const sy = (star.y - mouseY) * (width / star.z) + height / 2;

        const r = (1 - star.z / width) * 2;
        
        if (star.px !== 0) {
          ctx.strokeStyle = `hsla(199, 100%, 72%, ${1 - star.z / width})`;
          ctx.lineWidth = r;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(star.px, star.py);
          ctx.stroke();
        }

        star.px = sx;
        star.py = sy;
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
