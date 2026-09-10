import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layout, LineChart, Layers, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { professionalHighlights } from '../data/highlights';

const highlightIcons = {
  Sparkles,
  Layout,
  LineChart,
  Layers
};

export function Highlights() {
  return (
    <section className="py-16 md:py-24 relative bg-slate-50/50 dark:bg-white/[0.01] border-y border-slate-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Impact & Milestones"
          title="Professional Highlights &"
          titleHighlight="Key Strengths"
          subtitle="A summary of verified industry certifications, real-world development experience, and cross-functional technical capabilities."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {professionalHighlights.map((hl, index) => {
            const Icon = highlightIcons[hl.icon] || Sparkles;
            return (
              <motion.div
                key={hl.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex"
              >
                <Card className="flex-1 p-6 flex flex-col justify-between" glowEffect={true}>
                  <div>
                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit mb-4">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                      {hl.category}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {hl.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {hl.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Milestone
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
