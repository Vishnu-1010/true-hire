import React from "react";
import {
  ShieldCheck,
  Bell,
  FileText,
  Eye,
  ShieldX,
  TrendingUp,
} from "lucide-react";

const FeaturesGridSimple = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-50/80 via-indigo-50/20 to-slate-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Your first job should not be a scam.
        </h2>
        <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-3xl mx-auto font-normal">
          Thousands of students fall victim to fake internships and fraudulent
          job offers every year. True Hire was built specifically to protect you
          from that — and help you land something real.
        </p>
      </div>

      {/* Grid Container (Handles columns completely automatically based on screen size) */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* CARD 1: ONLY VERIFIED COMPANIES */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 bg-blue-50/50 border-blue-200 flex flex-col gap-4 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
            <div className="w-10 h-10 flex items-center justify-start">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight">
              Only Verified Companies
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-normal">
              Every company listed on True Hire is reviewed by our team. Fake
              companies, ghost startups, and scam employers are permanently
              banned before they can reach you.
            </p>
          </div>

          {/* CARD 2: NO GHOSTING POLICY */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 bg-purple-50/40 border-purple-200 flex flex-col gap-4 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
            <div className="w-10 h-10 flex items-center justify-start">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight">
              No Ghosting Policy
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-normal">
              Applied for a role? You will never be left wondering. Recruiters
              must update your application status — Pending, Selected, or
              Rejected — so you always know where you stand.
            </p>
          </div>

          {/* CARD 3: BUILD YOUR PROFILE ONCE */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 bg-emerald-50/40 border-emerald-200 flex flex-col gap-4 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
            <div className="w-10 h-10 flex items-center justify-start">
              <FileText className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight">
              Build Your Profile Once
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-normal">
              Create your profile with your education, skills, and experience.
              Upload your resume. Apply to any job in one click — no need to
              fill the same form 50 times.
            </p>
          </div>

          {/* CARD 4: TRACK APPLICATIONS LIVE */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 bg-blue-50/50 border-blue-200 flex flex-col gap-4 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
            <div className="w-10 h-10 flex items-center justify-start">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight">
              Track Applications Live
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-normal">
              Your personal dashboard shows every job you applied for, along
              with the live status. You can see the moment a recruiter reviews
              your profile.
            </p>
          </div>

          {/* CARD 5: ZERO PAY-TO-APPLY SCAMS */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 bg-amber-50/40 border-amber-200 flex flex-col gap-4 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
            <div className="w-10 h-10 flex items-center justify-start">
              <ShieldX className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight">
              Zero Pay-to-Apply Scams
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-normal">
              Applying is free — forever. If any company ever asks you to pay a
              fee for registration, a kit, or training, they are immediately
              removed and reported.
            </p>
          </div>

          {/* CARD 6: INTERNSHIPS, JOBS & MORE */}
          <div className="p-6 sm:p-8 rounded-2xl border-2 bg-rose-50/40 border-rose-200 flex flex-col gap-4 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
            <div className="w-10 h-10 flex items-center justify-start">
              <TrendingUp className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 tracking-tight">
              Internships, Jobs & More
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed font-normal">
              Find full-time roles, part-time work, internships, remote
              positions, and contract opportunities — all in one place, all
              verified.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGridSimple;
