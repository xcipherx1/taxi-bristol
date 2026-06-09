"use client";
import { MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const neighbourhoods = ["Clifton", "Redland", "Bishopston", "Southville", "Bedminster", "Stokes Croft", "City Centre", "Temple Meads", "Easton", "Fishponds", "Kingswood", "Brislington", "Filton", "Stoke Bishop", "Henleaze", "Westbury-on-Trym"];

export default function CoverageAreas() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="coverage" className="bg-white py-[120px]">
      <div className="max-w-[1280px] mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <p className="text-[#FFD900] text-xs font-semibold tracking-[0.15em] uppercase mb-3">COVERAGE AREA</p>
              <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">We Cover<br />All of Bristol</h2>
              <p className="text-[#666] text-base leading-relaxed mb-8">Based in the heart of Bristol, we serve every neighbourhood and surrounding area.</p>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {neighbourhoods.map((area) => (
                  <div key={area} className="flex items-center gap-2"><MapPin size={14} className="text-[#FFD900] flex-shrink-0" /><span className="text-black text-sm">{area}</span></div>
                ))}
              </div>
              <div className="inline-flex bg-[#FFD900]/10 text-[#FFD900] rounded-full px-4 py-2 text-sm font-semibold">Serving 25+ postcodes</div>
            </div>
          </div>
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39732.44508363399!2d-2.6550!3d51.4545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871836681b3d861%3A0x8ee4fe22c1db8c71!2sBristol!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk" width="100%" height="100%" style={{ border: 0, minHeight: "400px" }} allowFullScreen referrerPolicy="no-referrer-when-downgrade" title="Bristol Coverage Map" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
