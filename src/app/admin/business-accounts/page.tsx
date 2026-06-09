"use client";
import { useEffect, useState } from "react";
import { Building2, Plus, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessAccountSchema, type BusinessAccountInput } from "@/validations/business-account";

interface Account {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  creditLimit: string;
  isActive: boolean;
  createdAt: string;
}

export default function BusinessAccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BusinessAccountInput>({
    resolver: zodResolver(businessAccountSchema),
  });

  useEffect(() => { fetchAccounts(); }, []);

  const fetchAccounts = async () => {
    try { const r = await fetch("/api/admin/business-accounts"); const d = await r.json(); if (d.success) setAccounts(d.accounts); }
    catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const onSubmit = async (data: BusinessAccountInput) => {
    const r = await fetch("/api/admin/business-accounts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (r.ok) { setShowForm(false); reset(); fetchAccounts(); }
  };

  const deleteAccount = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/business-accounts/${id}`, { method: "DELETE" });
    fetchAccounts();
  };

  const inputClasses = "w-full border border-[#E5E5E5] rounded-lg px-4 py-2.5 text-sm focus:border-[#FFD900] focus:outline-none";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-black">Business Accounts</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#FFD900] text-black px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform"><Plus size={18} />Add Account</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5E5] mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">New Business Account</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div><input {...register("companyName")} placeholder="Company name" className={inputClasses} />{errors.companyName && <p className="text-[#E53E3E] text-xs mt-1">{errors.companyName.message}</p>}</div>
            <div><input {...register("contactName")} placeholder="Contact name" className={inputClasses} />{errors.contactName && <p className="text-[#E53E3E] text-xs mt-1">{errors.contactName.message}</p>}</div>
            <div><input {...register("contactEmail")} type="email" placeholder="Contact email" className={inputClasses} />{errors.contactEmail && <p className="text-[#E53E3E] text-xs mt-1">{errors.contactEmail.message}</p>}</div>
            <div><input {...register("contactPhone")} placeholder="Phone number" className={inputClasses} />{errors.contactPhone && <p className="text-[#E53E3E] text-xs mt-1">{errors.contactPhone.message}</p>}</div>
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={isSubmitting} className="bg-[#FFD900] text-black px-6 py-2.5 rounded-lg font-bold text-sm disabled:opacity-50">{isSubmitting ? "Creating..." : "Create Account"}</button>
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
              <thead><tr className="border-b border-[#E5E5E5] bg-[#F8F8F8]"><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Company</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Contact</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Email</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Status</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Actions</th></tr></thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {accounts.map((a) => (
                  <tr key={a.id} className="hover:bg-[#F8F8F8]/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-black">{a.companyName}</td>
                    <td className="px-6 py-4 text-sm text-black">{a.contactName}</td>
                    <td className="px-6 py-4 text-sm text-[#666]">{a.contactEmail}</td>
                    <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${a.isActive ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>{a.isActive ? "Active" : "Inactive"}</span></td>
                    <td className="px-6 py-4"><button onClick={() => deleteAccount(a.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-[#E53E3E]" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {accounts.length === 0 && <div className="text-center py-16"><Building2 size={32} className="text-[#E5E5E5] mx-auto mb-3" /><p className="text-[#666]">No business accounts yet</p></div>}
        </div>
      )}
    </div>
  );
}
