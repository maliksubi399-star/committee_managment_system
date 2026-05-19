"use client";

import { Shield, Lock, ArrowRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl shadow-lg shadow-blue-500/30">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
          TrustCom Admin
        </h2>
        <p className="mt-2 text-center text-sm text-blue-200">
          Secure administrative access portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1E293B]/80 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-black/50 sm:rounded-2xl sm:px-10 border border-slate-700/50 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">Sign In</h3>
            <p className="text-sm text-slate-400 mt-1">Enter your administrator credentials to continue.</p>
          </div>

          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Administrator Email
              </label>
              <div className="mt-2 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@trustcom.io"
                  className="appearance-none block w-full px-4 py-3 border border-slate-600 bg-slate-800/50 rounded-xl shadow-sm placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-slate-600 bg-slate-800/50 rounded-xl shadow-sm placeholder-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-200/80 leading-relaxed">
                <strong className="text-blue-300 font-semibold block mb-1">Restricted Access</strong>
                This portal is for authorised administrators only. All sessions are logged and monitored.
              </p>
            </div>

            <div>
              <Link href="/admin" className="w-full">
                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all duration-200"
                >
                  <Lock className="w-4 h-4" />
                  Initiate Secure Session
                  <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
