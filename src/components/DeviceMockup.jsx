import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor, Smartphone, TrendingUp, ArrowRight,
  CheckCircle2, FileText, Sparkles,
  Bell, CreditCard, Send, Activity,
  Phone, Mail, Terminal, Zap,
  Wifi, Battery, Flame, Camera, Sliders
} from 'lucide-react';

export function DeviceMockup({ project, onOpenCaseStudy }) {
  const [deviceType, setDeviceType] = useState('desktop'); // 'desktop' or 'mobile'

  if (!project) return null;

  /* =========================================================================
     PROJECT 1: SMARTSPEND (Personal Finance EDA & Trends)
     ========================================================================= */
  const renderSmartSpendDesktop = () => (
    <div className="p-4 sm:p-5 space-y-3 bg-slate-950 text-slate-100 font-sans h-full overflow-y-auto custom-scrollbar">
      {/* Desktop Dashboard Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-indigo-500/30">
            ₹
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>SmartSpend Analytics</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">EDA Engine v2.4</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
          <span className="hidden sm:inline bg-slate-900 px-2 py-0.5 rounded border border-slate-800">📅 Oct 2025 – Mar 2026</span>
          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Pandas Normalized</span>
        </div>
      </div>

      {/* Top 3 Desktop KPI Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-indigo-500/30">
          <div className="text-[10px] text-slate-400 font-mono">Monthly Total Outflow</div>
          <div className="text-base sm:text-lg font-bold text-white tracking-tight">₹42,850</div>
          <div className="text-[9px] text-emerald-400 font-mono flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> -6.4% MoM Variance
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">Essential vs. Discretionary</div>
          <div className="text-base sm:text-lg font-bold text-cyan-400 tracking-tight">62.5% / 22.5%</div>
          <div className="text-[9px] text-slate-400 font-mono mt-0.5">Discretionary within safety cap</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">Savings Runway Forecast</div>
          <div className="text-base sm:text-lg font-bold text-emerald-400 tracking-tight">4.8 Months</div>
          <div className="text-[9px] text-emerald-400 font-mono mt-0.5">+0.6 mo vs Q3 benchmark</div>
        </div>
      </div>

      {/* Desktop 2-Column Split: Spending Breakdown & Transaction Audit Ledger */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
        {/* Left Column: Category Bars */}
        <div className="sm:col-span-6 p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200">
            <span>Spending Distribution (EDA)</span>
            <span className="text-indigo-400 text-[9px] font-mono">Clustered</span>
          </div>
          <div className="space-y-1.5 pt-0.5 text-[10px]">
            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span>Rent & Housing (Fixed)</span>
                <span className="text-slate-200 font-mono">₹22,000 (51%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-indigo-500 w-[51%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span>Groceries & Nutrition</span>
                <span className="text-slate-200 font-mono">₹9,500 (22%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-cyan-500 w-[22%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span className="flex items-center gap-1">Lifestyle & Dining <span className="text-[8px] text-amber-400 font-mono px-1 rounded bg-amber-500/10">+18% spike</span></span>
                <span className="text-slate-200 font-mono">₹6,150 (14%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-amber-500 w-[14%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Audit Ledger Table */}
        <div className="sm:col-span-6 p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200">
            <span>Transaction Audit Log</span>
            <span className="text-emerald-400 text-[9px] font-mono">0 Outliers</span>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/60">
              <div>
                <div className="font-semibold text-white">FreshMart Organic</div>
                <div className="text-[8px] text-slate-400">Essential Grocery</div>
              </div>
              <span className="font-mono text-slate-200">-₹1,420</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/60">
              <div>
                <div className="font-semibold text-white">AWS Cloud Services</div>
                <div className="text-[8px] text-slate-400">Fixed Infrastructure</div>
              </div>
              <span className="font-mono text-slate-200">-₹1,850</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/60">
              <div>
                <div className="font-semibold text-white">Highland Bistro</div>
                <div className="text-[8px] text-amber-400">Discretionary Dining</div>
              </div>
              <span className="font-mono text-amber-300">-₹3,200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSmartSpendMobile = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans select-none">
      {/* Smartphone Top Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-[10px] font-mono text-slate-400 border-b border-slate-900">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-xs">
          <Wifi className="w-3 h-3" />
          <span className="text-[9px] font-bold">5G</span>
          <Battery className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>

      {/* Mobile App Header */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            VB
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Welcome back</div>
            <div className="text-xs font-bold text-white">Vishv's Wallet</div>
          </div>
        </div>
        <div className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 relative">
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
        </div>
      </div>

      {/* Scrollable Mobile App Body */}
      <div className="flex-1 px-3 py-1 space-y-2.5 overflow-y-auto custom-scrollbar">
        {/* Sleek Virtual Debit Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden border border-indigo-400/30">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[9px] font-mono tracking-widest uppercase opacity-80">SmartSpend Premier</span>
            <span className="text-[10px] font-bold tracking-wider">VISA</span>
          </div>
          <div className="text-lg font-bold tracking-tight mb-2">₹1,24,850.00</div>
          <div className="flex justify-between items-end text-[9px] font-mono opacity-80">
            <span>•••• 7842</span>
            <span>08/29</span>
          </div>
        </div>

        {/* 4 Quick Actions Pills */}
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <button type="button" className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-1">
            <Send className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[9px] text-slate-300">Send</span>
          </button>
          <button type="button" className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[9px] text-slate-300">EDA</span>
          </button>
          <button type="button" className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[9px] text-slate-300">Budget</span>
          </button>
          <button type="button" className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-1">
            <CreditCard className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[9px] text-slate-300">Cards</span>
          </button>
        </div>

        {/* Monthly Budget Progress Ring / Bar */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-300 font-semibold">March Budget Cap</span>
            <span className="text-indigo-400 font-mono">85% Used</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-[85%]" />
          </div>
          <div className="flex justify-between text-[8px] text-slate-400 font-mono pt-0.5">
            <span>₹42,850 of ₹50,000</span>
            <span>11 days left</span>
          </div>
        </div>

        {/* Mobile Recent Transactions */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-semibold text-slate-400 px-1">Recent Activity</div>
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                FM
              </div>
              <div>
                <div className="font-semibold text-white">FreshMart Supermarket</div>
                <div className="text-[8px] text-slate-400">Grocery • Today, 2:45 PM</div>
              </div>
            </div>
            <span className="font-mono text-slate-200">-₹1,420</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                FP
              </div>
              <div>
                <div className="font-semibold text-white">Client Payout</div>
                <div className="text-[8px] text-slate-400">Direct Deposit • Yesterday</div>
              </div>
            </div>
            <span className="font-mono text-emerald-400 font-bold">+₹28,500</span>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="grid grid-cols-4 py-1.5 px-2 bg-slate-900/90 border-t border-slate-800 text-center text-[9px]">
        <div className="flex flex-col items-center text-indigo-400 font-bold">
          <span className="text-xs">🏠</span>
          <span>Home</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">📈</span>
          <span>Analytics</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">💳</span>
          <span>Cards</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">👤</span>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );

  /* =========================================================================
     PROJECT 2: CUSTOMER MANAGEMENT SYSTEM (Full-Stack Django CRM)
     ========================================================================= */
  const renderCrmDesktop = () => (
    <div className="p-4 sm:p-5 space-y-3 bg-slate-950 text-slate-100 font-sans h-full overflow-y-auto custom-scrollbar">
      {/* Desktop CRM Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-purple-500/30">
            CRM
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>ApexCRM Enterprise Platform</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Django 5 + React</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-slate-400">Pipeline: <strong className="text-purple-400">$482,000</strong></span>
          <span className="bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20">Admin Role (RBAC)</span>
        </div>
      </div>

      {/* 4-Column Sales Pipeline Kanban Board */}
      <div className="grid grid-cols-4 gap-2 pt-1">
        {/* Column 1: Discovery */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pb-1 border-b border-slate-800">
            <span>Discovery (2)</span>
            <span className="text-slate-500 font-mono">$73k</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[10px]">
            <div className="font-semibold text-white truncate">Acme Logistics</div>
            <div className="text-purple-400 font-mono text-[9px]">$45,000 ARR</div>
            <div className="flex justify-between text-[8px] text-slate-400">
              <span>12 Seats</span>
              <span className="px-1 rounded bg-blue-500/20 text-blue-300">New Lead</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[10px]">
            <div className="font-semibold text-white truncate">BioGen Pharma</div>
            <div className="text-purple-400 font-mono text-[9px]">$28,000 ARR</div>
            <div className="flex justify-between text-[8px] text-slate-400">
              <span>Trial Expiring</span>
              <span className="px-1 rounded bg-slate-700 text-slate-300">Follow-up</span>
            </div>
          </div>
        </div>

        {/* Column 2: Proposal Sent */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pb-1 border-b border-slate-800">
            <span>Proposal (2)</span>
            <span className="text-slate-500 font-mono">$123k</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-purple-500/30 space-y-1 text-[10px]">
            <div className="font-semibold text-white truncate">TechFlow Global</div>
            <div className="text-purple-300 font-mono text-[9px]">$85,000 ARR</div>
            <div className="flex justify-between text-[8px] text-slate-400">
              <span>Custom SLA</span>
              <span className="px-1 rounded bg-amber-500/20 text-amber-300">In Review</span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[10px]">
            <div className="font-semibold text-white truncate">Vanguard Retail</div>
            <div className="text-purple-400 font-mono text-[9px]">$38,000 ARR</div>
            <div className="flex justify-between text-[8px] text-slate-400">
              <span>Security Sign</span>
              <span className="px-1 rounded bg-indigo-500/20 text-indigo-300">Review</span>
            </div>
          </div>
        </div>

        {/* Column 3: Negotiation */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pb-1 border-b border-slate-800">
            <span>Negotiation (1)</span>
            <span className="text-slate-500 font-mono">$120k</span>
          </div>
          <div className="p-2 rounded-lg bg-purple-950/30 border border-purple-500/40 space-y-1 text-[10px]">
            <div className="font-semibold text-purple-200 truncate">CloudScale Systems</div>
            <div className="text-emerald-400 font-mono text-[9px] font-bold">$120,000 ARR</div>
            <div className="flex justify-between text-[8px]">
              <span className="text-slate-300">Final Exec Sign</span>
              <span className="px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">90% Win</span>
            </div>
          </div>
        </div>

        {/* Column 4: Closed Won */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pb-1 border-b border-slate-800">
            <span>Closed Won (1)</span>
            <span className="text-emerald-400 font-mono">$166k</span>
          </div>
          <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-1 text-[10px]">
            <div className="font-semibold text-emerald-200 truncate">FinTech Prime</div>
            <div className="text-emerald-400 font-mono text-[9px] font-bold">$166,000 ARR</div>
            <div className="flex justify-between text-[8px]">
              <span className="text-slate-300">2-Year Contract</span>
              <span className="px-1 rounded bg-emerald-500/30 text-emerald-200 font-mono">Won</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Postgres DB Latency Status */}
      <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-[9px] font-mono text-slate-400">
        <span>PostgreSQL Relational Engine: Sub-42ms API response</span>
        <span className="text-emerald-400">148 Enterprise Clients Synchronized</span>
      </div>
    </div>
  );

  const renderCrmMobile = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans select-none">
      {/* Smartphone Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-[10px] font-mono text-slate-400 border-b border-slate-900">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-xs">
          <Wifi className="w-3 h-3" />
          <Battery className="w-3.5 h-3.5 text-purple-400" />
        </div>
      </div>

      {/* Mobile App Header */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-slate-900">
        <div>
          <div className="text-[10px] text-purple-400 font-mono font-semibold">ApexCRM Mobile</div>
          <div className="text-xs font-bold text-white">Deals Radar</div>
        </div>
        <div className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
          $482k Active
        </div>
      </div>

      {/* Mobile Body */}
      <div className="flex-1 px-3 py-2 space-y-2.5 overflow-y-auto custom-scrollbar">
        {/* Urgent Action Alert */}
        <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <div className="text-[10px]">
            <span className="font-bold text-purple-200">2 Critical Deals</span>
            <div className="text-[8px] text-slate-300">Require executive sign-off before 5:00 PM today.</div>
          </div>
        </div>

        {/* Highlighted Deal Card */}
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-white">CloudScale Systems</span>
              <div className="text-[9px] text-slate-400">Sarah Jenkins • VP Operations</div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">$120,000</span>
          </div>

          <div className="space-y-1 text-[9px]">
            <div className="flex justify-between text-slate-400">
              <span>Stage: Contract Negotiation</span>
              <span className="text-purple-400 font-mono">Stage 4 of 5</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-purple-500 w-[80%]" />
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button type="button" className="py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[9px] flex items-center justify-center gap-1">
              <Phone className="w-2.5 h-2.5 text-emerald-400" /> Call
            </button>
            <button type="button" className="py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[9px] flex items-center justify-center gap-1">
              <Mail className="w-2.5 h-2.5 text-cyan-400" /> Email
            </button>
            <button type="button" className="py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[9px] font-semibold flex items-center justify-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" /> Sign
            </button>
          </div>
        </div>

        {/* Secondary Deal Card */}
        <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between text-[10px]">
          <div>
            <div className="font-semibold text-white">TechFlow Global</div>
            <div className="text-[8px] text-slate-400">Proposal In Review • Custom SLA</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-purple-300 font-bold">$85,000</div>
            <span className="text-[8px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">Pending</span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="grid grid-cols-4 py-1.5 px-2 bg-slate-900/90 border-t border-slate-800 text-center text-[9px]">
        <div className="flex flex-col items-center text-purple-400 font-bold">
          <span className="text-xs">🗂️</span>
          <span>Deals</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">👥</span>
          <span>Clients</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">📊</span>
          <span>Reports</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">⚙️</span>
          <span>Settings</span>
        </div>
      </div>
    </div>
  );

  /* =========================================================================
     PROJECT 3: LEDGERLENS (Google GenAI APAC 2026 Multimodal Auditor)
     ========================================================================= */
  const renderLedgerLensDesktop = () => (
    <div className="p-4 sm:p-5 space-y-3 bg-slate-950 text-slate-100 font-sans h-full overflow-y-auto custom-scrollbar">
      {/* Desktop Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>LedgerLens • Google GenAI APAC 2026</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Gemini 1.5 Pro</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">100% Reconciled</span>
          <span className="text-slate-400">0 Variances</span>
        </div>
      </div>

      {/* Dual-Pane Layout: Document OCR Inspector + Gemini AI Console */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
        {/* Left Pane: Simulated Document with OCR Bounding Boxes */}
        <div className="sm:col-span-6 p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-300">
            <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-cyan-400" /> Balance_Sheet_FY25.pdf</span>
            <span className="text-[9px] font-mono text-cyan-400">Page 3 of 8</span>
          </div>

          {/* Simulated PDF document surface with green OCR boxes */}
          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5 font-mono text-[9px]">
            <div className="p-1 rounded bg-emerald-500/10 border border-emerald-500/40 flex justify-between items-center text-emerald-300">
              <span>[OCR Box 1] Total Current Assets</span>
              <span className="font-bold">$4,850,000 (99.8%)</span>
            </div>
            <div className="p-1 rounded bg-cyan-500/10 border border-cyan-500/40 flex justify-between items-center text-cyan-300">
              <span>[OCR Box 2] Operating Liabilities</span>
              <span className="font-bold">$1,690,000 (99.6%)</span>
            </div>
            <div className="p-1 rounded bg-indigo-500/10 border border-indigo-500/40 flex justify-between items-center text-indigo-300">
              <span>[OCR Box 3] Retained Net Earnings</span>
              <span className="font-bold">$3,160,000 (100%)</span>
            </div>
          </div>
        </div>

        {/* Right Pane: Gemini Structured JSON & Intelligence Console */}
        <div className="sm:col-span-6 p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-300">
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-cyan-400" /> Gemini Audit Verdict</span>
            <span className="text-[9px] font-mono text-emerald-400">Pydantic Validated</span>
          </div>

          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[9px] text-slate-300 space-y-1">
            <div className="text-cyan-400">// Structured JSON Extraction Mode</div>
            <div>&#123;</div>
            <div className="pl-2 text-slate-400">"discrepancies": <span className="text-emerald-400">0</span>,</div>
            <div className="pl-2 text-slate-400">"variance_rate": <span className="text-emerald-400">"0.00%"</span>,</div>
            <div className="pl-2 text-slate-400">"compliance_status": <span className="text-cyan-300">"GAAP / IFRS-16 Passed"</span></div>
            <div>&#125;</div>
          </div>
        </div>
      </div>

      {/* Bottom GenAI APAC Footer */}
      <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between text-[9px] font-mono text-cyan-200">
        <span>Vertex AI Multimodal Pipeline • Sub-1.2s Multi-Page PDF Extraction</span>
        <span className="text-emerald-400 font-bold">Zero Hallucinations Verified</span>
      </div>
    </div>
  );

  const renderLedgerLensMobile = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans select-none">
      {/* Smartphone Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-[10px] font-mono text-slate-400 border-b border-slate-900">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-xs">
          <Wifi className="w-3 h-3" />
          <Battery className="w-3.5 h-3.5 text-cyan-400" />
        </div>
      </div>

      {/* Mobile App Header */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white">LedgerLens AI Scanner</span>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          Gemini Flash
        </span>
      </div>

      {/* Mobile Camera Viewfinder & Real-Time Invoice Extraction */}
      <div className="flex-1 px-3 py-2 space-y-2.5 overflow-y-auto custom-scrollbar">
        {/* Camera Reticle Container */}
        <div className="relative h-32 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-3">
          {/* Laser Scan Line Effect */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse shadow-sm shadow-cyan-400" />
          
          {/* Simulated invoice in viewfinder */}
          <div className="w-40 p-2 rounded bg-slate-950/80 border border-cyan-500/40 text-[8px] font-mono text-slate-300 space-y-0.5 text-center">
            <div className="text-cyan-300 font-bold">INVOICE #INV-2026-904</div>
            <div className="text-slate-400">Google Cloud Platform</div>
            <div className="text-emerald-400 font-bold">$3,420.50 USD</div>
          </div>
          
          {/* Camera Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
        </div>

        {/* Live Extracted Bottom Sheet */}
        <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-white flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Invoice Extracted
            </span>
            <span className="text-emerald-400 font-mono text-[9px]">99.8% Match</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono">
            <div className="p-1 rounded bg-slate-950">
              <div className="text-slate-400">Total Bill</div>
              <div className="text-white font-bold">$3,420.50</div>
            </div>
            <div className="p-1 rounded bg-slate-950">
              <div className="text-slate-400">Tax Breakdown</div>
              <div className="text-cyan-300 font-bold">GST: $615.69</div>
            </div>
          </div>
        </div>

        {/* Bottom AI Query Pill */}
        <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-[9px]">
          <span className="text-cyan-200">Ask Gemini: "Flag irregular deductions?"</span>
          <Send className="w-3 h-3 text-cyan-400" />
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="grid grid-cols-4 py-1.5 px-2 bg-slate-900/90 border-t border-slate-800 text-center text-[9px]">
        <div className="flex flex-col items-center text-cyan-400 font-bold">
          <span className="text-xs">📷</span>
          <span>Scanner</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">📋</span>
          <span>Ledgers</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">🤖</span>
          <span>Gemini AI</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">📑</span>
          <span>Export</span>
        </div>
      </div>
    </div>
  );

  /* =========================================================================
     PROJECT 4: TALENTLENS (AI E-Learning & Student Performance Analytics)
     ========================================================================= */
  const renderTalentLensDesktop = () => (
    <div className="p-4 sm:p-5 space-y-3 bg-slate-950 text-slate-100 font-sans h-full overflow-y-auto custom-scrollbar">
      {/* Desktop Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-emerald-500/30">
            AML
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>TalentLens Educator HUD</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Scikit-Learn AML</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-slate-400">Course: CS-402 Machine Learning</span>
          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">94.6% Predictive Acc</span>
        </div>
      </div>

      {/* Top 4 Metrics Strip */}
      <div className="grid grid-cols-4 gap-2">
        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-[9px] text-slate-400 font-mono">Cohort Enrolled</div>
          <div className="text-sm font-bold text-white">184</div>
        </div>
        <div className="p-2 rounded-xl bg-slate-900 border border-rose-500/30 text-center">
          <div className="text-[9px] text-rose-400 font-mono">Early Risk Flagged</div>
          <div className="text-sm font-bold text-rose-400">12 (6.5%)</div>
        </div>
        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-[9px] text-slate-400 font-mono">Quiz Mastery Avg</div>
          <div className="text-sm font-bold text-emerald-400">84.2%</div>
        </div>
        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
          <div className="text-[9px] text-slate-400 font-mono">Adaptive Actions</div>
          <div className="text-sm font-bold text-cyan-400">28 Sent</div>
        </div>
      </div>

      {/* Split View: Cohort Risk Tiers + Student Intervention Table */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
        {/* Left: Risk Distribution */}
        <div className="sm:col-span-5 p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-[10px] font-bold text-slate-300">Cohort Drop-out Risk Tiers</div>
          <div className="space-y-1.5 text-[10px]">
            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span className="text-emerald-400">Low Risk (Excelling)</span>
                <span className="font-mono">138 (75%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-emerald-500 w-[75%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span className="text-amber-400">Medium Risk (Watch)</span>
                <span className="font-mono">34 (18.5%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-amber-500 w-[18.5%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-400 mb-0.5">
                <span className="text-rose-400">High Risk (Intervene)</span>
                <span className="font-mono">12 (6.5%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-rose-500 w-[6.5%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Intervention Action Roster */}
        <div className="sm:col-span-7 p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-[10px]">
          <div className="text-[10px] font-bold text-slate-300">Priority Interventions</div>
          <div className="flex items-center justify-between p-1.5 rounded bg-slate-950 border border-rose-500/20">
            <div>
              <span className="font-bold text-white">Alex Chen</span>
              <div className="text-[8px] text-rose-400">Risk: 88% • Gap: Neural Backprop</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[9px]">Send Remedial</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded bg-slate-950 border border-amber-500/20">
            <div>
              <span className="font-bold text-white">Priya Sharma</span>
              <div className="text-[8px] text-amber-400">Risk: 42% • Gap: Loss Functions</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px]">Assign Mentor</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTalentLensMobile = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans select-none">
      {/* Smartphone Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-[10px] font-mono text-slate-400 border-b border-slate-900">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-xs">
          <Wifi className="w-3 h-3" />
          <Battery className="w-3.5 h-3.5 text-emerald-400" />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            AL
          </div>
          <div>
            <div className="text-[10px] text-slate-400">TalentLens Learner</div>
            <div className="text-xs font-bold text-white">Alex's Study Hub</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
          <Flame className="w-3 h-3 text-amber-400" /> 14 Days
        </div>
      </div>

      {/* Mobile Body */}
      <div className="flex-1 px-3 py-2 space-y-2.5 overflow-y-auto custom-scrollbar">
        {/* Course Performance Hero Dial */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-semibold text-slate-300">Machine Learning CS-402</span>
            <span className="text-emerald-400 font-mono font-bold">Predicted: A (92%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-emerald-500 w-[84%]" />
          </div>
          <div className="flex justify-between text-[8px] text-slate-400 font-mono">
            <span>84% Syllabus Completed</span>
            <span>Module 7 / 8</span>
          </div>
        </div>

        {/* Adaptive Intervention Prompt */}
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Personalized Recommendation</span>
          </div>
          <p className="text-[9px] text-slate-300">
            A 15-minute drill on <strong>Neural Loss Functions</strong> will boost your course completion probability by <strong>+14%</strong>.
          </p>
          <button type="button" className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10px] flex items-center justify-center gap-1">
            <span>Start Adaptive Quiz</span> <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Skill Gap Matrix */}
        <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 text-[9px]">
          <div className="font-semibold text-slate-400">Concept Mastery</div>
          <div className="flex justify-between text-slate-300">
            <span>Python Feature Engineering</span>
            <span className="text-emerald-400 font-mono">96%</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Ensemble Models (RandomForest)</span>
            <span className="text-emerald-400 font-mono">89%</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Backpropagation Gradients</span>
            <span className="text-rose-400 font-mono">62% (Gap)</span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="grid grid-cols-4 py-1.5 px-2 bg-slate-900/90 border-t border-slate-800 text-center text-[9px]">
        <div className="flex flex-col items-center text-emerald-400 font-bold">
          <span className="text-xs">📚</span>
          <span>Learn</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">🎯</span>
          <span>Radar</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">🏆</span>
          <span>Ranks</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">👤</span>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );

  /* =========================================================================
     PROJECT 5: LOGINTEL (High-Performance Log Analytics & Telemetry)
     ========================================================================= */
  const renderLogIntelDesktop = () => (
    <div className="p-4 sm:p-5 space-y-3 bg-slate-950 text-slate-100 font-sans h-full overflow-y-auto custom-scrollbar">
      {/* Desktop Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-amber-500/30">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>LogIntel DevOps NOC Console</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Telemetry Stream</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-amber-400">Throughput: <strong>142,500 logs/s</strong></span>
          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">MTTD &lt; 250ms</span>
        </div>
      </div>

      {/* Server Node Cluster Heartbeat Grid */}
      <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
        <div className="p-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 flex items-center justify-between">
          <span className="text-slate-300">node-01</span>
          <span className="text-emerald-400">OK (12ms)</span>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 flex items-center justify-between">
          <span className="text-slate-300">node-02</span>
          <span className="text-emerald-400">OK (14ms)</span>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 flex items-center justify-between">
          <span className="text-slate-300">node-03</span>
          <span className="text-emerald-400">OK (9ms)</span>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-900 border border-amber-500/30 flex items-center justify-between">
          <span className="text-slate-300">node-04</span>
          <span className="text-amber-400">78% load</span>
        </div>
      </div>

      {/* Live Monospace Terminal Log Stream */}
      <div className="p-2.5 rounded-xl bg-black border border-slate-800 space-y-1 font-mono text-[9px] text-slate-300 leading-relaxed">
        <div className="text-slate-500">// Real-time regex parsed telemetry stream (Nginx / Syslog)</div>
        <div className="text-emerald-400">[11:58:14.002] 200 GET /api/v2/telemetry/stream - 4ms [node-01]</div>
        <div className="text-slate-300">[11:58:14.015] 200 POST /v1/auth/session/verify - 12ms [node-03]</div>
        <div className="text-amber-400">[11:58:14.028] 304 GET /assets/bundle.js - cached</div>
        <div className="text-cyan-400">[11:58:14.041] [MODEL] Sliding-window variance: 0.04 (Within 1.2-sigma threshold)</div>
        <div className="text-emerald-400">[11:58:14.055] 200 GET /healthz - 1ms - OK</div>
      </div>

      {/* Bottom Observability Metrics Strip */}
      <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-[9px] font-mono text-slate-400">
        <span>Anomaly Engine: Active (Regex + NumPy)</span>
        <span className="text-emerald-400 font-bold">5xx Error Rate: 0.001% • P99: 18.2ms</span>
      </div>
    </div>
  );

  const renderLogIntelMobile = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans select-none">
      {/* Smartphone Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-[10px] font-mono text-slate-400 border-b border-slate-900">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-xs">
          <Wifi className="w-3 h-3" />
          <Battery className="w-3.5 h-3.5 text-amber-400" />
        </div>
      </div>

      {/* Mobile App Header */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-slate-900">
        <div className="flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-bold text-white">LogIntel On-Call</span>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          All Green
        </span>
      </div>

      {/* Mobile Body */}
      <div className="flex-1 px-3 py-2 space-y-2.5 overflow-y-auto custom-scrollbar">
        {/* System Uptime Badge Card */}
        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-400 font-mono">30-Day Cluster Uptime</span>
            <span className="text-emerald-400 font-mono font-bold">99.994%</span>
          </div>
          <div className="text-base font-bold text-white">Prod Kubernetes East</div>
          <div className="text-[8px] text-slate-400 font-mono">0 active outages • 16 microservices online</div>
        </div>

        {/* Resolved Incident Card */}
        <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-amber-300">Incident #INC-4029 [RESOLVED]</span>
            <span className="text-[8px] font-mono px-1 rounded bg-emerald-500/20 text-emerald-300">180ms Auto-Fix</span>
          </div>
          <p className="text-[8px] text-slate-300">
            502 Bad Gateway spike auto-mitigated via container autoscaling in under 250ms.
          </p>
          <div className="flex gap-1.5 pt-0.5">
            <button type="button" className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[8px] font-mono">View RCA</button>
            <button type="button" className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[8px] font-mono">Ack Alert</button>
          </div>
        </div>

        {/* Microservices Latency List */}
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-[9px] font-mono">
          <div className="flex justify-between items-center text-slate-300">
            <span>API Gateway</span>
            <span className="text-emerald-400">🟢 14ms (0% err)</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Auth Service</span>
            <span className="text-emerald-400">🟢 8ms (0% err)</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Redis Cache</span>
            <span className="text-emerald-400">🟢 2.1ms (84% hit)</span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="grid grid-cols-4 py-1.5 px-2 bg-slate-900/90 border-t border-slate-800 text-center text-[9px]">
        <div className="flex flex-col items-center text-amber-400 font-bold">
          <span className="text-xs">🚨</span>
          <span>On-Call</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">📊</span>
          <span>Metrics</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">📋</span>
          <span>Logs</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-xs">🔔</span>
          <span>Alerts</span>
        </div>
      </div>
    </div>
  );

  /* Helper to pick Desktop UI */
  const renderDesktopUI = () => {
    switch (project.id) {
      case 'smartspend':
        return renderSmartSpendDesktop();
      case 'customer-management-system':
        return renderCrmDesktop();
      case 'ledgerlens':
        return renderLedgerLensDesktop();
      case 'talentlens':
        return renderTalentLensDesktop();
      case 'logintel':
        return renderLogIntelDesktop();
      default:
        return renderSmartSpendDesktop();
    }
  };

  /* Helper to pick Mobile UI */
  const renderMobileUI = () => {
    switch (project.id) {
      case 'smartspend':
        return renderSmartSpendMobile();
      case 'customer-management-system':
        return renderCrmMobile();
      case 'ledgerlens':
        return renderLedgerLensMobile();
      case 'talentlens':
        return renderTalentLensMobile();
      case 'logintel':
        return renderLogIntelMobile();
      default:
        return renderSmartSpendMobile();
    }
  };

  /* Custom Frame Header for Desktop */
  const renderDesktopFrameHeader = () => {
    switch (project.id) {
      case 'smartspend':
        return (
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900 border-b border-indigo-500/20 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] font-mono text-indigo-300 font-semibold hidden xs:inline ml-1">
                SmartSpend Studio • EDA Workspace
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] font-mono text-slate-400">
              <span className="text-emerald-400">● Live EDA</span>
              <span className="text-slate-600">|</span>
              <span>₹ INR</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-indigo-300">Pandas Engine</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              v2.4
            </span>
          </div>
        );

      case 'customer-management-system':
        return (
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900 border-b border-purple-500/20 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-medium ml-1">
                <span className="px-1.5 py-0.5 rounded bg-purple-600 text-white font-bold text-[9px]">Acme CRM</span>
                <span className="text-slate-400 hidden sm:inline">/ Pipelines / Deals</span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] font-mono text-slate-400">
              <span className="text-purple-400 font-bold">$482k Active</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400">PostgreSQL Synced</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">Admin RBAC</span>
          </div>
        );

      case 'ledgerlens':
        return (
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900 border-b border-cyan-500/30 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-cyan-200 ml-1">
                <span className="text-cyan-400">☁️ Vertex AI</span>
                <span className="text-slate-600">/</span>
                <span className="hidden sm:inline text-slate-300">LedgerLens Auditor</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-[9px] font-mono text-cyan-300">
              <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Gemini 1.5 Pro Multimodal</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">0 Variances</span>
          </div>
        );

      case 'talentlens':
        return (
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900 border-b border-emerald-500/20 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white ml-1">
                <span className="text-emerald-400">🎓 TalentLens LMS</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="text-slate-400 hidden sm:inline">CS-402 Cohort</span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[9px] font-mono">
              <span className="text-slate-400">ML Acc:</span>
              <span className="text-emerald-400 font-bold">94.6%</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">FastAPI</span>
          </div>
        );

      case 'logintel':
        return (
          <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-black border-b border-amber-500/30 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] text-amber-300 font-bold ml-1">
                &gt;_ vishv@logintel-noc: ~ (tmux: 3 panes)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
              <span className="text-emerald-400 animate-pulse">● 142k logs/s</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400">MTTD &lt; 250ms</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">PROD-EAST</span>
          </div>
        );

      default:
        return null;
    }
  };

  /* Custom Frame Top for Mobile */
  const renderMobileFrameTop = () => {
    switch (project.id) {
      case 'smartspend':
        return (
          <div className="h-6 bg-slate-900 flex items-center justify-center pt-0.5 px-2">
            <div className="w-28 h-3.5 rounded-full bg-slate-950 border border-indigo-500/30 flex items-center justify-between px-2 text-[7px] font-mono text-indigo-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              <span>SmartSpend: -₹1,420</span>
              <span>💳</span>
            </div>
          </div>
        );
      case 'customer-management-system':
        return (
          <div className="h-6 bg-slate-900 flex items-center justify-center pt-0.5 px-2">
            <div className="w-28 h-3.5 rounded-full bg-slate-950 border border-purple-500/30 flex items-center justify-between px-2 text-[7px] font-mono text-purple-300">
              <span>⚡ CRM Deals</span>
              <span className="text-emerald-400 font-bold">2 Due</span>
            </div>
          </div>
        );
      case 'ledgerlens':
        return (
          <div className="h-6 bg-slate-900 flex items-center justify-center pt-0.5 px-2">
            <div className="w-28 h-3.5 rounded-full bg-slate-950 border border-cyan-500/40 flex items-center justify-between px-2 text-[7px] font-mono text-cyan-300">
              <span>📷 4K AI Vision</span>
              <span className="text-emerald-400 font-bold">Scan Active</span>
            </div>
          </div>
        );
      case 'talentlens':
        return (
          <div className="h-6 bg-slate-900 flex items-center justify-center pt-0.5 px-2">
            <div className="w-28 h-3.5 rounded-full bg-slate-950 border border-emerald-500/30 flex items-center justify-between px-2 text-[7px] font-mono text-emerald-300">
              <span>🎓 Learner App</span>
              <span className="text-amber-300">🔥 14d</span>
            </div>
          </div>
        );
      case 'logintel':
        return (
          <div className="h-6 bg-slate-900 flex items-center justify-center pt-0.5 px-2">
            <div className="w-28 h-3.5 rounded-full bg-slate-950 border border-amber-500/40 flex items-center justify-between px-2 text-[7px] font-mono text-amber-300">
              <span className="text-emerald-400 font-bold">🟢 NOC OK</span>
              <span>142k/s</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-6 bg-slate-900 flex items-center justify-center pt-1">
            <div className="w-20 h-3 rounded-full bg-slate-950" />
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Device Type Toggle (Desktop / Mobile) */}
      <div className="flex items-center justify-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-[11px] sm:text-xs mb-4 max-w-xs mx-auto">
        <button
          type="button"
          onClick={() => setDeviceType('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
            deviceType === 'desktop'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Desktop View</span>
        </button>

        <button
          type="button"
          onClick={() => setDeviceType('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
            deviceType === 'mobile'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile App View</span>
        </button>
      </div>

      {/* Realistic Device Frame */}
      <AnimatePresence mode="wait">
        {deviceType === 'desktop' ? (
          <motion.div
            key={`desktop-${project.id}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-2xl rounded-2xl bg-slate-900 border-2 border-slate-700/80 shadow-2xl overflow-hidden"
          >
            {/* Custom Project Desktop Frame Header */}
            {renderDesktopFrameHeader()}

            {/* Screen Content Viewport */}
            <div className="h-[290px] sm:h-[330px] md:h-[350px] bg-slate-950 overflow-hidden relative">
              {renderDesktopUI()}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`mobile-${project.id}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="w-[250px] xs:w-[270px] sm:w-[290px] rounded-[36px] bg-slate-900 border-[6px] border-slate-800 shadow-2xl overflow-hidden mx-auto"
          >
            {/* Custom Project Mobile Notch */}
            {renderMobileFrameTop()}

            {/* Mobile Screen Viewport */}
            <div className="h-[360px] sm:h-[380px] bg-slate-950 overflow-hidden">
              {renderMobileUI()}
            </div>

            {/* Home Indicator bar */}
            <div className="h-4 bg-slate-900 flex items-center justify-center">
              <div className="w-24 h-1 rounded-full bg-slate-700" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action under Mockup */}
      <button
        type="button"
        onClick={() => onOpenCaseStudy(project)}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer group text-center"
      >
        <span>Open Complete Project Case Study</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>

    </div>
  );
}
