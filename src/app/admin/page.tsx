"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Mail, Building2, ArrowUpRight } from "lucide-react";

interface Stats {
  bookings: { total: number; new: number; completed: number; recent: number };
  messages: { total: number; new: number };
  businessAccounts: { total: number };
  revenue: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then((d) => { if (d.success) setStats(d.stats); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-xl p-6 animate-pulse"><div className="h-4 bg-gray-200 rounded w-24 mb-4" /><div className="h-8 bg-gray-200 rounded w-16" /></div>)}
      </div>
    );
  }

  const cards = [
    { key: "bookings", label: "Total Bookings", icon: Calendar, value: String(stats?.bookings.total || 0) },
    { key: "messages", label: "New Messages", icon: Mail, value: String(stats?.messages.new || 0) },
    { key: "accounts", label: "Business Accounts", icon: Building2, value: String(stats?.businessAccounts.total || 0) },
    { key: "revenue", label: "Revenue", icon: Calendar, value: `£${stats?.revenue || "0"}` },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-8">Dashboard Overview</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.key} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5E5]">
            <div className="flex items-center justify-between mb-4"><p className="text-[#666] text-sm">{card.label}</p><card.icon size={20} className="text-[#FFD900]" /></div>
            <p className="text-3xl font-bold text-black">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { href: "/admin/bookings", icon: Calendar, title: "Manage Bookings", desc: "View and update booking status" },
          { href: "/admin/messages", icon: Mail, title: "Contact Messages", desc: `${stats?.messages.new || 0} new messages` },
          { href: "/admin/business-accounts", icon: Building2, title: "Business Accounts", desc: `${stats?.businessAccounts.total || 0} accounts` },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5E5] hover:border-[#FFD900] transition-colors group">
            <div className="flex items-center justify-between mb-3"><item.icon size={24} className="text-[#FFD900]" /><ArrowUpRight size={18} className="text-[#666] group-hover:text-[#FFD900]" /></div>
            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
            <p className="text-[#666] text-sm mt-1">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
