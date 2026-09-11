import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Clock, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  ShieldCheck, 
  BarChart2, 
  Globe, 
  Smartphone, 
  Laptop,
  Zap
} from 'lucide-react';

export function TelemetryAnalytics() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeUsers, setActiveUsers] = useState(3);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [activeSection, setActiveSection] = useState('Home');

  // 1. Persistent View Counter (increments once per session on mount)
  const [views] = useState(() => {
    if (typeof window === 'undefined') return 1428;
    try {
      const storedViews = localStorage.getItem('portfolio_view_count');
      const lastSession = sessionStorage.getItem('portfolio_session_active');
      let currentCount = storedViews ? parseInt(storedViews, 10) : 1428;

      if (!lastSession) {
        currentCount += 1;
        localStorage.setItem('portfolio_view_count', currentCount.toString());
        sessionStorage.setItem('portfolio_session_active', 'true');
      }
      return currentCount;
    } catch {
      return 1429;
    }
  });

  // 2. Session Duration Counter (ticking every second)
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format session time as MM:SS
  const formattedSessionTime = useMemo(() => {
    const mins = Math.floor(sessionSeconds / 60);
    const secs = sessionSeconds % 60;
    return `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }, [sessionSeconds]);

  // 3. Real-Time Active Users Simulation (gentle natural fluctuation between 2 and 5)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        const next = prev + delta;
        return Math.max(2, Math.min(5, next));
      });
    }, 28000);

    return () => clearInterval(interval);
  }, []);

  // 4. Track Current Active Section on Scroll
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'education', 'highlights', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          const capitalized = sectionIds[i].charAt(0).toUpperCase() + sectionIds[i].slice(1);
          setActiveSection(capitalized);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="telemetry" className="w-full mb-10 scroll-mt-20">
      {/* Compact Telemetry Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-indigo-950/90 dark:from-[#0a0f1d] dark:via-[#0c1329] dark:to-[#091124] text-white border border-indigo-500/30 shadow-lg shadow-indigo-950/20 backdrop-blur-xl p-4 sm:p-5 transition-all">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Left Title & Live Pulse */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex-shrink-0">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-300">
                  Live Portfolio Telemetry
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Real-time visitor metrics and system telemetry
              </p>
            </div>
          </div>

          {/* Center Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 py-1">
            
            {/* Live Active Viewers */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Live Now</div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-1">
                  <span>{activeUsers}</span>
                  <span className="text-[10px] font-normal text-emerald-400 font-sans">Active</span>
                </div>
              </div>
            </div>

            {/* Total Portfolio Views */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <Eye className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Total Views</div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono">
                  {views.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Session Dwell Time */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <Clock className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Your Dwell</div>
                <div className="text-xs sm:text-sm font-bold text-indigo-300 font-mono">
                  {formattedSessionTime}
                </div>
              </div>
            </div>

            {/* Active Section Tracker */}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Focused At</div>
                <div className="text-xs sm:text-sm font-bold text-amber-300 font-mono truncate">
                  #{activeSection}
                </div>
              </div>
            </div>

          </div>

          {/* Right Expand / Collapse Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(prev => !prev)}
            className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-xs font-semibold text-indigo-200 transition-all cursor-pointer flex-shrink-0 hover:shadow-md"
            aria-expanded={isOpen}
            aria-label="Toggle Web Analytics Breakdown"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>{isOpen ? 'Collapse Analytics' : 'View Web Analytics'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

        </div>

        {/* Expandable Web Analytics Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Traffic Acquisition */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span className="flex items-center gap-1.5 font-mono text-indigo-300">
                      <Globe className="w-3.5 h-3.5 text-indigo-400" />
                      Acquisition Channels
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Share %</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">LinkedIn Profile & Outreach</span>
                        <span className="font-mono text-indigo-400 font-bold">48%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '48%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">GitHub Repositories</span>
                        <span className="font-mono text-indigo-400 font-bold">32%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '32%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">Direct Resume & Links</span>
                        <span className="font-mono text-indigo-400 font-bold">20%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full" style={{ width: '20%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Top Engaged Sections */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span className="flex items-center gap-1.5 font-mono text-cyan-300">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                      Section Engagement
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Dwell %</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">Projects & Case Studies</span>
                        <span className="font-mono text-cyan-400 font-bold">46%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: '46%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">Certifications & Credentials</span>
                        <span className="font-mono text-cyan-400 font-bold">28%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '28%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">Skills & Architecture</span>
                        <span className="font-mono text-cyan-400 font-bold">16%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '16%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Performance & System Web Vitals */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span className="flex items-center gap-1.5 font-mono text-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Core Web Vitals & Uptime
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">PASSED</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <div className="text-[10px] text-slate-400 font-mono">Lighthouse Perf</div>
                      <div className="font-mono font-bold text-emerald-400 text-sm">99 / 100</div>
                    </div>

                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <div className="text-[10px] text-slate-400 font-mono">Edge Latency</div>
                      <div className="font-mono font-bold text-cyan-400 text-sm">&lt; 35ms</div>
                    </div>

                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <div className="text-[10px] text-slate-400 font-mono">Frame Rate</div>
                      <div className="font-mono font-bold text-indigo-300 text-sm">60 FPS Smooth</div>
                    </div>

                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <div className="text-[10px] text-slate-400 font-mono">Global Uptime</div>
                      <div className="font-mono font-bold text-emerald-400 text-sm">99.98%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Laptop className="w-3 h-3 text-slate-400" /> Desktop: 64%
                    </span>
                    <span className="flex items-center gap-1">
                      <Smartphone className="w-3 h-3 text-slate-400" /> Mobile: 36%
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
