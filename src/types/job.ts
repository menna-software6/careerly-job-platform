export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
export type JobType = 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
export type ApplicationStatus = 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface CompanyDetails {
  about: string;
  website: string;
  founded: number;
  size: string;
  headquarters: string;
  fundingStage?: string;
  accentColor: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyInitials: string;
  location: string;
  workMode: WorkMode;
  type: JobType;
  experienceLevel: ExperienceLevel;
  department: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
  postedDate: string;
  postedTimestamp: number;
  featured?: boolean;
  urgent?: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  skills: string[];
  benefits: string[];
  companyDetails: CompanyDetails;
  applicantCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  appliedTimestamp: number;
  status: ApplicationStatus;
  resumeName?: string;
  notes?: string;
  interviewStage?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface UserProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  skills: string[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  resumeFile: {
    name: string;
    size: string;
    uploadedAt: string;
  } | null;
  preferences: {
    desiredRole: string;
    targetSalary: number;
    preferredWorkModes: WorkMode[];
    preferredLocations: string[];
  };
  notifications: {
    emailAlerts: boolean;
    applicationUpdates: boolean;
    weeklyDigest: boolean;
    employerMessages: boolean;
  };
}

export interface FilterState {
  search: string;
  location: string;
  workModes: WorkMode[];
  jobTypes: JobType[];
  experienceLevels: ExperienceLevel[];
  departments: string[];
  minSalary: number;
  sortBy: 'newest' | 'salary-high' | 'salary-low' | 'relevance';
}
