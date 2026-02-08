"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie"; 

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}


interface AuthContextType {
  user: User | null;
  login: (payload: object) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
        setUser(data.data || data); 
      } catch (err: unknown) {
        console.error("FetchMe Error:", err);
        Cookies.remove("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const login = async (payload: object) => {
    try {
      const response = await api.post("/auth/login", payload);
      const result = response.data.data; 

      if (!result || !result.token) {
        throw new Error("Token not found in response");
      }

      Cookies.set("token", result.token, { 
        expires: 7, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax" 
      });
      
      const userData = result.user;
      setUser(userData);
      
      toast.success("Login Successful!");

      const userRole = userData.role.toUpperCase();

      if (userRole === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (userRole === "TUTOR") {
        router.push("/tutor/dashboard");
      } else {
        router.push("/dashboard");
      }

    } catch (error: unknown) {
  console.error("Login Error:", error);
  
  const axiosError = error as { response?: { data?: { message?: string } } };
  const message = axiosError.response?.data?.message || "Login failed";
  
  toast.error(message);
  throw error;
}
  };

const logout = () => {

  Cookies.remove("token"); 
  
  setUser(null);
  
  toast.info("Logged out successfully");

  window.location.href = "/";
};

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};