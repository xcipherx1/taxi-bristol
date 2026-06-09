"use client";
import { useEffect, useState } from "react";
import { Tag, Plus, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rateSchema, type RateInput } from "@/validations/rate";

interface Rate {
  id: string;
  routeName: string;
  pickupLocation: string;
  dropoffLocation: string;
  pricePounds: string;
  isActive: boolean;
}

export default function RatesPage() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RateInput>({
    resolver: zodResolver(rateSchema),
  });

  useEffect(() => { fetchRates(); }, []);

  const fetchRates = async () => {
    try { const r = await fetch("/api/admin/rates"); const d = await r.json(); if (d.success) setRates(d.rates); }
    catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const onSubmit = async (data: RateInput) => {
    const r = await fetch("/api/admin/rates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (r.ok) { setShowForm(false); reset(); fetchRates(); }
  };

  const deleteRate = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/rates/${id}`, { method: "DELETE" });
    fetchRates();
  };

  const inputClasses = "w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:border-[#FFD900] focus:outline-none";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-black">Rates</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#FFD900] text-black px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform"><Plus size={18} />Add Rate</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5E5] mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">New Rate</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div><input {...register("routeName")} placeholder="Route name" className={inputClasses} />{errors.routeName && <p className="text-[#E53E3E] text-xs mt-1">{errors.routeName.message}</p>}</div>
            <div><input {...register("pricePounds")} placeholder="Price (£)" className={inputClasses} />{errors.pricePounds && <p className="text-[#E53E3E] text-xs mt-1">{errors.pricePounds.message}</p>}</div>
            <div><input {...register("pickupLocation")} placeholder="Pickup location" className={inputClasses} />{errors.pickupLocation && <p className="text-[#E53E3E] text-xs mt-1">{errors.pickupLocation.message}</p>}</div>
            <div><input {...register("dropoffLocation")} placeholder="Dropoff location" className={inputClasses} />{errors.dropoffLocation && <p className="text-[#E53E3E] text-xs mt-1">{errors.dropoffLocation.message}</p>}</div>
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={isSubmitting} className="bg-[#FFD900] text-black px-6 py-2.5 rounded-lg font-bold text-sm disabled:opacity-50">{isSubmitting ? "Creating..." : "Create Rate"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-[#E5E5E5] text-black px-6 py-2.5 rounded-lg text-sm font-medium">Cancel</button>
          </div>
        </form>
      )}
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#FFD900]" /></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[#E5E5E5] bg-[#F8F8F8]"><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Route</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Pickup</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Dropoff</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Price</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Status</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Actions</th></tr></thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {rates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-[#F8F8F8]/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-black">{rate.routeName}</td>
                    <td className="px-6 py-4 text-sm text-[#666]">{rate.pickupLocation}</td>
                    <td className="px-6 py-4 text-sm text-[#666]">{rate.dropoffLocation}</td>
                    <td className="px-6 py-4 text-sm font-bold text-black">&pound;{rate.pricePounds}</td>
                    <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${rate.isActive ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>{rate.isActive ? "Active" : "Inactive"}</span></td>
                    <td className="px-6 py-4"><button onClick={() => deleteRate(rate.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-[#E53E3E]" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rates.length === 0 && <div className="text-center py-16"><Tag size={32} className="text-[#E5E5E5] mx-auto mb-3" /><p className="text-[#666]">No rates configured yet</p></div>}
        </div>
      )}
    </div>
  );
}
