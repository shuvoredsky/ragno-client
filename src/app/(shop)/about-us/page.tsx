import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SearchModal } from "@/components/layout/search-modal";
import { StoryHero, StorySection, StoryClosing } from "@/components/about";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-white selection:bg-rose-600 selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar text="FREE SHIPPING ON ORDERS OVER ৳5000" />

      {/* 2. Global Navbar */}
      <Navbar brandName="Ragno" />

      {/* Main Content */}
      <main className="flex-1">
        {/* 3. Hero Banner */}
        <StoryHero
          title="আমাদের গল্প"
          subtitle="THE CRAFT & THE JOURNEY"
          buttonText="পড়ুন গল্প"
        />

        {/* 4. Story Sections Container */}
        <div id="story-content" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl space-y-4">
          {/* Section 1: The Beginning (Image Right) */}
          <StorySection
            layout="image-right"
            heading="শুরুর লড়াই"
            paragraphs={[
              "ছোট্ট এক স্বপ্ন আর একরাশ আত্মবিশ্বাস নিয়ে আমাদের এই পথচলা শুরু হয়েছিল। আমাদের লক্ষ্য ছিল একটাই — গতানুগতিক ফ্যাশন ট্রেন্ডের ভিড়ে এমন পোশাক তৈরি করা, যা নিখুঁত ফিটিং, টেকসই সুতা এবং অনন্য আরাম উপহার দেবে।",
              "শুরুর দিনগুলোতে শত প্রতিকূলতা পার করে আমরা প্রতিটি ফেব্রিক নিজেরা হাতে ছুঁয়ে পরীক্ষা করেছি। সাধারণ মানুষের কাছে খাঁটি মানের প্রিমিয়াম পোশাক ন্যায্য মূল্যে পৌঁছে দেওয়ার এই জেদই আজকের আমাদের মূল চালিকাশক্তি।",
            ]}
            imageUrl="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
            imageAlt="Fashion Craftsmanship Workshop"
          />

          {/* Section 2: Journey of Trust (Image Left) */}
          <StorySection
            layout="image-left"
            heading="আস্থার যাত্রা"
            paragraphs={[
              "পোশাক শুধু পরিধানের কোনো বস্তু নয়, এটি প্রতিটি মানুষের ব্যক্তিত্ব ও আত্মবিশ্বাসের প্রতিচ্ছবি। এই বিশ্বাস ধারণ করে আমরা সবসময় অগ্রাধিকার দিয়েছি আধুনিক প্যাটার্ন কাটিং এবং প্রিমিয়াম প্রি-শ্রাঙ্ক ফেব্রিকের ওপর।",
              "দেশজুড়ে হাজারো সন্তুষ্ট গ্রাহকের ভালোবাসা ও নিঃশর্ত আস্থাই আমাদের প্রতিনিয়ত কাজের মান আরও উন্নত করার অনুপ্রেরণা জোগায়।",
            ]}
            imageUrl="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop"
            imageAlt="Premium Fabric Draping"
          />

          {/* Section 3: The Next Chapter (Image Right) */}
          <StorySection
            layout="image-right"
            heading="নতুন অধ্যায়ের পথে"
            paragraphs={[
              "আমরা প্রতিনিয়ত নিজেদের ছাড়িয়ে যাওয়ার সাধনায় রত। নতুন সব আধুনিক কালেকশন, ইকো-ফ্রেন্ডলি প্যাকেজিং এবং সমগ্র বাংলাদেশে ২৪-৭২ ঘণ্টার মধ্যে নির্ভরযোগ্য ডোরস্টেপ ডেলিভারি নিয়ে আমরা এগিয়ে চলেছি ভবিষ্যতের দিকে।",
              "আমাদের এই গৌরবময় অভিযাত্রায় আপনিও আমাদের একজন সম্মানিত অংশীদার।",
            ]}
            imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
            imageAlt="Apparel Storefront & Packaging"
          />

          {/* 5. Closing Section */}
          <StoryClosing
            heading="শেষ কথা"
            quote="আমরা যখন সততার সাথে প্রতিটি সৃষ্টি তৈরি করি, আস্থার বন্ধন তখন প্রতিটি পোশাকেই স্পষ্ট হয়ে ওঠে।"
            points={[
              "আপসহীন ফেব্রিক নির্বাচন ও আধুনিক নিখুঁত সেলাই",
              "ন্যায্য মূল্যে সবার জন্য প্রিমিয়াম লাইফস্টাইল তৈরি করা",
              "উপজেলা থেকে সারা বাংলাদেশ — প্রতিটি দোরগোড়ায় বিশ্বস্ত ও দায়িত্বশীল সেবা",
            ]}
          />
        </div>
      </main>

      {/* 6. Global Footer */}
      <Footer brandName="Ragno" />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
    </div>
  );
}
