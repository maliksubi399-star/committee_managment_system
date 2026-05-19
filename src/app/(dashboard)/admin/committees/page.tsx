"use client";

import { Search, Lock, Trash2, IndianRupee, Eye, Plus, X, Building2 } from "lucide-react";
import { useAdminData } from "@/context/AdminDataContext";
import { useState } from "react";

export default function AdminCommittees() {
  const { committees, lockCommittee, deleteCommittee, addCommittee } = useAdminData();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for new committee
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("10 months");
  const [amount, setAmount] = useState("50,000");
  const [maxMembers, setMaxMembers] = useState(10);
  const [creator, setCreator] = useState("Maida Amjad");

  const filteredCommittees = committees.filter((committee) => {
    const matchesFilter = filter === "All" || committee.status === filter;
    const matchesSearch = committee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          committee.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeCount = committees.filter(c => c.status === "Active").length;
  const recruitingCount = committees.filter(c => c.status === "Recruiting").length;
  const completedCount = committees.filter(c => c.status === "Completed").length;
  
  const totalCapital = committees.reduce((sum, c) => {
    const amt = parseInt(c.amount.replace(/,/g, ''));
    return sum + (amt * c.maxMembers);
  }, 0);
  const formattedCapital = totalCapital > 1000 ? `${(totalCapital / 1000).toFixed(0)}K` : totalCapital;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCommittee({
      name,
      duration,
      amount,
      maxMembers: Number(maxMembers),
      members: 1, // Start with 1 member
      creator,
      status: "Recruiting"
    });

    // Reset Form & Close
    setName("");
    setDuration("10 months");
    setAmount("50,000");
    setMaxMembers(10);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Committee Management</h1>
          <p className="text-slate-400 mt-1">Manage active, recruiting, and completed committees.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Committee
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "Total", value: committees.length.toString() },
          { label: "Active", value: activeCount.toString(), color: "text-green-400" },
          { label: "Recruiting", value: recruitingCount.toString(), color: "text-amber-400" },
          { label: "Completed", value: completedCount.toString(), color: "text-slate-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#10162D]/60 p-5 rounded-2xl border border-[#1E2E4E] shadow-sm flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-400">{stat.label}</p>
            <h3 className={`text-2xl font-bold mt-1 ${stat.color || "text-white"}`}>{stat.value}</h3>
          </div>
        ))}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-5 rounded-2xl shadow-lg shadow-blue-900/20 flex flex-col justify-center text-white">
          <p className="text-sm font-medium text-blue-200">Total Capital</p>
          <div className="flex items-center gap-2 mt-1">
            <IndianRupee className="w-5 h-5 text-blue-300" />
            <h3 className="text-2xl font-bold">{formattedCapital}</h3>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#10162D]/40 p-4 rounded-2xl border border-[#1E2E4E] shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by name or creator..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#141B34]/50 border border-[#1E2E4E] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-slate-500"
          />
        </div>
        <div className="flex bg-[#141B34]/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto border border-[#1E2E4E]">
          {["All", "Active", "Recruiting", "Completed"].map((tab) => (
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

      {/* Committees Table */}
      <div className="bg-[#10162D]/40 rounded-2xl shadow-sm border border-[#1E2E4E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#141B34]/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Committee</th>
                <th className="px-6 py-4 font-semibold">Creator</th>
                <th className="px-6 py-4 font-semibold">Members</th>
                <th className="px-6 py-4 font-semibold">Monthly</th>
                <th className="px-6 py-4 font-semibold">Progress</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E4E]">
              {filteredCommittees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No committees found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCommittees.map((committee) => (
                  <tr key={committee.id} className="hover:bg-[#151E38]/40 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{committee.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{committee.duration} · {committee.maxMembers} pool size</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300 font-medium">{committee.creator}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-white">{committee.members} <span className="text-slate-500 font-normal">/ {committee.maxMembers}</span></span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-blue-400">Rs. {committee.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-slate-800 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full" 
                            style={{ width: `${(committee.members / committee.maxMembers) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-400">{Math.round((committee.members / committee.maxMembers) * 100)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                        committee.status === "Active" ? "bg-green-500/10 text-green-400" : 
                        committee.status === "Recruiting" ? "bg-amber-500/10 text-amber-400" : 
                        "bg-slate-500/10 text-slate-400"
                      }`}>
                        {committee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); lockCommittee(committee.id); }}
                          className="p-1.5 text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors" 
                          title="Lock Committee"
                        >
                          <Lock className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteCommittee(committee.id); }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors" 
                          title="Delete Committee"
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
          <span className="text-sm text-slate-400">Showing {filteredCommittees.length} committees</span>
        </div>
      </div>

      {/* Modal - "+ New Committee" */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1326] border border-[#1E2E4E] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
            <div className="p-6 border-b border-[#1E2E4E] flex justify-between items-center bg-[#141B34]/30">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Create New Committee</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-850 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Committee Name
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. SaveSphere"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#141B34]/50 border border-[#1E2E4E] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Monthly Amount (Rs.)
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 50,000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-[#141B34]/50 border border-[#1E2E4E] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Max Members
                  </label>
                  <input 
                    type="number" 
                    required
                    min={2}
                    max={100}
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#141B34]/50 border border-[#1E2E4E] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 bg-[#141B34]/50 border border-[#1E2E4E] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white"
                  >
                    <option value="6 months">6 months</option>
                    <option value="10 months">10 months</option>
                    <option value="12 months">12 months</option>
                    <option value="20 months">20 months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Creator Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                    className="w-full px-4 py-3 bg-[#141B34]/50 border border-[#1E2E4E] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#1E2E4E]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-[#141B34]/30 border border-[#1E2E4E] rounded-xl text-sm font-bold text-slate-300 hover:bg-[#141B34]/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
                >
                  Create Committee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
