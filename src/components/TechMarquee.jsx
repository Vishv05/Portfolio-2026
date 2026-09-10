import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Database, Cpu, Palette, Layers, Terminal, Cloud } from 'lucide-react';

const marqueeItems = [
  { name: 'React.js', category: 'Frontend', icon: Code2, color: 'text-cyan-400' },
  { name: 'Python', category: 'Language', icon: Terminal, color: 'text-amber-400' },
  { name: 'Generative AI', category: 'AI/LLMs', icon: Sparkles, color: 'text-purple-400' },
  { name: 'Django', category: 'Backend', icon: Layers, color: 'text-emerald-400' },
  { name: 'FastAPI', category: 'API', icon: Cpu, color: 'text-teal-400' },
  { name: 'Flutter & Dart', category: 'Mobile', icon: Code2, color: 'text-blue-400' },
  { name: 'Vertex AI', category: 'Cloud AI', icon: Cloud, color: 'text-indigo-400' },
  { name: 'SQL & Pandas', category: 'Data', icon: Database, color: 'text-rose-400' },
  { name: 'UI/UX & Figma', category: 'Design', icon: Palette, color: 'text-pink-400' },
  { name: 'BigQuery', category: 'Data Warehouse', icon: Database, color: 'text-blue-500' },
  { name: 'Oracle OCI AI', category: 'Certified', icon: Sparkles, color: 'text-orange-400' },
  { name: 'Tailwind CSS', category: 'Styling', icon: Code2, color: 'text-cyan-500' },
];

export function TechMarquee() {
  // Duplicate for seamless infinite loop
  const doubledItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-[#07090e]/60 backdrop-blur-md select-none">
      
      {/* Side Fade Gradients for smooth entrance/exit */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#f8fafc] dark:from-[#07090e] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#f8fafc] dark:from-[#07090e] to-transparent z-10" />

      {/* Track */}
      <motion.div
        className="flex items-center gap-4 w-max"
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          duration: 32,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {doubledItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-xs hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group flex-shrink-0 cursor-default"
            >
              <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 ${item.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.name}
                </div>
                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  {item.category}
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
