"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AnnouncementBarProps {
  text?: string;
  linkText?: string;
  linkHref?: string;
}

export function AnnouncementBar({
  text = "FREE SHIPPING ON ORDERS OVER ৳5000",
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-black text-white text-[11px] sm:text-xs font-semibold tracking-widest uppercase py-2 px-4 border-b border-white/10 z-50">
      <div className="container mx-auto flex items-center justify-center text-center">
        <span>{text}</span>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Close announcement"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
