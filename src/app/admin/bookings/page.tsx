"use client";
import { useEffect, useState } from "react";
import { Search, Eye, Trash2, Loader2 } from "lucide-react";

interface Booking {
  id: string;
  bookingReference: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDatetime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  passengers: number;
  fixedPrice: string;
  status: string;
  vehicleType: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-[#FFD900]/10 text-[#FFD900] border-[#FFD900]/30",
  contacted: "bg-blue-50 text-blue-600 border-blue-200",
  completed: "bg-green-50 text-green-600 border-green-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);

  useEffect(() => { fetchBookings(); }, [statusFilter, search]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (search) params.append("search", search);
      const response = await fetch(`/api/admin/bookings?${params}`);
      const data = await response.json();
      if (data.success) setBookings(data.bookings);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchBookings();
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
    fetchBookings();
    setSelected(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-black">Bookings</h1>
        <div className="flex gap-3">
          <div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" /><input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:border-[#FFD900] focus:outline-none" /></div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-[#E5E5E5] rounded-lg text-sm focus:border-[#FFD900] focus:outline-none appearance-none bg-white">
            <option value="">All Status</option><option value="new">New</option><option value="contacted">Contacted</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#FFD900]" /></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[#E5E5E5] bg-[#F8F8F8]"><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Reference</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Customer</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Route</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Date</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Price</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Status</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Actions</th></tr></thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F8F8F8]/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-black">{b.bookingReference}</td>
                    <td className="px-6 py-4 text-sm text-black">{b.customerName}</td>
                    <td className="px-6 py-4 text-sm text-[#666]">{b.pickupLocation} &rarr; {b.dropoffLocation}</td>
                    <td className="px-6 py-4 text-sm text-[#666]">{new Date(b.pickupDatetime).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-black">&pound;{b.fixedPrice}</td>
                    <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[b.status] || ""}`}>{b.status}</span></td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2"><button onClick={() => setSelected(b)} className="p-1.5 hover:bg-[#FFD900]/10 rounded-lg"><Eye size={16} className="text-[#FFD900]" /></button><button onClick={() => deleteBooking(b.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-[#E53E3E]" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bookings.length === 0 && <div className="text-center py-16"><p className="text-[#666]">No bookings found</p></div>}
        </div>
      )}
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-black">Booking Details</h2><button onClick={() => setSelected(null)} className="p-2 hover:bg-[#F8F8F8] rounded-lg">&times;</button></div>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-[#666] text-sm">Reference</span><span className="text-black font-medium">{selected.bookingReference}</span></div>
              <div className="flex justify-between"><span className="text-[#666] text-sm">Customer</span><span className="text-black">{selected.customerName}</span></div>
              <div className="flex justify-between"><span className="text-[#666] text-sm">Email</span><span className="text-black">{selected.customerEmail}</span></div>
              <div className="flex justify-between"><span className="text-[#666] text-sm">Phone</span><span className="text-black">{selected.customerPhone}</span></div>
              <div className="border-t border-[#E5E5E5] pt-4">
                <div className="flex justify-between"><span className="text-[#666] text-sm">From</span><span className="text-black">{selected.pickupLocation}</span></div>
                <div className="flex justify-between mt-2"><span className="text-[#666] text-sm">To</span><span className="text-black">{selected.dropoffLocation}</span></div>
                <div className="flex justify-between mt-2"><span className="text-[#666] text-sm">Price</span><span className="text-black font-bold">&pound;{selected.fixedPrice}</span></div>
              </div>
              <div className="border-t border-[#E5E5E5] pt-4">
                <label className="block text-sm font-medium text-black mb-2">Update Status</label>
                <div className="flex gap-2 flex-wrap">
                  {["new", "contacted", "completed", "cancelled"].map((s) => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selected.status === s ? statusColors[s] : "border-[#E5E5E5] text-[#666] hover:bg-[#F8F8F8]"}`}>{s}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => deleteBooking(selected.id)} className="w-full bg-[#E53E3E]/10 text-[#E53E3E] py-2.5 rounded-lg font-medium hover:bg-[#E53E3E]/20 transition-colors mt-4">Delete Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
