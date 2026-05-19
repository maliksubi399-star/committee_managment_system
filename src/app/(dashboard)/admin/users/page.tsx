"use client";

import { Search, ShieldAlert, Trash2 } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { useState } from "react";

export default function AdminUsers() {
  const { users, suspendUser, deleteUser } = useAdminData();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesFilter = filter === "All" || user.status === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeUsers = users.filter(u => u.status === "Active").length;
  const suspendedUsers = users.filter(u => u.status === "Suspended").length;
  const avgTrustScore = users.length > 0 
    ? Math.round(users.reduce((sum, u) => sum + u.score, 0) / users.length) 
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
        <p className="text-slate-400 mt-1">Manage platform users, verify identities, and monitor trust scores.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length.toString(), color: "text-blue-400" },
          { label: "Active", value: activeUsers.toString(), color: "text-green-400" },
          { label: "Suspended", value: suspendedUsers.toString(), color: "text-rose-400" },
          { label: "Avg Trust Score", value: `${avgTrustScore}%`, color: "text-indigo-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#10162D]/60 p-6 rounded-2xl border border-[#1E2E4E] shadow-sm flex flex-col justify-center">
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
            placeholder="Search by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#141B34]/50 border border-[#1E2E4E] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-slate-500"
          />
        </div>
        <div className="flex bg-[#141B34]/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto border border-[#1E2E4E]">
          {["All", "Active", "Suspended", "Pending"].map((tab) => (
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

      {/* Users Table */}
      <div className="bg-[#10162D]/40 rounded-2xl shadow-sm border border-[#1E2E4E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#141B34]/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Trust Score</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Committees</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E4E]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#151E38]/40 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                          {user.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${user.score > 80 ? 'bg-green-500' : user.score > 50 ? 'bg-amber-500' : user.score > 0 ? 'bg-red-500' : 'bg-slate-700'}`} 
                            style={{ width: `${user.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-400">{user.score}% Score</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                        user.status === "Active" ? "bg-green-500/10 text-green-400" : 
                        user.status === "Pending" ? "bg-amber-500/10 text-amber-400" : 
                        "bg-red-500/10 text-red-400"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {user.committees}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); suspendUser(user.id); }}
                          className="p-1.5 text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors" 
                          title="Suspend User"
                        >
                          <ShieldAlert className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteUser(user.id); }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors" 
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-[#1E2E4E] bg-[#141B34]/30 flex justify-between items-center">
          <span className="text-sm text-slate-400">Showing {filteredUsers.length} users</span>
        </div>
      </div>
    </div>
  );
}
