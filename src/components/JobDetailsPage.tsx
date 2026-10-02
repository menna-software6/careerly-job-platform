import React from 'react';
import { useJobs } from '../context/JobContext';
import { JobCard } from './JobCard';
import { Job } from '../types/job';
import {
  ArrowLeft,
  Bookmark,
  Send,
  Building,
  MapPin,
  Calendar,
  Users,
  Globe,
  CheckCircle,
  ExternalLink,
  Zap,
  Briefcase
} from 'lucide-react';

interface JobDetailsPageProps {
  onOpenApplyModal: (job: Job) => void;
}

export const JobDetailsPage: React.FC<JobDetailsPageProps> = ({ onOpenApplyModal }) => {
  const {
    jobs,
    selectedJobId,
    setActivePage,
    toggleSaveJob,
    isJobSaved,
    applications
  } = useJobs();

  const currentJob = jobs.find((j) => j.id === selectedJobId);

  // If nonexistent job
  if (!currentJob) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-white border border-[#E8E5E1] flex items-center justify-center text-[#191919]/40">
          <Briefcase className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-[#191919] font-heading">
          Requisition Not Found
        </h1>
        <p className="text-sm text-[#191919]/60 max-w-md mx-auto">
          The job listing you requested may have been fulfilled or is temporarily offline.
        </p>
        <button
          onClick={() => {
            setActivePage('jobs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#191919] hover:bg-[#E94B9B] text-white font-semibold text-xs rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Job Directory</span>
        </button>
      </div>
    );
  }

  const saved = isJobSaved(currentJob.id);
  const alreadyApplied = applications.some((app) => app.jobId === currentJob.id);

  // Related jobs
  const relatedJobs = jobs
    .filter(
      (j) =>
        j.id !== currentJob.id &&
        (j.department === currentJob.department || j.company === currentJob.company)
    )
    .slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setActivePage('jobs');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#191919]/70 hover:text-[#E94B9B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Openings</span>
        </button>

        <div className="text-xs text-[#191919]/50">
          Requisition ID: <span className="font-mono text-[#191919]/80">{currentJob.id}</span>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center font-extrabold text-white text-xl shrink-0 select-none shadow-xs"
              style={{ backgroundColor: currentJob.companyDetails.accentColor || '#191919' }}
            >
              {currentJob.companyInitials}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#191919]/60">
                <span className="text-[#191919] font-bold text-sm">{currentJob.company}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#191919]/40" />
                  {currentJob.location}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentJob.workMode}</span>
                {currentJob.featured && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#E94B9B] font-semibold flex items-center gap-0.5">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      Featured Opportunity
                    </span>
                  </>
                )}
              </div>

              {/* Job Title - NO PERIOD AT END */}
              <h1 className="font-editorial text-3xl sm:text-5xl font-semibold italic text-[#191919] tracking-normal leading-[1.15]">
                {currentJob.title}
              </h1>

              {/* Zero-Pill Unboxed Metadata line */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#191919]/70 pt-1">
                <span>{currentJob.department}</span>
                <span aria-hidden="true">·</span>
                <span>{currentJob.experienceLevel} Level</span>
                <span aria-hidden="true">·</span>
                <span>{currentJob.type}</span>
                <span aria-hidden="true">·</span>
                <span>Posted {currentJob.postedDate}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{currentJob.applicantCount} candidates in queue</span>
              </div>
            </div>
          </div>

          {/* Right Action Stack */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E8E5E1]">
            <div className="text-left lg:text-right">
              <span className="text-xs text-[#191919]/50 block">Target Base Compensation</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#191919] tabular-nums font-heading">
                ${(currentJob.minSalary / 1000).toFixed(0)}k - ${(currentJob.maxSalary / 1000).toFixed(0)}k
              </span>
              <span className="text-[11px] text-[#191919]/50 block">USD / year + equity grant</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => toggleSaveJob(currentJob.id)}
                className={`p-2.5 rounded-xl border transition-all duration-150 flex items-center justify-center ${
                  saved
                    ? 'border-[#E94B9B] bg-[#FCEAF3] text-[#E94B9B]'
                    : 'border-[#E8E5E1] bg-white text-[#191919]/70 hover:border-[#191919]'
                }`}
                title={saved ? 'Remove from saved' : 'Save this job'}
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              </button>

              {alreadyApplied ? (
                <div className="px-5 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Applied on Platform</span>
                </div>
              ) : (
                <button
                  onClick={() => onOpenApplyModal(currentJob)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#E94B9B] hover:bg-[#D63E8A] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details Body (col-span-8) + Company Sidebar (col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Role Overview */}
          <section className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
              Role Overview & Architecture Focus
            </h2>
            <p className="text-sm sm:text-base text-[#191919]/80 leading-relaxed">
              {currentJob.description}
            </p>
          </section>

          {/* Key Responsibilities */}
          <section className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
              Core Responsibilities
            </h2>
            <ul className="space-y-3">
              {currentJob.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#191919]/80 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E94B9B] mt-2 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements & Experience */}
          <section className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
              Qualifications & Engineering Background
            </h2>
            <ul className="space-y-3">
              {currentJob.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#191919]/80 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#191919] mt-2 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Nice to Have if any */}
          {currentJob.niceToHave && currentJob.niceToHave.length > 0 && (
            <section className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
                Nice to Have Qualifications
              </h2>
              <ul className="space-y-3">
                {currentJob.niceToHave.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#191919]/80 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E94B9B]/60 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Key Tech Stack & Skills */}
          <section className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
              Technical Stack & Competencies
            </h2>
            {/* Zero-Pill: Clean unboxed metadata with subtle typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#191919]">
              {currentJob.skills.map((skill, index) => (
                <React.Fragment key={skill}>
                  <span className="font-semibold text-[#191919]">{skill}</span>
                  {index < currentJob.skills.length - 1 && (
                    <span className="text-[#191919]/30" aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Benefits and Compensation */}
          <section className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
              Compensation, Equity & Team Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentJob.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#FAF9F6] border border-[#E8E5E1] rounded-xl flex items-start gap-2.5 text-xs sm:text-sm text-[#191919]/80"
                >
                  <CheckCircle className="w-4 h-4 text-[#E94B9B] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Company & Requisition Sidebar (col-span-4) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* About Company Card */}
          <div className="bg-white border border-[#E8E5E1] rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm shrink-0"
                style={{ backgroundColor: currentJob.companyDetails.accentColor || '#191919' }}
              >
                {currentJob.companyInitials}
              </div>
              <div>
                <h3 className="font-editorial text-xl font-semibold italic text-[#191919]">
                  About {currentJob.company}
                </h3>
                <a
                  href={currentJob.companyDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#E94B9B] hover:underline flex items-center gap-1"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#191919]/70 leading-relaxed">
              {currentJob.companyDetails.about}
            </p>

            <div className="pt-4 border-t border-[#E8E5E1] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#191919]/60 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#191919]/40" />
                  Headquarters
                </span>
                <span className="font-semibold text-[#191919]">
                  {currentJob.companyDetails.headquarters}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#191919]/60 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#191919]/40" />
                  Company Size
                </span>
                <span className="font-semibold text-[#191919]">
                  {currentJob.companyDetails.size}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#191919]/60 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#191919]/40" />
                  Founded
                </span>
                <span className="font-semibold text-[#191919] tabular-nums">
                  {currentJob.companyDetails.founded}
                </span>
              </div>

              {currentJob.companyDetails.fundingStage && (
                <div className="flex items-center justify-between">
                  <span className="text-[#191919]/60 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#191919]/40" />
                    Capitalization Stage
                  </span>
                  <span className="font-semibold text-[#191919]">
                    {currentJob.companyDetails.fundingStage}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenApplyModal(currentJob)}
                disabled={alreadyApplied}
                className="w-full py-2.5 px-4 bg-[#191919] hover:bg-[#E94B9B] disabled:bg-[#191919]/20 text-white font-semibold text-xs rounded-xl transition-all shadow-xs text-center"
              >
                {alreadyApplied ? 'Application Already Submitted' : `Submit Candidate Dossier`}
              </button>
            </div>
          </div>

          {/* Related Positions */}
          {relatedJobs.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#191919] uppercase tracking-wider">
                Related Technical Openings
              </h3>
              <div className="space-y-3">
                {relatedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApplyClick={onOpenApplyModal}
                  />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
