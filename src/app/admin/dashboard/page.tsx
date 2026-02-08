"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, UserX, UserCheck, Mail, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "BANNED";
}

export default function AdminDashboard() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data.data);
    } catch (err: unknown) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
    try {
      await api.patch(`/admin/users/${userId}/status`, { status: newStatus });
      toast.success(`User is now ${newStatus}`);
      fetchUsers();
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Synchronizing Data...</p>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-10 space-y-8 max-w-7xl mx-auto px-4 md:px-0">
      
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">System Administration</h1>
        <p className="text-slate-500">Manage user access levels and platform security settings.</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-md bg-linear-to-br from-blue-600 to-indigo-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card className="border shadow-md bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {users.filter(u => u.status === "ACTIVE").length}
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-md bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Banned</CardTitle>
            <UserX className="h-4 w-4 text-red-500" />
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {users.filter(u => u.status === "BANNED").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
        <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-800/50 py-5">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-primary h-6 w-6" /> User Management
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-100 dark:bg-slate-800">
              <TableRow>
                <TableHead className="font-bold py-4 text-slate-700 dark:text-slate-300">Name & Email</TableHead>
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Role</TableHead>
                <TableHead className="font-bold text-slate-700 dark:text-slate-300">Status</TableHead>
                <TableHead className="text-right font-bold pr-8 text-slate-700 dark:text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors border-b">
                  <TableCell className="py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white text-base">{user.name}</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Mail size={12} /> {user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-semibold uppercase tracking-wider text-[10px] px-2">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`rounded-full px-3 ${
                      user.status === 'BANNED' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'
                    }`}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8 space-x-3">
                    <Button
                      size="sm"
                      variant={user.status === "ACTIVE" ? "destructive" : "default"}
                      className="rounded-lg h-9 px-5 font-bold shadow-sm"
                      onClick={() => handleStatusChange(user.id, user.status)}
                    >
                      {user.status === "ACTIVE" ? (
                        <><UserX className="w-4 h-4 mr-2" /> Ban</>
                      ) : (
                        <><UserCheck className="w-4 h-4 mr-2" /> Unban</>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}