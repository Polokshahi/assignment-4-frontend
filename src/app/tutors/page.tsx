"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, GraduationCap, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function TutorBrowsingPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        // ব্যাকএন্ড থেকে ডাটা আনা
        const { data } = await api.get("/tutors");
        setTutors(data.data);
      } catch (error) {
        toast.error("Failed to load tutors");
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const handleBooking = async (tutorId: string) => {
    try {
      await api.post("/bookings", { tutorId });
      toast.success("Booking request sent successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  // ফিল্টারিং লজিক আপডেট করা হয়েছে (category.name অনুযায়ী)
  const filteredTutors = tutors.filter(t => 
    t.category?.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-4xl font-bold italic">Find Your <span className="text-blue-500">Expert Tutor</span></h1>
          <div className="flex w-full md:w-96 border border-white/10 rounded-full p-1 bg-white/5">
            <Input 
              className="bg-transparent border-none focus-visible:ring-0 text-white"
              placeholder="Search by category or name..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="rounded-full bg-blue-600 hover:bg-blue-700"><Search size={18}/></Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={48}/></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {filteredTutors.length > 0 ? filteredTutors.map((tutor) => (
              <div key={tutor.id} className="bg-[#111] border border-white/5 rounded-[2rem] p-6 hover:border-blue-500/50 transition-all group shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold text-xl border border-blue-500/20">
                    {tutor.user?.name?.charAt(0) || "T"}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full text-sm">
                    <Star size={14} fill="currentColor"/> {tutor.rating || "5.0"}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{tutor.user?.name}</h3>
                
                {/* Category Name Display */}
                <div className="flex items-center gap-2 text-blue-500 text-sm mb-4">
                  <GraduationCap size={16}/> {tutor.category?.name || "General Tutor"}
                </div>

                <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10">{tutor.bio || "No bio provided."}</p>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div>
                    <span className="text-2xl font-bold text-white">${tutor.price || '0'}</span>
                    <span className="text-slate-500 text-xs">/hr</span>
                  </div>
                  <Button onClick={() => handleBooking(tutor.id)} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6">Book Now</Button>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 text-slate-500">No tutors found for this category.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}