import React, { useState } from "react";
import { Briefcase, GraduationCap, ShieldCheck, Mail, X } from "lucide-react";

const FooterModal = () => {
  // Simple state to open and close the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Grab form data directly
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      content: formData.get("content"),
    };

    console.log("Report Submitted:", data);

    // Reset and close modal
    e.target.reset();
    setIsModalOpen(false);
    alert("Thank you! Your report has been submitted successfully.");
  };

  return (
    <footer className="w-full bg-[#f8fafc] border-t border-slate-200 text-slate-600 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Upper Footer Links Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-left">
        {/* Column 1: Brand Info */}
        <div>
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">
            <Briefcase className="w-7 h-7 text-white" />
            </div>
            TrueHire
          </div>
          <p className="text-sm leading-relaxed text-slate-500 mb-4">
            India's most trusted job portal. Only verified companies. Only
            genuine opportunities. Zero fake listings.
          </p>
          <div className="flex items-center gap-1.5 text-blue-600 font-medium text-sm">
            <ShieldCheck className="w-4 h-4" /> Verified & Trusted Platform
          </div>
        </div>

        {/* Column 2: Candidates */}
        <div>
          <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" /> For Candidates
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Create Free Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Browse All Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Sign In
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                My Profile
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition">
                Track Applications
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Recruiters */}
        <div>
          <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-600" /> For Recruiters
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-purple-600 transition">
                Register as Recruiter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-600 transition">
                Recruiter Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-purple-600 transition">
                Post a Job
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: About & Report button */}
        <div>
          <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-600" /> About True Hire
          </h4>
          <p className="text-sm leading-relaxed text-slate-500 mb-4">
            A genuine job portal where every company is verified and every
            candidate gets a real answer — no ghosting, no scams.
          </p>
          <p className="text-sm text-slate-500 mb-4">
            <strong className="text-slate-800">Our promise:</strong> Free to
            apply. Zero fake listings. Live status updates.
          </p>

          {/* THE NEW REPORT BUTTON */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-red-600 hover:text-red-700 font-bold underline transition duration-150 decoration-2 underline-offset-4"
          >
            Report to Us
          </button>
        </div>
      </div>

      {/* Middle Footer Pill Tags */}
      <div className="max-w-7xl mx-auto border-t border-slate-200/60 py-6 flex flex-wrap justify-center gap-3">
        {[
          "Verified Companies Only",
          "No Fake Internships",
          "Live Application Status",
          "Zero Ghosting Policy",
          "Always Free to Apply",
        ].map((tag, i) => (
          <span
            key={i}
            className="bg-white px-3 py-1.5 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 flex items-center gap-1.5 shadow-2xs"
          >
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom Footer Credit Row */}
      <div className="max-w-7xl mx-auto border-t border-slate-200/60 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
        <div>© 2026 TrueHire. All rights reserved.</div>
        <div className="text-center sm:text-right">
          Built to protect job seekers from fraud. India's trusted hiring
          platform.
        </div>
      </div>

      {/* ================= MODAL COMPONENT LAYER ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Shadow Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Actual Modal Content Container */}
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 p-6 z-10 animate-in fade-in zoom-in-95 duration-150">
            {/* Header Title & Close Button */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Report a Problem / Scam
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g., Fake listing discovered"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Content / Message
                </label>
                <textarea
                  name="content"
                  rows="4"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  placeholder="Provide details about the company or issue..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl text-sm transition shadow-sm"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default FooterModal;
