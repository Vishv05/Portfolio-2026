import React from 'react';

export function Card({
  children,
  className = '',
  hoverEffect = true,
  glowEffect = false,
  as: Component = 'div',
  onClick,
  ...props
}) {
  const baseClasses = `
    relative rounded-2xl overflow-hidden
    bg-white/80 dark:bg-[#0f172a]/70
    backdrop-blur-xl
    border border-slate-200/80 dark:border-white/[0.08]
    shadow-sm dark:shadow-2xl dark:shadow-black/40
    transition-all duration-300
    ${hoverEffect ? 'hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1' : ''}
    ${className}
  `;

  return (
    <Component
      className={baseClasses}
      onClick={onClick}
      {...props}
    >
      {glowEffect && (
        <div className="pointer-events-none absolute -inset-px opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-purple-500/10 rounded-2xl" />
      )}
      {children}
    </Component>
  );
}
