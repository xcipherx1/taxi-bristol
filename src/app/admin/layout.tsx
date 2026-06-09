"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Don't check auth on login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#FFD900]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-60 p-6 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
