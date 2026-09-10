import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import vishvCutout from '../assets/vishv-cutout.png';

export function HeroProfile() {
  const [imageError, setImageError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 15, y: y * -15 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      className="relative w-full max-w-[420px] sm:max-w-[460px] mx-auto flex items-center justify-center select-none py-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient background flares */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 via-cyan-500/15 to-purple-500/20 blur-3xl pointer-events-none -z-10" />

      {/* 3D Tilting Frame */}
      <motion.div
        animate={{
          rotateY: mousePos.x,
          rotateX: mousePos.y,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ perspective: 1000 }}
        className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden shadow-2xl bg-transparent"
      >
        {/* Inner Card Container */}
        <div className="relative w-full h-full rounded-[28px] overflow-hidden flex flex-col items-center justify-end p-5 group">

          
          {/* Background subtle geometric tech grid */}
          <div className="absolute inset-0 bg-tech-grid opacity-25" />

          {/* Profile Cutout (Transparent Background) */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {!imageError ? (
              <img
                src={vishvCutout || personalInfo.avatar?.imageUrl}
                alt={personalInfo.avatar?.alt || personalInfo.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-contain object-top -translate-y-3 sm:-translate-y-4 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
              />
            ) : (


              /* Fallback Tech Monogram Silhouette when image is yet to be placed */
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950/40 via-slate-900 to-[#07090e] p-6 text-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-1 mb-4 shadow-xl shadow-indigo-500/30">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                    <span className="text-3xl font-extrabold font-mono text-white tracking-wider">
                      {personalInfo.avatar?.fallbackInitials || "VB"}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {personalInfo.name}
                </h3>
                <p className="text-xs text-indigo-400 font-mono mt-1 max-w-[240px]">
                  {personalInfo.avatar?.subtitle || "Integrated M.Sc. (IT) • GLS University"}
                </p>

                <div className="mt-4 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-400 font-mono">
                  Drop photo in public/vishv-photo.jpg
                </div>
              </div>
            )}
          </div>

          {/* Subtle Bottom Gradient Shade for Text Readability */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

          {/* Bottom Card Identity Name Banner */}
          <div className="relative z-10 w-full text-center sm:text-left bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="font-bold text-sm text-white">
                  {personalInfo.name}
                </div>
                <div className="text-[11px] text-indigo-400 font-mono">
                  Technology • AI • Data • UI/UX
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active
              </span>
            </div>
          </div>

        </div>

        {/* Floating Badge 1: Top Right - Status Beacon */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 -right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/15 shadow-xl text-xs font-semibold text-slate-800 dark:text-slate-200"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available to Work</span>
        </motion.div>

        {/* Floating Badge 2: Top Left - Education Badge */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -top-3 -left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/15 shadow-xl text-xs font-semibold text-slate-800 dark:text-slate-200"
        >
          <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
          <span>GLS University '27</span>
        </motion.div>

        {/* Floating Badge 3: Bottom Left - AI & Full Stack Badge */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-3 -left-2 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/15 shadow-xl text-xs font-semibold text-slate-800 dark:text-slate-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>AI & Full-Stack</span>
        </motion.div>

      </motion.div>
    </div>
  );
}
