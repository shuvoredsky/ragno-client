import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AmbientBackground } from "@/components/layout/ambient-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Ragno | Premium Fashion & Everyday Essentials",
    template: "%s | Ragno",
  },
  description: "Discover premium apparel, trendy outfits, and luxury essentials at Ragno.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#080306] text-zinc-100 font-sans antialiased selection:bg-rose-600 selection:text-white relative">
        <AmbientBackground />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
