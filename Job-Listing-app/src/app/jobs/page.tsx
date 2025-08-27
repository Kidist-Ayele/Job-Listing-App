"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchJobs } from "@/lib/features/jobsSlice";
import { JobDashboard } from "@/components/JobDashboard";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function JobsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { jobs, loading, error } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    console.log("Jobs page - Session status:", status);
    console.log("Jobs page - Session data:", session);

    if (status === "loading") return;

    if (!session) {
      console.log("No session, redirecting to signin");
      router.push("/auth/signin");
      return;
    }

    console.log("Session found, fetching jobs");
    dispatch(fetchJobs());
  }, [dispatch, session, status, router]);

  // Show loading while checking authentication status
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Redirect to sign in if not authenticated
  if (!session) {
    return null; // Will redirect in useEffect
  }

  // Show loading while fetching jobs
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error if jobs failed to load
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <JobDashboard jobs={jobs} />
    </div>
  );
}
