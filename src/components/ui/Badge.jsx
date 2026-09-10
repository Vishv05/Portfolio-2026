import React from 'react';

const colorStyles = {
  indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
  purple: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
  slate: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
};

export function Badge({ children, color = 'indigo', className = '', size = 'md', icon: Icon }) {
  const sizeStyles = size === 'sm' 
    ? 'text-xs px-2.5 py-0.5' 
    : size === 'lg'
    ? 'text-sm px-3.5 py-1'
    : 'text-xs px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors ${colorStyles[color] || colorStyles.indigo} ${sizeStyles} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      {children}
    </span>
  );
}
