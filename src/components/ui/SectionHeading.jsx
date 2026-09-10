import React from 'react';
import { motion } from 'framer-motion';

export function SectionHeading({
  badgeText,
  title,
  titleHighlight,
  subtitle,
  align = 'center',
  className = ''
}) {
  const isCentered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${isCentered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}
    >
      {badgeText && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-3 ${isCentered ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          {badgeText}
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.2] sm:leading-[1.15]">
        {title}{' '}
        {titleHighlight && (
          <span className="gradient-text-primary bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
