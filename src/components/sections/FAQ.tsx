"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  { question: "How do I book a taxi?", answer: "You can book online through our website, call us directly at +44 7906 583421, or use WhatsApp. For advance bookings, we recommend booking at least 24 hours ahead." },
  { question: "What areas do you cover?", answer: "We cover all of Bristol and surrounding areas including Bath, Weston-super-Mare, and the airport. If you're unsure, just give us a call and we'll confirm." },
  { question: "Are your prices fixed?", answer: "Yes! The price you're quoted is the price you pay. No meter anxiety, no surge pricing, no hidden fees. Traffic delays don't change your fare." },
  { question: "Can I book a return journey?", answer: "Absolutely. When booking, simply select 'Return Journey' and enter your return date and time. You'll get a combined quote for both legs." },
  { question: "Do you provide child seats?", answer: "Yes, child and baby seats are available free of charge. Please mention this when booking so we can ensure the right seat is fitted." },
  { question: "What happens if my flight is delayed?", answer: "We monitor all flight arrivals. If your flight is delayed, we adjust your pickup time automatically at no extra cost. Our driver will be there when you land." },
  { question: "Do you offer corporate accounts?", answer: "Yes, we offer business accounts with monthly invoicing, priority booking, and a dedicated account manager. Contact us to set up your account." },
  { question: "How can I pay?", answer: "We accept card payments (Visa, Mastercard, Amex), cash, and Apple Pay/Google Pay. Business account holders can pay by monthly invoice." },
];

function AccordionItem({ item, isOpen, onToggle }: { item: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-[#111] rounded-xl border border-transparent hover:border-[#FFD900]/20 transition-colors overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-6 text-left">
        <span className="text-white font-semibold text-base pr-4">{item.question}</span>
        <Plus size={20} className={`text-[#FFD900] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-[#AAA] text-sm leading-relaxed px-6 pb-6">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section className="bg-black py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <div ref={headerRef} className={`transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">FAQ</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">Common<br />Questions</h2>
                <p className="text-[#AAA] text-base leading-relaxed mb-8">Can&apos;t find what you&apos;re looking for? Our team is here to help.</p>
                <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-colors">Contact Us</button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} item={faq} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
