import React, { useState, useMemo } from 'react';
import { useJobs } from '../context/JobContext';
import { JobFilterSidebar } from './JobFilterSidebar';
import { JobCard } from './JobCard';
import { Job } from '../types/job';
import {
  ArrowUpDown,
  Search,
  X,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

interface JobListingsPageProps {
  onOpenApplyModal: (job: Job) => void;
}

export const JobListingsPage: React.FC<JobListingsPageProps> = ({ onOpenApplyModal }) => {
  const { jobs, filters, setFilters, resetFilters } = useJobs();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter and sort jobs based on search & filter state
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Keyword search (title, company, description, skills)
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesDesc = job.description.toLowerCase().includes(query);
        const matchesSkills = job.skills.some((s) => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesDesc && !matchesSkills) {
          return false;
        }
      }

      // 2. Location
      if (filters.location.trim()) {
        const loc = filters.location.toLowerCase();
        const matchesLoc = job.location.toLowerCase().includes(loc);
        const matchesMode = job.workMode.toLowerCase().includes(loc);
        if (!matchesLoc && !matchesMode) {
          return false;
        }
      }

      // 3. Work mode
      if (filters.workModes.length > 0) {
        if (!filters.workModes.includes(job.workMode)) {
          return false;
        }
      }

      // 4. Job type
      if (filters.jobTypes.length > 0) {
        if (!filters.jobTypes.includes(job.type)) {
          return false;
        }
      }

      // 5. Seniority / Experience Level
      if (filters.experienceLevels.length > 0) {
        if (!filters.experienceLevels.includes(job.experienceLevel)) {
          return false;
        }
      }

      // 6. Departments
      if (filters.departments.length > 0) {
        if (!filters.departments.includes(job.department)) {
          return false;
        }
      }

      // 7. Salary range
      if (job.maxSalary < filters.minSalary) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'salary-high') {
        return b.maxSalary - a.maxSalary;
      }
      if (filters.sortBy === 'salary-low') {
        return a.minSalary - b.minSalary;
      }
      if (filters.sortBy === 'relevance') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.applicantCount - a.applicantCount;
      }
      // default: newest
      return b.postedTimestamp - a.postedTimestamp;
    });
  }, [jobs, filters]);

  const displayedJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const removeFilterTag = (type: string, value?: string) => {
    setFilters((prev) => {
      switch (type) {
        case 'search':
          return { ...prev, search: '' };
        case 'location':
          return { ...prev, location: '' };
        case 'workMode':
          return { ...prev, workModes: prev.workModes.filter((m) => m !== value) };
        case 'jobType':
          return { ...prev, jobTypes: prev.jobTypes.filter((t) => t !== value) };
        case 'expLevel':
          return { ...prev, experienceLevels: prev.experienceLevels.filter((e) => e !== value) };
        case 'department':
          return { ...prev, departments: prev.departments.filter((d) => d !== value) };
        case 'salary':
          return { ...prev, minSalary: 100000 };
        default:
          return prev;
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title & Context Header - NO PERIOD AT END */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E8E5E1]">
        <div>
          <span className="text-xs text-[#E94B9B] font-semibold tracking-wider uppercase block">
            Direct Requisitions
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-semibold italic text-[#191919] tracking-normal mt-1">
            Engineering Job Listings
          </h1>
          <p className="text-sm text-[#191919]/65 mt-1">
            Showing <span className="font-semibold text-[#191919] tabular-nums">{filteredJobs.length}</span> positions matching your active filters
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E5E1] rounded-lg text-sm font-semibold text-[#191919]"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#E94B9B]" />
          <span>{mobileFilterOpen ? 'Close Filters' : 'Filter Options'}</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar (col-span-4) / Mobile drawer */}
        <div
          className={`lg:col-span-4 sticky top-20 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <JobFilterSidebar totalMatches={filteredJobs.length} />
        </div>

        {/* Jobs Results Column (col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Filter Chips and Sorting Bar */}
          <div className="bg-white border border-[#E8E5E1] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Active filter interactive tags (removable) */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[#191919]/50 font-medium">Active:</span>

              {filters.search && (
                <button
                  onClick={() => removeFilterTag('search')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FCEAF3] text-[#E94B9B] font-medium rounded-md hover:bg-[#f9d5e7] transition-colors"
                >
                  <span>"{filters.search}"</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {filters.location && (
                <button
                  onClick={() => removeFilterTag('location')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF9F6] border border-[#E8E5E1] text-[#191919] font-medium rounded-md hover:border-[#191919]/30"
                >
                  <span>{filters.location}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {filters.workModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => removeFilterTag('workMode', mode)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF9F6] border border-[#E8E5E1] text-[#191919] font-medium rounded-md hover:border-[#191919]/30"
                >
                  <span>{mode}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}

              {filters.departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => removeFilterTag('department', dept)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF9F6] border border-[#E8E5E1] text-[#191919] font-medium rounded-md hover:border-[#191919]/30"
                >
                  <span>{dept}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}

              {filters.experienceLevels.map((exp) => (
                <button
                  key={exp}
                  onClick={() => removeFilterTag('expLevel', exp)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF9F6] border border-[#E8E5E1] text-[#191919] font-medium rounded-md hover:border-[#191919]/30"
                >
                  <span>{exp}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}

              {filters.minSalary > 100000 && (
                <button
                  onClick={() => removeFilterTag('salary')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF9F6] border border-[#E8E5E1] text-[#191919] font-medium rounded-md hover:border-[#191919]/30"
                >
                  <span className="tabular-nums">${(filters.minSalary / 1000).toFixed(0)}k+</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {!filters.search &&
                !filters.location &&
                filters.workModes.length === 0 &&
                filters.departments.length === 0 &&
                filters.experienceLevels.length === 0 &&
                filters.minSalary <= 100000 && (
                  <span className="text-[#191919]/40 italic">All available postings</span>
                )}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#191919]/40" />
              <span className="text-xs text-[#191919]/60 font-medium">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as any
                  }))
                }
                className="text-xs font-semibold text-[#191919] bg-transparent border-0 focus:outline-none focus:ring-0 cursor-pointer"
              >
                <option value="newest">Recently Posted</option>
                <option value="salary-high">Highest Compensation</option>
                <option value="salary-low">Lowest Compensation</option>
                <option value="relevance">Relevance & Demand</option>
              </select>
            </div>
          </div>

          {/* Job Cards Stream */}
          {filteredJobs.length === 0 ? (
            /* Clear Empty State */
            <div className="p-12 bg-white border border-[#E8E5E1] rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF9F6] border border-[#E8E5E1] flex items-center justify-center text-[#191919]/40">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                {/* NO PERIOD AT END */}
                <h3 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
                  No Matching Engineering Requisitions
                </h3>
                <p className="text-sm text-[#191919]/60 max-w-md mx-auto leading-relaxed">
                  We could not find any active listings matching your current criteria. Try loosening your salary threshold or resetting filters.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#191919] hover:bg-[#E94B9B] text-white font-semibold text-xs rounded-xl transition-all shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedJobs.map((job, idx) => (
                <JobCard
                  key={job.id}
                  job={job}
                  staggerIndex={idx}
                  onApplyClick={onOpenApplyModal}
                />
              ))}

              {/* Working Load More Button / Pagination */}
              {hasMore && (
                <div className="pt-4 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-3 bg-white border border-[#E8E5E1] hover:border-[#191919] text-[#191919] font-semibold text-xs rounded-xl transition-all shadow-xs hover:shadow-sm"
                  >
                    Load More Positions ({filteredJobs.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
