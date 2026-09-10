import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './ui/Icons';

import { personalInfo } from '../data/personalInfo';
import { navigationItems } from '../data/navigation';
import { scrollToSection } from '../utils/helpers';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-white/[0.08] bg-white/50 dark:bg-[#07090e]/80 backdrop-blur-xl relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center font-mono font-bold text-xs text-white">
                  VB
                </div>
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Technology professional combining software engineering, artificial intelligence, data analytics, and user experience design to build meaningful digital solutions.
            </p>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              GLS University • Integrated M.Sc. (IT) '27
            </div>
          </div>

          {/* Navigation Links Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Connect & Code
            </h4>
            <div className="flex items-center gap-3 mb-4">
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-indigo-500/10 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-white/10 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.contact.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-indigo-500/10 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-white/10 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-indigo-500/10 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/60 dark:border-white/10 transition-colors"
                aria-label="Send an email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Open to technological collaborations and career inquiries.
            </div>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-6 border-t border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            © 2026 {personalInfo.name}. All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 group-hover:bg-indigo-500/10 transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
