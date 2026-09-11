import React from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Download, Printer, Mail, MapPin, CheckCircle2, GraduationCap, Briefcase, Award, Phone } from 'lucide-react';
import { Github, Linkedin } from './ui/Icons';

import { personalInfo } from '../data/personalInfo';
import { experiences } from '../data/experience';
import { educationList } from '../data/education';
import { skillCategories } from '../data/skills';
import { certifications } from '../data/certifications';

export function ResumeModal({ isOpen, onClose }) {
  const handlePrint = () => {
    const pdfUrl = encodeURI(personalInfo.resume.filePath);

    // Create an invisible iframe targeting the uploaded 2-page PDF
    let iframe = document.getElementById('resume-pdf-print-frame');
    if (iframe) {
      iframe.remove();
    }

    iframe = document.createElement('iframe');
    iframe.id = 'resume-pdf-print-frame';
    iframe.setAttribute(
      'style',
      'position: fixed; right: 0; bottom: 0; width: 0; height: 0; border: 0; visibility: hidden;'
    );
    document.body.appendChild(iframe);

    let printed = false;
    const trigger = () => {
      if (printed) return;
      printed = true;
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch {
        // Fallback: If browser restricts direct iframe PDF printing, open the 2-page PDF
        window.open(pdfUrl, '_blank');
      }
    };

    iframe.onload = () => {
      setTimeout(trigger, 300);
    };

    setTimeout(() => {
      if (!printed) {
        trigger();
      }
    }, 1200);

    iframe.src = pdfUrl;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Curriculum Vitae / Official Resume"
      subtitle={`${personalInfo.name} • ${personalInfo.educationSummary.currentDegree}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Action Header Bar */}
        <div id="resume-action-bar" className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-indigo-500/[0.06] border border-indigo-500/20">
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">Document:</span>{' '}
            <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400">{personalInfo.resume.fileName}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              size="sm"
              variant="secondary"
              icon={Printer}
              onClick={handlePrint}
              className="flex-1 sm:flex-none justify-center"
            >
              Print
            </Button>

            <Button
              size="sm"
              variant="primary"
              icon={Download}
              href={personalInfo.resume.filePath}
              download={personalInfo.resume.fileName}
              className="flex-1 sm:flex-none justify-center"
            >
              Download PDF
            </Button>
          </div>
        </div>

        {/* Rendered Document Sheet */}
        <div id="resume-document-sheet" className="p-4 sm:p-8 rounded-2xl bg-white dark:bg-[#07090e] border border-slate-200 dark:border-white/10 shadow-lg text-slate-900 dark:text-slate-100 font-sans space-y-6">
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-white/10 pb-5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {personalInfo.name}
            </h1>
            <p className="text-sm sm:text-base font-medium text-indigo-600 dark:text-indigo-400 mt-1">
              {personalInfo.roleTitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
              {personalInfo.bio.summary}
            </p>

            {/* Quick Contacts */}
            <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.contact.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.phone}
              </span>
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.contact.githubDisplay}
              </a>
              <a
                href={personalInfo.contact.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              Education
            </h2>
            <div className="space-y-3">
              {educationList.map((edu) => (
                <div key={edu.id} className="text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-slate-900 dark:text-slate-200">
                    <span>{edu.degree} — {edu.institution}</span>
                    <span className="text-xs font-mono font-normal text-slate-500 dark:text-slate-400">{edu.period}</span>
                  </div>
                  {edu.highlights && (
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-xs text-slate-600 dark:text-slate-400">
                      {edu.highlights.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              Work Experience & Internships
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-slate-900 dark:text-slate-200">
                    <span>{exp.role} <span className="text-indigo-600 dark:text-indigo-400">@ {exp.company}</span></span>
                    <span className="text-xs font-mono font-normal text-slate-500 dark:text-slate-400">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside mt-1.5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              <Award className="w-4 h-4 text-indigo-500" />
              Technical Skills & Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                  <span className="font-semibold text-slate-900 dark:text-slate-200">{cat.name}: </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {cat.skills.map(s => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Professional Certifications & Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-baseline justify-between p-2 rounded bg-slate-50/60 dark:bg-white/[0.01]">
                  <span className="font-medium text-slate-800 dark:text-slate-300 truncate pr-2">
                    {cert.title}
                  </span>
                  <span className="text-slate-400 font-mono flex-shrink-0 text-[11px]">
                    {cert.issuer} ({cert.issueDate})
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Modal>
  );
}
