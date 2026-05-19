import { Wallet, Users, Calendar, IndianRupee, ShieldCheck, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back, Zainab! 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your committees today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Trust Score */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck className="w-16 h-16 text-blue-600" />
          </div>
          <div className="flex justify-between items-start relative z-10">
            <div className="bg-blue-50 p-3 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center shadow-sm">
              Excellent
            </span>
          </div>
          <div className="mt-4 relative z-10">
            <p className="text-gray-500 text-sm font-medium">Trust Score</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-extrabold text-gray-900">92</h3>
              <span className="text-sm font-medium text-gray-500">/ 100</span>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-100 rounded-full h-2 relative z-10">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
          </div>
        </div>

        {/* My Committees */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start">
            <div className="bg-purple-50 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-sm font-medium">Active Committees</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">4</h3>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-purple-600">
            <Link href="/dashboard/committees" className="hover:underline flex items-center">
              View details <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Total Contributed */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start">
            <div className="bg-emerald-50 p-3 rounded-xl">
              <Wallet className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-sm font-medium">Total Contributed</p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-1">Rs. 150K</h3>
          </div>
          <div className="mt-4 text-sm font-medium text-emerald-600 bg-emerald-50 inline-flex self-start px-2.5 py-1 rounded-lg">
            Across all time
          </div>
        </div>

        {/* Upcoming Payout */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg shadow-gray-900/20 flex flex-col text-white">
          <div className="flex justify-between items-start">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <IndianRupee className="w-6 h-6 text-white" />
            </div>
            <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-500/20">
              Next Month
            </span>
          </div>
          <div className="mt-4">
            <p className="text-gray-400 text-sm font-medium">Expected Payout</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">Rs. 500K</h3>
          </div>
          <div className="mt-4 text-sm font-medium text-gray-300 flex items-center">
            <Calendar className="w-4 h-4 mr-1.5" />
            15th June, 2024
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Committees List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-bold text-gray-900">Your Active Committees</h3>
            </div>
            <Link href="/dashboard/committees" className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { name: "Elite Savings Circle", role: "Member", amount: "50,000", progress: 40, month: "Month 4 of 10" },
              { name: "Family Trust Pool", role: "Creator", amount: "25,000", progress: 83, month: "Month 5 of 6" },
            ].map((committee, i) => (
              <div key={i} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-lg font-bold text-gray-900">{committee.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        committee.role === 'Creator' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {committee.role}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-500">Rs. {committee.amount} / month • {committee.month}</p>
                  </div>
                  <div className="flex-1 max-w-xs w-full">
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-blue-600 font-bold">{committee.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${committee.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Payment Schedule */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">Upcoming Payments</h3>
          </div>
          <div className="p-6 flex-1">
            <div className="space-y-6">
              {[
                { date: "05 May", committee: "Elite Savings Circle", amount: "50,000", status: "Due in 3 days", urgent: true },
                { date: "10 May", committee: "Family Trust Pool", amount: "25,000", status: "Upcoming", urgent: false },
              ].map((payment, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 1 && <div className="absolute left-[19px] top-8 bottom-[-24px] w-0.5 bg-gray-100"></div>}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm z-10 ${
                    payment.urgent ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="pt-1 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{payment.date}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{payment.committee}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">Rs. {payment.amount}</p>
                    </div>
                    <div className="mt-2">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-bold ${
                        payment.urgent ? "bg-amber-50 text-amber-700 border border-amber-200" : "text-gray-500"
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <Link href="/dashboard/payments">
              <button className="w-full py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                View All Payments
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
