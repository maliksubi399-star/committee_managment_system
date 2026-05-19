"use client";

import { Search, Filter, AlertTriangle, AlertCircle, ShieldAlert, Download, MessageSquare } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { useState } from "react";

export default function AdminReports() {
  const { reports, resolveReport } = useAdminData();
  const [filter, setFilter] = useState("Open");
  const [severityFilter, setSeverityFilter] = useState("All");

  const filteredReports = reports.filter((report) => {
    const matchesStatus = filter === "All" || report.status === filter;
    const matchesSeverity = severityFilter === "All" || report.severity === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const openCount = reports.filter((r) => r.status === "Open").length;
  const resolvedCount = reports.filter((r) => r.status === "Resolved").length;
  const highSeverityCount = reports.filter((r) => r.severity === "High" && r.status === "Open").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Reports & Complaints</h1>
          <p className="text-slate-400 mt-1">Manage user reports, resolve disputes, and maintain platform integrity.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#141B34]/60 border border-[#1E2E4E] text-slate-300 hover:text-white rounded-xl text-sm font-semibold hover:bg-[#141B34]/80 transition-colors shadow-sm">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            Complaints
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Open Reports", value: openCount.toString(), color: "text-rose-400", icon: AlertCircle, bg: "bg-rose-500/10 border-rose-500/20", iconColor: "text-rose-400" },
          { label: "Resolved", value: resolvedCount.toString(), color: "text-green-400", icon: ShieldAlert, bg: "bg-green-500/10 border-green-500/20", iconColor: "text-green-400" },
          { label: "High Severity Open", value: highSeverityCount.toString(), color: "text-amber-400", icon: AlertTriangle, bg: "bg-amber-500/10 border-amber-500/20", iconColor: "text-amber-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#10162D]/60 p-6 rounded-2xl border border-[#1E2E4E] shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
              <h3 className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#10162D]/40 p-4 rounded-2xl border border-[#1E2E4E] shadow-sm">
        <div className="flex bg-[#141B34]/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto border border-[#1E2E4E]">
          {["All", "Open", "Resolved", "Ignored"].map((tab) => (
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
        <div className="flex bg-[#141B34]/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto border border-[#1E2E4E] items-center">
          <span className="px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Severity:</span>
          {["All", "High", "Medium", "Low"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setSeverityFilter(tab)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                severityFilter === tab ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-[#10162D]/40 rounded-2xl shadow-sm border border-[#1E2E4E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#141B34]/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Report Info</th>
                <th className="px-6 py-4 font-semibold">Target</th>
                <th className="px-6 py-4 font-semibold">Severity</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E4E]">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No reports match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-[#151E38]/40 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-white">{report.reason}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Reported by <span className="font-medium text-slate-300">{report.reporter}</span></p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300 font-medium">{report.target}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                        report.severity === "High" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : 
                        report.severity === "Medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : 
                        "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {report.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex-nowrap">
                      <span className="text-sm text-slate-400">{report.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                        report.status === "Open" ? "bg-rose-500/10 text-rose-400" : "bg-green-500/10 text-green-400"
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {report.status === "Open" && (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => resolveReport(report.id)}
                            className="px-3 py-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors border border-blue-500/25"
                          >
                            Resolve
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
