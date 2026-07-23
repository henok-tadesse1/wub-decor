import { useEffect, useRef } from "react";

const COLORS = [
  "rgba(255, 253, 248,",
  "rgba(255, 246, 224,",
  "rgba(255, 224, 166,"
];

function createParticle(width, height, isSparkle = false) {
  const size = isSparkle ? 1.6 + Math.random() * 1.9 : 0.7 + Math.random() * 1.4;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size,
    sparkle: isSparkle,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    baseOpacity: isSparkle ? 0.35 + Math.random() * 0.2 : 0.16 + Math.random() * 0.22,
    phase: Math.random() * Math.PI * 2,
    speed: 0.00045 + Math.random() * 0.00085,
    driftX: (Math.random() - 0.5) * (isSparkle ? 10 : 7),
    driftY: (Math.random() - 0.5) * (isSparkle ? 8 : 5)
  };
}

function AmbientSparkles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d", { alpha: true });
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let resizeFrame = 0;
    let particles = [];
    let width = 0;
    let height = 0;
    let reducedMotion = reducedMotionQuery.matches;

    const getCounts = () => {
      const mobile = window.innerWidth <= 600;
      if (reducedMotion) {
        return { dust: mobile ? 5 : 8, sparkles: mobile ? 0 : 1 };
      }

      return mobile ? { dust: 28, sparkles: 2 } : { dust: 58, sparkles: 4 };
    };

    const seedParticles = () => {
      const counts = getCounts();
      particles = [
        ...Array.from({ length: counts.dust }, () => createParticle(width, height)),
        ...Array.from({ length: counts.sparkles }, () => createParticle(width, height, true))
      ];
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seedParticles();
    };

    const drawParticle = (particle, time) => {
      const pulse = reducedMotion ? 0.55 : 0.5 + Math.sin(time * particle.speed + particle.phase) * 0.5;
      const opacity = particle.baseOpacity * (0.32 + pulse * 0.68);
      const drift = reducedMotion ? 0 : Math.sin(time * particle.speed * 0.62 + particle.phase);
      const x = particle.x + particle.driftX * drift;
      const y = particle.y + particle.driftY * drift;

      context.beginPath();
      context.fillStyle = `${particle.color} ${opacity})`;
      context.shadowBlur = particle.sparkle ? 12.42 : 4;
      context.shadowColor = `${particle.color} ${opacity * 0.8})`;
      context.arc(x, y, particle.size, 0, Math.PI * 2);
      context.fill();

      if (particle.sparkle && opacity > 0.08) {
        context.strokeStyle = `${particle.color} ${opacity * 0.55})`;
        context.lineWidth = 0.7;
        context.beginPath();
        context.moveTo(x - particle.size * 2.3, y);
        context.lineTo(x + particle.size * 2.3, y);
        context.moveTo(x, y - particle.size * 2.3);
        context.lineTo(x, y + particle.size * 2.3);
        context.stroke();
      }
    };

    const render = (time = 0) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => drawParticle(particle, time));

      if (!reducedMotion && !document.hidden) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const start = () => {
      window.cancelAnimationFrame(animationFrame);
      render();
      if (!reducedMotion && !document.hidden) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resize();
        start();
      });
    };

    const handleVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        return;
      }

      start();
    };

    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
      seedParticles();
      start();
    };

    resize();
    start();

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-sparkles" aria-hidden="true" />;
}

export default AmbientSparkles;
