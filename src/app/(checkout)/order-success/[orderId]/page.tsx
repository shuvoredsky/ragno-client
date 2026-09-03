import Link from "next/link";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface OrderSuccessProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderSuccessPage({ params }: OrderSuccessProps) {
  const { orderId } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-[#090407] text-white selection:bg-rose-600 selection:text-white">
      {/* 1. Announcement Bar */}
      <AnnouncementBar text="FREE SHIPPING ON ORDERS OVER ৳5000" />

      {/* 2. Global Navbar */}
      <Navbar brandName="Ragno" />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-2xl text-center">
        <div className="space-y-6">
          {/* Animated Glow Checkmark */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-950/80 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.35)] animate-in zoom-in duration-300">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-serif italic font-normal text-white">
              Order Confirmed!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
              ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে ফোনে যোগাযোগ করবেন।
            </p>
          </div>

          {/* Order Details Card */}
          <div className="rounded-2xl sm:rounded-3xl bg-zinc-950/80 border border-white/10 p-6 text-left space-y-4 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Order ID
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-teal-400">
                #{orderId}
              </span>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">ডেলিভারি সময়সীমা:</span>
                <span className="font-semibold text-white">২-৩ দিন (ঢাকা), ৩-৫ দিন (ঢাকার বাইরে)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">পেমেন্ট স্ট্যাটাস:</span>
                <span className="font-semibold text-amber-400">যাচাইকরণাধীন (Verification Pending)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/track-order"
              className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Package className="w-4 h-4 text-teal-400" />
              <span>Track Your Order</span>
            </Link>

            <Link
              href="/products"
              className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02] active:scale-95"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* 3. Global Footer */}
      <Footer brandName="Ragno" />
    </div>
  );
}
