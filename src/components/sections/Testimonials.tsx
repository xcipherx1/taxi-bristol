"use client";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const reviews = [
  { text: "Absolutely brilliant service. Driver was 5 minutes early, helped with my bags, and the car was spotless. Best taxi service in Bristol by far.", name: "Sarah M.", location: "Clifton", initials: "SM" },
  { text: "I use them for all my airport runs. The flight monitoring is a game-changer — landed 2 hours late and the driver was still there waiting. No extra charge!", name: "James T.", location: "Redland", initials: "JT" },
  { text: "Booked for my daughter's school run. The driver is always the same, always friendly, and I get a text when she's picked up. Complete peace of mind.", name: "Priya K.", location: "Southville", initials: "PK" },
  { text: "Corporate account holder for 3 years. Monthly invoicing is seamless and their priority service means I never wait more than 5 minutes.", name: "David R.", location: "City Centre", initials: "DR" },
  { text: "Used for my wedding day. The Mercedes was immaculate, the driver wore a suit, and they even put a 'Just Married' ribbon on the car. Perfect touch.", name: "Emma & Tom", location: "Bedminster", initials: "ET" },
  { text: "As a wheelchair user, I really appreciate their accessible vehicle option. Booked easily online and the driver knew exactly how to assist.", name: "Michael L.", location: "Fishponds", initials: "ML" },
];

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(currentPage * perPage, (currentPage + 1) * perPage);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section className="bg-[#F8F8F8] py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={headerRef} className={`text-center mb-16 transition-all duration-600 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">TESTIMONIALS</p>
          <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight">What Our<br />Passengers Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {visible.map((review) => (
            <div key={review.name + currentPage} className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-[#FFD900] fill-[#FFD900]" />)}
              </div>
              <p className="text-black text-base italic leading-relaxed mb-6">&ldquo;{review.text}&rdquo;</p>
              <div className="border-t border-[#E5E5E5] my-5" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F8F8F8] flex items-center justify-center text-black font-semibold text-sm">{review.initials}</div>
                <div><p className="text-black font-semibold text-sm">{review.name}</p><p className="text-[#666] text-xs">{review.location}</p></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-10">
          <button onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)} className="w-12 h-12 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-black hover:text-white transition-all"><ChevronLeft size={20} /></button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i)} className={`h-2.5 rounded-full transition-all ${i === currentPage ? "bg-[#FFD900] w-6" : "bg-[#E5E5E5] w-2.5"}`} />
            ))}
          </div>
          <button onClick={() => setCurrentPage((p) => (p + 1) % totalPages)} className="w-12 h-12 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:bg-black hover:text-white transition-all"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}
