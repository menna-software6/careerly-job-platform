import React, { useState } from 'react';
import { useJobs, ActivePage } from '../context/JobContext';
import { Bookmark, Menu, X, PlusCircle, Briefcase } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    savedJobIds,
    applications
  } = useJobs();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActivePage; label: string; badge?: number }[] = [
    { id: 'home', label: 'Discover' },
    { id: 'jobs', label: 'Explore Jobs' },
    { id: 'saved', label: 'Saved', badge: savedJobIds.length },
    { id: 'tracker', label: 'Tracker', badge: applications.length },
    { id: 'profile', label: 'Profile' },
    { id: 'employer', label: 'Employer' }
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E5E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark in display face */}
        <button
          onClick={() => handleNavClick('home')}
          className="font-editorial text-2xl sm:text-3xl font-semibold italic tracking-wide text-[#191919] hover:text-[#E94B9B] transition-colors text-left shrink-0 focus-visible:outline-2 focus-visible:outline-[#E94B9B] rounded"
          aria-label="CAREERLY home"
        >
          CAREERLY
        </button>

        {/* Zone 2: 4-6 text navigation links with single-line labels */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id || (activePage === 'job-details' && item.id === 'jobs');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-lg flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#E94B9B] ${
                  isActive
                    ? 'text-[#E94B9B] font-semibold bg-[#FCEAF3]/60'
                    : 'text-[#191919]/70 hover:text-[#191919] hover:bg-black/[0.03]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-xs px-1.5 py-0.2 rounded-full tabular-nums font-semibold ${
                      isActive
                        ? 'bg-[#E94B9B] text-white'
                        : 'bg-[#E8E5E1] text-[#191919]/80'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E94B9B]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('employer')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#191919] border border-[#E8E5E1] hover:border-[#191919] bg-white rounded-lg transition-all duration-150 hover:shadow-xs active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#E94B9B]"
          >
            <PlusCircle className="w-4 h-4 text-[#E94B9B]" />
            <span>Post a Role</span>
          </button>

          <button
            onClick={() => handleNavClick('jobs')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#E94B9B] hover:bg-[#D63E8A] active:bg-[#BF3279] rounded-lg transition-all duration-150 shadow-xs hover:shadow-sm active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E94B9B]"
          >
            <Briefcase className="w-4 h-4" />
            <span>Find Jobs</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#191919]/80 hover:text-[#191919] hover:bg-black/5 rounded-lg focus-visible:outline-2 focus-visible:outline-[#E94B9B]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E5E1] bg-[#FAF9F6] px-4 pt-3 pb-5 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#FCEAF3] text-[#E94B9B] font-semibold'
                    : 'text-[#191919]/80 hover:bg-black/5 hover:text-[#191919]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8E5E1] font-semibold tabular-nums">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#E8E5E1] flex gap-2">
            <button
              onClick={() => handleNavClick('employer')}
              className="flex-1 py-2 text-xs font-semibold text-[#191919] border border-[#E8E5E1] bg-white rounded-lg text-center"
            >
              Post a Role
            </button>
            <button
              onClick={() => handleNavClick('saved')}
              className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-[#191919] border border-[#E8E5E1] bg-white rounded-lg"
            >
              <Bookmark className="w-4 h-4 text-[#E94B9B]" />
              <span>Saved</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
