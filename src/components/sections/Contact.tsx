"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, MessageCircle, Loader2, CheckCircle } from "lucide-react";
import { contactSchema, type ContactInput } from "@/validations/contact";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contactDetails = [
  { icon: Phone, label: "+44 7906 583421", sublabel: "Available 24/7", href: "tel:+447906583421" },
  { icon: Mail, label: "info@taxiservicebristol.uk.com", sublabel: "We reply within 1 hour", href: "mailto:info@taxiservicebristol.uk.com" },
  { icon: MapPin, label: "BS4 6AH, Bristol, UK", sublabel: "Office hours: Mon-Fri 9am-5pm", href: "#" },
  { icon: MessageCircle, label: "Message us on WhatsApp", sublabel: "Quick responses", href: "#" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (response.ok) { setIsSuccess(true); reset(); }
    } catch { /* silent */ }
    finally { setIsSubmitting(false); }
  };

  const inputClasses = "w-full bg-white border border-[#E5E5E5] rounded-lg px-4 py-3 text-black placeholder:text-[#666] focus:border-[#FFD900] transition-colors";

  return (
    <section id="contact" className="bg-white py-[120px]" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">GET IN TOUCH</p>
            <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-6">We&apos;re Here<br />to Help</h2>
            <p className="text-[#666] text-base leading-relaxed mb-10">Whether you have a question, need a custom quote, or want to set up a business account, our friendly team is ready to assist.</p>
            <div className="space-y-6">
              {contactDetails.map((detail) => (
                <a key={detail.label} href={detail.href} className="flex items-start gap-4 group">
                  <detail.icon size={20} className="text-[#FFD900] mt-1 flex-shrink-0" />
                  <div><p className="text-black font-semibold text-base group-hover:text-[#FFD900] transition-colors">{detail.label}</p><p className="text-[#666] text-sm">{detail.sublabel}</p></div>
                </a>
              ))}
            </div>
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            {isSuccess ? (
              <div className="bg-[#38A169]/10 border border-[#38A169]/30 rounded-2xl p-10 text-center">
                <CheckCircle size={48} className="text-[#38A169] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black mb-2">Message Sent!</h3>
                <p className="text-[#666]">We typically respond within 1 hour during business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F8F8F8] rounded-2xl p-8 shadow-sm">
                <div className="space-y-4">
                  <div><input {...register("name")} placeholder="Your name" className={inputClasses} />{errors.name && <p className="text-[#E53E3E] text-xs mt-1">{errors.name.message}</p>}</div>
                  <div><input {...register("email")} type="email" placeholder="Email address" className={inputClasses} />{errors.email && <p className="text-[#E53E3E] text-xs mt-1">{errors.email.message}</p>}</div>
                  <div><input {...register("phone")} type="tel" placeholder="Phone number (optional)" className={inputClasses} /></div>
                  <div><select {...register("subject")} className={`${inputClasses} appearance-none`}><option value="">Select subject</option><option value="General Enquiry">General Enquiry</option><option value="Business Account">Business Account</option><option value="Complaint">Complaint</option><option value="Partnership">Partnership</option></select>{errors.subject && <p className="text-[#E53E3E] text-xs mt-1">{errors.subject.message}</p>}</div>
                  <div><textarea {...register("message")} placeholder="Your message" rows={5} className={`${inputClasses} resize-none`} />{errors.message && <p className="text-[#E53E3E] text-xs mt-1">{errors.message.message}</p>}</div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#FFD900] text-black py-3.5 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" />Sending...</> : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
