"use client";
import { CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = ["DBS-checked drivers only", "Recurring weekly bookings", "Parent SMS notifications", "Child seat requirements met", "Safeguarding protocols in place"];

export default function SchoolRuns() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="school-runs" className="bg-black py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">SCHOOL RUNS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">Safe Hands for<br />Your Little Ones</h2>
            <p className="text-[#AAA] text-base leading-relaxed mb-8">Trust our vetted, DBS-checked drivers for reliable school transport. Recurring bookings, real-time parent notifications.</p>
            <div className="space-y-4 mb-10">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3"><CheckCircle size={20} className="text-[#FFD900] flex-shrink-0" /><span className="text-white text-sm">{feature}</span></div>
              ))}
            </div>
            <button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#FFD900] text-black px-8 py-3.5 rounded-full font-bold hover:scale-[1.02] transition-transform">Arrange School Transport</button>
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" alt="School entrance" className="w-full h-[500px] object-cover rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
