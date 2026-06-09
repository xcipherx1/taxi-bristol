"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Calendar, Mail, Building2, Tag, Settings, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/business-accounts", label: "Business Accounts", icon: Building2 },
  { href: "/admin/rates", label: "Rates", icon: Tag },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-md">
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />}
      <aside className={`fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-[#E5E5E5] z-40 transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6">
          <Link href="/" className="block">
            <p className="text-black font-bold text-sm tracking-[0.05em] uppercase">Taxi Service Bristol</p>
            <p className="text-[#666] text-xs mt-1">Admin Dashboard</p>
          </Link>
        </div>
        <nav className="px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-[#FFD900]/10 text-[#FFD900]" : "text-black hover:bg-[#F8F8F8]"}`}>
                <item.icon size={18} />{item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E5E5]">
          <div className="px-4 mb-3"><p className="text-black text-sm font-medium">{user?.email}</p><p className="text-[#666] text-xs capitalize">{user?.role}</p></div>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-[#E53E3E] hover:bg-[#E53E3E]/5 rounded-lg transition-colors"><LogOut size={18} />Logout</button>
        </div>
      </aside>
    </>
  );
}
