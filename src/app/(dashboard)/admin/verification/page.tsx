"use client";

import { Search, ShieldAlert, CheckCircle, XCircle, FileText, Download } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { useState } from "react";

export default function AdminVerification() {
  const { verifications, approveVerification, rejectVerification } = useAdminData();
  const [filter, setFilter] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVerifications = verifications.filter((v) => {
    const matchesFilter = filter === "All" || v.status === filter;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = verifications.filter(v => v.status === "Pending").length;
  const approvedCount = verifications.filter(v => v.status === "Approved").length;
  const rejectedCount = verifications.filter(v => v.status === "Rejected").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Verification Requests</h1>
        <p className="text-slate-400 mt-1">Review and approve user KYC documents to grant platform access.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Requests", value: verifications.length.toString(), color: "text-slate-300" },
          { label: "Pending", value: pendingCount.toString(), color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          { label: "Approved", value: approvedCount.toString(), color: "text-green-400" },
          { label: "Rejected", value: rejectedCount.toString(), color: "text-rose-400" },
        ].map((stat, i) => (
          <div key={i} className={`bg-[#10162D]/60 p-6 rounded-2xl border border-[#1E2E4E] shadow-sm flex flex-col justify-center ${stat.bg || ''}`}>
            <p className="text-sm font-medium text-slate-400">{stat.label}</p>
            <h3 className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#10162D]/40 p-4 rounded-2xl border border-[#1E2E4E] shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by user or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#141B34]/50 border border-[#1E2E4E] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-slate-500"
          />
        </div>
        <div className="flex bg-[#141B34]/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto border border-[#1E2E4E]">
          {["All", "Pending", "Approved", "Rejected"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                filter === tab ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="grid gap-4">
        {filteredVerifications.length === 0 ? (
          <div className="bg-[#10162D]/40 rounded-2xl shadow-sm border border-[#1E2E4E] p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/20">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No {filter.toLowerCase()} requests</h3>
            <p className="text-slate-400 mt-2 max-w-md">All user verification requests have been processed or none match your criteria.</p>
          </div>
        ) : (
          filteredVerifications.map((request) => (
            <div key={request.id} className={`bg-[#10162D]/40 p-6 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center transition-all ${
              request.status === "Pending" ? "border-amber-500/30 hover:border-amber-500/50" : "border-[#1E2E4E] opacity-75"
            }`}>
              
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">
                  {request.initials}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{request.name}</h4>
                  <p className="text-sm text-slate-400">{request.email}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#141B34]/60 text-slate-300 border border-[#1E2E4E]">
                      <FileText className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {request.docType}
                    </span>
                    <span className="text-xs text-slate-500">Submitted {request.submitted}</span>
                    {request.status !== "Pending" && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        request.status === "Approved" ? "bg-green-500/10 text-green-400" : "bg-rose-500/10 text-rose-400"
                      }`}>
                        {request.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto bg-[#141B34]/40 p-3 rounded-xl border border-[#1E2E4E] flex items-center justify-center gap-3 shrink-0">
                <div className="w-16 h-10 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-slate-400 text-xs font-medium cursor-pointer hover:bg-slate-750 transition-colors">
                  <FileText className="w-4 h-4 mr-1" /> IMG
                </div>
                <div className="w-16 h-10 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-slate-400 text-xs font-medium cursor-pointer hover:bg-slate-750 transition-colors">
                  <FileText className="w-4 h-4 mr-1" /> IMG
                </div>
                <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors" title="Download Documents">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              {request.status === "Pending" && (
                <div className="w-full md:w-auto flex gap-3 shrink-0 mt-4 md:mt-0">
                  <button 
                    onClick={() => rejectVerification(request.id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-rose-500/20 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl text-sm font-semibold transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button 
                    onClick={() => approveVerification(request.id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-green-500/20"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
