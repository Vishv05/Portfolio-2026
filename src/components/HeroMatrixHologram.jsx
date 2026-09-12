import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Orbit, User } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { personalInfo } from '../data/personalInfo';
import vishvCutout from '../assets/vishv-cutout.png';

export function HeroMatrixHologram({ isDark }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  // States: 'photo' or 'sphere'
  const [morphMode, setMorphMode] = useState('photo');
  const imageSrc = vishvCutout || personalInfo.avatar?.imageUrl || './vishv-cutout.png';



  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    cursorX: -9999,
    cursorY: -9999,
    isHovering: false
  });

  const particlesRef = useRef([]);
  const morphProgressRef = useRef(1); // 1 = Photo, 0 = Sphere

  // Generate fallback portrait bitmap if image fails or before upload
  const generateFallbackPortrait = useCallback(() => {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = 120;
    offCanvas.height = 140;
    const offCtx = offCanvas.getContext('2d');
    
    // Gradient silhouette
    const grad = offCtx.createLinearGradient(0, 0, 120, 140);
    grad.addColorStop(0, '#6366F1');
    grad.addColorStop(0.5, '#3B82F6');
    grad.addColorStop(1, '#06B6D4');
    offCtx.fillStyle = grad;

    // Head
    offCtx.beginPath();
    offCtx.arc(60, 48, 28, 0, Math.PI * 2);
    offCtx.fill();

    // Shoulders
    offCtx.beginPath();
    offCtx.ellipse(60, 120, 52, 38, 0, 0, Math.PI * 2);
    offCtx.fill();

    // Eyes / Details
    offCtx.fillStyle = '#FFFFFF';
    offCtx.beginPath();
    offCtx.arc(50, 45, 3.5, 0, Math.PI * 2);
    offCtx.arc(70, 45, 3.5, 0, Math.PI * 2);
    offCtx.fill();

    // Smile
    offCtx.strokeStyle = '#FFFFFF';
    offCtx.lineWidth = 2.5;
    offCtx.beginPath();
    offCtx.arc(60, 54, 10, 0.1 * Math.PI, 0.9 * Math.PI);
    offCtx.stroke();

    // Monogram 'VB' on chest
    offCtx.font = 'bold 18px monospace';
    offCtx.textAlign = 'center';
    offCtx.fillText('VB', 60, 115);

    return offCanvas;
  }, []);

  // Sample image pixels into 3D particles
  const initParticlesFromImage = useCallback((imgElement) => {
    const offCanvas = document.createElement('canvas');
    const width = 110;
    const height = 135;
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');

    if (imgElement && imgElement.width > 0) {
      // Draw image to sample
      offCtx.drawImage(imgElement, 0, 0, width, height);
    } else {
      const fallback = generateFallbackPortrait();
      offCtx.drawImage(fallback, 0, 0, width, height);
    }

    let imgData;
    try {
      imgData = offCtx.getImageData(0, 0, width, height).data;
    } catch {
      const fallback = generateFallbackPortrait();
      imgData = fallback.getContext('2d').getImageData(0, 0, width, height).data;
    }

    const newParticles = [];
    const step = 3; // Pixel sampling step
    const sphereRadius = 160;

    let particleCount = 0;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        const a = imgData[idx + 3];

        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

        if (a > 40 && (brightness > 25 || r > 30 || g > 30 || b > 30)) {
          // Photo target coords (Lifted slightly upwards)
          const px = (x - width / 2) * 2.8;
          const py = (y - height / 2) * 2.8 - 16;
          // Z depth computed from brightness for true 3D facial topography relief
          const pz = ((brightness - 128) / 128) * 45;

          // Fibonacci Sphere target coords
          particleCount++;
          const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
          const sy = 1 - (particleCount / 1200) * 2;
          const radiusAtY = Math.sqrt(Math.max(0, 1 - sy * sy));
          const theta = phi * particleCount;
          const sx = Math.cos(theta) * radiusAtY * sphereRadius;
          const sz = Math.sin(theta) * radiusAtY * sphereRadius;

          newParticles.push({
            // Photo state
            photoX: px,
            photoY: py,
            photoZ: pz,
            // Sphere state
            sphereX: sx,
            sphereY: sy * sphereRadius,
            sphereZ: sz,
            // Live interpolated position
            curX: px,
            curY: py,
            curZ: pz,
            // Color data
            r,
            g,
            b,
            brightness,
            // Wave pulse offset
            pulseOffset: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            size: 1.2 + (brightness / 255) * 1.6
          });
        }
      }
    }

    particlesRef.current = newParticles;
  }, [generateFallbackPortrait]);

  // Load active image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      initParticlesFromImage(img);
    };

    img.onerror = () => {
      initParticlesFromImage(null);
    };
  }, [imageSrc, initParticlesFromImage]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let rotX = 0;
    let rotY = 0;
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

      mouseRef.current.cursorX = clientX;
      mouseRef.current.cursorY = clientY;

      // 3D Tilt calculation
      mouseRef.current.targetX = (clientX - width / 2) * 0.0018;
      mouseRef.current.targetY = (clientY - height / 2) * 0.0018;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.cursorX = -9999;
      mouseRef.current.cursorY = -9999;
      mouseRef.current.isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.02;

      // Smooth mouse tilt inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Smooth Morphing interpolation between Photo (1) and Sphere (0)
      const targetProgress = morphMode === 'photo' ? 1 : 0;
      morphProgressRef.current += (targetProgress - morphProgressRef.current) * 0.06;
      const progress = morphProgressRef.current;

      // In sphere mode, slow continuous rotation; in photo mode, gentle parallax
      if (!prefersReducedMotion) {
        if (progress < 0.5) {
          rotY += 0.006;
          rotX += 0.002;
        } else {
          rotY = mouseRef.current.x;
          rotX = mouseRef.current.y;
        }
      }

      ctx.clearRect(0, 0, width, height);

      const cosY = Math.cos(rotY + (progress < 0.5 ? 0 : mouseRef.current.x));
      const sinY = Math.sin(rotY + (progress < 0.5 ? 0 : mouseRef.current.x));
      const cosX = Math.cos(rotX + (progress < 0.5 ? 0 : mouseRef.current.y));
      const sinX = Math.sin(rotX + (progress < 0.5 ? 0 : mouseRef.current.y));

      const fov = 380;
      const particles = particlesRef.current;
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interpolate between Photo target and Sphere target
        const tx = p.sphereX * (1 - progress) + p.photoX * progress;
        const ty = p.sphereY * (1 - progress) + p.photoY * progress;
        const tz = p.sphereZ * (1 - progress) + p.photoZ * progress;

        // Interactive breathing wave
        const wave = Math.sin(time + p.pulseOffset) * (progress * 1.5 + (1 - progress) * 4);
        const bx = tx;
        const by = ty + wave;
        const bz = tz;

        // 3D Y Rotation
        const x1 = bx * cosY - bz * sinY;
        const z1 = bz * cosY + bx * sinY;

        // 3D X Rotation
        const y2 = by * cosX - z1 * sinX;
        const z2 = z1 * cosX + by * sinX;

        // Perspective
        const depth = z2 + 380;
        const scale = fov / Math.max(1, depth);
        const px = width / 2 + x1 * scale;
        const py = height / 2 + y2 * scale;

        // Mouse particle repulsion / wave
        let pushX = 0;
        let pushY = 0;
        if (mouseRef.current.cursorX > 0) {
          const dx = px - mouseRef.current.cursorX;
          const dy = py - mouseRef.current.cursorY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            const force = (1 - dist / 60) * 8;
            pushX = (dx / dist) * force;
            pushY = (dy / dist) * force;
          }
        }

        const alpha = Math.max(0.2, Math.min(1, (z2 + 180) / 360));

        projected.push({
          x: px + pushX,
          y: py + pushY,
          z: z2,
          scale,
          alpha,
          size: p.size * scale,
          r: p.r,
          g: p.g,
          b: p.b,
          brightness: p.brightness
        });
      }

      // Sort by depth (back to front) for accurate 3D rendering
      projected.sort((a, b) => a.z - b.z);

      // Draw particles
      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(0.8, pt.size), 0, Math.PI * 2);

        if (progress > 0.6) {
          // Photo hologram color: Vibrant cyber-lit tint
          if (isDark) {
            ctx.fillStyle = `rgba(${Math.min(255, pt.r + 40)}, ${Math.min(255, pt.g + 50)}, ${Math.min(255, pt.b + 80)}, ${pt.alpha * 0.95})`;
          } else {
            ctx.fillStyle = `rgba(${pt.r}, ${pt.g}, ${pt.b}, ${pt.alpha * 0.9})`;
          }
        } else {
          // Sphere matrix color: Indigo / Cyan cyber glow
          const isHighlight = i % 8 === 0;
          if (isDark) {
            ctx.fillStyle = isHighlight
              ? `rgba(6, 182, 212, ${pt.alpha})`
              : `rgba(99, 102, 241, ${pt.alpha * 0.8})`;
          } else {
            ctx.fillStyle = isHighlight
              ? `rgba(37, 99, 235, ${pt.alpha})`
              : `rgba(79, 70, 229, ${pt.alpha * 0.75})`;
          }
        }
        ctx.fill();

        // Subtle matrix glow on brighter points
        if (pt.brightness > 180 && pt.alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(99, 102, 241, ${pt.alpha * 0.15})`
            : `rgba(79, 70, 229, ${pt.alpha * 0.12})`;
          ctx.fill();
        }
      }

      // Soft ambient radial depth background
      const ambientGrad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, 200);
      ambientGrad.addColorStop(0, isDark ? 'rgba(99, 102, 241, 0.07)' : 'rgba(79, 70, 229, 0.05)');
      ambientGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = ambientGrad;
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
  }, [isDark, morphMode, prefersReducedMotion]);

  return (
    <div className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[440px] md:max-w-[480px] aspect-square mx-auto flex flex-col items-center justify-center select-none pt-0 pb-2">
      
      {/* Halo glow aura */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-indigo-500/20 via-cyan-500/10 to-purple-500/20 blur-3xl pointer-events-none -z-10" />

      {/* Top Morphing Mode Control Ribbon */}
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2 p-1 sm:p-1.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg text-[11px] sm:text-xs">
        <button
          type="button"
          onClick={() => setMorphMode('photo')}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
            morphMode === 'photo'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>3D Matrix Photo</span>
        </button>

        <button
          type="button"
          onClick={() => setMorphMode('sphere')}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
            morphMode === 'sphere'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Orbit className="w-3.5 h-3.5" />
          <span>3D Sphere</span>
        </button>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
          style={{ width: '100%', height: '100%' }}
          aria-label="3D Interactive Holographic Matrix Photo of Vishv Bhavsar"
          role="img"
        />

        {/* Floating Identity Nameplate Bar exact below image */}
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="absolute inset-x-2 sm:inset-x-5 bottom-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-slate-200/90 dark:border-white/15 shadow-xl shadow-slate-900/10 dark:shadow-black/50 pointer-events-auto"
        >
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white tracking-tight truncate">
                {personalInfo.name}
              </div>
              <div className="text-[10px] sm:text-[11px] text-indigo-600 dark:text-indigo-400 font-mono font-medium truncate">
                Technology • AI • Data • UI/UX
              </div>
            </div>
            
            <span className="text-[9px] sm:text-[10px] font-mono font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1 sm:gap-1.5 flex-shrink-0 shadow-xs">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>
        </motion.div>
      </div>

      {/* UX instruction micro-tip */}
      <div className="text-[10px] text-slate-400 font-mono text-center mt-1 flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-indigo-500" />
        <span>Hover & drag cursor to rotate 3D hologram</span>
      </div>

    </div>
  );
}
