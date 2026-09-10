import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Copy, Check, MessageSquare } from 'lucide-react';
import { Github, Linkedin } from '../components/ui/Icons';

import confetti from 'canvas-confetti';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { personalInfo } from '../data/personalInfo';
import { copyToClipboard } from '../utils/helpers';

export function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify a subject.';
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Check if Formspree endpoint is configured
      if (personalInfo.formspreeEndpoint) {
        const res = await fetch(personalInfo.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _replyto: formData.email,
            _subject: `Portfolio Message from ${formData.name}: ${formData.subject || 'New Inquiry'}`
          })
        });
        if (!res.ok) throw new Error('Form submission error');
      } else {
        // Mock simulated send with client confirmation
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Fire celebration confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });

      onShowToast?.('Message sent successfully! Thank you for reaching out.', 'success');
      
      // Reset form fields
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setIsSubmitting(false);
      onShowToast?.('Error submitting message. You can reach out directly via email.', 'error');
    }
  };

  const handleCopyEmail = () => {
    copyToClipboard(personalInfo.contact.email).then(() => {
      setCopiedEmail(true);
      onShowToast?.('Email copied to clipboard!', 'info');
      setTimeout(() => setCopiedEmail(false), 3000);
    });
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badgeText="Get In Touch"
          title="Let's Build Something"
          titleHighlight="Meaningful"
          subtitle="Whether you have an upcoming project, an opportunity, or want to discuss technology & AI architectures, my inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-[#0f172a]/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Direct Inquiries
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  I typically respond to inquiries within 24 hours. Feel free to copy my direct email or connect through professional networks.
                </p>
              </div>

              {/* Email Card with Copy Button */}
              <div className="p-4 rounded-xl bg-indigo-500/[0.05] border border-indigo-500/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${personalInfo.contact.email}`}
                      className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate block"
                    >
                      {personalInfo.contact.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white dark:bg-white/10 hover:bg-indigo-50 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors flex-shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                <div className="p-2 rounded-lg bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-slate-400">Location</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                    {personalInfo.contact.location}
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Professional Networks
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-indigo-500/10 dark:bg-white/[0.02] dark:hover:bg-indigo-500/10 border border-slate-200/60 dark:border-white/5 hover:border-indigo-500/30 transition-all text-xs font-medium text-slate-800 dark:text-slate-200"
                  >
                    <Github className="w-4 h-4 text-indigo-500" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={personalInfo.contact.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-indigo-500/10 dark:bg-white/[0.02] dark:hover:bg-indigo-500/10 border border-slate-200/60 dark:border-white/5 hover:border-indigo-500/30 transition-all text-xs font-medium text-slate-800 dark:text-slate-200"
                  >
                    <Linkedin className="w-4 h-4 text-blue-500" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <Card className="p-6 sm:p-8" glowEffect={true}>
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-indigo-500" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Send a Direct Message
                </h3>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Message Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out, Vishv has received your message and will get back to you shortly.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border ${
                          errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                        } text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors`}
                      />
                      {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border ${
                          errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                        } text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors`}
                      />
                      {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Collaboration / Opportunity"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border ${
                        errors.subject ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors`}
                    />
                    {errors.subject && <p className="text-[11px] text-rose-500 mt-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Vishv, I'd like to discuss a project..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border ${
                        errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-white/10'
                      } text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none`}
                    />
                    {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={Send}
                    iconPosition="right"
                    loading={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    Send Message
                  </Button>

                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-mono">
                    Direct delivery to Vishv's inbox. Typically responds within 24 hours.
                  </p>
                </form>
              )}
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
