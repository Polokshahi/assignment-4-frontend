"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  DollarSign, 
  Loader2, 
  UserCheck 
} from "lucide-react";
import { toast } from "sonner";

export default function TutorDashboard() {
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const { data } = await api.get("/bookings/tutor-bookings");
     
        setBookings(data?.data || []);
      } catch (err) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchTutorData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a]">
      <Loader2 className="animate-spin text-blue-500" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Tutor <span className="text-blue-500">Dashboard</span></h1>

    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500"><Users /></div>
            <div>
              <p className="text-slate-400 text-sm">Total Students</p>
              <h3 className="text-2xl font-bold">{bookings?.length || 0}</h3>
            </div>
          </div>
          
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 flex items-center gap-4">
            <div className="h-12 w-12 bg-green-600/20 rounded-2xl flex items-center justify-center text-green-500"><CheckCircle /></div>
            <div>
              <p className="text-slate-400 text-sm">Completed Sessions</p>
              <h3 className="text-2xl font-bold">
                {bookings?.filter(b => b?.status === 'COMPLETED').length || 0}
              </h3>
            </div>
          </div>

          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 flex items-center gap-4">
            <div className="h-12 w-12 bg-yellow-600/20 rounded-2xl flex items-center justify-center text-yellow-500"><DollarSign /></div>
            <div>
              <p className="text-slate-400 text-sm">Total Earnings</p>
              <h3 className="text-2xl font-bold">
                $ {(bookings?.filter(b => b?.status === 'COMPLETED').length || 0) * 25}
              </h3>
            </div>
          </div>
        </div>

        {/* --- Recent Bookings Table --- */}
        <div className="bg-[#111] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Booking Requests</h2>
            <span className="text-xs text-slate-500 uppercase tracking-widest">Cash on Delivery</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-slate-400 text-sm uppercase">
                <tr>
                  <th className="px-8 py-4">Student</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings?.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking?.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 font-bold border border-blue-500/10">
                          {booking?.student?.name?.charAt(0) || "S"}
                        </div>
                        <span className="font-medium">{booking?.student?.name || "Unknown Student"}</span>
                      </td>
                      <td className="px-8 py-6 text-slate-400 text-sm">
                        {booking?.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${booking?.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
                          {booking?.status || "PENDING"}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                         {booking?.status === 'PENDING' && (
                           <button className="text-blue-500 hover:underline text-sm font-bold">Mark as Complete</button>
                         )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-10 text-center text-slate-500 italic">No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}