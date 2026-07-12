import React from "react";
import { User, Briefcase, Bell } from "lucide-react";

const SimpleStepsDirect = () => {
  return (
    <section className="w-full bg-white px-4 py-16 text-center">
      {/* Header Section */}
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          Get started in 3 simple steps
        </h2>
        <p className="text-slate-500 text-base sm:text-lg">
          No complicated setup. You can go from zero to applying in under 5
          minutes.
        </p>
      </div>

      {/* Steps Container */}
      <div className="max-w-6xl mx-auto relative">
        {/* Connecting Line (Desktop Only) */}
        <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[1px] bg-slate-200 z-0" />

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative z-10">
          {/* STEP 1 */}
          <div className="flex flex-col items-center max-w-sm mx-auto">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Create your free profile
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sign up with your name, email, and choose your role. Add your
              skills, education, and upload your resume. Takes less than 5
              minutes.
            </p>
          </div>

          {/* STEP 2 */}
          <div className="flex flex-col items-center max-w-sm mx-auto">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Browse & apply to real jobs
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Search through verified job listings. Filter by location, job
              type, or company. Apply with a single click using your saved
              profile.
            </p>
          </div>

          {/* STEP 3 */}
          <div className="flex flex-col items-center max-w-sm mx-auto">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Track your status live
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              See every application in your dashboard. Status updates the moment
              a recruiter acts — Pending, Selected, or Rejected. No more
              waiting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleStepsDirect;
