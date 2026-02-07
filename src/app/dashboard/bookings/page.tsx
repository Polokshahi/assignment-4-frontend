"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Loader2, Calendar, Clock, User, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("/bookings/my-bookings");
        setBookings(data.data);
      } catch (error) {
        toast.error("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Tutoring <span className="text-blue-500">Sessions</span></h1>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-[#111] rounded-3xl border border-white/5">
            <p className="text-slate-500">You haven't booked any sessions yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 hover:border-blue-500/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/10">
                    <User size={24}/>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{booking.tutor?.user?.name || "Expert Tutor"}</h4>
                    <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                      {booking.tutor?.category?.name || "Education"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Calendar size={14} className="text-blue-500"/> {booking.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Clock size={14} className="text-blue-500"/> {booking.timeSlot}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-xl text-xs font-bold border border-green-500/10">
                    <ShieldCheck size={14}/> {booking.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}