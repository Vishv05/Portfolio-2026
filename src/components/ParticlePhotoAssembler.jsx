import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, GraduationCap } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import vishvCutout from '../assets/vishv-cutout.png';

export function ParticlePhotoAssembler({ isDark }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Animation lifecycle: 'swirling' -> 'assembling' -> 'assembled'
  const [assemblyPhase, setAssemblyPhase] = useState('swirling');
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const renderRef = useRef(null);

  // Sample only Vishv's cutout pixels (ignoring removed background)
  const initParticlesFromCutout = useCallback((width, height, imgElement) => {
    const offCanvas = document.createElement('canvas');
    const sampleW = 120;
    const sampleH = 150;
    offCanvas.width = sampleW;
    offCanvas.height = sampleH;
    const offCtx = offCanvas.getContext('2d');

    const particles = [];
    const sphereRadius = Math.min(width, height) * 0.44;

    const imgWidth = width * 0.84;
    const imgHeight = height * 0.90;
    const startX = (width - imgWidth) / 2;
    const startY = height - imgHeight - 14;

    if (imgElement && imgElement.width > 0) {
      offCtx.drawImage(imgElement, 0, 0, sampleW, sampleH);
      let imgData;
      try {
        imgData = offCtx.getImageData(0, 0, sampleW, sampleH).data;
      } catch {
        imgData = null;
      }

      if (imgData) {
        const validCoords = [];
        const step = 3;
        for (let y = 0; y < sampleH; y += step) {
          for (let x = 0; x < sampleW; x += step) {
            const idx = (y * sampleW + x) * 4;
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            const a = imgData[idx + 3];

            // Only pick pixels that belong to Vishv (non-transparent)
            if (a > 40) {
              const tx = startX + (x / sampleW) * imgWidth;
              const ty = startY + (y / sampleH) * imgHeight;
              validCoords.push({ tx, ty, r, g, b });
            }
          }
        }

        // Select 450 points from valid silhouette
        const maxParticles = Math.min(460, validCoords.length);
        const stride = Math.max(1, Math.floor(validCoords.length / maxParticles));

        for (let i = 0; i < maxParticles; i++) {
          const coord = validCoords[i * stride] || validCoords[i];
          if (!coord) continue;

          // 3D Matrix Sphere Starting Coordinates
          const phi = Math.PI * (3 - Math.sqrt(5));
          const y = 1 - (i / (maxParticles - 1)) * 2;
          const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
          const theta = phi * i;
          const sx = Math.cos(theta) * radiusAtY * sphereRadius;
          const sy = y * sphereRadius;
          const sz = Math.sin(theta) * radiusAtY * sphereRadius;

          const delay = Math.random() * 0.35 + (i / maxParticles) * 0.25;
          const radius = 2.0 + Math.random() * 2.2;

          // Matrix colors
          const colorType = i % 4;
          const color = colorType === 0 ? '#06B6D4' : colorType === 1 ? '#6366F1' : colorType === 2 ? '#A855F7' : '#3B82F6';

          particles.push({
            sx: width / 2 + sx,
            sy: height / 2 + sy,
            sz,
            tx: coord.tx,
            ty: coord.ty,
            x: width / 2 + sx,
            y: height / 2 + sy,
            z: sz,
            delay,
            radius,
            color,
            angle: theta,
            orbitSpeed: 0.012 + Math.random() * 0.01,
          });
        }
      }
    }

    // Fallback if image not ready yet
    if (particles.length === 0) {
      const cols = 21;
      const rows = 20;
      const cellW = imgWidth / cols;
      const cellH = imgHeight / rows;
      for (let i = 0; i < 420; i++) {
        const phi = Math.PI * (3 - Math.sqrt(5));
        const y = 1 - (i / (420 - 1)) * 2;
        const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = phi * i;
        const sx = Math.cos(theta) * radiusAtY * sphereRadius;
        const sy = y * sphereRadius;
        const sz = Math.sin(theta) * radiusAtY * sphereRadius;

        const gridCol = i % cols;
        const gridRow = Math.floor(i / cols) % rows;
        const tx = startX + gridCol * cellW + cellW / 2;
        const ty = startY + gridRow * cellH + cellH / 2;

        const colorType = i % 4;
        const color = colorType === 0 ? '#06B6D4' : colorType === 1 ? '#6366F1' : colorType === 2 ? '#A855F7' : '#3B82F6';

        particles.push({
          sx: width / 2 + sx,
          sy: height / 2 + sy,
          sz,
          tx,
          ty,
          x: width / 2 + sx,
          y: height / 2 + sy,
          z: sz,
          delay: Math.random() * 0.4,
          radius: 2.0 + Math.random() * 2.0,
          color,
          angle: theta,
          orbitSpeed: 0.012,
        });
      }
    }

    particlesRef.current = particles;
  }, []);

  // Trigger assembly sequence
  const startAssemblySequence = useCallback(() => {
    setAssemblyPhase('swirling');
    startTimeRef.current = performance.now();

    const timer1 = setTimeout(() => {
      setAssemblyPhase('assembling');
    }, 750);

    const timer2 = setTimeout(() => {
      setAssemblyPhase('assembled');
    }, 2100);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (renderRef.current) {
      animationFrameRef.current = requestAnimationFrame(renderRef.current);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = vishvCutout || personalInfo.avatar?.imageUrl;

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initParticlesFromCutout(width, height, img);
    };

    img.onload = () => {
      setupCanvas();
    };
    img.onerror = () => {
      setupCanvas();
    };

    window.addEventListener('resize', setupCanvas);
    const cleanupTimers = startAssemblySequence();

    // Canvas Draw Loop
    const render = (now) => {
      const elapsed = (now - (startTimeRef.current || now)) / 1000;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      let globalProgress = 0;
      if (elapsed > 0.75) {
        globalProgress = Math.min(1, (elapsed - 0.75) / 1.35);
      }

      // If animation has fully finished (progress >= 1.0), clear canvas and stop drawing dots
      if (globalProgress >= 1.0) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      const easedProgress = globalProgress < 0.5
        ? 4 * globalProgress * globalProgress * globalProgress
        : 1 - Math.pow(-2 * globalProgress + 2, 3) / 2;

      // Calculate dot alpha fade: as the real image shows up, fade dots out to 0
      let dotFade = 1.0;
      if (globalProgress > 0.55) {
        dotFade = Math.max(0, 1 - (globalProgress - 0.55) / 0.4);
      }

      // Draw particle balls
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (globalProgress < 0.05) {
          p.angle += p.orbitSpeed;
          const radiusFromCenter = Math.min(width, height) * 0.4;
          p.x = width / 2 + Math.cos(p.angle) * radiusFromCenter * (0.85 + Math.sin(p.angle * 2) * 0.15);
          p.y = height / 2 + Math.sin(p.angle) * radiusFromCenter * 0.85;
        } else {
          const individualProgress = Math.max(0, Math.min(1, (easedProgress - p.delay * 0.35) / (1 - p.delay * 0.35)));
          const arcLift = Math.sin(individualProgress * Math.PI) * (40 * (i % 2 === 0 ? 1 : -1));
          p.x = p.sx + (p.tx - p.sx) * individualProgress + (1 - individualProgress) * Math.sin(elapsed * 3 + i) * 6;
          p.y = p.sy + (p.ty - p.sy) * individualProgress + arcLift;
        }

        const ballAlpha = dotFade;

        if (ballAlpha > 0.01) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.5, p.radius * (1 - easedProgress * 0.35)), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = ballAlpha;
          ctx.fill();

          if (ballAlpha > 0.35) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = ballAlpha * 0.25;
            ctx.fill();
          }

          ctx.globalAlpha = 1;
        }
      }

      // Energy connection lines (only visible while actively assembling mid-air)
      if (globalProgress > 0.1 && globalProgress < 0.7) {
        const lineAlpha = (1 - (globalProgress - 0.1) / 0.6) * (isDark ? 0.25 : 0.2);
        ctx.strokeStyle = isDark ? `rgba(99, 102, 241, ${lineAlpha})` : `rgba(79, 70, 229, ${lineAlpha})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i += 7) {
          const p1 = particles[i];
          const p2 = particles[(i + 3) % particles.length];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    renderRef.current = render;
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', setupCanvas);
      cleanupTimers();
    };
  }, [initParticlesFromCutout, isDark, startAssemblySequence]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 12, y: y * -12 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[420px] md:max-w-[460px] mx-auto flex flex-col items-center justify-center select-none pt-0 pb-3 bg-transparent"
    >
      {/* 3D Frame Container */}
      <motion.div
        animate={{
          rotateY: mouseTilt.x,
          rotateX: mouseTilt.y,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        style={{ perspective: 1100 }}
        className="relative w-full aspect-[4/5] flex items-center justify-center bg-transparent"
      >
        
        {/* VISHV TRANSPARENT CUTOUT (Real Image displayed purely without matrix dots) */}
        <motion.div
          animate={{
            opacity: assemblyPhase === 'swirling' ? 0 : 1,
            scale: assemblyPhase === 'swirling' ? 0.92 : 1,
            filter: assemblyPhase === 'swirling' ? 'blur(8px)' : 'blur(0px)',
          }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
            delay: assemblyPhase === 'assembling' ? 0.4 : 0,
          }}
          className="absolute inset-x-0 inset-y-0 flex items-end justify-center pointer-events-none pb-4"
        >
          <img
            src={vishvCutout || personalInfo.avatar?.imageUrl}
            alt={personalInfo.name}
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_20px_50px_rgba(99,102,241,0.3)] transition-transform duration-700 hover:scale-105"
          />

        </motion.div>

        {/* 3D Particle Balls Animation Canvas (Fades to 0 and clears once image is assembled) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Floating Nameplate Identity Bar exact below the profile frame with 0 gap */}
        <motion.div
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
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

        {/* Holographic Laser Scan Sweep Line during silhouette convergence */}
        {assemblyPhase === 'assembling' && (
          <motion.div
            initial={{ top: '8%', opacity: 0.9 }}
            animate={{ top: '92%', opacity: [0.9, 1, 0] }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_#06B6D4] z-30 pointer-events-none"
          />
        )}

        {/* Floating Badge 1: Top Right - Status Beacon */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            opacity: assemblyPhase === 'assembled' ? 1 : 0,
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 0.4 }
          }}
          className="absolute -top-2.5 sm:-top-2 -right-1 z-30 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-white/15 shadow-xl text-[10px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available to Work</span>
        </motion.div>

        {/* Floating Badge 2: Top Left - Education Badge */}
        <motion.div
          animate={{
            y: [0, 5, 0],
            opacity: assemblyPhase === 'assembled' ? 1 : 0,
          }}
          transition={{
            y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
            opacity: { duration: 0.4 }
          }}
          className="absolute -top-2.5 sm:-top-2 -left-1 z-30 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-white/15 shadow-xl text-[10px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200"
        >
          <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500" />
          <span>GLS University '27</span>
        </motion.div>

      </motion.div>

      {/* Control Bar: Re-trigger the Matrix Assembly Effect */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 z-20">
        <button
          type="button"
          onClick={startAssemblySequence}
          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-indigo-50 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 text-[11px] sm:text-xs font-mono text-slate-600 dark:text-slate-300 shadow-sm transition-all hover:scale-105 cursor-pointer"
          title="Re-run 3D Matrix Particle Assembly"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-indigo-500 ${assemblyPhase !== 'assembled' ? 'animate-spin' : ''}`} />
          <span>Re-assemble 3D Matrix</span>
        </button>

        <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">
          • 450 Nodes
        </span>
      </div>

    </div>
  );
}

