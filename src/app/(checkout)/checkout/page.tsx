"use client";

import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchModal } from "@/components/layout/search-modal";
import {
  CheckoutStepper,
  OrderSummaryCard,
  AddressStepForm,
  ShippingStepForm,
  PaymentStepForm,
} from "@/components/checkout";
import { useCheckoutStore } from "@/store/checkout-store";

export default function CheckoutPage() {
  const { currentStep, setStep, shipping } = useCheckoutStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#090407] text-white selection:bg-rose-600 selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar text="FREE SHIPPING ON ORDERS OVER ৳5000" />

      {/* 2. Global Navbar */}
      <Navbar brandName="Ragno" />

      {/* Main Checkout Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-7xl">
        {/* Special Magenta Gradient Checkout Heading */}
        <div className="text-center mb-8 sm:mb-12 space-y-2 select-none">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 drop-shadow-[0_0_25px_rgba(244,63,94,0.35)]">
            CHECKOUT
          </h1>
          <p className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-pink-400/80">
            COMPLETE YOUR PURCHASE
          </p>
        </div>

        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold mb-6 sm:mb-8"
        >
          <Link
            href="/products"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Products
          </Link>
          <span className="text-zinc-600">&gt;</span>
          <span className="text-teal-400 font-bold">Checkout</span>
        </nav>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Order Summary Card (5 cols on Desktop) */}
          <div className="lg:col-span-5 order-2 lg:order-1 lg:sticky lg:top-24">
            <OrderSummaryCard shippingCost={shipping.rate || 115} />
          </div>

          {/* Right Column: Checkout Steps & Forms (7 cols on Desktop) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            {/* Step Indicator */}
            <div className="p-1">
              <CheckoutStepper
                currentStep={currentStep}
                onStepClick={setStep}
              />
            </div>

            {/* Step Form Card Container */}
            <div className="rounded-2xl sm:rounded-3xl bg-zinc-950/70 border border-white/10 p-5 sm:p-8 backdrop-blur-md shadow-2xl">
              {currentStep === 1 && <AddressStepForm />}
              {currentStep === 2 && <ShippingStepForm />}
              {currentStep === 3 && <PaymentStepForm />}
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer brandName="Ragno" />

      {/* Global Interactive Drawers */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
