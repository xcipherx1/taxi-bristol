"use client";
import { useEffect, useState } from "react";
import { Mail, Eye, Trash2, Loader2 } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-[#FFD900]/10 text-[#FFD900] border-[#FFD900]/30",
  read: "bg-blue-50 text-blue-600 border-blue-200",
  replied: "bg-green-50 text-green-600 border-green-200",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    try { const r = await fetch("/api/admin/messages"); const d = await r.json(); if (d.success) setMessages(d.messages); }
    catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/messages/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    fetchMessages();
    setSelected(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-8">Contact Messages</h1>
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-[#FFD900]" /></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-[#E5E5E5] bg-[#F8F8F8]"><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Date</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Name</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Subject</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Status</th><th className="text-left px-6 py-3 text-xs font-semibold text-[#666] uppercase">Actions</th></tr></thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-[#F8F8F8]/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-[#666]">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-black font-medium">{msg.name}</td>
                    <td className="px-6 py-4 text-sm text-black">{msg.subject}</td>
                    <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[msg.status]}`}>{msg.status}</span></td>
                    <td className="px-6 py-4"><div className="flex items-center gap-2"><button onClick={() => setSelected(msg)} className="p-1.5 hover:bg-[#FFD900]/10 rounded-lg"><Eye size={16} className="text-[#FFD900]" /></button><button onClick={() => deleteMessage(msg.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 size={16} className="text-[#E53E3E]" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {messages.length === 0 && <div className="text-center py-16"><Mail size={32} className="text-[#E5E5E5] mx-auto mb-3" /><p className="text-[#666]">No messages yet</p></div>}
        </div>
      )}
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-black">Message Details</h2><button onClick={() => setSelected(null)} className="p-2 hover:bg-[#F8F8F8] rounded-lg">&times;</button></div>
            <div className="space-y-3">
              <p><span className="text-[#666] text-sm">From:</span> <span className="text-black">{selected.name} ({selected.email})</span></p>
              {selected.phone && <p><span className="text-[#666] text-sm">Phone:</span> <span className="text-black">{selected.phone}</span></p>}
              <p><span className="text-[#666] text-sm">Subject:</span> <span className="text-black font-medium">{selected.subject}</span></p>
              <div className="bg-[#F8F8F8] rounded-lg p-4 mt-4"><p className="text-black text-sm">{selected.message}</p></div>
              <div className="flex gap-2 pt-4"><button onClick={() => updateStatus(selected.id, "read")} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">Mark as Read</button><button onClick={() => updateStatus(selected.id, "replied")} className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium">Mark as Replied</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
