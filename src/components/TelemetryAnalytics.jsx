import React, { useState, useEffect } from 'react';
import { Eye, MessageSquare, Activity } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

export function TelemetryAnalytics() {
  const [stats, setStats] = useState(() => ({
    views: null,
    submissions: null,
    loading: Boolean(personalInfo.googleScriptEndpoint)
  }));

  useEffect(() => {
    if (!personalInfo.googleScriptEndpoint) return;

    // Only count as a new view once per browser session
    const isNewSession = typeof window !== 'undefined' && !sessionStorage.getItem('portfolio_view_recorded');
    const actionParam = isNewSession ? 'visit' : 'get';

    fetch(`${personalInfo.googleScriptEndpoint}?action=${actionParam}`)
      .then(res => res.json())
      .then(data => {
        if (isNewSession && typeof window !== 'undefined') {
          sessionStorage.setItem('portfolio_view_recorded', 'true');
        }
        setStats({
          views: typeof data.views === 'number' ? data.views : 1,
          submissions: typeof data.submissions === 'number' ? data.submissions : 0,
          loading: false
        });
      })
      .catch(() => {
        // Fallback gracefully
        setStats({ views: 1, submissions: 0, loading: false });
      });
  }, []);

  return (
    <div id="telemetry" className="w-full mb-8 scroll-mt-20">
      <div className="rounded-2xl bg-white/70 dark:bg-[#0a0f1d]/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Section Indicator */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-900 dark:text-white">
                Live Portfolio Activity
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                REAL-TIME
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Verified global visits and contact inquiries
            </p>
          </div>
        </div>

        {/* Right: The 2 Exact Metrics */}
        <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto justify-center">
          
          {/* 1. Real Portfolio Visitors / Views */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex-1 sm:flex-none">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex-shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div className="text-left min-w-[70px]">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Portfolio Views
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white font-mono">
                {stats.loading ? '...' : (stats.views || 1).toLocaleString()}
              </div>
            </div>
          </div>

          {/* 2. Real Inquiries Submitted */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 flex-1 sm:flex-none">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="text-left min-w-[70px]">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Messages Sent
              </div>
              <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {stats.loading ? '...' : (stats.submissions || 0).toLocaleString()}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
