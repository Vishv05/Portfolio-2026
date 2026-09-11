import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, ArrowRight, FolderGit2, Moon, Sun, Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';

import { projects } from '../../data/projects';
import { personalInfo } from '../../data/personalInfo';
import { scrollToSection } from '../../utils/helpers';

export function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  isDark,
  toggleTheme,
  onSelectProject
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setQuery('');
        setSelectedIndex(0);
        inputRef.current?.focus();
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Command items collection
  const navigationItems = [
    { id: 'nav-home', title: 'Home', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('home') },
    { id: 'nav-about', title: 'About Me & Focus', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('about') },
    { id: 'nav-skills', title: 'Technical Skills & Domains', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('skills') },
    { id: 'nav-experience', title: 'Work Experience & Internships', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('experience') },
    { id: 'nav-projects', title: 'Featured Projects', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('projects') },
    { id: 'nav-certifications', title: 'Certifications & Credentials', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('certifications') },
    { id: 'nav-education', title: 'Education & GLS University', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('education') },
    { id: 'nav-contact', title: 'Get In Touch / Contact', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('contact') },
    { id: 'nav-telemetry', title: 'Live Telemetry & Web Analytics', category: 'Navigation', icon: ArrowRight, action: () => scrollToSection('telemetry') },
  ];

  const projectItems = projects.map(p => ({
    id: `project-${p.id}`,
    title: p.title,
    subtitle: p.tagline,
    category: 'Projects',
    icon: FolderGit2,
    action: () => {
      onSelectProject(p);
    }
  }));

  const actionItems = [
    {
      id: 'action-resume',
      title: 'View / Download Resume (PDF)',
      subtitle: personalInfo.resume.fileName,
      category: 'Actions',
      icon: FileText,
      action: () => onOpenResume()
    },
    {
      id: 'action-theme',
      title: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`,
      subtitle: `Current theme: ${isDark ? 'Dark' : 'Light'}`,
      category: 'Actions',
      icon: isDark ? Sun : Moon,
      action: () => toggleTheme()
    },
    {
      id: 'action-github',
      title: 'GitHub Profile',
      subtitle: 'github.com/Vishv05',
      category: 'External Links',
      icon: Github,
      action: () => window.open(personalInfo.contact.github, '_blank', 'noopener,noreferrer')
    },
    {
      id: 'action-linkedin',
      title: 'LinkedIn Profile',
      subtitle: 'Connect with Vishv Bhavsar',
      category: 'External Links',
      icon: Linkedin,
      action: () => window.open(personalInfo.contact.linkedIn, '_blank', 'noopener,noreferrer')
    },
    {
      id: 'action-email',
      title: 'Send an Email',
      subtitle: personalInfo.contact.email,
      category: 'External Links',
      icon: Mail,
      action: () => window.open(`mailto:${personalInfo.contact.email}`)
    }
  ];

  const allItems = [...navigationItems, ...projectItems, ...actionItems];

  const filteredItems = query.trim() === ''
    ? allItems
    : allItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (item) => {
    item.action();
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 xs:pt-12 sm:pt-24 px-2.5 sm:px-4 pb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10 text-slate-900 dark:text-slate-100"
            onClick={e => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
              <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command, project, or section..."
                className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-sm md:text-base font-normal"
              />
              <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-400">
                ESC to close
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No matching commands or projects found for "{query}".
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-white/5 text-indigo-500 dark:text-indigo-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{item.title}</div>
                          {item.subtitle && (
                            <div
                              className={`text-xs truncate ${
                                isSelected ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'
                              }`}
                            >
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <span
                        className={`text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200/60 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Bar */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#0b101c] flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Navigate with <kbd className="font-mono bg-slate-200 dark:bg-white/10 px-1 py-0.5 rounded">↑</kbd> <kbd className="font-mono bg-slate-200 dark:bg-white/10 px-1 py-0.5 rounded">↓</kbd></span>
              <span>Select with <kbd className="font-mono bg-slate-200 dark:bg-white/10 px-1 py-0.5 rounded">Enter</kbd></span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
