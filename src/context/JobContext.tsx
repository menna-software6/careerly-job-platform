import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Job,
  Application,
  UserProfile,
  FilterState,
  ApplicationStatus
} from '../types/job';
import {
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_USER_PROFILE
} from '../data/mockJobs';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

export type ActivePage = 'home' | 'jobs' | 'job-details' | 'saved' | 'tracker' | 'profile' | 'employer';

const DEFAULT_FILTERS: FilterState = {
  search: '',
  location: '',
  workModes: [],
  jobTypes: [],
  experienceLevels: [],
  departments: [],
  minSalary: 100000,
  sortBy: 'newest'
};

interface JobContextType {
  jobs: Job[];
  savedJobIds: string[];
  applications: Application[];
  profile: UserProfile;
  activePage: ActivePage;
  selectedJobId: string | null;
  filters: FilterState;
  toasts: ToastMessage[];
  setActivePage: (page: ActivePage) => void;
  viewJobDetails: (jobId: string) => void;
  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  applyForJob: (jobId: string, notes?: string) => boolean;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, notes?: string) => void;
  deleteApplication: (applicationId: string) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  uploadResume: (file: { name: string; size: string }) => void;
  removeResume: () => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  postEmployerJob: (job: Omit<Job, 'id' | 'postedDate' | 'postedTimestamp' | 'applicantCount'>) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SAVED: 'careerly_saved_job_ids_v1',
  APPLICATIONS: 'careerly_applications_v1',
  PROFILE: 'careerly_profile_v1',
  CUSTOM_JOBS: 'careerly_custom_jobs_v1'
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Saved Job IDs
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED);
      if (stored) return JSON.parse(stored);
    } catch {
      // Fallback
    }
    return ['job-1', 'job-3'];
  });

  // Applications
  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (stored) return JSON.parse(stored);
    } catch {
      // Fallback
    }
    return INITIAL_APPLICATIONS;
  });

  // User Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (stored) return JSON.parse(stored);
    } catch {
      // Fallback
    }
    return INITIAL_USER_PROFILE;
  });

  // Custom posted jobs
  const [customJobs, setCustomJobs] = useState<Job[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_JOBS);
      if (stored) return JSON.parse(stored);
    } catch {
      // Fallback
    }
    return [];
  });

  // Parse initial route from URL hash or query parameters to support direct navigation & refreshes
  const parseLocationState = (): { page: ActivePage; jobId: string | null } => {
    try {
      if (typeof window === 'undefined') return { page: 'home', jobId: null };
      const hash = window.location.hash.replace(/^#\/?/, '');
      const [routePart, queryPart] = hash.split('?');
      const validPages: ActivePage[] = ['home', 'jobs', 'job-details', 'saved', 'tracker', 'profile', 'employer'];

      let page: ActivePage = 'home';
      let jobId: string | null = null;

      if (validPages.includes(routePart as ActivePage)) {
        page = routePart as ActivePage;
      }

      if (queryPart) {
        const params = new URLSearchParams(queryPart);
        jobId = params.get('id');
      }

      if (page === 'home' && window.location.search) {
        const searchParams = new URLSearchParams(window.location.search);
        const pageParam = searchParams.get('page');
        if (pageParam && validPages.includes(pageParam as ActivePage)) {
          page = pageParam as ActivePage;
        }
        if (searchParams.get('id')) {
          jobId = searchParams.get('id');
        }
      }

      return { page, jobId };
    } catch {
      return { page: 'home', jobId: null };
    }
  };

  const initialLoc = parseLocationState();
  const [activePage, _setActivePage] = useState<ActivePage>(initialLoc.page);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(initialLoc.jobId);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize browser history and hash on hashchange / popstate
  useEffect(() => {
    const handleHashChange = () => {
      const { page, jobId } = parseLocationState();
      _setActivePage(page);
      if (jobId) {
        setSelectedJobId(jobId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const setActivePage = (page: ActivePage) => {
    _setActivePage(page);
    try {
      const targetHash = page === 'job-details' && selectedJobId
        ? `#/job-details?id=${selectedJobId}`
        : `#/${page}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }
    } catch {
      // ignore
    }
  };

  // Combined jobs list: custom posted jobs at the top, then base jobs
  const jobs: Job[] = [...customJobs, ...INITIAL_JOBS];

  // Sync saved to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedJobIds));
    } catch {
      // storage unavailable
    }
  }, [savedJobIds]);

  // Sync applications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch {
      // storage unavailable
    }
  }, [applications]);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      // storage unavailable
    }
  }, [profile]);

  // Sync custom jobs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_JOBS, JSON.stringify(customJobs));
    } catch {
      // storage unavailable
    }
  }, [customJobs]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

  const toggleSaveJob = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    const jobTitle = job ? job.title : 'Job';
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
      showToast(`Removed "${jobTitle}" from saved jobs`, 'info');
    } else {
      setSavedJobIds((prev) => [...prev, jobId]);
      showToast(`Saved "${jobTitle}" to your collection`, 'success');
    }
  };

  const viewJobDetails = (jobId: string) => {
    const exists = jobs.some((j) => j.id === jobId);
    if (exists) {
      setSelectedJobId(jobId);
      _setActivePage('job-details');
      try {
        window.history.pushState(null, '', `#/job-details?id=${jobId}`);
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast('Selected job listing is no longer available', 'error');
    }
  };

  const applyForJob = (jobId: string, notes?: string): boolean => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) {
      showToast('Unable to apply: Job listing not found', 'error');
      return false;
    }

    const alreadyApplied = applications.some((app) => app.jobId === jobId);
    if (alreadyApplied) {
      showToast(`You have already submitted an application to ${job.company}`, 'info');
      return false;
    }

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      salary: `$${(job.minSalary / 1000).toFixed(0)}k - $${(job.maxSalary / 1000).toFixed(0)}k`,
      appliedDate: 'Just now',
      appliedTimestamp: Date.now(),
      status: 'Applied',
      resumeName: profile.resumeFile?.name || 'Candidate_Profile.pdf',
      notes: notes || 'Direct submission through CAREERLY one-click application',
      interviewStage: 'Application Received'
    };

    setApplications((prev) => [newApplication, ...prev]);
    showToast(`Application successfully sent to ${job.company}`, 'success');
    return true;
  };

  const updateApplicationStatus = (
    applicationId: string,
    status: ApplicationStatus,
    notes?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          return {
            ...app,
            status,
            notes: notes !== undefined ? notes : app.notes
          };
        }
        return app;
      })
    );
    showToast(`Application updated to stage: ${status}`, 'success');
  };

  const deleteApplication = (applicationId: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== applicationId));
    showToast('Application record removed', 'info');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated,
      preferences: {
        ...prev.preferences,
        ...(updated.preferences || {})
      },
      notifications: {
        ...prev.notifications,
        ...(updated.notifications || {})
      }
    }));
    showToast('Profile updated successfully', 'success');
  };

  const uploadResume = (file: { name: string; size: string }) => {
    setProfile((prev) => ({
      ...prev,
      resumeFile: {
        name: file.name,
        size: file.size,
        uploadedAt: 'Today'
      }
    }));
    showToast(`Resume "${file.name}" uploaded successfully`, 'success');
  };

  const removeResume = () => {
    setProfile((prev) => ({
      ...prev,
      resumeFile: null
    }));
    showToast('Resume removed from profile', 'info');
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const postEmployerJob = (
    jobData: Omit<Job, 'id' | 'postedDate' | 'postedTimestamp' | 'applicantCount'>
  ) => {
    const newJob: Job = {
      ...jobData,
      id: `job-custom-${Date.now()}`,
      postedDate: 'Just now',
      postedTimestamp: Date.now(),
      applicantCount: 0
    };

    setCustomJobs((prev) => [newJob, ...prev]);
    showToast(`Job listing for "${jobData.title}" posted live`, 'success');
    // Switch to view the created job
    setSelectedJobId(newJob.id);
    setActivePage('job-details');
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        savedJobIds,
        applications,
        profile,
        activePage,
        selectedJobId,
        filters,
        toasts,
        setActivePage,
        viewJobDetails,
        toggleSaveJob,
        isJobSaved,
        applyForJob,
        updateApplicationStatus,
        deleteApplication,
        updateProfile,
        uploadResume,
        removeResume,
        setFilters,
        resetFilters,
        postEmployerJob,
        showToast,
        removeToast
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
