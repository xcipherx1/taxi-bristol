"use client";

const serviceLinks = ["Airport Transfers", "Local Journeys", "Business Travel", "School Runs", "Special Occasions", "Long Distance"];
const companyLinks = ["About Us", "Our Fleet", "Coverage Area", "Careers", "Blog"];
const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  const scrollToSection = (label: string) => {
    const map: Record<string, string> = { "Airport Transfers": "#airport-transfers", "Local Journeys": "#local-journeys", "Business Travel": "#business-travel", "School Runs": "#school-runs", "Special Occasions": "#special-occasions", "Long Distance": "#long-distance", "Our Fleet": "#fleet", "Coverage Area": "#coverage" };
    const href = map[label];
    if (href) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black py-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <p className="text-white font-bold text-sm tracking-[0.05em] uppercase mb-4">Taxi Service Bristol</p>
            <p className="text-[#AAA] text-sm leading-relaxed">Bristol&apos;s trusted private hire service since 2012. Safe, reliable, comfortable transport 24/7.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link}><button onClick={() => scrollToSection(link)} className="text-[#AAA] text-sm hover:text-white transition-colors">{link}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link}><button onClick={() => scrollToSection(link)} className="text-[#AAA] text-sm hover:text-white transition-colors">{link}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-base mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}><a href={link.href} className="text-[#AAA] text-sm hover:text-white transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#333] mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#AAA] text-sm">&copy; {new Date().getFullYear()} Taxi Service Bristol. All rights reserved.</p>
          <p className="text-[#AAA] text-sm">Licensed by Bristol City Council &middot; Private Hire Operator</p>
        </div>
      </div>
    </footer>
  );
}
