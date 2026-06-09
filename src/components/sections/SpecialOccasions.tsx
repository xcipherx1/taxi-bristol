"use client";
import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = ["Premium Mercedes E-Class fleet", "Champagne service available", "Vehicle decorations on request", "Multiple vehicle coordination", "Uniformed chauffeur service"];

export default function SpecialOccasions() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="special-occasions" className="bg-white py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`order-2 lg:order-1 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" alt="Wedding car" className="w-full h-[500px] object-cover rounded-2xl" />
          </div>
          <div className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="flex items-center gap-3 mb-3"><div className="w-1 h-6 bg-[#FFD900]" /><p className="text-black text-xs font-semibold tracking-[0.15em] uppercase">SPECIAL OCCASIONS</p></div>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">Make Every Moment<br />Unforgettable</h2>
            <p className="text-[#666] text-base leading-relaxed mb-8">Weddings, events, nights out — arrive in style. Our premium vehicle tier ensures your special occasion is complemented by luxury transport.</p>
            <div className="space-y-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3"><CheckCircle size={20} className="text-[#FFD900] flex-shrink-0" /><span className="text-black text-sm">{feature}</span></div>
              ))}
            </div>
            <button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })} className="bg-black text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#111] transition-colors">Enquire Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
