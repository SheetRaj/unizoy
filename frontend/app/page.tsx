"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-secondary">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center py-12">
        <h2 className="text-4xl font-extrabold text-foreground mb-4">Find Your Next Dream Job</h2>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Browse through the latest job openings and take the next step in your professional journey.
        </p>
      </div>

      <div className="grid gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
            <p className="text-secondary text-lg">No jobs available at the moment. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
