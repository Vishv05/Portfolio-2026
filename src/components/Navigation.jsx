import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, FileText, Search } from 'lucide-react';
import { navigationItems } from '../data/navigation';
import { personalInfo } from '../data/personalInfo';
import { scrollToSection } from '../utils/helpers';
import { Button } from './ui/Button';

export function Navigation({
  activeSection,
  isDark,
  toggleTheme,
  onOpenResume,
  onOpenCommandPalette
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-white/80 dark:bg-[#07090e]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-2xl dark:shadow-black/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-3 cursor-pointer select-none"
          aria-label="Vishv Bhavsar Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-[1.5px] shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <span className="font-bold text-base tracking-tight text-white font-mono">
                VB
              </span>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {personalInfo.name}
            </div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Technology & AI
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06] backdrop-blur-md">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-indigo-600 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-white dark:bg-white/10 shadow-sm border border-slate-200/50 dark:border-white/10 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Action Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Quick Search Button (Command Palette) */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/60 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer"
            aria-label="Search portfolio commands (Ctrl+K or Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/60 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Prominent Resume Button */}
          <Button
            size="sm"
            variant="primary"
            icon={FileText}
            onClick={onOpenResume}
            className="shadow-md shadow-indigo-500/20"
          >
            Resume
          </Button>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          <Button
            size="sm"
            variant="primary"
            onClick={onOpenResume}
            className="!px-3 !py-1.5 !text-xs"
          >
            Resume
          </Button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-pointer"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {/* Search shortcut for mobile */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-sm text-slate-700 dark:text-slate-300 font-medium mb-3 cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-indigo-500" />
                  Quick Command Search
                </span>
                <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10">⌘K</kbd>
              </button>

              {navigationItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
                <Button
                  variant="primary"
                  size="md"
                  icon={FileText}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full"
                >
                  View & Download Resume
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
