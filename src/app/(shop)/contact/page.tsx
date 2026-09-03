import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchModal } from "@/components/layout/search-modal";
import {
  ContactDetailsCard,
  BusinessHoursCard,
  ContactForm,
} from "@/components/contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white selection:bg-rose-600 selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar text="FREE SHIPPING ON ORDERS OVER ৳5000" />

      {/* 2. Global Navbar */}
      <Navbar brandName="Ragno" />

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-6xl">
        {/* Page Header */}
        <div className="mb-10 sm:mb-14 space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic font-normal text-white tracking-tight">
            Contact
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            For enquiries regarding orders, products, or general information, please use the form below or reach us directly during business hours.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Details & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ContactDetailsCard />
            <BusinessHoursCard />
          </div>

          {/* Right Column: Write To Us Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </main>

      {/* 3. Global Footer */}
      <Footer brandName="Ragno" />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
