import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { Send, ArrowUpRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setFilters, showToast } = useJobs();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      showToast('Subscribed to the CAREERLY engineering dispatch', 'success');
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const handleDeptFilter = (dept: string) => {
    setFilters((prev) => ({
      ...prev,
      departments: [dept],
      search: ''
    }));
    setActivePage('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#E8E5E1] pt-14 pb-12 text-[#191919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#E8E5E1]">
          {/* Brand & Editorial Mission (col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-editorial text-3xl font-semibold italic tracking-wide text-[#191919] block">
              CAREERLY
            </span>
            <p className="text-xs sm:text-sm text-[#191919]/70 leading-relaxed max-w-sm">
              The modern editorial career discovery exchange for software engineers, product architects, and infrastructure specialists. Transparent compensation, direct engineering teams, and zero automated recruiters.
            </p>
            <div className="text-xs text-[#191919]/50">
              Curated in San Francisco, California
            </div>
          </div>

          {/* Architecture Tracks (col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            {/* NO PERIOD AT END */}
            <h4 className="text-xs font-bold text-[#191919] uppercase tracking-wider">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-[#191919]/70">
              <li>
                <button
                  onClick={() => handleDeptFilter('Frontend')}
                  className="hover:text-[#E94B9B] transition-colors"
                >
                  Frontend & Design Systems
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDeptFilter('Backend')}
                  className="hover:text-[#E94B9B] transition-colors"
                >
                  Distributed Backend
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDeptFilter('AI & ML')}
                  className="hover:text-[#E94B9B] transition-colors"
                >
                  AI & Machine Learning
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDeptFilter('DevOps & Cloud')}
                  className="hover:text-[#E94B9B] transition-colors"
                >
                  Cloud & Kubernetes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleDeptFilter('Mobile')}
                  className="hover:text-[#E94B9B] transition-colors"
                >
                  iOS & Native Swift
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Navigation (col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            {/* NO PERIOD AT END */}
            <h4 className="text-xs font-bold text-[#191919] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#191919]/70">
              <li>
                <button
                  onClick={() => {
                    setActivePage('jobs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E94B9B] transition-colors"
                >
                  Explore All Requisitions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('saved');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E94B9B] transition-colors"
                >
                  Saved Bookmarks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('tracker');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E94B9B] transition-colors"
                >
                  Application Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E94B9B] transition-colors"
                >
                  Candidate Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('employer');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E94B9B] transition-colors"
                >
                  Employer Console
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatch (col-span-4) */}
          <div className="md:col-span-4 space-y-3">
            {/* NO PERIOD AT END */}
            <h4 className="text-xs font-bold text-[#191919] uppercase tracking-wider">
              Weekly Architecture Dispatch
            </h4>
            <p className="text-xs text-[#191919]/70 leading-relaxed">
              Every Tuesday morning: a curated breakdown of newly authorized senior engineering bands, architectural RFCs, and discreet talent openings.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="engineer@domain.com"
                className="flex-1 px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] placeholder:text-[#191919]/40 focus:outline-none focus:border-[#E94B9B]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#191919] hover:bg-[#E94B9B] text-white text-xs font-semibold rounded-lg transition-colors shrink-0 flex items-center gap-1"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#191919]/50">
          <div>
            © {new Date().getFullYear()} CAREERLY Platform Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-[#191919] transition-colors cursor-pointer">
              Privacy Standard
            </span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#191919] transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#191919] transition-colors cursor-pointer">
              Direct Engineering Network
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
