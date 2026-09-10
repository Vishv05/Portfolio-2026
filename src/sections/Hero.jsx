import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, FileText, Sparkles, Terminal, Code2, Cpu, Atom, Wand2 } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { scrollToSection } from '../utils/helpers';
import { Button } from '../components/ui/Button';
import { ParticlePhotoAssembler } from '../components/ParticlePhotoAssembler';
import { HeroMatrixHologram } from '../components/HeroMatrixHologram';

export function Hero({ isDark, onOpenResume, onShowToast }) {
  const [heroMode, setHeroMode] = useState('assembler'); // 'assembler' or 'hologram'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 lg:py-32 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Status / Role Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300">
                  {personalInfo.availability}
                </span>
              </div>
            </motion.div>

            {/* Main Name Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] sm:leading-[1.08]">
                {personalInfo.name}
              </h1>
            </motion.div>

            {/* Subtitle / Tagline */}
            <motion.div variants={itemVariants}>
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight gradient-text-primary">
                {personalInfo.tagline}
              </h2>
            </motion.div>

            {/* Professional Summary Description */}
            <motion.div variants={itemVariants}>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {personalInfo.heroSubtitle}
              </p>
            </motion.div>

            {/* Key Quick Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-1 text-[11px] sm:text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-medium">
                <Code2 className="w-3.5 h-3.5" /> Software Development
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-medium">
                <Sparkles className="w-3.5 h-3.5" /> Artificial Intelligence
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-medium">
                <Cpu className="w-3.5 h-3.5" /> Data & UI/UX
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-3"
            >
              <Button
                size="md"
                variant="primary"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => scrollToSection('projects')}
                className="shadow-lg shadow-indigo-500/25 !px-4 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm"
              >
                Explore My Work
              </Button>

              <Button
                size="md"
                variant="secondary"
                icon={Mail}
                onClick={() => scrollToSection('contact')}
                className="!px-4 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm"
              >
                Let's Connect
              </Button>

              <Button
                size="md"
                variant="outline"
                icon={FileText}
                onClick={onOpenResume}
                className="!px-4 sm:!px-6 !py-2.5 sm:!py-3 text-xs sm:text-sm"
              >
                Resume
              </Button>
            </motion.div>

            {/* Terminal mini-status line */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 text-center sm:text-left"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span>Integrated M.Sc. (IT) @ GLS University • Expected 2027</span>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Matrix Particle Real Photo Assembler */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center -mt-6 sm:-mt-8 lg:-mt-12"
          >
            {/* Visual Mode Switcher (Particle Assembly vs 3D Point-Cloud Hologram) */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-xs mb-1 text-xs">
              <button
                type="button"
                onClick={() => setHeroMode('assembler')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                  heroMode === 'assembler'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>✨ 3D Matrix Real Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroMode('hologram')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
                  heroMode === 'hologram'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Atom className="w-3.5 h-3.5" />
                <span>🪐 3D Hologram</span>
              </button>
            </div>

            {/* Visual Presentation Area */}
            <AnimatePresence mode="wait">
              {heroMode === 'assembler' ? (
                <motion.div
                  key="photo-assembler"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-center"
                >
                  <ParticlePhotoAssembler isDark={isDark} onShowToast={onShowToast} />
                </motion.div>
              ) : (
                <motion.div
                  key="matrix-hologram"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-center"
                >
                  <HeroMatrixHologram isDark={isDark} onShowToast={onShowToast} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
