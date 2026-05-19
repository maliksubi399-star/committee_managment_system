"use client";

import { Users, Building2, IndianRupee, ClipboardList, CheckCircle2, Plus, X, Calendar } from "lucide-react";
import Link from "next/link";
import { useAdminData } from "@/context/AdminDataContext";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";

export default function AdminOverview() {
  const { users, committees, reports, addCommittee } = useAdminData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [currentUserName, setCurrentUserName] = useState("Admin");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const name = user.displayName || user.email?.split("@")[0] || "Admin";
        setCurrentUserName(name);
        setCreator(name); // Update creator when user loads
      }
    });

    return () => unsubscribe();
  }, []);

  // Form State for new committee
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("10 months");
  const [amount, setAmount] = useState("50,000");
  const [maxMembers, setMaxMembers] = useState(10);
  const [creator, setCreator] = useState(currentUserName);

  const activeUsers = users.filter(u => u.status === "Active").length;
  const activeCommittees = committees.filter(c => c.status === "Active").length;
  const openReports = reports.filter(r => r.status === "Open").length;
  
  // Calculate total capital
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
      members: 1, // Start with 1 member (creator)
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
    <div className="space-y-8 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-slate-400 mt-1">Real-time platform metrics</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-[#10162D]/60 rounded-2xl p-6 shadow-sm border border-[#1E2E4E] flex flex-col hover:border-blue-500/30 transition-colors duration-200">
          <div className="flex justify-between items-start">
            <div className="bg-blue-500/10 p-3 rounded-xl">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="bg-green-500/10 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-lg">
              Active: {activeUsers}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-400 text-sm font-medium">TOTAL USERS</p>
            <h3 className="text-3xl font-bold text-white mt-1">{users.length}</h3>
          </div>
          <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (activeUsers/users.length)*100)}%` }}></div>
          </div>
        </div>

        {/* Active Committees */}
        <div className="bg-[#10162D]/60 rounded-2xl p-6 shadow-sm border border-[#1E2E4E] flex flex-col hover:border-green-500/30 transition-colors duration-200">
          <div className="flex justify-between items-start">
            <div className="bg-green-500/10 p-3 rounded-xl">
              <Building2 className="w-6 h-6 text-green-400" />
            </div>
            <span className="bg-green-500/15 text-green-400 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md">
              Live
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-400 text-sm font-medium">ACTIVE COMMITTEES</p>
            <h3 className="text-3xl font-bold text-white mt-1">{activeCommittees}</h3>
          </div>
          <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (activeCommittees/committees.length)*100)}%` }}></div>
          </div>
        </div>

        {/* Total Capital */}
        <div className="bg-[#10162D]/60 rounded-2xl p-6 shadow-sm border border-[#1E2E4E] flex flex-col hover:border-amber-500/30 transition-colors duration-200">
          <div className="flex justify-between items-start">
            <div className="bg-amber-500/10 p-3 rounded-xl">
              <IndianRupee className="w-6 h-6 text-amber-400" />
            </div>
            <span className="bg-amber-500/15 text-amber-400 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md">
              Managed
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-400 text-sm font-medium">TOTAL CAPITAL</p>
            <h3 className="text-3xl font-bold text-white mt-1">Rs. {formattedCapital}</h3>
          </div>
          <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "100%" }}></div>
          </div>
        </div>

        {/* Reports */}
        <div className="bg-[#10162D]/60 rounded-2xl p-6 shadow-sm border border-[#1E2E4E] flex flex-col hover:border-red-500/30 transition-colors duration-200">
          <div className="flex justify-between items-start">
            <div className="bg-red-500/10 p-3 rounded-xl">
              <ClipboardList className="w-6 h-6 text-red-400" />
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${openReports > 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
              {openReports} open
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-400 text-sm font-medium">REPORTS</p>
            <h3 className="text-3xl font-bold text-white mt-1">{reports.length}</h3>
          </div>
          <div className="mt-4 text-xs font-semibold text-red-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {users.filter(u => u.status === "Suspended").length} suspended users
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Users */}
        <div className="lg:col-span-2 bg-[#10162D]/40 rounded-2xl shadow-sm border border-[#1E2E4E] overflow-hidden">
          <div className="p-6 border-b border-[#1E2E4E] flex justify-between items-center bg-[#141B34]/30">
            <h3 className="text-lg font-bold text-white">Recent Users</h3>
            <Link href="/admin/users" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#141B34]/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Trust Score</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2E4E]">
                {users.slice(0, 5).map((user, i) => (
                  <tr key={i} className="hover:bg-[#151E38]/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                          {user.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-800 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${user.score > 80 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : user.score > 0 ? 'bg-amber-500' : 'bg-gray-700'}`} 
                            style={{ width: `${user.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-300">{user.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                        user.status === "Active" ? "bg-green-500/10 text-green-400" : 
                        user.status === "Suspended" ? "bg-red-500/10 text-red-400" :
                        "bg-amber-500/10 text-amber-400"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Open Reports */}
        <div className="bg-[#10162D]/40 rounded-2xl shadow-sm border border-[#1E2E4E] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#1E2E4E] flex justify-between items-center bg-[#141B34]/30">
            <h3 className="text-lg font-bold text-white">Open Reports</h3>
            <Link href="/admin/reports" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#10162D]/20">
            {openReports === 0 ? (
              <>
                <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-2xl flex items-center justify-center mb-4 border border-green-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-white font-medium text-lg">No open reports</h4>
                <p className="text-slate-400 text-sm mt-1">The system is currently running smoothly with no reported issues.</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center mb-4 border border-red-500/20">
                  <ClipboardList className="w-8 h-8" />
                </div>
                <h4 className="text-white font-medium text-lg">{openReports} Open Reports</h4>
                <p className="text-slate-400 text-sm mt-1">There are pending reports that require your attention.</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Active Committees */}
      <div className="bg-[#10162D]/40 rounded-2xl shadow-sm border border-[#1E2E4E] overflow-hidden">
        <div className="p-6 border-b border-[#1E2E4E] flex justify-between items-center bg-[#141B34]/30">
          <h3 className="text-lg font-bold text-white">Active Committees</h3>
          <Link href="/admin/committees" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            Manage all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#141B34]/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Committee</th>
                <th className="px-6 py-4 font-semibold">Creator</th>
                <th className="px-6 py-4 font-semibold">Members</th>
                <th className="px-6 py-4 font-semibold">Progress</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E4E]">
              {committees.filter(c => c.status === "Active" || c.status === "Recruiting").slice(0, 5).map((committee, i) => (
                <tr key={i} className="hover:bg-[#151E38]/40 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-white">{committee.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{committee.duration} · {committee.maxMembers} pool size</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-300">{committee.creator}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-white">{committee.members} <span className="text-slate-500 font-normal">/ {committee.maxMembers}</span></span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-slate-800 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${(committee.members / committee.maxMembers) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-300">{Math.round((committee.members / committee.maxMembers) * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                      committee.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {committee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
