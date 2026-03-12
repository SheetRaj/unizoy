"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/");
            } else {
                alert("Failed to post job.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-card p-8 rounded-2xl border border-border shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-8">Post a New Job</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-secondary">Job Title</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Senior Frontend Developer"
                            className="w-full p-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-secondary">Company Name</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. UniZoy Tech"
                            className="w-full p-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-secondary">Location</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Remote / New York, NY"
                            className="w-full p-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-secondary">Salary Range (Optional)</label>
                        <input
                            type="text"
                            placeholder="e.g. $100k - $140k"
                            className="w-full p-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-secondary">Job Description</label>
                    <textarea
                        required
                        rows={6}
                        placeholder="Describe the role, responsibilities, and requirements..."
                        className="w-full p-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-95 transition-opacity disabled:opacity-50 shadow-lg shadow-primary/20"
                >
                    {loading ? "Posting..." : "Post Job Opening"}
                </button>
            </form>
        </div>
    );
}
