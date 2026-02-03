"use client";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-16 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold italic text-white">Skill<span className="text-blue-500">Bridge</span></h3>
          <p className="text-sm text-slate-500 leading-relaxed">Empowering learners globally by connecting them with industry-leading experts.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Platform</h4>
          <ul className="text-sm text-slate-500 space-y-4">
            <li className="cursor-pointer hover:text-white transition-colors">Find Tutors</li>
            <li className="cursor-pointer hover:text-white transition-colors">Write Reviews</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Legal</h4>
          <ul className="text-sm text-slate-500 space-y-4">
            <li className="cursor-pointer hover:text-white transition-colors">Privacy Policy</li>
            <li className="cursor-pointer hover:text-white transition-colors">Terms of Use</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Follow Us</h4>
          <div className="flex gap-6">
            <Facebook className="text-slate-500 cursor-pointer hover:text-white h-5 w-5" />
            <Linkedin className="text-slate-500 cursor-pointer hover:text-white h-5 w-5" />
            <Instagram className="text-slate-500 cursor-pointer hover:text-white h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-xs text-slate-600">
          © 2026 SkillBridge. Created with passion for learners.
      </div>
    </footer>
  );
}