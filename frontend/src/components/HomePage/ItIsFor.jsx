import React from "react";
// Simple icons from lucide-react (GraduationCap, Briefcase, CheckCircle2, ArrowRight)
import {
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const IsItFor = () => {
  return (
    <section className="w-full bg-slate-50/50 px-4 py-16 text-left">
      {/* Main Title Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Who is True Hire for?
        </h2>
      </div>

      {/* 2-Column Split Container */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CARD 1: STUDENTS & JOB SEEKERS */}
        <div className="bg-blue-50/40 border-2 border-blue-100 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            {/* Header Icon & Title */}
            <GraduationCap className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Students & Job Seekers
            </h3>

            {/* Bullet Points */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  Final-year students looking for internships or full-time jobs
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  Fresh graduates entering the job market for the first time
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  Working professionals seeking new verified opportunities
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  Anyone tired of fake listings and zero response from employers
                </span>
              </div>
            </div>
          </div>

          {/* Solid Blue Button */}
          <button className="mt-8 w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 shadow-md shadow-blue-200 transition-all">
            Register as Candidate <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* CARD 2: COMPANIES & RECRUITERS */}
        <div className="bg-purple-50/30 border-2 border-purple-100 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            {/* Header Icon & Title */}
            <Briefcase className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Companies & Recruiters
            </h3>

            {/* Bullet Points */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <span>
                  Verified startups and companies hiring genuine talent
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Recruiters who value transparent, respectful hiring</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <span>
                  HR teams that want to manage applicants in one place
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Businesses committed to zero pay-to-work schemes</span>
              </div>
            </div>
          </div>

          {/* Outlined Purple Button */}
          <button className="mt-8 w-fit bg-transparent hover:bg-purple-50 border border-purple-200 text-purple-600 font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-all">
            Register as Recruiter <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default IsItFor;
