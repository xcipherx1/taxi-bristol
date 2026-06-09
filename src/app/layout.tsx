import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taxi Service Bristol | Airport Transfers & Private Hire",
  description: "Bristol's trusted taxi service since 2012. 24/7 airport transfers, local journeys, and business travel. Fixed prices, licensed drivers, instant booking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
