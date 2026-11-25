import React, { useEffect, useRef } from 'react';

/**
 * High-performance interactive HTML5 canvas particle background
 * Features:
 * - Continuous floating particles with soft glow
 * - Palette: soft orange (#F59E0B), navy blue (#14213D), light grey (#C8C4BB)
 * - Delicate connecting network lines based on proximity
 * - Smooth cursor repulsion/interaction
 * - Scroll parallax
 * - Responsive density (desktop, tablet, mobile)
 * - Auto-pauses when tab is inactive (visibilitychange)
 * - Respects prefers-reduced-motion
 */
export const ParticleCanvas = ({ mode = 'normal' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse tracking with smooth target interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      radius: mode === 'subtle' ? 90 : 130,
      isActive: false
    };

    // Scroll parallax tracking
    let scrollY = window.scrollY || 0;
    let targetScrollY = scrollY;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isActive = false;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle high DPI resize
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    // Color definitions
    // Soft orange (#F59E0B), Navy blue (#14213D), Warm light grey (#D5D1C8)
    const colors = [
      { r: 245, g: 158, b: 11, weight: 0.35 }, // Accent orange
      { r: 20, g: 33, b: 61, weight: 0.4 },    // Navy blue
      { r: 190, g: 185, b: 175, weight: 0.25 } // Soft grey/sand
    ];

    const pickColor = () => {
      const rand = Math.random();
      let cumulative = 0;
      for (const c of colors) {
        cumulative += c.weight;
        if (rand <= cumulative) return c;
      }
      return colors[0];
    };

    let particles = [];

    const getParticleCount = () => {
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const base = isMobile ? 22 : isTablet ? 38 : 62;
      return mode === 'subtle' ? Math.round(base * 0.55) : base;
    };

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : (Math.random() > 0.5 ? -10 : height + 10);
        
        // Very gentle velocity
        const speedMultiplier = prefersReducedMotion ? 0.08 : (mode === 'subtle' ? 0.25 : 0.45);
        this.vx = (Math.random() - 0.5) * speedMultiplier;
        this.vy = (Math.random() - 0.5) * speedMultiplier;
        
        this.color = pickColor();
        this.baseRadius = mode === 'subtle' 
          ? 1.2 + Math.random() * 1.5 
          : 1.4 + Math.random() * 2.2;
        this.radius = this.baseRadius;
        
        // Base alpha
        const maxAlpha = mode === 'subtle' ? 0.28 : 0.55;
        const minAlpha = mode === 'subtle' ? 0.08 : 0.15;
        this.alpha = minAlpha + Math.random() * (maxAlpha - minAlpha);
        this.targetAlpha = this.alpha;
        
        // Gentle pulse phase
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.015 + Math.random() * 0.02;
        
        // Parallax factor
        this.parallaxFactor = 0.02 + Math.random() * 0.04;
      }

      update(scrollDelta) {
        // Natural movement
        this.x += this.vx;
        this.y += this.vy + (scrollDelta * this.parallaxFactor);

        // Gentle pulse
        this.pulseAngle += this.pulseSpeed;
        const pulse = Math.sin(this.pulseAngle) * 0.15;
        this.radius = Math.max(0.8, this.baseRadius + pulse);

        // Mouse interaction (gentle repulsion)
        if (mouse.isActive && !prefersReducedMotion) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * (mode === 'subtle' ? 0.8 : 1.6);
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force;
            this.y += Math.sin(angle) * force;
            // Slight glow enhancement near mouse
            this.targetAlpha = Math.min(this.alpha * 1.5, 0.8);
          } else {
            this.targetAlpha = this.alpha;
          }
        }

        // Screen boundary wrap
        if (this.x < -20) this.x = width + 20;
        else if (this.x > width + 20) this.x = -20;

        if (this.y < -20) this.y = height + 20;
        else if (this.y > height + 20) this.y = -20;
      }

      draw(context) {
        context.save();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        const { r, g, b } = this.color;
        const currentAlpha = this.targetAlpha;
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
        
        // Subtle soft glow on larger or orange particles
        if (r === 245 && mode !== 'subtle') {
          context.shadowColor = `rgba(${r}, ${g}, ${b}, 0.35)`;
          context.shadowBlur = 6;
        }

        context.fill();
        context.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Connecting lines distance threshold
    const maxDistance = mode === 'subtle' ? 95 : 125;
    let lastScrollY = window.scrollY || 0;

    // Animation Loop
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      // Smooth scroll delta
      scrollY += (targetScrollY - scrollY) * 0.1;
      const scrollDelta = targetScrollY - lastScrollY;
      lastScrollY = targetScrollY;

      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles with delicate, thin lines
      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const proximityFactor = 1 - dist / maxDistance;
            
            // Soft blend line alpha
            const lineAlpha = proximityFactor * (mode === 'subtle' ? 0.08 : 0.16);

            // Inherit warmer color if one particle is orange
            const isOrangeLine = p1.color.r === 245 || p2.color.r === 245;
            const r = isOrangeLine ? 245 : 40;
            const g = isOrangeLine ? 170 : 55;
            const b = isOrangeLine ? 30 : 85;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // Update and draw all particles
      for (let i = 0; i < pLen; i++) {
        particles[i].update(scrollDelta);
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Tab visibility handling: pause when hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
