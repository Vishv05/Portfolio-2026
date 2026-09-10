import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function HeroVisual({ isDark }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Create 3D sphere points (Fibonacci sphere distribution for perfectly even distribution)
    const numPoints = 85;
    const radius = 170;
    const points = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseX: x * radius,
        baseY: y * radius,
        baseZ: z * radius,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let rotX = 0.003;
    let rotY = 0.005;
    let currentAngleX = 0;
    let currentAngleY = 0;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = (clientX - width / 2) * 0.0006;
      mouseRef.current.targetY = (clientY - height / 2) * 0.0006;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Color definitions based on theme
    const getNodeColor = (alpha, isNear) => {
      if (isDark) {
        return isNear 
          ? `rgba(99, 102, 241, ${Math.min(1, alpha * 1.5)})` 
          : `rgba(6, 182, 212, ${alpha * 0.8})`;
      } else {
        return isNear 
          ? `rgba(79, 70, 229, ${Math.min(1, alpha * 1.4)})` 
          : `rgba(37, 99, 235, ${alpha * 0.7})`;
      }
    };

    const getLineColor = (alpha) => {
      if (isDark) {
        return `rgba(99, 102, 241, ${alpha * 0.25})`;
      } else {
        return `rgba(79, 70, 229, ${alpha * 0.2})`;
      }
    };

    // Render loop
    const render = () => {
      time += 0.015;

      // Mouse inertia smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (!prefersReducedMotion) {
        currentAngleY += rotY + mouseRef.current.x;
        currentAngleX += rotX + mouseRef.current.y;
      }

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      const projectedPoints = [];
      const fov = 400;

      // Rotate and project points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Breathing pulse
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 6;
        const curRadius = radius + pulse;
        const scaleFactor = curRadius / radius;

        const bx = p.baseX * scaleFactor;
        const by = p.baseY * scaleFactor;
        const bz = p.baseZ * scaleFactor;

        // Rotate around Y axis
        const x1 = bx * cosY - bz * sinY;
        const z1 = bz * cosY + bx * sinY;

        // Rotate around X axis
        const y2 = by * cosX - z1 * sinX;
        const z2 = z1 * cosX + by * sinX;

        // Perspective projection
        const depth = z2 + 350;
        const projScale = fov / Math.max(1, depth);
        const px = width / 2 + x1 * projScale;
        const py = height / 2 + y2 * projScale;

        // Alpha based on depth
        const alpha = Math.max(0.15, Math.min(1, (z2 + radius) / (radius * 2)));

        projectedPoints.push({
          x: px,
          y: py,
          z: z2,
          scale: projScale,
          alpha,
          isHighlight: i % 7 === 0
        });
      }

      // Draw subtle connecting constellation lines
      const maxDistance = 75;
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = getLineColor(lineAlpha);
            ctx.lineWidth = lineAlpha * 1.2;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < projectedPoints.length; i++) {
        const p = projectedPoints[i];
        const pointRadius = Math.max(1.2, (p.scale * (p.isHighlight ? 3.5 : 2.2)));

        ctx.beginPath();
        ctx.arc(p.x, p.y, pointRadius, 0, Math.PI * 2);
        ctx.fillStyle = getNodeColor(p.alpha, p.isHighlight);
        ctx.fill();

        // Subtle glow ring for highlight nodes
        if (p.isHighlight && p.alpha > 0.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, pointRadius * 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? `rgba(99, 102, 241, ${p.alpha * 0.3})` : `rgba(79, 70, 229, ${p.alpha * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Soft ambient center glow
      const grad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, radius * 1.3);
      grad.addColorStop(0, isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(79, 70, 229, 0.06)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isDark, prefersReducedMotion]);

  return (
    <div className="relative w-full aspect-square max-w-[440px] lg:max-w-[500px] mx-auto flex items-center justify-center select-none pointer-events-auto">
      {/* Decorative ambient halo ring */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-indigo-500/10 via-cyan-500/5 to-purple-500/10 blur-2xl pointer-events-none" />
      
      {/* Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        style={{ width: '100%', height: '100%' }}
        aria-label="Interactive 3D Constellation Sphere representing Technology and Innovation"
        role="img"
      />
      
      {/* Subtle orbiting status indicator badge */}
      <div className="absolute bottom-2 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg text-[11px] text-slate-600 dark:text-slate-300 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span className="font-mono">Real-time 3D Matrix</span>
      </div>
    </div>
  );
}
