"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  { number: "1", title: "Book", description: "Enter your pickup, destination, and time. Get an instant quote with fixed pricing." },
  { number: "2", title: "Confirm", description: "Review your journey details. Pay by card or choose cash to the driver." },
  { number: "3", title: "Track", description: "Watch your driver approach in real-time. Receive SMS updates on arrival." },
  { number: "4", title: "Ride", description: "Enjoy a comfortable, insured journey with a professional, vetted driver." },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`text-center relative transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="w-16 h-16 rounded-full bg-[#FFD900] flex items-center justify-center mx-auto mb-6 relative z-10">
        <span className="text-black text-2xl font-bold">{step.number}</span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
      <p className="text-[#AAA] text-sm leading-relaxed">{step.description}</p>
    </div>
  );
}

export default function HowItWorks() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  return (
    <section className="bg-black py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-600 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">HOW IT WORKS</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Book in 60 Seconds</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[1px] border-t border-dashed border-[#FFD900]/30" />
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
