import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { JobCard } from './JobCard';
import { Job } from '../types/job';
import {
  Search,
  MapPin,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Building2,
  ShieldCheck,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface HomePageProps {
  onOpenApplyModal: (job: Job) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenApplyModal }) => {
  const { jobs, setActivePage, setFilters, viewJobDetails } = useJobs();
  const [heroKeyword, setHeroKeyword] = useState('');
  const [heroLocation, setHeroLocation] = useState('');
  const [heroDepartment, setHeroDepartment] = useState('');

  const featuredJobs = jobs.filter((j) => j.featured).slice(0, 4);
  const recentJobs = jobs.slice(0, 4);

  const categories = [
    { name: 'Frontend & UI', count: 48, department: 'Frontend', desc: 'React, Next.js, Design Systems, Canvas' },
    { name: 'Distributed Backend', count: 62, department: 'Backend', desc: 'Go, Rust, Kafka, Distributed Datastores' },
    { name: 'AI & Machine Learning', count: 35, department: 'AI & ML', desc: 'PyTorch, CUDA, Inference Optimization' },
    { name: 'Cloud & Infrastructure', count: 29, department: 'DevOps & Cloud', desc: 'Kubernetes, eBPF, Edge Runtimes' },
    { name: 'Full-stack Systems', count: 54, department: 'Full-stack', desc: 'PostgreSQL, Node.js, Real-time APIs' },
    { name: 'Native Mobile', count: 18, department: 'Mobile', desc: 'Swift, SwiftUI, Instruments, Low Memory' }
  ];

  const featuredCompanies = [
    {
      name: 'Vercel',
      initials: 'VC',
      tagline: 'Developer infrastructure & edge platform',
      color: '#111111',
      openings: 3
    },
    {
      name: 'Stripe',
      initials: 'ST',
      tagline: 'Global financial infrastructure and ledgers',
      color: '#635BFF',
      openings: 5
    },
    {
      name: 'Linear',
      initials: 'LN',
      tagline: 'High-craft issue tracking & product velocity',
      color: '#5E6AD2',
      openings: 2
    },
    {
      name: 'Anthropic',
      initials: 'AN',
      tagline: 'Frontier AI safety & research institute',
      color: '#CC785C',
      openings: 4
    }
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      search: heroKeyword,
      location: heroLocation,
      departments: heroDepartment ? [heroDepartment] : prev.departments
    }));
    setActivePage('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (dept: string) => {
    setFilters((prev) => ({
      ...prev,
      departments: [dept],
      search: ''
    }));
    setActivePage('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompanyClick = (companyName: string) => {
    setFilters((prev) => ({
      ...prev,
      search: companyName
    }));
    setActivePage('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Editorial Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-8 border-b border-[#E8E5E1]/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Editorial lead badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#191919] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#E94B9B] animate-pulse" />
            <span>The Modern Editorial Engineering Exchange</span>
          </div>

          {/* Headline with italic editorial contrast - NO PERIOD AT END */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold italic text-[#191919] tracking-normal leading-[1.12] text-balance">
            Where exceptional engineers discover <span className="text-[#E94B9B]">defining</span> software careers
          </h1>

          {/* Supporting value proposition */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#191919]/70 leading-relaxed">
            Curated technical opportunities at companies obsessed with code craft, distributed rigor, and generational developer infrastructure. No automated recruiters, no salary obfuscation.
          </p>

          {/* Prominent Search Bar */}
          <form
            onSubmit={handleHeroSearch}
            className="mt-8 max-w-4xl mx-auto p-2 bg-white border border-[#E8E5E1] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] grid grid-cols-1 md:grid-cols-12 gap-2 text-left"
          >
            <div className="md:col-span-4 relative flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-[#191919]/40 pointer-events-none" />
              <input
                type="text"
                value={heroKeyword}
                onChange={(e) => setHeroKeyword(e.target.value)}
                placeholder="Role, tech stack, or company"
                className="w-full pl-10 pr-3 py-3 text-sm bg-transparent rounded-xl text-[#191919] placeholder:text-[#191919]/40 focus:outline-none focus:bg-[#FAF9F6]"
              />
            </div>

            <div className="md:col-span-3 relative flex items-center border-t md:border-t-0 md:border-l border-[#E8E5E1]">
              <MapPin className="w-4 h-4 absolute left-3.5 text-[#191919]/40 pointer-events-none" />
              <input
                type="text"
                value={heroLocation}
                onChange={(e) => setHeroLocation(e.target.value)}
                placeholder="Location or Remote"
                className="w-full pl-10 pr-3 py-3 text-sm bg-transparent rounded-xl text-[#191919] placeholder:text-[#191919]/40 focus:outline-none focus:bg-[#FAF9F6]"
              />
            </div>

            <div className="md:col-span-3 relative flex items-center border-t md:border-t-0 md:border-l border-[#E8E5E1]">
              <select
                value={heroDepartment}
                onChange={(e) => setHeroDepartment(e.target.value)}
                className="w-full px-3 py-3 text-sm bg-transparent rounded-xl text-[#191919]/80 focus:outline-none focus:bg-[#FAF9F6] cursor-pointer"
              >
                <option value="">All Disciplines</option>
                <option value="Frontend">Frontend & UI</option>
                <option value="Backend">Backend & Systems</option>
                <option value="AI & ML">AI & Machine Learning</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Full-stack">Full-stack</option>
                <option value="Mobile">Mobile Architecture</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full h-full py-3 px-4 bg-[#E94B9B] hover:bg-[#D63E8A] active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Popular searches / editorial tags */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-[#191919]/60">
            <span className="font-semibold text-[#191919]/40">Trending:</span>
            {['TypeScript', 'Rust', 'Distributed Systems', 'Remote', 'Kubernetes', 'Next.js'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setHeroKeyword(item);
                  setFilters((prev) => ({ ...prev, search: item }));
                  setActivePage('jobs');
                }}
                className="hover:text-[#E94B9B] underline decoration-[#E8E5E1] underline-offset-4 hover:decoration-[#E94B9B] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Social Proof & Metrics adjacent to claim */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#E8E5E1]/60 text-left">
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#191919] tabular-nums font-heading block">
                1,420+
              </span>
              <span className="text-xs text-[#191919]/60 font-medium">
                Vetted Engineering Roles
              </span>
            </div>
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#E94B9B] tabular-nums font-heading block">
                $195,000
              </span>
              <span className="text-xs text-[#191919]/60 font-medium">
                Average Base Compensation
              </span>
            </div>
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#191919] tabular-nums font-heading block">
                100%
              </span>
              <span className="text-xs text-[#191919]/60 font-medium">
                Direct Engineering Teams
              </span>
            </div>
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#191919] tabular-nums font-heading block">
                48 hrs
              </span>
              <span className="text-xs text-[#191919]/60 font-medium">
                Median Response Horizon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E94B9B] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            {/* NO PERIOD AT END */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold italic text-[#191919] tracking-normal mt-1">
              Featured Engineering Roles
            </h2>
            <p className="text-sm text-[#191919]/65 mt-0.5">
              Hand-picked opportunities offering architectural autonomy and industry-leading compensation
            </p>
          </div>

          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, search: '' }));
              setActivePage('jobs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#191919] hover:text-[#E94B9B] transition-colors self-start sm:self-auto"
          >
            <span>Explore all {jobs.length} listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredJobs.map((job, idx) => (
            <JobCard
              key={job.id}
              job={job}
              staggerIndex={idx}
              onApplyClick={onOpenApplyModal}
            />
          ))}
        </div>
      </section>

      {/* Disciplines & Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#191919]/60 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#E94B9B]" />
            <span>Architecture Paths</span>
          </div>
          {/* NO PERIOD AT END */}
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold italic text-[#191919] tracking-normal mt-1">
            Browse by Engineering Discipline
          </h2>
          <p className="text-sm text-[#191919]/65 mt-0.5">
            Specialized tracks across modern full-stack, distributed infrastructure, and frontier AI systems
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.department)}
              className="group text-left p-5 bg-white border border-[#E8E5E1] rounded-xl transition-all duration-200 hover:border-[#E94B9B] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] focus-visible:outline-2 focus-visible:outline-[#E94B9B]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#191919] group-hover:text-[#E94B9B] font-heading transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs font-semibold text-[#191919]/50 tabular-nums">
                  {cat.count} roles
                </span>
              </div>
              <p className="mt-2 text-xs text-[#191919]/60 leading-relaxed">
                {cat.desc}
              </p>
              <div className="mt-4 pt-3 border-t border-[#E8E5E1]/60 flex items-center justify-between text-xs font-semibold text-[#191919]/70 group-hover:text-[#E94B9B] transition-colors">
                <span>View open requisitions</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#191919]/60 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#E94B9B]" />
            <span>World-Class Teams</span>
          </div>
          {/* NO PERIOD AT END */}
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold italic text-[#191919] tracking-normal mt-1">
            Featured Engineering Organizations
          </h2>
          <p className="text-sm text-[#191919]/65 mt-0.5">
            Companies renowned for elevating engineering standards, clear roadmaps, and generous employee equity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCompanies.map((comp) => (
            <div
              key={comp.name}
              className="bg-white border border-[#E8E5E1] rounded-xl p-5 flex flex-col justify-between transition-all hover:border-[#191919]/30 hover:shadow-xs"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm select-none mb-3"
                  style={{ backgroundColor: comp.color }}
                >
                  {comp.initials}
                </div>
                <h3 className="font-editorial text-xl font-semibold italic text-[#191919]">
                  {comp.name}
                </h3>
                <p className="mt-1 text-xs text-[#191919]/65 leading-relaxed line-clamp-2">
                  {comp.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E5E1]/60 flex items-center justify-between">
                <span className="text-xs text-[#191919]/60 font-medium tabular-nums">
                  {comp.openings} active listings
                </span>
                <button
                  onClick={() => handleCompanyClick(comp.name)}
                  className="text-xs font-semibold text-[#E94B9B] hover:text-[#D63E8A] inline-flex items-center gap-0.5"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Added Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#191919]/60 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-[#E94B9B]" />
              <span>Real-Time Feed</span>
            </div>
            {/* NO PERIOD AT END */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold italic text-[#191919] tracking-normal mt-1">
              Recently Posted Positions
            </h2>
          </div>

          <button
            onClick={() => {
              setActivePage('jobs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm font-semibold text-[#191919] hover:text-[#E94B9B] inline-flex items-center gap-1"
          >
            <span>View all roles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {recentJobs.map((job, idx) => (
            <JobCard
              key={job.id}
              job={job}
              staggerIndex={idx}
              onApplyClick={onOpenApplyModal}
            />
          ))}
        </div>
      </section>

      {/* Editorial Call-to-Action for Job Seekers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] border border-[#E8E5E1] rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#E94B9B]">
              Career Acceleration
            </span>
            {/* NO PERIOD AT END */}
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-semibold italic text-[#191919] tracking-normal leading-[1.12]">
              Ready to take the helm of <span className="text-[#E94B9B]">critical</span> software infrastructure
            </h2>
            <p className="text-sm sm:text-base text-[#191919]/70 leading-relaxed">
              Create an engineering dossier, set your direct salary thresholds, and receive verified technical invitations from engineering directors who review your code, not generic keywords.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActivePage('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#191919] hover:bg-[#E94B9B] text-white font-semibold text-sm rounded-xl transition-all shadow-xs"
              >
                Complete Engineering Profile
              </button>
              <button
                onClick={() => {
                  setActivePage('jobs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white border border-[#E8E5E1] hover:border-[#191919] text-[#191919] font-semibold text-sm rounded-xl transition-all"
              >
                Browse All Openings
              </button>
            </div>
          </div>

          <div
            className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#FCEAF3]/70 pointer-events-none blur-2xl"
            aria-hidden="true"
          />
        </div>
      </section>
    </div>
  );
};
