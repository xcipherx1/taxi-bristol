import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Taxi Service Bristol",
  description: "Our privacy policy outlines how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-[#FFD900] text-sm font-semibold hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-[#666]">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
          <section className="mt-8"><h2 className="text-xl font-semibold text-black mb-4">1. What Data We Collect</h2>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-[#666]">
              <li><strong>Booking information:</strong> pickup and drop-off locations, date and time, passenger count</li>
              <li><strong>Contact details:</strong> name, email address, phone number</li>
              <li><strong>Special requirements:</strong> child seat needs, pet travel, accessibility requirements</li>
              <li><strong>Business account information:</strong> company name, billing details (for corporate clients)</li>
            </ul>
          </section>
          <section className="mt-8"><h2 className="text-xl font-semibold text-black mb-4">2. How We Use Your Data</h2>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-[#666]">
              <li>To provide and manage your taxi bookings</li>
              <li>To communicate with you about your journey</li>
              <li>To send booking confirmations and updates via email/SMS</li>
              <li>To process payments and maintain financial records</li>
              <li>To improve our services and customer experience</li>
            </ul>
          </section>
          <section className="mt-8"><h2 className="text-xl font-semibold text-black mb-4">3. Your Rights</h2>
            <p className="text-[#666] leading-relaxed">Under UK GDPR, you have the right to access, rectify, erase, and port your personal data. Contact us to exercise these rights.</p>
          </section>
          <section className="mt-8"><h2 className="text-xl font-semibold text-black mb-4">4. Contact Us</h2>
            <div className="text-[#666]"><p>Email: info@taxiservicebristol.uk.com</p><p>Phone: +44 7906 583421</p></div>
          </section>
        </div>
      </div>
    </div>
  );
}
