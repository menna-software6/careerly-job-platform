import React from 'react';
import { useJobs } from '../context/JobContext';
import { WorkMode, JobType, ExperienceLevel } from '../types/job';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';

interface JobFilterSidebarProps {
  totalMatches: number;
}

export const JobFilterSidebar: React.FC<JobFilterSidebarProps> = ({ totalMatches }) => {
  const { filters, setFilters, resetFilters } = useJobs();

  const WORK_MODES: WorkMode[] = ['Remote', 'Hybrid', 'On-site'];
  const JOB_TYPES: JobType[] = ['Full-time', 'Contract', 'Part-time', 'Internship'];
  const EXP_LEVELS: ExperienceLevel[] = ['Entry', 'Mid', 'Senior', 'Lead'];
  const DEPARTMENTS = [
    'Frontend',
    'Backend',
    'Full-stack',
    'DevOps & Cloud',
    'AI & ML',
    'Mobile'
  ];

  const toggleWorkMode = (mode: WorkMode) => {
    setFilters((prev) => ({
      ...prev,
      workModes: prev.workModes.includes(mode)
        ? prev.workModes.filter((m) => m !== mode)
        : [...prev.workModes, mode]
    }));
  };

  const toggleJobType = (type: JobType) => {
    setFilters((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter((t) => t !== type)
        : [...prev.jobTypes, type]
    }));
  };

  const toggleExpLevel = (level: ExperienceLevel) => {
    setFilters((prev) => ({
      ...prev,
      experienceLevels: prev.experienceLevels.includes(level)
        ? prev.experienceLevels.filter((l) => l !== level)
        : [...prev.experienceLevels, level]
    }));
  };

  const toggleDepartment = (dept: string) => {
    setFilters((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept]
    }));
  };

  const activeFilterCount =
    (filters.search ? 1 : 0) +
    (filters.location ? 1 : 0) +
    filters.workModes.length +
    filters.jobTypes.length +
    filters.experienceLevels.length +
    filters.departments.length +
    (filters.minSalary > 100000 ? 1 : 0);

  return (
    <aside className="bg-white border border-[#E8E5E1] rounded-xl p-5 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E5E1]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#E94B9B]" />
          <h2 className="font-editorial text-xl font-semibold italic text-[#191919] tracking-normal">
            Filter Roles
          </h2>
          {activeFilterCount > 0 && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FCEAF3] text-[#E94B9B] tabular-nums">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-[#191919]/60 hover:text-[#E94B9B] flex items-center gap-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset all
          </button>
        )}
      </div>

      {/* Keyword Search */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#191919] uppercase tracking-wider block">
          Keyword Search
        </label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#191919]/40" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Role, tech stack, or company"
            className="w-full pl-9 pr-3 py-2 text-sm bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] placeholder:text-[#191919]/40 focus:outline-none focus:border-[#E94B9B] focus:ring-1 focus:ring-[#E94B9B]"
          />
        </div>
      </div>

      {/* Location Search */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#191919] uppercase tracking-wider block">
          Location
        </label>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
          placeholder="City, state, or remote"
          className="w-full px-3 py-2 text-sm bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] placeholder:text-[#191919]/40 focus:outline-none focus:border-[#E94B9B] focus:ring-1 focus:ring-[#E94B9B]"
        />
      </div>

      {/* Work Mode - Interactive Segmented Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#191919] uppercase tracking-wider block">
          Work Environment
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg">
          {WORK_MODES.map((mode) => {
            const isSelected = filters.workModes.includes(mode);
            return (
              <button
                key={mode}
                onClick={() => toggleWorkMode(mode)}
                className={`py-1.5 text-xs font-medium rounded-md transition-all text-center truncate ${
                  isSelected
                    ? 'bg-[#E94B9B] text-white shadow-xs'
                    : 'text-[#191919]/70 hover:text-[#191919] hover:bg-white/60'
                }`}
              >
                {mode}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Salary Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#191919] uppercase tracking-wider">
            Minimum Base Salary
          </label>
          <span className="text-xs font-bold text-[#E94B9B] tabular-nums font-heading">
            ${(filters.minSalary / 1000).toFixed(0)}k+/yr
          </span>
        </div>
        <input
          type="range"
          min="80000"
          max="240000"
          step="10000"
          value={filters.minSalary}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, minSalary: Number(e.target.value) }))
          }
          className="w-full h-1.5 bg-[#E8E5E1] rounded-lg appearance-none cursor-pointer accent-[#E94B9B]"
        />
        <div className="flex justify-between text-[11px] text-[#191919]/50 tabular-nums">
          <span>$80k</span>
          <span>$160k</span>
          <span>$240k</span>
        </div>
      </div>

      {/* Departments */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#191919] uppercase tracking-wider block">
          Engineering Department
        </label>
        <div className="space-y-1.5">
          {DEPARTMENTS.map((dept) => {
            const isChecked = filters.departments.includes(dept);
            return (
              <label
                key={dept}
                className="flex items-center gap-2.5 text-xs text-[#191919]/80 hover:text-[#191919] cursor-pointer py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleDepartment(dept)}
                  className="rounded border-[#E8E5E1] text-[#E94B9B] focus:ring-[#E94B9B] w-3.5 h-3.5 accent-[#E94B9B]"
                />
                <span>{dept}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#191919] uppercase tracking-wider block">
          Seniority Level
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {EXP_LEVELS.map((level) => {
            const isChecked = filters.experienceLevels.includes(level);
            return (
              <label
                key={level}
                className={`flex items-center gap-2 px-2.5 py-1.5 border rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  isChecked
                    ? 'border-[#E94B9B] bg-[#FCEAF3] text-[#E94B9B]'
                    : 'border-[#E8E5E1] bg-white text-[#191919]/70 hover:border-[#191919]/30'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleExpLevel(level)}
                  className="sr-only"
                />
                <span>{level}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Job Type */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#191919] uppercase tracking-wider block">
          Employment Type
        </label>
        <div className="space-y-1.5">
          {JOB_TYPES.map((type) => {
            const isChecked = filters.jobTypes.includes(type);
            return (
              <label
                key={type}
                className="flex items-center gap-2.5 text-xs text-[#191919]/80 hover:text-[#191919] cursor-pointer py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleJobType(type)}
                  className="rounded border-[#E8E5E1] text-[#E94B9B] focus:ring-[#E94B9B] w-3.5 h-3.5 accent-[#E94B9B]"
                />
                <span>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="pt-4 border-t border-[#E8E5E1] text-xs text-[#191919]/60 flex items-center justify-between">
        <span>Matching Roles:</span>
        <span className="font-bold text-[#191919] tabular-nums font-heading">
          {totalMatches}
        </span>
      </div>
    </aside>
  );
};
