"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save, Clock, BookOpen, DollarSign, User, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { id: "cat-web", name: "Web Development" },
  { id: "cat-phy", name: "Physics" },
  { id: "cat-math", name: "Mathematics" },
  { id: "cat-dm", name: "Digital Marketing" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// টিউটর প্রোফাইল ডাটার জন্য ইন্টারফেস
interface TutorProfile {
  bio: string;
  price: string;
  categoryId: string;
}

export default function TutorProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [formData, setFormData] = useState<TutorProfile>({
    bio: "",
    price: "",
    categoryId: "", 
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/tutors/profile");
        if (data.data) {
          setFormData({
            bio: data.data.bio || "",
            price: data.data.price?.toString() || "",
            categoryId: data.data.categoryId || "",
          });
        }
      } catch (err) {
        console.error("Profile not found.");
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const profilePayload = {
        bio: formData.bio,
        price: Number(formData.price),
        categoryId: formData.categoryId,
      };

      await api.post("/tutors/profile", profilePayload);

      if (selectedDays.length > 0) {
        const slots = selectedDays.map(day => ({
          date: day,
          timeSlot: `${startTime} - ${endTime}`
        }));
        await api.post("/tutors/availability", { slots });
      }

      toast.success("Profile & Availability Updated!");
      router.push("/tutor/dashboard");
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-16 mt-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 text-white">
            <User size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Tutor Settings</h1>
            <p className="text-slate-400">Manage your professional profile</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8 bg-[#111] p-8 rounded-3xl border border-white/5 shadow-2xl">
          <div className="space-y-3">
            <label className="text-sm font-semibold flex items-center gap-2 text-slate-300">
              <BookOpen size={18} className="text-blue-500" /> Professional Bio
            </label>
            <textarea
              className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500 min-h-[120px] text-white"
              value={formData.bio}
              placeholder="The bio must contain 25 characters."
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2 text-slate-300">
                <GraduationCap size={18} className="text-blue-500" /> Category
              </label>
              <select
                className="w-full bg-black/50 border border-white/10 h-12 rounded-xl px-4 outline-none cursor-pointer text-white"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
              >
                <option value="" disabled className="text-slate-500">Select Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#111]">{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold flex items-center gap-2 text-slate-300">
                <DollarSign size={18} className="text-blue-500" /> Hourly Rate ($)
              </label>
              <Input
                type="number"
                className="bg-black/50 border-white/10 h-12 rounded-xl focus:border-blue-500 text-white"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-4 bg-black/20 p-6 rounded-2xl border border-white/5">
            <label className="text-sm font-semibold flex items-center gap-2 text-slate-300">
              <Clock size={18} className="text-blue-500" /> Set Availability
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${selectedDays.includes(day) ? "bg-blue-600 border-blue-500 text-white" : "bg-black/40 border-white/10 text-slate-500 hover:border-blue-500/50"}`}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
               <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="flex-1 bg-black/50 border border-white/10 rounded-xl p-2 text-sm text-white outline-none focus:border-blue-500" />
               <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="flex-1 bg-black/50 border border-white/10 rounded-xl p-2 text-sm text-white outline-none focus:border-blue-500" />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-14 bg-blue-600 hover:bg-blue-700 font-bold rounded-2xl transition-all">
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />} 
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}