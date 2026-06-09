import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Taxi Service Bristol",
  description: "Our terms and conditions outline the rules and regulations for using our taxi service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-[#FFD900] text-sm font-semibold hover:underline mb-8 inline-block">&larr; Back to Home</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">Terms & Conditions</h1>
        <div className="prose max-w-none">
          <p className="text-[#666]">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
          <section className="mt-8"><h2 className="text-xl font-semibold text-black mb-4">1. Service Description</h2><p className="text-[#666] leading-relaxed">Taxi Service Bristol provides private hire vehicle services including airport transfers, local journeys, business travel, school runs, special occasion transport, and long-distance travel within the UK.</p></section>
          <section className="mt-8"><h2 className="text-xl font-semibold text-black mb-4">2. Booking & Confirmation</h2><p className="text-[#666] leading-relaxed">Bookings can be made through our website, by phone, or via email. A booking is only confirmed when you receive a confirmation email or SMS with a booking reference number.</p></section>
          <section className="mt-8"><h2 className="text-xl font-semibold text-black mb-4">3. Fixed Pricing</h2><p className="text-[#666] leading-relaxed">All prices quoted are fixed and inclusive of VAT where applicable. The price you are quoted is the price you pay, regardless of traffic conditions.</p></section>
          <section className="mt-8"><h2 className="text-xl font-semibold text-black mb-4">4. Cancellation Policy</h2><p className="text-[#666] leading-relaxed">Cancellations made more than 1 hour before the scheduled pickup time will receive a full refund. Cancellations within 1 hour may be subject to a 50% cancellation fee.</p></section>
          <section className="mt-8"><h2 className="text-xl font-semibold text-black mb-4">5. Governing Law</h2><p className="text-[#666] leading-relaxed">These terms are governed by the laws of England and Wales.</p></section>
          <section className="mt-8"><h2 className="text-xl font-semibold text-black mb-4">6. Complaints</h2><div className="text-[#666]"><p>Email: info@taxiservicebristol.uk.com</p><p>Phone: +44 7906 583421</p></div></section>
        </div>
      </div>
    </div>
  );
}
