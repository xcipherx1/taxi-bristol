"use client";
import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = ["Monthly invoicing with itemised receipts", "Dedicated account manager", "Priority dispatch", "Detailed expense reporting", "API integration for large corporates"];

export default function BusinessTravel() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="business-travel" className="bg-black py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">BUSINESS TRAVEL</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">Corporate Travel,<br />Simplified</h2>
            <p className="text-[#AAA] text-base leading-relaxed mb-8">Streamlined business accounts with monthly invoicing, priority booking, and detailed trip reporting.</p>
            <div className="space-y-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3"><CheckCircle size={20} className="text-[#FFD900] flex-shrink-0" /><span className="text-white text-sm">{feature}</span></div>
              ))}
            </div>
            <button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#FFD900] text-black px-8 py-3.5 rounded-full font-bold hover:scale-[1.02] transition-transform">Set Up Business Account</button>
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="Business district" className="w-full h-[500px] object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
