import Link from "next/link";
import { ShieldCheck, UserCircle, LayoutDashboard } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-2xl shadow-lg shadow-blue-500/30">
            <ShieldCheck className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          TrustCom
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The most secure and transparent way to manage committees and savings pools.
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
          
          <Link href="/login" className="block group">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                <UserCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">User Portal</h3>
              <p className="text-gray-500 text-sm">Join committees, track your payouts, and manage your contributions.</p>
            </div>
          </Link>

          <Link href="/admin/login" className="block group">
            <div className="bg-[#0F172A] p-8 rounded-3xl border border-gray-800 shadow-sm hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 bg-blue-900/50 text-blue-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <LayoutDashboard className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Admin Portal</h3>
              <p className="text-gray-400 text-sm">Manage the platform, verify users, and monitor overall health.</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
