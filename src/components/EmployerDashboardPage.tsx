import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { Job, WorkMode, JobType, ExperienceLevel } from '../types/job';
import {
  Building2,
  PlusCircle,
  Users,
  Eye,
  CheckCircle2,
  Clock,
  Briefcase,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const EmployerDashboardPage: React.FC = () => {
  const { jobs, postEmployerJob, viewJobDetails, applications } = useJobs();
  const [showPostModal, setShowPostModal] = useState(false);

  // Form state for new job requisition
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [companyInitials, setCompanyInitials] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [workMode, setWorkMode] = useState<WorkMode>('Remote');
  const [type, setType] = useState<JobType>('Full-time');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Senior');
  const [department, setDepartment] = useState('Backend');
  const [minSalary, setMinSalary] = useState(180000);
  const [maxSalary, setMaxSalary] = useState(240000);
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [benefitsText, setBenefitsText] = useState('');
  const [companyAbout, setCompanyAbout] = useState('');
  const [accentColor, setAccentColor] = useState('#191919');
  const [featured, setFeatured] = useState(false);
  const [formError, setFormError] = useState('');

  const activeRequisitions = jobs.slice(0, 6);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim() || !company.trim() || !description.trim()) {
      setFormError('Please fill in job title, company name, and description');
      return;
    }

    if (minSalary > maxSalary) {
      setFormError('Minimum salary cannot exceed maximum salary');
      return;
    }

    const responsibilities = responsibilitiesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const requirements = requirementsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const benefits = benefitsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const initials =
      companyInitials.trim() ||
      company
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    postEmployerJob({
      title: title.trim(),
      company: company.trim(),
      companyInitials: initials,
      location: location.trim(),
      workMode,
      type,
      experienceLevel,
      department,
      minSalary,
      maxSalary,
      currency: 'USD',
      featured,
      description: description.trim(),
      responsibilities: responsibilities.length > 0 ? responsibilities : [
        'Architect scalable services and distributed APIs',
        'Lead technical design reviews and mentor peers',
        'Ensure 99.99% system reliability and low latency'
      ],
      requirements: requirements.length > 0 ? requirements : [
        '5+ years professional software development experience',
        'Deep fluency in modern programming languages and systems architecture'
      ],
      skills: skills.length > 0 ? skills : ['TypeScript', 'Distributed Systems', 'PostgreSQL'],
      benefits: benefits.length > 0 ? benefits : [
        'Comprehensive healthcare coverage',
        'Competitive equity grants',
        'Continuous learning budget'
      ],
      companyDetails: {
        about: companyAbout.trim() || `${company} is building modern technology infrastructure for enterprise scale.`,
        website: 'https://example.com',
        founded: 2021,
        size: '100-250 employees',
        headquarters: location.trim(),
        fundingStage: 'Series B',
        accentColor
      }
    });

    // Reset and close
    setShowPostModal(false);
    setTitle('');
    setCompany('');
    setDescription('');
    setResponsibilitiesText('');
    setRequirementsText('');
    setSkillsText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header - NO PERIOD AT END */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E8E5E1]">
        <div>
          <span className="text-xs text-[#E94B9B] font-semibold tracking-wider uppercase block">
            Hiring Console
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-semibold italic text-[#191919] tracking-normal mt-1">
            Engineering Talent Console
          </h1>
          <p className="text-sm text-[#191919]/65 mt-1">
            Manage open requisitions, review qualified applicants, and deploy new technical positions
          </p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E94B9B] hover:bg-[#D63E8A] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish New Requisition</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-[#E8E5E1] rounded-xl space-y-1">
          <span className="text-xs text-[#191919]/60 font-medium">Active Requisitions</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#191919] tabular-nums font-heading block">
            {jobs.length}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Live on discovery feed
          </span>
        </div>

        <div className="p-5 bg-white border border-[#E8E5E1] rounded-xl space-y-1">
          <span className="text-xs text-[#191919]/60 font-medium">Total Applicant Volume</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#E94B9B] tabular-nums font-heading block">
            582
          </span>
          <span className="text-[11px] text-[#191919]/50 block">Across active pipelines</span>
        </div>

        <div className="p-5 bg-white border border-[#E8E5E1] rounded-xl space-y-1">
          <span className="text-xs text-[#191919]/60 font-medium">Median Response Time</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#191919] tabular-nums font-heading block">
            24 hrs
          </span>
          <span className="text-[11px] text-[#191919]/50 block">Direct manager review SLA</span>
        </div>

        <div className="p-5 bg-white border border-[#E8E5E1] rounded-xl space-y-1">
          <span className="text-xs text-[#191919]/60 font-medium">Offer Acceptance</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tabular-nums font-heading block">
            91.4%
          </span>
          <span className="text-[11px] text-[#191919]/50 block">High candidate intent</span>
        </div>
      </div>

      {/* Active Requisitions Table */}
      <div className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E5E1]">
          <div>
            <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
              Current Engineering Postings
            </h2>
            <p className="text-xs text-[#191919]/60">
              Published roles appearing on CAREERLY candidate search
            </p>
          </div>
          <span className="text-xs text-[#191919]/50 tabular-nums">
            {jobs.length} postings configured
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] border-b border-[#E8E5E1] text-[#191919]/70 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Work Mode</th>
                <th className="py-3 px-4">Target Band</th>
                <th className="py-3 px-4">Applicant Pool</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E5E1]">
              {activeRequisitions.map((job) => (
                <tr key={job.id} className="hover:bg-[#FAF9F6]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#191919]">
                    {job.title}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#191919]/80">
                    {job.company}
                  </td>
                  <td className="py-3.5 px-4 text-[#191919]/60">
                    {job.workMode} · {job.location}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#191919] tabular-nums">
                    ${(job.minSalary / 1000).toFixed(0)}k - ${(job.maxSalary / 1000).toFixed(0)}k
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#E94B9B] tabular-nums">
                    {job.applicantCount} candidates
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => viewJobDetails(job.id)}
                      className="text-xs font-semibold text-[#191919] hover:text-[#E94B9B] inline-flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Requisition Creation Modal */}
      {showPostModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-2xl bg-white border border-[#E8E5E1] rounded-2xl shadow-xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between p-6 border-b border-[#E8E5E1] bg-[#FAF9F6]">
              <div>
                <span className="text-xs text-[#E94B9B] font-semibold uppercase tracking-wider block">
                  New Posting
                </span>
                <h3 className="font-editorial text-2xl font-semibold italic text-[#191919]">
                  Create Engineering Requisition
                </h3>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-[#191919]/40 hover:text-[#191919]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">
                    Job Title <span className="text-[#E94B9B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Staff Distributed Systems Engineer"
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    Company Name <span className="text-[#E94B9B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Warp, Supabase, Neon"
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="Full-stack">Full-stack</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Work Mode</label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Seniority Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg"
                  >
                    <option value="Entry">Entry</option>
                    <option value="Mid">Mid</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Office Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Minimum Base ($ USD)</label>
                  <input
                    type="number"
                    step="5000"
                    value={minSalary}
                    onChange={(e) => setMinSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg tabular-nums"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Maximum Base ($ USD)</label>
                  <input
                    type="number"
                    step="5000"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">
                  Role Description & Scope <span className="text-[#E94B9B]">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Architect our next-generation data synchronization fabric..."
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">
                  Required Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  placeholder="Rust, TypeScript, Kafka, Raft, Distributed Systems"
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">
                  Core Responsibilities (one per line)
                </label>
                <textarea
                  rows={2}
                  value={responsibilitiesText}
                  onChange={(e) => setResponsibilitiesText(e.target.value)}
                  placeholder="Build fault-tolerant consensus engines&#10;Optimize database read replicas"
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#E94B9B]"
                />
                <label htmlFor="featured-check" className="font-semibold cursor-pointer">
                  Feature this role prominently on discovery homepage
                </label>
              </div>

              <div className="pt-4 border-t border-[#E8E5E1] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 border border-[#E8E5E1] rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#E94B9B] hover:bg-[#D63E8A] text-white font-semibold rounded-lg shadow-xs"
                >
                  Publish Role Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
