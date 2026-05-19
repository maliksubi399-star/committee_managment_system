"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Grid, 
  Wallet, 
  UserCircle, 
  LogOut,
  ShieldCheck,
  Bell
} from "lucide-react";
import { UserDataProvider, useUserData } from "@/context/UserDataContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Browse Committees", href: "/dashboard/browse", icon: Grid },
  { name: "My Committees", href: "/dashboard/committees", icon: Wallet },
  { name: "Payments", href: "/dashboard/payments", icon: Wallet },
  { name: "Profile & KYC", href: "/dashboard/profile", icon: UserCircle },
];

function UserLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useUserData();

  const handleSignOut = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">TrustCom</span>
        </div>
        
        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg shrink-0">
            {profile.initials}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-sm text-gray-900 truncate">{profile.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <div className={`w-2 h-2 rounded-full ${
                profile.kycStatus === 'Verified' ? 'bg-green-500' :
                profile.kycStatus === 'Pending' ? 'bg-amber-500' : 'bg-gray-400'
              }`}></div>
              <p className={`text-xs font-semibold ${
                profile.kycStatus === 'Verified' ? 'text-green-600' :
                profile.kycStatus === 'Pending' ? 'text-amber-600' : 'text-gray-500'
              }`}>{profile.kycStatus}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-50 text-blue-700 font-semibold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 bg-gray-50/30">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserDataProvider>
      <UserLayoutContent>{children}</UserLayoutContent>
    </UserDataProvider>
  );
}
