import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, Play, Pause, Grid, Orbit, Eye, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { certifications } from '../data/certifications';
import { CertificationModal } from '../components/CertificationModal';

export function Certifications({ onShowToast }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('half-moon'); // 'half-moon' or 'grid'
  const touchStartX = useRef(null);

  const total = certifications.length;

  const nextCert = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevCert = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextCert();
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextCert]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== 'half-moon') return;
      if (e.key === 'ArrowRight') nextCert();
      if (e.key === 'ArrowLeft') prevCert();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, nextCert, prevCert]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextCert();
      else prevCert();
    }
    touchStartX.current = null;
  };

  return (
    <section id="certifications" className="py-20 md:py-28 relative overflow-hidden scroll-mt-16 md:scroll-mt-24">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex-1">
            <SectionHeading
              badgeText="Verified Qualifications"
              title="Professional Certifications &"
              titleHighlight="Credentials"
              subtitle="Explore industry-recognized credentials in Cloud AI, Large Language Models, and Data Analytics in an interactive half-moon curved carousel."
              align="left"
              className="!mb-0"
            />
          </div>

          {/* Controls Bar: Auto-play & View Toggle */}
          <div className="flex items-center gap-2 self-start md:self-end bg-white/80 dark:bg-white/[0.04] p-1.5 rounded-2xl border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isAutoPlaying
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={isAutoPlaying ? 'Pause automatic scroll' : 'Start automatic half-moon scroll'}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? 'Auto Rolling' : 'Auto Play'}</span>
            </button>

            <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />

            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'half-moon' ? 'grid' : 'half-moon')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {viewMode === 'half-moon' ? (
                <>
                  <Grid className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Grid View</span>
                </>
              ) : (
                <>
                  <Orbit className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Half-Moon Arc</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* --- VIEW MODE 1: HALF-MOON CURVED SCROLL CAROUSEL --- */}
        {viewMode === 'half-moon' ? (
          <div
            className="relative py-8 md:py-14 select-none touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Half-Moon SVG Arc Track Behind Cards */}
            <div className="relative w-full max-w-4xl mx-auto h-[120px] pointer-events-none -mb-28 z-0 hidden sm:block">
              <svg viewBox="0 0 800 200" fill="none" className="w-full h-full">
                <defs>
                  <linearGradient id="halfMoonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* Parabolic Half-Moon Curve */}
                <path
                  d="M 50 180 Q 400 30 750 180"
                  stroke="url(#halfMoonGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                />
                {/* Active index orbital indicator on curve */}
                <circle
                  cx={50 + (700 / (total - 1)) * activeIndex}
                  cy={180 - Math.sin((activeIndex / (total - 1)) * Math.PI) * 150}
                  r="7"
                  fill="#06B6D4"
                  className="filter drop-shadow-[0_0_8px_#06B6D4]"
                />
              </svg>
            </div>

            {/* Curved Card Stage (Perspective 3D Container) */}
            <div
              className="relative h-[460px] sm:h-[480px] w-full flex items-center justify-center overflow-hidden"
              style={{ perspective: '1100px' }}
            >
              {certifications.map((cert, index) => {
                // Calculate signed offset from activeIndex
                const diff = index - activeIndex;
                const absDiff = Math.abs(diff);

                // Only render cards within 2 steps of center
                if (absDiff > 2) return null;

                // Half-Moon Arc Math:
                // x moves sideways
                // y sags down in a quadratic/parabolic arc (y = diff^2 * 26)
                // rotateZ tilts along the curve tangent
                // rotateY turns towards center
                const isCenter = diff === 0;
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                const xOffset = diff * (isMobile ? 240 : 290);
                const yOffset = Math.pow(diff, 2) * (isMobile ? 18 : 26);
                const rotateYVal = -diff * 15;
                const rotateZVal = diff * 4.5;
                const scaleVal = isCenter ? 1.03 : 1 - absDiff * 0.12;
                const opacityVal = isCenter ? 1 : 1 - absDiff * 0.35;
                const zIndexVal = 20 - absDiff * 5;

                return (
                  <motion.div
                    key={cert.id}
                    onClick={() => {
                      if (isCenter) {
                        setSelectedCert(cert);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                    initial={false}
                    animate={{
                      x: xOffset,
                      y: yOffset,
                      rotateY: rotateYVal,
                      rotateZ: rotateZVal,
                      scale: scaleVal,
                      opacity: opacityVal,
                      zIndex: zIndexVal
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 26,
                      mass: 0.8
                    }}
                    className={`absolute w-[275px] xs:w-[310px] sm:w-[350px] cursor-pointer origin-center ${
                      isCenter ? 'pointer-events-auto' : 'pointer-events-auto hover:opacity-90'
                    }`}
                  >
                    <Card
                      className={`p-6 sm:p-7 flex flex-col justify-between h-[380px] transition-all duration-300 ${
                        isCenter
                          ? 'border-indigo-500/60 dark:border-indigo-400/50 shadow-2xl shadow-indigo-500/20 ring-2 ring-indigo-500/20'
                          : 'border-slate-200/80 dark:border-white/10 shadow-lg backdrop-blur-md'
                      }`}
                      glowEffect={isCenter}
                    >
                      <div>
                        {/* Header with Issuer & Year */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${cert.themeGradient} border border-slate-200/60 dark:border-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm`}>
                              <Award className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {cert.organization}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono">
                                {cert.issuer}
                              </div>
                            </div>
                          </div>

                          <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10">
                            {cert.year}
                          </span>
                        </div>

                        {/* Certificate Title */}
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug line-clamp-2">
                          {cert.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
                          {cert.description}
                        </p>

                        {/* Skills Badges */}
                        {cert.skillsCovered && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {cert.skillsCovered.slice(0, 3).map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/40 dark:border-white/5"
                              >
                                {skill}
                              </span>
                            ))}
                            {cert.skillsCovered.length > 3 && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-400">
                                +{cert.skillsCovered.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCert(cert);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors p-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-white/10"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Controls: Chevrons & Half-Moon Dot Track */}
            <div className="flex flex-col items-center gap-5 mt-4">
              
              {/* Chevron Navigation Arrows */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={prevCert}
                  className="p-3 rounded-full bg-white dark:bg-[#0f172a] hover:bg-indigo-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Half-Moon Dots Indicator Track */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
                  {certifications.map((c, idx) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        idx === activeIndex
                          ? 'w-7 h-2.5 bg-gradient-to-r from-indigo-600 to-cyan-400'
                          : 'w-2.5 h-2.5 bg-slate-300 dark:bg-white/20 hover:bg-indigo-400'
                      }`}
                      aria-label={`Go to certificate ${idx + 1}: ${c.title}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextCert}
                  className="p-3 rounded-full bg-white dark:bg-[#0f172a] hover:bg-indigo-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="Next Certificate"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Helpful UX instruction tip */}
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono text-center">
                Click any certificate to view official pop-up verification • Use ← → keys or swipe to rotate
              </p>
            </div>
          </div>
        ) : (
          /* --- VIEW MODE 2: TRADITIONAL GRID MATRIX --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card
                key={cert.id}
                className="p-6 flex flex-col justify-between cursor-pointer group"
                glowEffect={true}
                onClick={() => setSelectedCert(cert)}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl bg-gradient-to-tr ${cert.themeGradient} text-indigo-600 dark:text-indigo-400`}>
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {cert.issuer || cert.organization}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{cert.issueDate || cert.year}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {cert.description}
                  </p>

                  {cert.skillsCovered && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {cert.skillsCovered.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/40 dark:border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Authenticated
                  </span>

                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>

      {/* Pop-up Certificate Modal */}
      <CertificationModal
        certificate={selectedCert}
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
        onShowToast={onShowToast}
      />
    </section>
  );
}
