"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
  { value: "< 5 min", label: "Average pickup in city centre" },
  { value: "100%", label: "Insured journeys" },
  { value: "15k+", label: "Rides completed" },
];

export default function LocalJourneys() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="local-journeys" className="bg-white py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <img src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=80" alt="Bristol city" className="w-full h-[500px] object-cover rounded-2xl" />
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="flex items-center gap-3 mb-3"><div className="w-1 h-6 bg-[#FFD900]" /><p className="text-black text-xs font-semibold tracking-[0.15em] uppercase">LOCAL JOURNEYS</p></div>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">Your City,<br />Your Schedule</h2>
            <p className="text-[#666] text-base leading-relaxed mb-8">Quick hops across Bristol, scheduled commutes, or spontaneous plans — we&apos;re ready. Book in under 60 seconds.</p>
            <div className="grid grid-cols-3 gap-6 mb-10">
              {stats.map((stat) => (
                <div key={stat.label}><p className="text-[#FFD900] text-2xl md:text-3xl font-bold">{stat.value}</p><p className="text-[#666] text-xs mt-1">{stat.label}</p></div>
              ))}
            </div>
            <button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })} className="bg-black text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#111] transition-colors">Book a Local Ride</button>
          </div>
        </div>
      </div>
    </section>
  );
}
