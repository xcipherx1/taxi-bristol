"use client";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ArrowRight, Car } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Coverage", href: "#coverage" },
  { label: "Book Now", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2">
            <Car size={24} className="text-[#FFD900]" />
            <span className={`font-bold text-sm tracking-[0.05em] uppercase ${isScrolled ? "text-black" : "text-white"}`}>Taxi Service Bristol<span className="text-[#FFD900]">.</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => handleNavClick(link.href)} className={`text-sm font-semibold tracking-wide hover:text-[#FFD900] transition-colors ${isScrolled ? "text-black" : "text-white"}`}>{link.label}</button>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+447906583421" className={`flex items-center gap-2 text-sm font-semibold ${isScrolled ? "text-black" : "text-white"}`}><Phone size={16} />+44 7906 583421</a>
            <button onClick={() => handleNavClick("#booking")} className="bg-[#FFD900] text-black px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:scale-[1.02] hover:shadow-lg transition-all"><span>Get a Quote</span><ArrowRight size={16} /></button>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} className={isScrolled ? "text-black" : "text-white"} /> : <Menu size={24} className={isScrolled ? "text-black" : "text-white"} />}
          </button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-20">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFD900]" />
          <nav className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => handleNavClick(link.href)} className="text-white text-2xl font-semibold hover:text-[#FFD900] transition-colors">{link.label}</button>
            ))}
            <a href="tel:+447906583421" className="bg-[#FFD900] text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 mt-8"><Phone size={18} />Call Now</a>
          </nav>
        </div>
      )}
    </>
  );
}
