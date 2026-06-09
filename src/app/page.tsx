import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import AirportTransfers from "@/components/sections/AirportTransfers";
import LocalJourneys from "@/components/sections/LocalJourneys";
import BusinessTravel from "@/components/sections/BusinessTravel";
import SpecialOccasions from "@/components/sections/SpecialOccasions";
import SchoolRuns from "@/components/sections/SchoolRuns";
import LongDistance from "@/components/sections/LongDistance";
import Fleet from "@/components/sections/Fleet";
import CoverageAreas from "@/components/sections/CoverageAreas";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import BookingForm from "@/components/sections/BookingForm";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <AirportTransfers />
        <LocalJourneys />
        <BusinessTravel />
        <SpecialOccasions />
        <SchoolRuns />
        <LongDistance />
        <Fleet />
        <CoverageAreas />
        <HowItWorks />
        <Testimonials />
        <BookingForm />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
