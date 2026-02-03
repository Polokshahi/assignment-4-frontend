"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Clock, CheckCircle, Calendar, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function StudentDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        // স্টুডেন্টের নিজের বুকিংগুলো নিয়ে আসার এপিআই
        const { data } = await api.get("/bookings/my-bookings");
        setBookings(data.data || []);
      } catch (err) {
        toast.error("Failed to load your bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a]">
      <Loader2 className="animate-spin text-blue-500" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">My <span className="text-blue-500">Bookings</span></h1>
          <p className="text-slate-400 mt-2">Manage and track your learning sessions.</p>
        </div>

        {bookings?.length === 0 ? (
          <div className="bg-[#111] border border-white/5 rounded-[2rem] p-12 text-center">
            <p className="text-slate-500 italic">You haven't booked any tutors yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div 
                key={booking.id} 
                className="bg-[#111] border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/10">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{booking.tutor?.user?.name || "Expert Tutor"}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(booking.createdAt).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Clock size={14}/> 1 Hour Session</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-6">
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    booking.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
                  }`}>
                    {booking.status === 'PENDING' ? <Clock size={14}/> : <CheckCircle size={14}/>}
                    {booking.status}
                  </div>
                  {/* স্টুডেন্ট চাইলে এখানে রিভিউ বাটন দিতে পারো */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}