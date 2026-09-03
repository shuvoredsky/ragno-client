import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { FeaturedBanner } from "@/components/home/featured-banner";
import { ProductShowcaseSection } from "@/components/home/product-showcase-section";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchModal } from "@/components/layout/search-modal";
import { homeShowcaseSections } from "@/components/home/mock-data";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white selection:bg-rose-600 selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar text="FREE SHIPPING ON ORDERS OVER ৳5000" />

      {/* 2. Global Navbar */}
      <Navbar brandName="Ragno" />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 3. Hero Section (Massive Bold Gradient Typography & Shop CTAs) */}
        <HeroSection
          brandTitle="RAGNO"
          primaryButtonText="Shop Premium"
          primaryButtonHref="/products?category=premium"
          secondaryButtonText="Shop Basic"
          secondaryButtonHref="/products?category=basic"
        />

        {/* 4. Marquee / Ticker Strip */}
        <MarqueeStrip />

        {/* 5. Featured Banner (Large Frame with Best Seller Overlay) */}
        <FeaturedBanner
          subtitle="Unapologetic Style"
          headline="PREMIUM QUALITY."
          badgeText="BEST SELLER THIS MONTH"
          productName="PREMIUM FULL SLEEVE FLORAL SHIRT"
          productPrice={650}
          productHref="/products/premium-full-sleeve-floral-shirt"
          imageUrl="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1600&auto=format&fit=crop"
        />

        {/* 6. Product Showcase Sections (3 Repeating Distinct Rows) */}
        <div className="space-y-4 pb-12">
          {homeShowcaseSections.map((section) => (
            <ProductShowcaseSection
              key={section.title}
              title={section.title}
              description={section.description}
              collectionHref={section.collectionHref}
              collectionLabel={section.collectionLabel}
              products={section.products}
            />
          ))}
        </div>
      </main>

      {/* 7. Footer */}
      <Footer brandName="Ragno" />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
