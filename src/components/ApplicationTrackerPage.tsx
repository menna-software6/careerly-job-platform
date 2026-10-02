import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { Application, ApplicationStatus } from '../types/job';
import {
  Briefcase,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const STATUS_COLUMNS: { key: ApplicationStatus; label: string; desc: string; color: string; badgeBg: string }[] = [
  { key: 'Saved', label: 'Bookmarked', desc: 'Saved for preparation', color: 'text-amber-700', badgeBg: 'bg-amber-50 border-amber-200' },
  { key: 'Applied', label: 'Applied', desc: 'Transmitted to hiring team', color: 'text-sky-700', badgeBg: 'bg-sky-50 border-sky-200' },
  { key: 'Interview', label: 'Interviewing', desc: 'Technical & architecture loops', color: 'text-[#E94B9B]', badgeBg: 'bg-[#FCEAF3] border-[#f8cde2]' },
  { key: 'Offer', label: 'Offer Received', desc: 'Package under negotiation', color: 'text-emerald-700', badgeBg: 'bg-emerald-50 border-emerald-200' },
  { key: 'Rejected', label: 'Concluded', desc: 'Requisition paused or closed', color: 'text-neutral-600', badgeBg: 'bg-neutral-100 border-neutral-200' }
];

export const ApplicationTrackerPage: React.FC = () => {
  const {
    applications,
    updateApplicationStatus,
    deleteApplication,
    viewJobDetails,
    showToast
  } = useJobs();

  const [activeTab, setActiveTab] = useState<'board' | 'table'>('board');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesBuffer, setNotesBuffer] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Manual application form state
  const [manualCompany, setManualCompany] = useState('');
  const [manualTitle, setManualTitle] = useState('');
  const [manualSalary, setManualSalary] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [manualStatus, setManualStatus] = useState<ApplicationStatus>('Applied');
  const [manualNotes, setManualNotes] = useState('');

  const stats = {
    total: applications.length,
    interviewing: applications.filter((a) => a.status === 'Interview').length,
    offers: applications.filter((a) => a.status === 'Offer').length,
    applied: applications.filter((a) => a.status === 'Applied').length
  };

  const startEditNotes = (app: Application) => {
    setEditingNotesId(app.id);
    setNotesBuffer(app.notes || '');
  };

  const saveEditNotes = (appId: string) => {
    const app = applications.find((a) => a.id === appId);
    if (app) {
      updateApplicationStatus(appId, app.status, notesBuffer);
      setEditingNotesId(null);
    }
  };

  const handleCreateManualApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCompany.trim() || !manualTitle.trim()) {
      showToast('Please provide both company name and role title', 'error');
      return;
    }

    const newApp: Application = {
      id: `manual-app-${Date.now()}`,
      jobId: `custom-role-${Date.now()}`,
      company: manualCompany.trim(),
      jobTitle: manualTitle.trim(),
      location: manualLocation.trim() || 'Remote',
      salary: manualSalary.trim() || '$160,000 - $220,000',
      appliedDate: 'Today',
      appliedTimestamp: Date.now(),
      status: manualStatus,
      notes: manualNotes.trim() || 'Tracked external submission',
      interviewStage: manualStatus === 'Interview' ? 'First Round' : undefined
    };

    updateApplicationStatus(newApp.id, manualStatus, newApp.notes);
    // Directly add to list via state: let's reset form
    setManualCompany('');
    setManualTitle('');
    setManualSalary('');
    setManualLocation('');
    setManualNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner Header - NO PERIOD AT END */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E8E5E1]">
        <div>
          <span className="text-xs text-[#E94B9B] font-semibold tracking-wider uppercase block">
            Pipeline Analytics
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-semibold italic text-[#191919] tracking-normal mt-1">
            Application Tracking Dashboard
          </h1>
          <p className="text-sm text-[#191919]/65 mt-1">
            Real-time pipeline tracking, interview round management, and decision timeline monitoring
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="inline-flex p-1 bg-white border border-[#E8E5E1] rounded-lg">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'board'
                  ? 'bg-[#191919] text-white'
                  : 'text-[#191919]/70 hover:text-[#191919]'
              }`}
            >
              Kanban Board
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'table'
                  ? 'bg-[#191919] text-white'
                  : 'text-[#191919]/70 hover:text-[#191919]'
              }`}
            >
              List View
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E94B9B] hover:bg-[#D63E8A] text-white text-xs font-semibold rounded-lg transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </button>
        </div>
      </div>

      {/* Summary Statistics Cards with Animated Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-[#E8E5E1] rounded-xl space-y-1">
          <span className="text-xs text-[#191919]/60 font-medium">Total Applications</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#191919] tabular-nums font-heading block">
            {stats.total}
          </span>
          <span className="text-[11px] text-[#191919]/50 block">In career pipeline</span>
        </div>

        <div className="p-5 bg-white border border-[#E8E5E1] rounded-xl space-y-1">
          <span className="text-xs text-sky-800 font-medium">Active In Review</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-sky-900 tabular-nums font-heading block">
            {stats.applied}
          </span>
          <span className="text-[11px] text-[#191919]/50 block">Under engineering review</span>
        </div>

        <div className="p-5 bg-white border border-[#E8E5E1] rounded-xl space-y-1">
          <span className="text-xs text-[#E94B9B] font-medium">Interview Loops</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#E94B9B] tabular-nums font-heading block">
            {stats.interviewing}
          </span>
          <span className="text-[11px] text-[#191919]/50 block">Architecture & coding</span>
        </div>

        <div className="p-5 bg-white border border-[#E8E5E1] rounded-xl space-y-1">
          <span className="text-xs text-emerald-800 font-medium">Received Offers</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tabular-nums font-heading block">
            {stats.offers}
          </span>
          <span className="text-[11px] text-[#191919]/50 block">Compensation negotiation</span>
        </div>
      </div>

      {/* Main Tracker Container */}
      {applications.length === 0 ? (
        <div className="p-16 bg-white border border-[#E8E5E1] rounded-2xl text-center space-y-3">
          <Briefcase className="w-12 h-12 mx-auto text-[#191919]/30" />
          <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
            No Applications Currently Tracked
          </h2>
          <p className="text-sm text-[#191919]/60 max-w-sm mx-auto">
            Apply to engineering positions using the one-click apply button on job listings, or manually log external applications above.
          </p>
        </div>
      ) : activeTab === 'board' ? (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
          {STATUS_COLUMNS.map((column) => {
            const columnApps = applications.filter((app) => app.status === column.key);
            return (
              <div
                key={column.key}
                className="bg-[#FAF9F6] border border-[#E8E5E1] rounded-xl p-3 space-y-3 flex flex-col min-h-[420px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E5E1]/80 px-1">
                  <div>
                    <h3 className="text-xs font-bold text-[#191919] uppercase tracking-wider">
                      {column.label}
                    </h3>
                    <span className="text-[10px] text-[#191919]/50 block">
                      {column.desc}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-[#E8E5E1] text-[#191919] tabular-nums">
                    {columnApps.length}
                  </span>
                </div>

                {/* Cards Stream */}
                <div className="space-y-2.5 flex-1">
                  {columnApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white border border-[#E8E5E1] rounded-lg p-3.5 space-y-2.5 shadow-2xs hover:border-[#191919]/30 transition-all text-left"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold text-[#E94B9B] uppercase tracking-wider block">
                            {app.company}
                          </span>
                          <h4 className="text-xs font-bold text-[#191919] font-heading leading-tight line-clamp-2">
                            {app.jobTitle}
                          </h4>
                        </div>
                        <button
                          onClick={() => deleteApplication(app.id)}
                          className="text-[#191919]/30 hover:text-red-600 p-1 rounded transition-colors"
                          title="Delete application record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Unboxed Metadata with · separator */}
                      <div className="text-[11px] text-[#191919]/60 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#191919]/40" />
                          <span>Applied {app.appliedDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium text-[#191919]">
                          <DollarSign className="w-3 h-3 text-[#191919]/40" />
                          <span className="tabular-nums">{app.salary}</span>
                        </div>
                      </div>

                      {/* Stage Selector */}
                      <div className="pt-2 border-t border-[#E8E5E1]/60">
                        <label className="text-[10px] text-[#191919]/50 uppercase font-semibold block mb-1">
                          Move Stage:
                        </label>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            updateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                          }
                          className="w-full text-xs font-semibold py-1 px-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded text-[#191919] cursor-pointer"
                        >
                          <option value="Saved">Bookmarked</option>
                          <option value="Applied">Applied</option>
                          <option value="Interview">Interview</option>
                          <option value="Offer">Offer</option>
                          <option value="Rejected">Concluded</option>
                        </select>
                      </div>

                      {/* Notes / Technical round status */}
                      <div className="pt-1.5 border-t border-[#E8E5E1]/60 text-[11px]">
                        {editingNotesId === app.id ? (
                          <div className="space-y-1.5">
                            <textarea
                              rows={2}
                              value={notesBuffer}
                              onChange={(e) => setNotesBuffer(e.target.value)}
                              className="w-full p-1.5 text-xs bg-[#FAF9F6] border border-[#E8E5E1] rounded text-[#191919]"
                              placeholder="Add round details, recruiter notes..."
                            />
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="px-2 py-0.5 text-[10px] border border-[#E8E5E1] rounded"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => saveEditNotes(app.id)}
                                className="px-2 py-0.5 text-[10px] bg-[#E94B9B] text-white rounded font-medium"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => startEditNotes(app)}
                            className="p-1.5 bg-[#FAF9F6] hover:bg-[#FCEAF3]/50 rounded cursor-pointer transition-colors text-[#191919]/70 text-[11px] leading-tight"
                            title="Click to edit notes"
                          >
                            {app.notes ? (
                              <span>{app.notes}</span>
                            ) : (
                              <span className="italic text-[#191919]/40">+ Add round notes</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {columnApps.length === 0 && (
                    <div className="h-28 border border-dashed border-[#E8E5E1] rounded-lg flex items-center justify-center text-[11px] text-[#191919]/40">
                      Empty stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed List / Table View */
        <div className="bg-white border border-[#E8E5E1] rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] border-b border-[#E8E5E1] text-[#191919]/70 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Role & Company</th>
                  <th className="py-3.5 px-4">Compensation</th>
                  <th className="py-3.5 px-4">Applied Date</th>
                  <th className="py-3.5 px-4">Current Stage</th>
                  <th className="py-3.5 px-4">Interview Notes</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E5E1]">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#FAF9F6]/60 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#191919] block">{app.jobTitle}</span>
                      <span className="text-[#E94B9B] font-semibold">{app.company}</span>
                      <span className="text-[#191919]/50 block">{app.location}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#191919] tabular-nums">
                      {app.salary}
                    </td>
                    <td className="py-3 px-4 text-[#191919]/70">
                      {app.appliedDate}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                        }
                        className="text-xs font-semibold py-1 px-2.5 bg-white border border-[#E8E5E1] rounded-lg text-[#191919] cursor-pointer"
                      >
                        <option value="Saved">Bookmarked</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Concluded</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-[#191919]/70 max-w-xs">
                      {app.notes || <span className="text-[#191919]/30 italic">No notes</span>}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="p-1.5 text-[#191919]/40 hover:text-red-600 rounded transition-colors"
                        title="Delete application"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add Manual Application */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md bg-white border border-[#E8E5E1] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between p-5 border-b border-[#E8E5E1] bg-[#FAF9F6]">
              <h3 className="font-editorial text-2xl font-semibold italic text-[#191919]">
                Log External Application
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#191919]/40 hover:text-[#191919]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateManualApp} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-[#191919] block mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={manualCompany}
                  onChange={(e) => setManualCompany(e.target.value)}
                  placeholder="e.g. OpenAI, GitHub, Apple"
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#191919] block mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="e.g. Senior Backend Architect"
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#191919] block mb-1">Location</label>
                  <input
                    type="text"
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    placeholder="e.g. Remote or Seattle, WA"
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#191919] block mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={manualSalary}
                    onChange={(e) => setManualSalary(e.target.value)}
                    placeholder="e.g. $190k - $240k"
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#191919] block mb-1">Initial Status</label>
                <select
                  value={manualStatus}
                  onChange={(e) => setManualStatus(e.target.value as ApplicationStatus)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919]"
                >
                  <option value="Saved">Bookmarked</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#191919] block mb-1">Notes / Key Contacts</label>
                <textarea
                  rows={2}
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  placeholder="Recruiter contact, referral link, next round..."
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8E5E1] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#E8E5E1] rounded-lg font-medium text-[#191919]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E94B9B] text-white rounded-lg font-semibold hover:bg-[#D63E8A]"
                >
                  Track Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
