"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Loader2, Calendar, Clock, User } from "lucide-react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("/bookings/my-bookings");
        setBookings(data.data);
      } catch (error) {
        console.error("Failed to load bookings");
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
          <Loader2 className="animate-spin text-blue-500 mx-auto" />
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-[#111] rounded-3xl border border-white/5">
            <p className="text-slate-500">You haven't booked any tutors yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-[#111] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 font-bold border border-blue-500/10">
                    <User size={20}/>
                  </div>
                  <div>
                    <h4 className="font-bold">{booking.tutor.user.name}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{booking.tutor.subject}</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Clock size={16} className="text-blue-500"/> {booking.status}
                  </div>
                  <div className="bg-blue-600/10 text-blue-500 px-4 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                    Cash on Delivery
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