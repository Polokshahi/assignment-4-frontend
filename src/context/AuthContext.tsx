"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie"; 

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      const token = Cookies.get("token"); 
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/auth/me");
        // Backend jodi { success: true, data: user } pathay tobe data.data hobe
        setUser(data.data || data); 
      } catch (err: any) {
        console.error("FetchMe Error:", err);
        Cookies.remove("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

 const login = async (payload: any) => {
  try {
    // ১. রিকোয়েস্ট পাঠানো
    const response = await api.post("/auth/login", payload);
    
    // তোমার ব্যাকএন্ড { success: true, data: { token, user } } পাঠাচ্ছে
    const result = response.data.data; 

    if (!result || !result.token) {
      throw new Error("Token not found in response");
    }

    // ২. কুকি সেট করা (Localhost এর জন্য secure: false করা হয়েছে)
    Cookies.set("token", result.token, { 
      expires: 7, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax" 
    });
    
    // ৩. ইউজার সেট করা
    const userData = result.user;
    setUser(userData);
    
    toast.success("Login Successful!");

    // ৪. রোল অনুযায়ী রিডাইরেক্ট
    const userRole = userData.role.toUpperCase();

    if (userRole === "ADMIN") {
      router.push("/admin/dashboard");
    } else if (userRole === "TUTOR") {
      router.push("/tutor/dashboard");
    } else {
      router.push("/dashboard");
    }

  } catch (error: any) {
    console.error("Login Error:", error);
    const message = error.response?.data?.message || "Login failed";
    toast.error(message);
    throw error;
  }
};

   

  const logout = () => {
    Cookies.remove("token"); 
    setUser(null);
    router.push("/login");
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);