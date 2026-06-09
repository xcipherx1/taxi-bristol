"use client";
import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const destinations = [
  { city: "London", time: "2h 30m", price: "From £150" },
  { city: "Cardiff", time: "1h", price: "From £45" },
  { city: "Birmingham", time: "1h 30m", price: "From £120" },
  { city: "Manchester", time: "3h", price: "From £200" },
];

const features = ["Fixed pricing regardless of traffic", "Comfortable 8-seater options", "Rest stop flexibility", "Professional experienced drivers", "24/7 availability"];

export default function LongDistance() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="long-distance" className="bg-white py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80" alt="Open road" className="w-full h-[500px] object-cover rounded-2xl" />
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="flex items-center gap-3 mb-3"><div className="w-1 h-6 bg-[#FFD900]" /><p className="text-black text-xs font-semibold tracking-[0.15em] uppercase">LONG DISTANCE</p></div>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">Beyond Bristol,<br />In Comfort</h2>
            <p className="text-[#666] text-base leading-relaxed mb-8">Intercity travel made comfortable. Fixed pricing, spacious vehicles, and experienced drivers.</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {destinations.map((dest) => (
                <div key={dest.city} className="bg-[#F8F8F8] rounded-lg p-4"><p className="text-black font-semibold text-sm">{dest.city}</p><p className="text-[#666] text-xs">{dest.time}</p><p className="text-[#FFD900] font-bold text-sm mt-1">{dest.price}</p></div>
              ))}
            </div>
            <div className="space-y-3 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3"><CheckCircle size={16} className="text-[#FFD900] flex-shrink-0" /><span className="text-black text-sm">{feature}</span></div>
              ))}
            </div>
            <button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })} className="bg-black text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#111] transition-colors">Get a Long Distance Quote</button>
          </div>
        </div>
      </div>
    </section>
  );
}
