import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Upload,
  FileText,
  Trash2,
  Plus,
  Check,
  Briefcase,
  GraduationCap,
  Bell,
  Sliders,
  AlertCircle
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, uploadResume, removeResume, showToast } = useJobs();

  // Basic info form state
  const [formData, setFormData] = useState({
    name: profile.name,
    title: profile.title,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    bio: profile.bio,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    portfolioUrl: profile.portfolioUrl
  });

  // Skills state
  const [newSkill, setNewSkill] = useState('');

  // Experience entry state
  const [newRole, setNewRole] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newPeriod, setNewPeriod] = useState('');
  const [newExpDesc, setNewExpDesc] = useState('');
  const [showAddExp, setShowAddExp] = useState(false);

  // Resume drag state & errors
  const [resumeError, setResumeError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleSaveBasicInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (profile.skills.includes(trimmed)) {
      showToast('Skill already in your portfolio', 'info');
      return;
    }
    updateProfile({
      skills: [...profile.skills, trimmed]
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateProfile({
      skills: profile.skills.filter((s) => s !== skillToRemove)
    });
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.trim() || !newCompany.trim()) return;

    const newExp = {
      id: `exp-${Date.now()}`,
      role: newRole.trim(),
      company: newCompany.trim(),
      period: newPeriod.trim() || '2024 - Present',
      description: newExpDesc.trim() || 'Engineered critical platform features and services.'
    };

    updateProfile({
      experiences: [newExp, ...profile.experiences]
    });

    setNewRole('');
    setNewCompany('');
    setNewPeriod('');
    setNewExpDesc('');
    setShowAddExp(false);
  };

  const handleRemoveExperience = (expId: string) => {
    updateProfile({
      experiences: profile.experiences.filter((e) => e.id !== expId)
    });
  };

  // Client-side file validation (.pdf, .doc, .docx, max 5MB)
  const processFile = (file: File) => {
    setResumeError('');
    const validExtensions = ['pdf', 'doc', 'docx'];
    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    if (!validExtensions.includes(ext)) {
      setResumeError('Please upload a PDF or Microsoft Word (.doc, .docx) document');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setResumeError('File size exceeds the 5MB maximum limit');
      return;
    }

    const sizeFormatted = `${(file.size / 1024).toFixed(0)} KB`;
    uploadResume({
      name: file.name,
      size: sizeFormatted
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header - NO PERIOD AT END */}
      <div className="pb-4 border-b border-[#E8E5E1]">
        <span className="text-xs text-[#E94B9B] font-semibold tracking-wider uppercase block">
          Candidate Credentials
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl font-semibold italic text-[#191919] tracking-normal mt-1">
          Engineering Dossier & Settings
        </h1>
        <p className="text-sm text-[#191919]/65 mt-1">
          Manage your verified technical profile, portfolio credentials, and communication preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile Details & Experience (col-span-8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Personal Information Card */}
          <div className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E5E1]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FCEAF3] text-[#E94B9B] font-extrabold flex items-center justify-center text-lg font-heading">
                  {profile.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
                    Personal Information
                  </h2>
                  <span className="text-xs text-[#191919]/60">
                    Visible to hiring directors on submission
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveBasicInfo} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-[#191919] block mb-1.5">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#191919] block mb-1.5">
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-[#191919] block mb-1.5">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#191919] block mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#191919] block mb-1.5">
                    Current Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#191919] block mb-1.5">
                  Engineering Bio & Architectural Specialties
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] leading-relaxed focus:outline-none focus:border-[#E94B9B]"
                />
              </div>

              {/* Online Profiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="font-semibold text-[#191919] block mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#191919]/60" />
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#191919] block mb-1.5 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-[#191919]/60" />
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#191919] block mb-1.5 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-[#191919]/60" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E5E1] flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#191919] hover:bg-[#E94B9B] text-white font-semibold text-xs rounded-xl transition-all shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Technical Skills & Competencies */}
          <div className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
                Technical Stack & Core Competencies
              </h2>
              <p className="text-xs text-[#191919]/60 mt-0.5">
                Add frameworks, systems primitives, and languages you actively build with
              </p>
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g. Distributed Systems, Rust, eBPF, WebGL"
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg text-[#191919] focus:outline-none focus:border-[#E94B9B]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#191919] hover:bg-[#E94B9B] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </form>

            {/* Zero-Pill Compliant Interactive Filter/Tag Badges with Dismiss */}
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.skills.map((skill) => (
                <div
                  key={skill}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F6] hover:bg-[#FCEAF3] border border-[#E8E5E1] hover:border-[#E94B9B] rounded-lg text-xs font-semibold text-[#191919] transition-colors"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-[#191919]/40 hover:text-red-600 transition-colors"
                    title={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white border border-[#E8E5E1] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E5E1]">
              <div>
                <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
                  Software Engineering Experience
                </h2>
                <p className="text-xs text-[#191919]/60">
                  Track record of shipped systems and leadership impact
                </p>
              </div>

              <button
                onClick={() => setShowAddExp(!showAddExp)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E8E5E1] bg-[#FAF9F6] hover:bg-white text-xs font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#E94B9B]" />
                <span>{showAddExp ? 'Cancel' : 'Add Position'}</span>
              </button>
            </div>

            {/* Add Experience Form */}
            {showAddExp && (
              <form onSubmit={handleAddExperience} className="p-4 bg-[#FAF9F6] border border-[#E8E5E1] rounded-xl space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Role Title</label>
                    <input
                      type="text"
                      required
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="e.g. Senior Backend Engineer"
                      className="w-full px-3 py-2 bg-white border border-[#E8E5E1] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      placeholder="e.g. Stripe"
                      className="w-full px-3 py-2 bg-white border border-[#E8E5E1] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Tenure Period</label>
                    <input
                      type="text"
                      value={newPeriod}
                      onChange={(e) => setNewPeriod(e.target.value)}
                      placeholder="e.g. 2022 - 2024"
                      className="w-full px-3 py-2 bg-white border border-[#E8E5E1] rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Key Outcomes & Architecture</label>
                  <textarea
                    rows={2}
                    value={newExpDesc}
                    onChange={(e) => setNewExpDesc(e.target.value)}
                    placeholder="Designed Kafka ingestion pipeline processing 20M events daily..."
                    className="w-full px-3 py-2 bg-white border border-[#E8E5E1] rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#E94B9B] text-white font-semibold rounded-lg hover:bg-[#D63E8A]"
                  >
                    Save Experience Record
                  </button>
                </div>
              </form>
            )}

            {/* Experience List */}
            <div className="space-y-4">
              {profile.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 bg-[#FAF9F6] border border-[#E8E5E1] rounded-xl flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#E94B9B]" />
                      <h3 className="text-sm font-bold text-[#191919] font-heading">
                        {exp.role}
                      </h3>
                      <span className="text-xs text-[#191919]/50">· {exp.company}</span>
                    </div>
                    <span className="text-xs text-[#191919]/50 block">
                      {exp.period}
                    </span>
                    <p className="text-xs text-[#191919]/80 leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="p-1.5 text-[#191919]/30 hover:text-red-600 rounded transition-colors"
                    title="Remove experience"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Resume & Notification Preferences (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Resume Upload Card */}
          <div className="bg-white border border-[#E8E5E1] rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
                Engineering Resume
              </h2>
              <p className="text-xs text-[#191919]/60">
                PDF or Word format, maximum 5MB
              </p>
            </div>

            {resumeError && (
              <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{resumeError}</span>
              </div>
            )}

            {profile.resumeFile ? (
              /* Attached Resume State */
              <div className="p-4 bg-[#FAF9F6] border border-[#E8E5E1] rounded-xl space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white border border-[#E8E5E1] rounded-lg text-[#E94B9B]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1 text-xs">
                    <span className="font-bold text-[#191919] block truncate">
                      {profile.resumeFile.name}
                    </span>
                    <span className="text-[#191919]/50 block">
                      {profile.resumeFile.size} · Uploaded {profile.resumeFile.uploadedAt}
                    </span>
                    <span className="text-emerald-700 font-medium inline-flex items-center gap-1 mt-1">
                      <Check className="w-3 h-3" /> Ready for applications
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8E5E1] flex gap-2">
                  <label className="flex-1 py-1.5 px-3 bg-white border border-[#E8E5E1] hover:border-[#191919] text-[#191919] text-xs font-semibold rounded-lg text-center cursor-pointer transition-colors">
                    <span>Replace File</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <button
                    onClick={removeResume}
                    className="p-1.5 text-[#191919]/50 hover:text-red-600 border border-[#E8E5E1] bg-white rounded-lg transition-colors"
                    title="Remove resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Drag & Drop Upload Zone */
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center space-y-2 transition-colors ${
                  dragActive
                    ? 'border-[#E94B9B] bg-[#FCEAF3]/40'
                    : 'border-[#E8E5E1] hover:border-[#191919]/40 bg-[#FAF9F6]'
                }`}
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-white border border-[#E8E5E1] flex items-center justify-center text-[#E94B9B]">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <label className="text-[#E94B9B] font-semibold hover:underline cursor-pointer">
                    Click to browse files
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <span className="text-[#191919]/60 block mt-0.5">
                    or drag & drop your resume here
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Job Search Preferences */}
          <div className="bg-white border border-[#E8E5E1] rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
                Search Preferences
              </h2>
              <p className="text-xs text-[#191919]/60">
                Tailor incoming technical recommendations
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#191919] block mb-1">
                  Target Minimum Base Salary
                </label>
                <div className="flex items-center justify-between text-xs font-bold text-[#E94B9B] mb-1 tabular-nums font-heading">
                  <span>Current Setting:</span>
                  <span>${(profile.preferences.targetSalary / 1000).toFixed(0)}k/yr</span>
                </div>
                <input
                  type="range"
                  min="120000"
                  max="280000"
                  step="10000"
                  value={profile.preferences.targetSalary}
                  onChange={(e) =>
                    updateProfile({
                      preferences: {
                        ...profile.preferences,
                        targetSalary: Number(e.target.value)
                      }
                    })
                  }
                  className="w-full h-1.5 bg-[#E8E5E1] rounded-lg appearance-none cursor-pointer accent-[#E94B9B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#191919] block mb-1">
                  Desired Role Target
                </label>
                <input
                  type="text"
                  value={profile.preferences.desiredRole}
                  onChange={(e) =>
                    updateProfile({
                      preferences: {
                        ...profile.preferences,
                        desiredRole: e.target.value
                      }
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E8E5E1] rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white border border-[#E8E5E1] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#E94B9B]" />
              <h2 className="font-editorial text-2xl font-semibold italic text-[#191919] tracking-normal">
                Alert Preferences
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between cursor-pointer py-1">
                <div>
                  <span className="font-semibold text-[#191919] block">Requisition Alerts</span>
                  <span className="text-[11px] text-[#191919]/50">Instant ping when matching role is posted</span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.notifications.emailAlerts}
                  onChange={(e) =>
                    updateProfile({
                      notifications: {
                        ...profile.notifications,
                        emailAlerts: e.target.checked
                      }
                    })
                  }
                  className="w-4 h-4 accent-[#E94B9B]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1 border-t border-[#E8E5E1]/60">
                <div>
                  <span className="font-semibold text-[#191919] block">Pipeline Updates</span>
                  <span className="text-[11px] text-[#191919]/50">Stage movements & interview notes</span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.notifications.applicationUpdates}
                  onChange={(e) =>
                    updateProfile({
                      notifications: {
                        ...profile.notifications,
                        applicationUpdates: e.target.checked
                      }
                    })
                  }
                  className="w-4 h-4 accent-[#E94B9B]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer py-1 border-t border-[#E8E5E1]/60">
                <div>
                  <span className="font-semibold text-[#191919] block">Engineering Leadership DMs</span>
                  <span className="text-[11px] text-[#191919]/50">Direct outreach from hiring VPs</span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.notifications.employerMessages}
                  onChange={(e) =>
                    updateProfile({
                      notifications: {
                        ...profile.notifications,
                        employerMessages: e.target.checked
                      }
                    })
                  }
                  className="w-4 h-4 accent-[#E94B9B]"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
