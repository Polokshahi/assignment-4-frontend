"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Search, GraduationCap, Star, CheckCircle,  Linkedin, ArrowRight } from "lucide-react";



export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white tracking-tighter italic">
            Skill<span className="text-blue-500">Bridge</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/#categories" className="text-slate-300 hover:text-white transition-colors">Categories</Link>
            {user ? (
              <div className="flex items-center gap-4">
                <Link href={user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'} className="text-blue-400 font-bold">Dashboard</Link>
                <Button onClick={logout} variant="outline" size="sm" className="border-white/20 text-white hover:bg-white hover:text-black">Logout</Button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link href="/login" className="text-slate-300 hover:text-white transition-colors">Login</Link>
                <Link href="/register"><Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-none">Get Started</Button></Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Connect with <span className="text-blue-500">Expert Tutors</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400">
            Personalized 1-on-1 tutoring sessions with verified experts in any field. 
            Elevate your skills with professional guidance.
          </p>
          <div className="flex max-w-lg mx-auto border border-white/10 rounded-full p-1.5 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden focus-within:border-blue-500/50 transition-all">
            <input type="text" placeholder="Search Physics, Math, Coding..." className="flex-1 px-6 bg-transparent outline-none text-white placeholder:text-slate-500" />
            <Button className="rounded-full px-8 bg-blue-600 hover:bg-blue-700"><Search size={18} className="mr-2" /> Find</Button>
          </div>
        </div>
      </section>

      {/* --- 2. STATS SECTION --- */}
      <section className="py-16 border-y border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 text-center">
          <div><h3 className="text-3xl font-bold text-blue-500">5,000+</h3><p className="text-sm text-slate-400 mt-1">Expert Tutors</p></div>
          <div><h3 className="text-3xl font-bold text-blue-500">20k+</h3><p className="text-sm text-slate-400 mt-1">Active Students</p></div>
          <div><h3 className="text-3xl font-bold text-blue-500">500+</h3><p className="text-sm text-slate-400 mt-1">Subjects</p></div>
          <div><h3 className="text-3xl font-bold text-blue-500">4.9/5</h3><p className="text-sm text-slate-400 mt-1">Student Reviews</p></div>
        </div>
      </section>

      {/* --- 3. CATEGORIES SECTION --- */}
      {/* <section id="categories" className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Popular Subject Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Web Development', 'Physics', 'Digital Marketing', 'Graphic Design', 'Data Science', 'Mathematics'].map((cat) => (
            <div key={cat} className="p-8 border border-white/5 rounded-3xl hover:border-blue-500/50 hover:bg-white/5 transition-all group bg-[#111]">
              <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <GraduationCap size={24} className="text-blue-500 group-hover:text-white" />
              </div>
              <h3 className="font-bold text-xl text-white">{cat}</h3>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">Access world-class education from verified {cat} professionals instantly.</p>
            </div>
          ))}
        </div>
      </section> */}



      {/* --- CATEGORIES SECTION --- */}
<section id="categories" className="py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
  <div className="flex flex-col items-center mb-16">
    <h2 className="text-4xl font-bold text-center text-white mb-4">
      Popular Subject <span className="text-blue-500">Categories</span>
    </h2>
    <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {['Web Development', 'Physics', 'Digital Marketing', 'Graphic Design', 'Data Science', 'Mathematics'].map((cat) => (
      <Link 
        href={`/tutors?subject=${encodeURIComponent(cat)}`} 
        key={cat}
        className="group relative p-8 border border-white/5 rounded-[2rem] bg-[#111] hover:border-blue-500/40 hover:bg-gradient-to-br from-[#111] to-[#1a1a1a] transition-all duration-300 overflow-hidden"
      >
        {/* Hover Decoration */}
        <div className="absolute -right-4 -top-4 h-24 w-24 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-all"></div>
        
        <div className="relative z-10">
          <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
            <GraduationCap size={28} className="text-blue-500 group-hover:text-white" />
          </div>

          <h3 className="font-bold text-2xl text-white group-hover:text-blue-400 transition-colors">
            {cat}
          </h3>
          
          <p className="text-sm text-slate-400 mt-4 leading-relaxed group-hover:text-slate-300 transition-colors">
            Learn from the top 1% of {cat} experts. Book a session and master your skills.
          </p>

          <div className="mt-6 flex items-center gap-2 text-blue-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            Explore Tutors <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>














      {/* --- 4. TRUST/TESTIMONIAL SECTION --- */}
      <section className="py-24 bg-[#0d0d0d] border-y border-white/5 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">Why SkillBridge?</h2>
            <div className="space-y-5">
              <div className="flex gap-4 items-center font-medium"><CheckCircle className="text-blue-500 h-6 w-6" /> <span className="text-slate-200">Verified Expert Tutors</span></div>
              <div className="flex gap-4 items-center font-medium"><CheckCircle className="text-blue-500 h-6 w-6" /> <span className="text-slate-200">Secure Instant Bookings</span></div>
              <div className="flex gap-4 items-center font-medium"><CheckCircle className="text-blue-500 h-6 w-6" /> <span className="text-slate-200">Real-time Video Sessions</span></div>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-10">Join as a Student</Button>
          </div>
          <div className="bg-[#161616] p-10 rounded-[2rem] border border-white/5 relative shadow-2xl">
             <Star className="absolute -top-6 -right-6 text-yellow-500 h-12 w-12 fill-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
             <p className="text-xl italic text-slate-300 leading-relaxed">"SkillBridge made learning React.js incredibly easy. The 1-on-1 interaction was much better than pre-recorded courses. Found my mentor in minutes!"</p>
             <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold border border-blue-500/20">AS</div>
                <div><h4 className="font-bold text-white underline underline-offset-4 decoration-blue-500">Abdulla Hel Shahi</h4><p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Next.js Student</p></div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}