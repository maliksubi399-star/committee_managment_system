import { IndianRupee, Calendar, CheckCircle2, AlertCircle, Clock, ArrowRight } from "lucide-react";

export default function Payments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Payments</h1>
          <p className="text-gray-500 mt-1">Track your payment history and upcoming dues across all committees.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-blue-50">
            <IndianRupee className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Paid</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-900">Rs. 150,000</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 rounded-xl bg-amber-50">
            <Calendar className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Upcoming Dues (This Month)</p>
            <h3 className="text-2xl font-bold mt-1 text-gray-900">Rs. 75,000</h3>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg shadow-gray-900/20 flex flex-col text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <IndianRupee className="w-16 h-16 text-white" />
          </div>
          <p className="text-sm font-medium text-gray-400 relative z-10">Next Payout</p>
          <h3 className="text-2xl font-bold mt-1 text-white relative z-10">Rs. 500,000</h3>
          <p className="text-xs text-blue-300 mt-2 relative z-10 font-medium">Family Trust Pool • June 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        
        {/* Payment History */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">Payment History</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                Download PDF
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Committee</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { date: "05 Apr, 2024", committee: "Elite Savings Circle", amount: "50,000", status: "Paid" },
                  { date: "10 Apr, 2024", committee: "Family Trust Pool", amount: "25,000", status: "Paid" },
                  { date: "05 Mar, 2024", committee: "Elite Savings Circle", amount: "50,000", status: "Paid" },
                  { date: "10 Mar, 2024", committee: "Family Trust Pool", amount: "25,000", status: "Paid" },
                  { date: "05 Feb, 2024", committee: "Elite Savings Circle", amount: "50,000", status: "Paid" },
                ].map((payment, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{payment.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{payment.committee}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-900">Rs. {payment.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Dues */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-fit">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">Upcoming Dues</h3>
          </div>
          <div className="p-6 space-y-4 flex-1">
            
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900 text-sm">Elite Savings Circle</h4>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Due in 3 days</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-4">Rs. 50,000</p>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                Pay Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900 text-sm">Family Trust Pool</h4>
                <span className="text-xs font-medium text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1"/> 10 May, 2024</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-4">Rs. 25,000</p>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm">
                Pay in Advance
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
