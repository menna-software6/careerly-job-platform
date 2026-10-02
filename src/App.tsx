/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { JobProvider, useJobs } from './context/JobContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './components/HomePage';
import { JobListingsPage } from './components/JobListingsPage';
import { JobDetailsPage } from './components/JobDetailsPage';
import { SavedJobsPage } from './components/SavedJobsPage';
import { ApplicationTrackerPage } from './components/ApplicationTrackerPage';
import { ProfilePage } from './components/ProfilePage';
import { EmployerDashboardPage } from './components/EmployerDashboardPage';
import { ApplyModal } from './components/ApplyModal';
import { Job } from './types/job';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CAREERLY render error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white border border-[#E8E5E1] rounded-2xl p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h1 className="font-editorial text-2xl font-semibold italic text-[#191919]">
              Something Interrupted Your Session
            </h1>
            <p className="text-xs text-[#191919]/70 leading-relaxed">
              We encountered an unexpected interface error. Your saved bookmarks and application data remain safely preserved in local storage.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#191919] hover:bg-[#E94B9B] text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reload Platform</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainContent: React.FC = () => {
  const { activePage } = useJobs();
  const [modalJob, setModalJob] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleOpenApplyModal = (job: Job) => {
    setModalJob(job);
    setIsApplyModalOpen(true);
  };

  const handleCloseApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#191919]">
      <Navbar />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage onOpenApplyModal={handleOpenApplyModal} />
        )}
        {activePage === 'jobs' && (
          <JobListingsPage onOpenApplyModal={handleOpenApplyModal} />
        )}
        {activePage === 'job-details' && (
          <JobDetailsPage onOpenApplyModal={handleOpenApplyModal} />
        )}
        {activePage === 'saved' && (
          <SavedJobsPage onOpenApplyModal={handleOpenApplyModal} />
        )}
        {activePage === 'tracker' && <ApplicationTrackerPage />}
        {activePage === 'profile' && <ProfilePage />}
        {activePage === 'employer' && <EmployerDashboardPage />}
      </main>

      <Footer />

      {/* Direct Application Modal Dialog */}
      <ApplyModal
        job={modalJob}
        isOpen={isApplyModalOpen}
        onClose={handleCloseApplyModal}
      />

      {/* Floating System Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <JobProvider>
        <MainContent />
      </JobProvider>
    </ErrorBoundary>
  );
}
