"use client";
import { Plane, MapPin, Briefcase, Heart, GraduationCap, Road } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  { icon: Plane, title: "Airport Transfers", description: "Stress-free airport pickups and drop-offs. We monitor your flight and adjust for delays at no extra cost.", href: "#airport-transfers", image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&q=80" },
  { icon: MapPin, title: "Local Journeys", description: "Point-to-point travel across Bristol and surrounding areas. Quick booking, transparent pricing, no surprises.", href: "#local-journeys", image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=600&q=80" },
  { icon: Briefcase, title: "Business Travel", description: "Corporate accounts with monthly invoicing, priority booking, and detailed trip reporting.", href: "#business-travel", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
  { icon: Heart, title: "Special Occasions", description: "Weddings, events, nights out — arrive in style. Premium vehicles available with advance booking.", href: "#special-occasions", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80" },
  { icon: GraduationCap, title: "School Runs", description: "Safe, reliable school transport. DBS-checked drivers, regular scheduling, and parent notifications.", href: "#school-runs", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" },
  { icon: Road, title: "Long Distance", description: "Comfortable intercity travel beyond Bristol. Fixed pricing, rest stops on request, spacious vehicles.", href: "#long-distance", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80" },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} onClick={() => document.querySelector(service.href)?.scrollIntoView({ behavior: "smooth" })}
      className={`group bg-[#F8F8F8] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="aspect-[16/10] overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-[#FFD900]/10 flex items-center justify-center mb-4">
          <service.icon size={24} className="text-[#FFD900]" />
        </div>
        <h3 className="text-xl font-semibold text-black mb-2">{service.title}</h3>
        <p className="text-[#666] text-sm leading-relaxed">{service.description}</p>
        <span className="inline-flex items-center gap-1 text-[#FFD900] font-semibold text-sm mt-4 group-hover:gap-2 transition-all">Learn more &rarr;</span>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  return (
    <section id="services" className="py-[120px] bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={headerRef} className={`mb-16 transition-all duration-600 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">OUR SERVICES</p>
          <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">Getting You There,<br /><span className="font-normal">Whenever You Need</span></h2>
          <p className="text-[#666] text-base mt-4 max-w-xl leading-relaxed">From airport transfers to local journeys, we provide reliable, comfortable transport tailored to your needs.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
