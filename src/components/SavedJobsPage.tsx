import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { JobCard } from './JobCard';
import { Job } from '../types/job';
import { Bookmark, ArrowRight, Search, Trash2 } from 'lucide-react';

interface SavedJobsPageProps {
  onOpenApplyModal: (job: Job) => void;
}

export const SavedJobsPage: React.FC<SavedJobsPageProps> = ({ onOpenApplyModal }) => {
  const { jobs, savedJobIds, setActivePage } = useJobs();
  const [searchSaved, setSearchSaved] = useState('');

  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  const filteredSavedJobs = savedJobs.filter((job) => {
    if (!searchSaved.trim()) return true;
    const q = searchSaved.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header - NO PERIOD AT END */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E8E5E1]">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E94B9B] uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>Candidate Bookmarks</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-semibold italic text-[#191919] tracking-normal mt-1">
            Saved Engineering Opportunities
          </h1>
          <p className="text-sm text-[#191919]/65 mt-1">
            You have <span className="font-semibold text-[#191919] tabular-nums">{savedJobs.length}</span> positions bookmarked for consideration
          </p>
        </div>

        {savedJobs.length > 0 && (
          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#191919]/40" />
            <input
              type="text"
              value={searchSaved}
              onChange={(e) => setSearchSaved(e.target.value)}
              placeholder="Search saved positions..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#E8E5E1] rounded-lg text-[#191919] placeholder:text-[#191919]/40 focus:outline-none focus:border-[#E94B9B]"
            />
          </div>
        )}
      </div>

      {/* Content Stream */}
      {savedJobs.length === 0 ? (
        <div className="p-12 sm:p-16 bg-white border border-[#E8E5E1] rounded-2xl text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF9F6] border border-[#E8E5E1] flex items-center justify-center text-[#191919]/40">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
              No Saved Roles in Your Collection
            </h2>
            <p className="text-sm text-[#191919]/60 max-w-sm mx-auto leading-relaxed">
              Bookmark engineering listings by tapping the bookmark icon on any card to review compensation, technical stacks, and submit applications later.
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('jobs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E94B9B] hover:bg-[#D63E8A] text-white font-semibold text-xs rounded-xl transition-all shadow-xs"
          >
            <span>Explore Engineering Openings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : filteredSavedJobs.length === 0 ? (
        <div className="p-10 bg-white border border-[#E8E5E1] rounded-2xl text-center space-y-3">
          <p className="text-sm text-[#191919]/70">
            No saved listings matched the query "{searchSaved}"
          </p>
          <button
            onClick={() => setSearchSaved('')}
            className="text-xs text-[#E94B9B] font-semibold hover:underline"
          >
            Clear saved search filter
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSavedJobs.map((job, idx) => (
            <JobCard
              key={job.id}
              job={job}
              staggerIndex={idx}
              onApplyClick={onOpenApplyModal}
            />
          ))}
        </div>
      )}
    </div>
  );
};
