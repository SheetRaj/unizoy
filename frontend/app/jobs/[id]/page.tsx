"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
    description: string;
}

export default function JobDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [job, setJob] = useState<Job | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        resumeLink: "",
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch(`/api/jobs`)
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((j: Job) => j._id === id);
                setJob(found);
                setLoading(false);
            });
    }, [id]);

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobId: id, ...formData }),
            });

            if (res.ok) {
                alert("Application submitted successfully!");
                router.push("/");
            } else {
                alert("Failed to submit application.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!job) return <div className="text-center py-10">Job not found.</div>;

    return (
        <div className="grid md:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="md:col-span-2 space-y-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
                    <p className="text-2xl text-secondary">{job.company}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="bg-white border border-border px-4 py-2 rounded-xl flex items-center shadow-sm">
                        <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {job.location}
                    </div>
                    {job.salary && (
                        <div className="bg-white border border-border px-4 py-2 rounded-xl flex items-center shadow-sm">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {job.salary}
                        </div>
                    )}
                </div>

                <div className="prose prose-lg max-w-none">
                    <h3 className="text-2xl font-bold mb-4">Description</h3>
                    <p className="whitespace-pre-wrap text-secondary leading-relaxed">
                        {job.description}
                    </p>
                </div>
            </div>

            <div className="md:col-span-1">
                <div className="bg-white border border-border p-8 rounded-2xl shadow-lg sticky top-24">
                    <h3 className="text-2xl font-bold mb-6">Apply Now</h3>
                    <form onSubmit={handleApply} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-secondary">Full Name</label>
                            <input
                                required
                                type="text"
                                placeholder="John Doe"
                                className="w-full p-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-secondary">Email Address</label>
                            <input
                                required
                                type="email"
                                placeholder="john@example.com"
                                className="w-full p-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-secondary">Resume Link</label>
                            <input
                                required
                                type="url"
                                placeholder="https://linkedin.com/in/..."
                                className="w-full p-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                value={formData.resumeLink}
                                onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                            />
                        </div>
                        <button
                            disabled={submitting}
                            type="submit"
                            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:opacity-95 transition-opacity disabled:opacity-50"
                        >
                            {submitting ? "Submitting..." : "Submit Application"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
