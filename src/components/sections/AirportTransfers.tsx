"use client";
import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = ["Meet & greet in arrivals hall", "60 minutes free waiting time", "Flight tracking with delay adjustment", "Fixed price — no meter anxiety", "Luggage assistance included"];

const airports = [
  { code: "BRS", name: "Bristol", price: "£35" },
  { code: "LHR", name: "Heathrow", price: "£150" },
  { code: "LGW", name: "Gatwick", price: "£180" },
  { code: "STN", name: "Stansted", price: "£200" },
  { code: "LTN", name: "Luton", price: "£170" },
  { code: "BHX", name: "Birmingham", price: "£120" },
  { code: "CWL", name: "Cardiff", price: "£100" },
];

export default function AirportTransfers() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="airport-transfers" className="bg-black py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">AIRPORT TRANSFERS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">Fly Stress-Free,<br />We&apos;ll Handle the Road</h2>
            <p className="text-[#AAA] text-base leading-relaxed mb-8">We serve all major airports including Bristol (BRS), Heathrow, Gatwick, Birmingham, and Cardiff. Flight monitoring included.</p>
            <div className="space-y-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3"><CheckCircle size={20} className="text-[#FFD900] flex-shrink-0" /><span className="text-white text-sm">{feature}</span></div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {airports.map((airport) => (
                <div key={airport.code} className="bg-[#111] rounded-lg p-3 text-center border border-[#333]">
                  <p className="text-[#FFD900] font-bold text-lg">{airport.price}</p>
                  <p className="text-white text-xs">{airport.name}</p>
                </div>
              ))}
            </div>
            <button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#FFD900] text-black px-8 py-3.5 rounded-full font-bold hover:scale-[1.02] transition-transform">Book Airport Transfer</button>
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80" alt="Airport terminal" className="w-full h-[500px] object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
