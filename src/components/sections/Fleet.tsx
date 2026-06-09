"use client";
import { Users, Briefcase, Leaf } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const vehicles = [
  { name: "Toyota Prius", type: "Saloon", description: "Our signature hybrid. Quiet, comfortable, and eco-friendly. Perfect for city journeys and airport runs.", passengers: "4", bags: "2", fuel: "Hybrid", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0e71?w=600&q=80" },
  { name: "Ford Galaxy", type: "MPV", description: "Spacious multi-purpose vehicle with room for the whole family and all their luggage.", passengers: "6", bags: "4", fuel: "Diesel", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80" },
  { name: "Mercedes V-Class", type: "8-Seater", description: "Premium people carrier. Luxury interior, perfect for groups, weddings, and corporate events.", passengers: "8", bags: "6", fuel: "Diesel", image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600&q=80" },
  { name: "Mercedes E-Class", type: "Executive", description: "Top-tier comfort for business travellers and special occasions. Leather interior, extra legroom.", passengers: "4", bags: "2", fuel: "Hybrid", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80" },
];

function VehicleCard({ vehicle, index }: { vehicle: typeof vehicles[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="aspect-[4/3] overflow-hidden">
        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <p className="text-[#666] text-xs uppercase tracking-wider mb-1">{vehicle.type}</p>
        <h3 className="text-xl font-semibold text-black mb-2">{vehicle.name}</h3>
        <p className="text-[#666] text-sm leading-relaxed mb-4">{vehicle.description}</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-[#F8F8F8] rounded-lg px-3 py-1.5 text-xs text-black flex items-center gap-1"><Users size={14} /> {vehicle.passengers} passengers</span>
          <span className="bg-[#F8F8F8] rounded-lg px-3 py-1.5 text-xs text-black flex items-center gap-1"><Briefcase size={14} /> {vehicle.bags} bags</span>
          <span className="bg-[#F8F8F8] rounded-lg px-3 py-1.5 text-xs text-black flex items-center gap-1"><Leaf size={14} /> {vehicle.fuel}</span>
        </div>
      </div>
    </div>
  );
}

export default function Fleet() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  return (
    <section id="fleet" className="bg-[#F8F8F8] py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-600 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">OUR FLEET</p>
          <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">The Right Vehicle<br />for Every Journey</h2>
          <p className="text-[#666] text-base mt-4 max-w-2xl mx-auto leading-relaxed">From eco-friendly hybrids to spacious 8-seaters, our modern fleet is maintained to the highest standards.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.name} vehicle={vehicle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
