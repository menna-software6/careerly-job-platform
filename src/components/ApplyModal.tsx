import React, { useState, useEffect } from 'react';
import { Job } from '../types/job';
import { useJobs } from '../context/JobContext';
import { X, Send, FileText, CheckCircle2, Lock } from 'lucide-react';

interface ApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, isOpen, onClose }) => {
  const { profile, applyForJob } = useJobs();
  const [fullName, setFullName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [coverNote, setCoverNote] = useState('');
  const [portfolioLink, setPortfolioLink] = useState(profile.portfolioUrl);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (job) {
      setFullName(profile.name);
      setEmail(profile.email);
      setPhone(profile.phone);
      setPortfolioLink(profile.portfolioUrl);
      setCoverNote('');
      setSubmitted(false);
      setErrorMsg('');
    }
  }, [job, profile]);

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please provide your full legal name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid contact email address');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const success = applyForJob(job.id, coverNote);
      setSubmitting(false);
      if (success) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 1600);
      } else {
        setErrorMsg('Application could not be submitted');
      }
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white border border-[#E8E5E1] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#E8E5E1] bg-[#FAF9F6]">
          <div>
            <span className="text-xs text-[#E94B9B] font-semibold tracking-wider uppercase block">
              Direct Application
            </span>
            <h2 id="apply-modal-title" className="font-editorial text-2xl font-semibold italic text-[#191919] mt-0.5">
              Apply to {job.company}
            </h2>
            <p className="text-xs text-[#191919]/60 mt-1">
              Role: <span className="font-semibold text-[#191919]">{job.title}</span> · {job.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#191919]/50 hover:text-[#191919] hover:bg-black/5 transition-colors focus-visible:outline-2 focus-visible:outline-[#E94B9B]"
            aria-label="Close application dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-editorial text-2xl font-semibold italic text-[#191919]">
              Application Transmitted
            </h3>
            <p className="text-sm text-[#191919]/70 max-w-xs mx-auto">
              Your profile and credentials have been forwarded directly to {job.company} engineering hiring managers.
            </p>
            <span className="text-xs text-[#191919]/50 block pt-2">
              Track real-time status updates under your Application Tracker
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#191919] block mb-1">
                  Full Name <span className="text-[#E94B9B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B] focus:ring-1 focus:ring-[#E94B9B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#191919] block mb-1">
                  Email Address <span className="text-[#E94B9B]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B] focus:ring-1 focus:ring-[#E94B9B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[#191919] block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B] focus:ring-1 focus:ring-[#E94B9B]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#191919] block mb-1">
                  Portfolio or GitHub URL
                </label>
                <input
                  type="url"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="https://"
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B] focus:ring-1 focus:ring-[#E94B9B]"
                />
              </div>
            </div>

            {/* Attached Resume Indicator */}
            <div className="p-3 bg-[#FAF9F6] border border-[#E8E5E1] rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-5 h-5 text-[#E94B9B] shrink-0" />
                <div className="truncate text-xs">
                  <span className="font-semibold text-[#191919] block truncate">
                    {profile.resumeFile?.name || 'Verified_Engineering_Profile.pdf'}
                  </span>
                  <span className="text-[#191919]/50 block">
                    {profile.resumeFile?.size || '184 KB'} · Default Profile Resume
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#191919]/60 shrink-0 px-2 py-0.5 bg-white border border-[#E8E5E1] rounded">
                Attached
              </span>
            </div>

            {/* Short Cover Note */}
            <div>
              <label className="text-xs font-semibold text-[#191919] block mb-1">
                Quick Note / Technical Highlights (Optional)
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Mention relevant architecture, open-source work, or why this team specifically..."
                className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] placeholder:text-[#191919]/40 focus:outline-none focus:border-[#E94B9B] focus:ring-1 focus:ring-[#E94B9B]"
              />
            </div>

            {/* Notice & Footer Buttons */}
            <div className="pt-2 border-t border-[#E8E5E1] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-[#191919]/50 flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#191919]/40" />
                Direct submission to hiring engineering leads
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-[#191919] border border-[#E8E5E1] hover:bg-black/5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#E94B9B] hover:bg-[#D63E8A] active:scale-[0.98] rounded-lg transition-all shadow-xs disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
