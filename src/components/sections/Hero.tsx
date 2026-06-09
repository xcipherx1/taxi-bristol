"use client";
import { ShieldCheck, Clock, Star, Banknote, ChevronDown } from "lucide-react";

const trustBadges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Clock, label: "24/7 Available" },
  { icon: Star, label: "4.9 Rating" },
  { icon: Banknote, label: "Fixed Prices" },
];

export default function Hero() {
  const handleScroll = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-[100dvh] max-h-[900px] flex items-center overflow-hidden bg-black">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80">
        <source src="https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)" }} />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full py-32">
        <div className="max-w-2xl">
          <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-4">BRISTOL&apos;S PREMIER PRIVATE HIRE</p>
          <h1 className="text-white text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">
            Your Ride,<br />
            <span className="relative">Your Way<span className="absolute -bottom-2 left-0 w-full h-1 bg-[#FFD900]" /></span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-6 max-w-lg leading-relaxed">Reliable, comfortable taxis across Bristol and beyond. Available 24/7 with upfront pricing and professional drivers.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button onClick={() => handleScroll("#booking")} className="bg-[#FFD900] text-black px-8 py-4 rounded-full font-bold text-base hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(255,217,0,0.4)] transition-all">Book Your Ride</button>
            <button onClick={() => handleScroll("#services")} className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/10 transition-all">View Services</button>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                <badge.icon size={16} className="text-[#FFD900]" />
                <span className="text-white text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-24 right-6 md:right-12 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3">
        <p className="text-white text-sm font-medium">Est. 2012 &middot; 12+ Years</p>
      </div>
      <button onClick={() => handleScroll("#trust-strip")} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-slow" aria-label="Scroll down">
        <ChevronDown size={24} className="text-white/60" />
      </button>
    </section>
  );
}
