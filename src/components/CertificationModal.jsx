import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ShieldCheck, ExternalLink, Copy, Check, Award, CheckCircle2, FileText, Download } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { copyToClipboard } from '../utils/helpers';

export function CertificationModal({ certificate, isOpen, onClose, onShowToast }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('document'); // 'document' or 'plaque'

  if (!certificate) return null;

  const hasDocument = Boolean(certificate.filePath);
  const currentTab = hasDocument ? activeTab : 'plaque';
  const orgName = certificate.issuer || certificate.organization || 'Issuing Body';

  const handleCopyLink = () => {
    const link = certificate.verificationUrl || certificate.credentialUrl || window.location.href;
    copyToClipboard(link).then(() => {
      setCopied(true);
      onShowToast?.('Credential link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Verified Professional Credential"
      subtitle={`${orgName} • ${certificate.issueDate || certificate.year || '2025-2026'}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-5">
        
        {/* Tab Switcher (when document is available) */}
        {hasDocument && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
            <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('document')}
                className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  currentTab === 'document'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Original PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('plaque')}
                className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  currentTab === 'plaque'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Credential Breakdown</span>
              </button>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Authenticated
            </span>
          </div>
        )}

        {/* TAB 1: EMBEDDED ORIGINAL CERTIFICATE VIEWER (PDF or IMAGE) */}
        {currentTab === 'document' && hasDocument ? (
          <div className="space-y-3">
            <div className="relative w-full h-[500px] sm:h-[560px] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-900 shadow-2xl flex items-center justify-center">
              {/\.(png|jpe?g|webp|svg)$/i.test(certificate.filePath) ? (
                <img
                  src={certificate.filePath}
                  alt={`${certificate.title} Official Certificate`}
                  className="w-full h-full object-contain p-3 bg-slate-950"
                />
              ) : (
                <iframe
                  src={`${certificate.filePath}#toolbar=1&navpanes=0`}
                  className="w-full h-full border-0 bg-slate-950"
                  title={`${certificate.title} Official Certificate PDF`}
                />
              )}
            </div>

            {/* Document Action Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 text-xs">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono">
                <FileText className="w-4 h-4 text-indigo-500" />
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">{certificate.fileName || 'Certificate Document'}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={certificate.filePath}
                  download={certificate.fileName || `${certificate.title}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </a>

                <a
                  href={certificate.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200/80 dark:border-white/10 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Fullscreen</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: AUTHENTICATED CREDENTIAL PLAQUE & SKILLS */
          <div className={`relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${certificate.gradient || 'from-indigo-600/10 to-cyan-600/10'} border-2 border-slate-300/80 dark:border-white/15 shadow-2xl overflow-hidden`}>
            
            {/* Guilloché Tech Grid Background */}
            <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />
            
            {/* Ornamental Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-indigo-500/60 dark:border-indigo-400/60" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-indigo-500/60 dark:border-indigo-400/60" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-indigo-500/60 dark:border-indigo-400/60" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-indigo-500/60 dark:border-indigo-400/60" />

            {/* Plaque Header */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm text-indigo-600 dark:text-indigo-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                    {orgName}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Official Credential Recognition
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge color={certificate.badgeColor || 'indigo'}>
                  {certificate.issuer || 'Verified'}
                </Badge>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/80 dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold">
                  Issued {certificate.issueDate || '2025'}
                </span>
              </div>
            </div>

            {/* Plaque Main Body */}
            <div className="relative z-10 py-6 text-center space-y-3">
              <div className="text-xs uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-400">
                This credential is authenticated for
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {personalInfo.name}
              </h2>

              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium">
                GLS University • Integrated M.Sc. (IT)
              </div>

              <div className="pt-3 pb-1 max-w-xl mx-auto">
                <div className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-200/60 dark:border-white/10 shadow-sm leading-snug">
                  {certificate.title}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed pt-1">
                {certificate.description}
              </p>
            </div>

            {/* Skills Covered */}
            {certificate.skillsCovered && (
              <div className="relative z-10 pt-4 border-t border-slate-200/80 dark:border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 text-center sm:text-left">
                  Skills & Competencies Verified
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {certificate.skillsCovered.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Security Stamp */}
            <div className="relative z-10 pt-5 mt-4 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Status: <strong className="text-slate-800 dark:text-slate-200">Verified & Authenticated</strong></span>
              </div>
              {certificate.credentialId && (
                <div className="text-[11px]">
                  Credential ID: <span className="bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 font-mono">{certificate.credentialId}</span>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Global Modal Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            size="sm"
            variant="secondary"
            icon={copied ? Check : Copy}
            onClick={handleCopyLink}
          >
            {copied ? 'Link Copied' : 'Copy Credential Link'}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
            >
              Close
            </Button>

            {(certificate.verificationUrl || certificate.credentialUrl) && (
              <Button
                size="sm"
                variant="primary"
                icon={ExternalLink}
                iconPosition="right"
                href={certificate.verificationUrl || certificate.credentialUrl}
                target="_blank"
              >
                Verify on {orgName} Site
              </Button>
            )}
          </div>
        </div>

      </div>
    </Modal>
  );
}

