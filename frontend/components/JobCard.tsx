import Link from "next/link";

interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
    description: string;
}

export default function JobCard({ job }: { job: Job }) {
    return (
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                    <p className="text-secondary font-medium">{job.company}</p>
                </div>
                {job.salary && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {job.salary}
                    </span>
                )}
            </div>
            <div className="flex items-center text-secondary text-sm mb-4 space-x-4">
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {job.location}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-secondary line-clamp-2 text-sm max-w-md">
                    {job.description}
                </p>
                <Link
                    href={`/jobs/${job._id}`}
                    className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-lg transition-all font-medium"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
