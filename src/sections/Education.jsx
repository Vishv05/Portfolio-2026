import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { educationHistory } from '../data/education';

export function Education() {
  return (
    <section id="education" className="py-20 md:py-28 relative scroll-mt-16 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Academic Background"
          title="Education &"
          titleHighlight="Qualifications"
          subtitle="Formal academic grounding in information technology, computer science fundamentals, and advanced software engineering."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {educationHistory.map((edu, index) => {
            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8" glowEffect={edu.status === 'Currently Pursuing'}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {edu.degree}
                        </h3>
                        <div className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                          {edu.institution}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {edu.description}
                  </p>

                  {/* Coursework Focus */}
                  {edu.keyFocusAreas && (
                    <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                        Key Curricular & Focus Areas
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {edu.keyFocusAreas.map((focus, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 p-2 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/40 dark:border-white/5"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                            <span>{focus}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
