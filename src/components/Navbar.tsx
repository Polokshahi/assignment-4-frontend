"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getDashboardLink = () => {
    if (user?.role === "ADMIN") return "/admin/dashboard";
    if (user?.role === "TUTOR") return "/tutor/dashboard";
    return "/dashboard";
  };

  return (
    <nav className="fixed top-0 left-0 z-9999 w-full bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="relative mx-auto max-w-7xl w-full h-16 px-4 flex items-center">




        
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-white italic whitespace-nowrap"
        >
          Skill<span className="text-blue-500">Bridge</span>
        </Link>

        {/* Desktop menu */}
        <div className="ml-auto hidden md:flex items-center gap-8 text-sm">
          <Link href="/#categories" className="text-slate-300 hover:text-white">
            Categories
          </Link>
          <Link href="/tutors" className="text-slate-300 hover:text-white">
            Find Tutors
          </Link>

               {user?.role === 'TUTOR' && (
  <Link href="/tutor/profile" className="text-slate-300 hover:text-white transition-colors">
    My Profile
  </Link>
)}

          {user ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <Link href={getDashboardLink()} className="text-blue-400 font-semibold">
                Dashboard
              </Link>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="h-8 text-white border-white/20"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-slate-300 hover:text-white">
                Login
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-blue-600 h-9">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>


   

     
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
          aria-label="Menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 flex flex-col gap-6 text-center">
          <Link href="/#categories" onClick={() => setIsOpen(false)} className="text-slate-300">
            Categories
          </Link>
          <Link href="/tutors" onClick={() => setIsOpen(false)} className="text-slate-300">
            Find Tutors
          </Link>

          {user ? (
            <>
              <Link
                href={getDashboardLink()}
                onClick={() => setIsOpen(false)}
                className="text-blue-400 font-semibold"
              >
                Dashboard
              </Link>
              <Button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full bg-red-600/10 text-red-500"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-slate-300">
                Login
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-blue-600">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
