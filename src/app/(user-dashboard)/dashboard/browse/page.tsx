import { Search, Filter, Users, Calendar, IndianRupee, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function BrowseCommittees() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Browse Committees</h1>
          <p className="text-gray-500 mt-1">Discover and join verified committees to start saving.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or amount..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="flex bg-gray-50 p-1 rounded-xl overflow-x-auto flex-1 sm:flex-none">
            {["All", "Recruiting", "Starting Soon"].map((tab, i) => (
              <button 
                key={tab}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  i === 1 ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[
          { name: "Tech Founders Fund", monthly: "100,000", totalPool: "1,200,000", duration: "12 months", members: 8, maxMembers: 12, creator: "Ahmed Khan", verified: true, startingIn: "5 days" },
          { name: "Women Entrepreneurs", monthly: "75,000", totalPool: "750,000", duration: "10 months", members: 5, maxMembers: 10, creator: "Fatima Ali", verified: true, startingIn: "2 weeks" },
          { name: "Neighborhood Co-op", monthly: "10,000", totalPool: "200,000", duration: "20 months", members: 15, maxMembers: 20, creator: "Omar Tariq", verified: true, startingIn: "3 weeks" },
          { name: "Retail Owners Network", monthly: "250,000", totalPool: "1,500,000", duration: "6 months", members: 2, maxMembers: 6, creator: "Usman Ghani", verified: false, startingIn: "1 month" },
          { name: "Freelancers Safety Net", monthly: "5,000", totalPool: "60,000", duration: "12 months", members: 11, maxMembers: 12, creator: "Sara Saeed", verified: true, startingIn: "2 days" },
        ].map((committee, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md hover:border-blue-100 transition-all group">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">
                    Recruiting
                  </span>
                  {committee.startingIn && (
                    <span className="text-xs font-medium text-gray-500">
                      Starts in {committee.startingIn}
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{committee.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                Created by <span className="font-medium text-gray-700">{committee.creator}</span>
                {committee.verified && <ShieldCheck className="w-4 h-4 text-blue-500" />}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1 flex items-center"><IndianRupee className="w-3 h-3 mr-1"/> Monthly</p>
                  <p className="text-lg font-bold text-blue-600">Rs. {committee.monthly}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1 flex items-center"><IndianRupee className="w-3 h-3 mr-1"/> Total Pool</p>
                  <p className="text-lg font-bold text-gray-900">Rs. {committee.totalPool}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1 flex items-center"><Calendar className="w-3 h-3 mr-1"/> Duration</p>
                  <p className="text-sm font-semibold text-gray-900">{committee.duration}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1 flex items-center"><Users className="w-3 h-3 mr-1"/> Members</p>
                  <p className="text-sm font-semibold text-gray-900">{committee.members} / {committee.maxMembers}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-gray-500">Filled Slots</span>
                  <span className="text-blue-600 font-bold">{Math.round((committee.members / committee.maxMembers) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(committee.members / committee.maxMembers) * 100}%` }}></div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-bold transition-all shadow-sm">
                  Join Committee
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
