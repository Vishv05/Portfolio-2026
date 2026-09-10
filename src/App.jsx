import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Navigation } from './components/Navigation';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Toast } from './components/ui/Toast';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/ui/CommandPalette';

import { TechMarquee } from './components/TechMarquee';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Certifications } from './sections/Certifications';
import { Education } from './sections/Education';
import { Highlights } from './sections/Highlights';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';


const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'certifications',
  'education',
  'contact'
];

export function App() {
  const { toggleTheme, isDark } = useTheme();
  const activeSection = useScrollSpy(SECTION_IDS, 140);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

  // Global keyboard shortcut for Command Palette (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ isOpen: true, message, type });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-[#0f172a] dark:bg-[#07090e] dark:text-[#f9fafb] selection:bg-indigo-500/30 selection:text-indigo-200 transition-colors duration-300 font-sans">
      {/* Scroll Progress Bar at the top */}
      <ScrollProgress />

      {/* Global Background Tech Grid */}
      <div className="fixed inset-0 bg-tech-grid pointer-events-none opacity-40 -z-20" />
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none -z-10" />

      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        <Hero
          isDark={isDark}
          onOpenResume={() => setIsResumeModalOpen(true)}
          onShowToast={showToast}
        />

        
        {/* Infinite Tech Marquee Ribbon */}
        <TechMarquee />

        <About onShowToast={showToast} />
        <Skills onSelectProject={(project) => setSelectedProject(project)} />
        <Experience />
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
        />
        <Certifications onShowToast={showToast} />
        <Education />
        <Highlights />
        <Contact onShowToast={showToast} />
      </main>


      {/* Footer */}
      <Footer />

      {/* Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      {/* Resume Viewer & Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeModalOpen(true)}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onSelectProject={(project) => {
          setSelectedProject(project);
          setIsCommandPaletteOpen(false);
        }}
      />

      {/* Global Toast Feedback */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />
    </div>
  );
}

export default App;
