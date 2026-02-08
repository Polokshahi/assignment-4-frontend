"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, GraduationCap, Loader2, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface Availability {
  date: string;
  timeSlot: string;
}

interface Tutor {
  id: string;
  price: number;
  bio?: string;
  rating?: number;
  availability?: Availability[];
  user: {
    name: string;
  };
  category: {
    name: string;
  };
}

export default function TutorBrowsingPage() {

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [bookingId, setBookingId] = useState<string | null>(null);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/tutors?sortBy=${sortBy}&sortOrder=${sortOrder}`);
      setTutors(data.data);
    } catch (error: unknown) {
      toast.error("Failed to load tutors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [sortBy, sortOrder]);


  const handleBooking = async (tutor: Tutor) => {
    try {
      if (!tutor.availability || tutor.availability.length === 0) {
        toast.error("No slots available.");
        return;
      }
      setBookingId(tutor.id);
      const firstSlot = tutor.availability[0];
      await api.post("/bookings", {
        tutorId: tutor.id,
        date: firstSlot.date,
        timeSlot: firstSlot.timeSlot
      });
      toast.success("Booked successfully!");
      
      setTutors((prev) => 
        prev.map((t) => t.id === tutor.id ? { ...t, availability: [] } : t)
      );
    } catch (error: unknown) {

  const axiosError = error as { response?: { data?: { message?: string } } };
  

  const errorMessage = axiosError.response?.data?.message || "Booking failed";
  
  toast.error(errorMessage);
} finally {
      setBookingId(null);
    }
  };

  const filteredTutors = tutors.filter(t => 
    t.category?.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-4 md:px-16 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search/Sort Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-4xl font-bold italic">Find Your <span className="text-blue-500">Expert Tutor</span></h1>
          
          <div className="flex flex-col md:flex-row w-full lg:w-auto gap-4">
            <div className="flex w-full md:w-80 border border-white/10 rounded-full p-1 bg-white/5">
              <Input 
                className="bg-transparent border-none focus-visible:ring-0 text-white"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700"><Search size={18}/></Button>
            </div>

            <div className="flex gap-2">
              <Select onValueChange={(value) => {
                const [field, order] = value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}>
                <SelectTrigger className="w-45 bg-white/5 border-white/10 rounded-full text-white">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-[#111] border-white/10 text-white">
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating-desc">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tutor Grid */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={48}/></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutors.map((tutor) => (
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
                <div className="flex items-center gap-2 text-blue-500 text-sm mb-4">
                  <GraduationCap size={16}/> {tutor.category?.name || "General Tutor"}
                </div>
                <p className="text-slate-400 text-sm line-clamp-2 mb-6 h-10">{tutor.bio || "No bio provided."}</p>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div>
                    <span className="text-2xl font-bold text-white">${tutor.price || '0'}</span>
                    <span className="text-slate-500 text-xs">/hr</span>
                  </div>

                  {tutor.availability && tutor.availability.length > 0 ? (
                    <Button 
                      onClick={() => handleBooking(tutor)} 
                      disabled={bookingId === tutor.id}
                      className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
                    >
                      {bookingId === tutor.id ? <Loader2 className="animate-spin" size={18}/> : "Book Now"}
                    </Button>
                  ) : (
                    <Button disabled className="bg-zinc-800 text-zinc-500 cursor-not-allowed rounded-xl px-6">Booked</Button>
                  ) }
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}