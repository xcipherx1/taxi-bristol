"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, MapPin, Calendar, Clock, Users, Phone, Mail, User, MessageSquare, Car, Building } from "lucide-react";
import { bookingSchema, type BookingInput } from "@/validations/booking";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const vehicleOptions = [
  { value: "standard", label: "Standard Saloon" },
  { value: "mpv", label: "MPV (6-seater)" },
  { value: "executive", label: "Executive" },
  { value: "minibus", label: "8-Seater Minibus" },
];

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [error, setError] = useState("");
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  });

  const childSeatRequired = watch("childSeatRequired");
  const isBusinessAccount = watch("isBusinessAccount");

  const onSubmit = async (data: BookingInput) => {
    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to submit booking");
      setBookingRef(result.bookingReference);
      setIsSuccess(true);
      reset();
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white border border-[#E5E5E5] rounded-lg px-4 py-3 text-black placeholder:text-[#666] focus:border-[#FFD900] transition-colors";

  return (
    <section id="booking" className="bg-white py-[120px]" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">BOOK YOUR RIDE</p>
            <h2 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-6">Get Your<br />Instant Quote</h2>
            <p className="text-[#666] text-base leading-relaxed mb-8">Enter your journey details for a fixed-price quote. No hidden fees, no surge pricing.</p>
            <div className="space-y-4">
              {["Fixed price guarantee", "Free cancellation up to 1 hour before pickup", "All drivers licensed & DBS-checked", "24/7 customer support"].map((item) => (
                <div key={item} className="flex items-center gap-3"><CheckCircle size={18} className="text-[#FFD900] flex-shrink-0" /><span className="text-black text-sm">{item}</span></div>
              ))}
            </div>
          </div>
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            {isSuccess ? (
              <div className="bg-[#38A169]/10 border border-[#38A169]/30 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#38A169]/20 flex items-center justify-center mx-auto mb-6"><CheckCircle size={32} className="text-[#38A169]" /></div>
                <h3 className="text-2xl font-bold text-black mb-3">Quote Requested!</h3>
                <p className="text-[#666] mb-2">We&apos;ve received your booking request. Our team will confirm within 15 minutes.</p>
                <p className="text-black font-semibold mb-6">Reference: {bookingRef}</p>
                <button onClick={() => setIsSuccess(false)} className="bg-[#FFD900] text-black px-8 py-3 rounded-full font-bold hover:scale-[1.02] transition-transform">Make Another Booking</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F8F8F8] rounded-2xl p-8 md:p-10 shadow-sm">
                {error && <div className="bg-[#E53E3E]/10 border border-[#E53E3E]/30 rounded-lg p-4 mb-6"><p className="text-[#E53E3E] text-sm">{error}</p></div>}
                <div className="space-y-5">
                  <div><label className="block text-sm font-medium text-black mb-1.5">Pickup Location *</label><div className="relative"><MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" /><input {...register("pickupLocation")} placeholder="Enter pickup address" className={`${inputClasses} pl-11`} /></div>{errors.pickupLocation && <p className="text-[#E53E3E] text-xs mt-1">{errors.pickupLocation.message}</p>}</div>
                  <div><label className="block text-sm font-medium text-black mb-1.5">Drop-off Location *</label><div className="relative"><MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" /><input {...register("dropoffLocation")} placeholder="Enter destination" className={`${inputClasses} pl-11`} /></div>{errors.dropoffLocation && <p className="text-[#E53E3E] text-xs mt-1">{errors.dropoffLocation.message}</p>}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-black mb-1.5">Date *</label><div className="relative"><Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" /><input type="date" {...register("pickupDate")} min={new Date().toISOString().split("T")[0]} className={`${inputClasses} pl-11`} /></div>{errors.pickupDate && <p className="text-[#E53E3E] text-xs mt-1">{errors.pickupDate.message}</p>}</div>
                    <div><label className="block text-sm font-medium text-black mb-1.5">Time *</label><div className="relative"><Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" /><input type="time" {...register("pickupTime")} className={`${inputClasses} pl-11`} /></div>{errors.pickupTime && <p className="text-[#E53E3E] text-xs mt-1">{errors.pickupTime.message}</p>}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-black mb-1.5">Passengers *</label><div className="relative"><Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" /><select {...register("passengers", { setValueAs: (v) => parseInt(v, 10) })} className={`${inputClasses} pl-11 appearance-none`}>{[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} {n === 1 ? "passenger" : "passengers"}</option>)}</select></div>{errors.passengers && <p className="text-[#E53E3E] text-xs mt-1">{errors.passengers.message}</p>}</div>
                    <div><label className="block text-sm font-medium text-black mb-1.5">Vehicle Type</label><div className="relative"><Car size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" /><select {...register("vehicleType")} className={`${inputClasses} pl-11 appearance-none`}>{vehicleOptions.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}</select></div></div>
                  </div>
                  <div className="border-t border-[#E5E5E5] pt-5">
                    <h4 className="text-sm font-semibold text-black mb-4">Your Details</h4>
                    <div className="space-y-4">
                      <div><div className="relative"><User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" /><input {...register("customerName")} placeholder="Full name" className={`${inputClasses} pl-11`} /></div>{errors.customerName && <p className="text-[#E53E3E] text-xs mt-1">{errors.customerName.message}</p>}</div>
                      <div><div className="relative"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" /><input {...register("customerEmail")} type="email" placeholder="Email address" className={`${inputClasses} pl-11`} /></div>{errors.customerEmail && <p className="text-[#E53E3E] text-xs mt-1">{errors.customerEmail.message}</p>}</div>
                      <div><div className="relative"><Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" /><input {...register("customerPhone")} type="tel" placeholder="UK phone number" className={`${inputClasses} pl-11`} /></div>{errors.customerPhone && <p className="text-[#E53E3E] text-xs mt-1">{errors.customerPhone.message}</p>}</div>
                    </div>
                  </div>
                  <div className="border-t border-[#E5E5E5] pt-5 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" {...register("childSeatRequired")} className="w-5 h-5 rounded border-[#E5E5E5] text-[#FFD900]" /><span className="text-sm text-black">Child seat required</span></label>
                    {childSeatRequired && <div className="pl-8"><input {...register("childSeatAge", { setValueAs: (v) => v ? parseInt(v, 10) : undefined })} type="number" min={0} max={12} placeholder="Child age (0-12)" className={`${inputClasses} w-32`} /></div>}
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" {...register("petTraveling")} className="w-5 h-5 rounded border-[#E5E5E5] text-[#FFD900]" /><span className="text-sm text-black">Pet traveling</span></label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" {...register("isBusinessAccount")} className="w-5 h-5 rounded border-[#E5E5E5] text-[#FFD900]" /><span className="text-sm text-black flex items-center gap-2"><Building size={14} /> Business account</span></label>
                    {isBusinessAccount && <div className="pl-8"><input {...register("companyName")} placeholder="Company name" className={inputClasses} /></div>}
                    <div><div className="relative"><MessageSquare size={18} className="absolute left-4 top-3 text-[#666]" /><textarea {...register("specialRequests")} placeholder="Any special requirements?" rows={3} className={`${inputClasses} pl-11 resize-none`} /></div></div>
                  </div>
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer"><input type="checkbox" {...register("termsAgreed")} className="w-5 h-5 rounded border-[#E5E5E5] text-[#FFD900] mt-0.5" /><span className="text-sm text-[#666]">I agree to the <a href="/terms" className="text-[#FFD900] hover:underline" target="_blank">Terms & Conditions</a> and <a href="/privacy" className="text-[#FFD900] hover:underline" target="_blank">Privacy Policy</a></span></label>
                    {errors.termsAgreed && <p className="text-[#E53E3E] text-xs mt-1">{errors.termsAgreed.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#FFD900] text-black py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {isSubmitting ? <><Loader2 size={20} className="animate-spin" />Processing...</> : "Get Instant Quote →"}
                  </button>
                  <p className="text-center text-[#666] text-sm">Or call us on <a href="tel:+447906583421" className="text-[#FFD900] font-semibold hover:underline">+44 7906 583421</a></p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
