import React from 'react';
import { Job } from '../types/job';
import { useJobs } from '../context/JobContext';
import { Bookmark, MapPin, ArrowUpRight, Check, Zap } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onApplyClick?: (job: Job) => void;
  staggerIndex?: number;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApplyClick, staggerIndex = 0 }) => {
  const { toggleSaveJob, isJobSaved, viewJobDetails, applications } = useJobs();
  const saved = isJobSaved(job.id);
  const alreadyApplied = applications.some((app) => app.jobId === job.id);

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  return (
    <article
      style={{ animationDelay: `${staggerIndex * 40}ms` }}
      className="group relative bg-white border border-[#E8E5E1] rounded-xl p-5 sm:p-6 transition-all duration-200 hover:border-[#191919]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-within:ring-2 focus-within:ring-[#E94B9B]"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left: Company Crest & Job Header */}
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-base shrink-0 select-none shadow-xs"
            style={{ backgroundColor: job.companyDetails.accentColor || '#191919' }}
            aria-hidden="true"
          >
            {job.companyInitials}
          </div>

          <div className="space-y-1">
            {/* Clean unboxed company & location line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#191919]/60 font-medium">
              <span className="text-[#191919] font-semibold">{job.company}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#191919]/50" />
                {job.location}
              </span>
              <span aria-hidden="true">·</span>
              <span>{job.workMode}</span>
              {job.featured && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#E94B9B] font-semibold flex items-center gap-0.5">
                    <Zap className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                </>
              )}
            </div>

            {/* Job Title */}
            <h3 className="font-editorial text-lg sm:text-xl font-semibold italic text-[#191919] group-hover:text-[#E94B9B] transition-colors leading-snug">
              <button
                onClick={() => viewJobDetails(job.id)}
                className="text-left focus:outline-none focus-visible:underline"
              >
                {job.title}
              </button>
            </h3>

            {/* Zero-Pill Metadata Discipline: Clean unboxed text with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#191919]/65">
              <span>{job.department}</span>
              <span aria-hidden="true">·</span>
              <span>{job.experienceLevel} Level</span>
              <span aria-hidden="true">·</span>
              <span>{job.type}</span>
              <span aria-hidden="true">·</span>
              <span>Posted {job.postedDate}</span>
            </div>
          </div>
        </div>

        {/* Right: Salary and Actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8E5E1]/60">
          <div className="text-right">
            <span className="text-xs text-[#191919]/50 block">Compensation</span>
            <span className="text-base sm:text-lg font-bold text-[#191919] tabular-nums font-heading">
              {formatSalary(job.minSalary, job.maxSalary)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-2 rounded-lg border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#E94B9B] ${
                saved
                  ? 'border-[#E94B9B] bg-[#FCEAF3] text-[#E94B9B]'
                  : 'border-[#E8E5E1] bg-white text-[#191919]/60 hover:text-[#191919] hover:border-[#191919]/40'
              }`}
              title={saved ? 'Remove from saved' : 'Save job'}
              aria-label={saved ? `Unsave ${job.title}` : `Save ${job.title}`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>

            {alreadyApplied ? (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg">
                <Check className="w-3.5 h-3.5" />
                Applied
              </span>
            ) : (
              <button
                onClick={() => {
                  if (onApplyClick) onApplyClick(job);
                  else viewJobDetails(job.id);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#191919] hover:bg-[#E94B9B] active:scale-[0.98] rounded-lg transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#E94B9B]"
              >
                <span>Quick Apply</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Brief excerpt & skills preview */}
      <p className="mt-3 text-xs sm:text-sm text-[#191919]/70 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      {/* Skills rendered as clean text links / muted inline typography, NO static pill enclosures */}
      <div className="mt-4 pt-3 border-t border-[#E8E5E1]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 text-[#191919]/60">
          <span className="font-medium text-[#191919]/40">Key Skills:</span>
          {job.skills.slice(0, 5).map((skill, idx) => (
            <React.Fragment key={skill}>
              <span className="text-[#191919]/80 font-medium">{skill}</span>
              {idx < Math.min(job.skills.length, 5) - 1 && (
                <span className="text-[#191919]/30" aria-hidden="true">/</span>
              )}
            </React.Fragment>
          ))}
          {job.skills.length > 5 && (
            <span className="text-[#191919]/50">+{job.skills.length - 5} more</span>
          )}
        </div>

        <button
          onClick={() => viewJobDetails(job.id)}
          className="text-xs font-semibold text-[#191919] hover:text-[#E94B9B] inline-flex items-center gap-0.5 ml-auto transition-colors"
        >
          View Full Role
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>
    </article>
  );
};
