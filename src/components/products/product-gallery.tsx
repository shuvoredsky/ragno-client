"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageZoom } from "./image-zoom";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  isSale?: boolean;
}

export function ProductGallery({
  images,
  productName,
  isSale = false,
}: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const activeImage = images[selectedImageIndex] || images[0];

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Main Showcase Image with Circular Magnifying Glass Lens Hover */}
      <ImageZoom
        src={activeImage}
        alt={productName}
        isSale={isSale}
        zoomLevel={2.5}
        lensSize={160}
      />

      {/* Thumbnails Strip (if multiple images exist) */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 no-scrollbar">
          {images.map((img, idx) => {
            const isSelected = idx === selectedImageIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-zinc-900 border-2 shrink-0 transition-all ${
                  isSelected
                    ? "border-white scale-102 shadow-lg"
                    : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
