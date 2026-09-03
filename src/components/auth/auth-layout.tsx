import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#090407] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-rose-600 selection:text-white">
      {/* Background ambient wine glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[350px] bg-rose-950/30 blur-[130px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Back to Store Top Link */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Store</span>
        </Link>
      </div>

      <div className="w-full max-w-md my-auto">
        {/* Brand Avatar / Title Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-700 via-rose-700 to-rose-900 border border-white/20 flex items-center justify-center text-white font-black text-lg shadow-xl group-hover:scale-105 transition-transform">
              <span>H</span>
            </div>
          </Link>
          <h1 className="mt-4 text-2xl sm:text-3xl font-black uppercase tracking-tight text-white drop-shadow-sm">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Auth Glassmorphism Card Container */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
