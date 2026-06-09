"use client";
import { ShieldCheck, Clock, Star, Banknote, Phone } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, title: "Safe & Secure", subtitle: "Fully licensed" },
  { icon: Clock, title: "24/7 Service", subtitle: "Always available" },
  { icon: Star, title: "Top Rated", subtitle: "4.9 average" },
  { icon: Banknote, title: "Best Prices", subtitle: "No hidden fees" },
  { icon: Phone, title: "Quick Booking", subtitle: "Under 60 seconds" },
];

export default function TrustStrip() {
  return (
    <section id="trust-strip" className="bg-[#FFD900] py-10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {trustItems.map((item, index) => (
            <div key={item.title} className={`flex flex-col items-center text-center gap-2 ${index < trustItems.length - 1 ? "md:border-r md:border-black/20" : ""}`}>
              <item.icon size={32} className="text-black" strokeWidth={1.5} />
              <h4 className="text-black font-bold text-lg">{item.title}</h4>
              <p className="text-black/70 text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
