import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
      <body className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans antialiased selection:bg-black selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
