"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  ShieldCheck, 
  ClipboardList, 
  ExternalLink, 
  LogOut,
  Shield
} from "lucide-react";
import { AdminDataProvider } from "@/context/AdminDataContext";
import { auth } from "@/lib/firebase";
import { User as FirebaseUser, onAuthStateChanged, signOut } from "firebase/auth";

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Committees", href: "/admin/committees", icon: Building2 },
  { name: "Verification", href: "/admin/verification", icon: ShieldCheck },
  { name: "Reports", href: "/admin/reports", icon: ClipboardList },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userName, setUserName] = useState("Admin");
  const [userInitials, setUserInitials] = useState("AD");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // Get display name or email
        const name = user.displayName || user.email?.split("@")[0] || "Admin";
        setUserName(name);
        
        // Generate initials
        const initials = name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
        setUserInitials(initials || "AD");
      } else {
        setCurrentUser(null);
        setUserName("Admin");
        setUserInitials("AD");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AdminDataProvider>
      <div className="flex min-h-screen bg-[#090D1A] text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
        
        {/* Sidebar */}
        <aside className="w-66 bg-[#0E1326] border-r border-[#1E2943] text-slate-200 flex flex-col fixed inset-y-0 left-0 z-20">
          {/* Logo / Header */}
          <div className="p-6 border-b border-[#1E2943] flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                TrustCom
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-500 mt-0.5">
                Admin Portal
              </span>
            </div>
          </div>
          
          {/* Admin User Info */}
          <div className="p-5 border-b border-[#1E2943] flex items-center gap-4 bg-[#141A33]/50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/10">
              {userInitials}
            </div>
            <div>
              <p className="font-semibold text-sm text-slate-200">{userName}</p>
              <p className="text-[11px] text-slate-400 font-medium">Super Administrator</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/10 border-l-2 border-blue-500 text-blue-400 font-semibold shadow-inner shadow-blue-500/5" 
                      : "text-slate-400 hover:bg-[#151D35] hover:text-slate-100"
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[#1E2943] bg-[#0C1021] space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-[#151D35] hover:text-slate-100 transition-all duration-200 group"
            >
              <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-slate-300" />
              <span className="text-sm font-medium">User Portal</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 min-h-screen bg-[#090D1A] overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </AdminDataProvider>
  );
}
