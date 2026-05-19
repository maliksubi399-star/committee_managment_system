import { Wallet, Calendar, AlertCircle, ArrowRight, CheckCircle2, Copy } from "lucide-react";

export default function MyCommittees() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Committees</h1>
          <p className="text-gray-500 mt-1">Manage your active commitments and track your payouts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          { 
            name: "Elite Savings Circle", 
            role: "Member", 
            amount: "50,000", 
            totalPool: "500,000",
            progress: 40, 
            month: "Month 4 of 10",
            nextPaymentDate: "05 May, 2024",
            myPayoutMonth: "August 2024",
            status: "Active",
            members: [
              { name: "Ahmed Khan", initials: "AK", status: "Paid", currentMonth: true },
              { name: "Fatima Ali", initials: "FA", status: "Paid", currentMonth: false },
              { name: "Zainab Raza", initials: "ZR", status: "Pending", currentMonth: false, isMe: true },
              { name: "Omar Tariq", initials: "OT", status: "Upcoming", currentMonth: false },
            ]
          },
          { 
            name: "Family Trust Pool", 
            role: "Creator", 
            amount: "25,000", 
            totalPool: "150,000",
            progress: 83, 
            month: "Month 5 of 6",
            nextPaymentDate: "10 May, 2024",
            myPayoutMonth: "June 2024",
            status: "Active",
            members: [
              { name: "Sara Saeed", initials: "SS", status: "Paid", currentMonth: false },
              { name: "Usman Ghani", initials: "UG", status: "Paid", currentMonth: false },
              { name: "Zainab Raza", initials: "ZR", status: "Paid", currentMonth: true, isMe: true },
            ]
          }
        ].map((committee, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    committee.role === 'Creator' ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {committee.role}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-800">
                    {committee.status}
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors flex items-center gap-1">
                  Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{committee.name}</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">{committee.month}</p>
            </div>

            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-gray-500">Overall Progress</span>
                <span className="text-blue-600 font-bold">{committee.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${committee.progress}%` }}></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-1 flex items-center"><Wallet className="w-3 h-3 mr-1"/> Monthly Share</p>
                  <p className="text-lg font-bold text-gray-900">Rs. {committee.amount}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-1 flex items-center"><Calendar className="w-3 h-3 mr-1"/> My Payout Month</p>
                  <p className="text-lg font-bold text-blue-600">{committee.myPayoutMonth}</p>
                </div>
              </div>
            </div>

            <div className="p-6 flex-1 bg-white">
              <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center justify-between">
                Members Roster
                <span className="text-xs font-medium text-gray-500 px-2 py-0.5 bg-gray-100 rounded">Total Pool: Rs. {committee.totalPool}</span>
              </h4>
              <div className="space-y-3">
                {committee.members.map((member, j) => (
                  <div key={j} className={`flex items-center justify-between p-3 rounded-xl border ${
                    member.isMe ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        member.currentMonth ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-400 ring-offset-1' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {member.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          {member.name}
                          {member.isMe && <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">You</span>}
                          {member.currentMonth && <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded">Getting Payout</span>}
                        </p>
                      </div>
                    </div>
                    <div>
                      {member.status === "Paid" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : member.status === "Pending" ? (
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <span className="text-xs font-medium text-gray-400">{member.status}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button className="flex-1 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors shadow-sm">
                Chat & Announce
              </button>
              <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                Make Payment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
