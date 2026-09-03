"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface ImageZoomProps {
  src: string;
  alt: string;
  zoomLevel?: number;
  lensSize?: number;
  isSale?: boolean;
  className?: string;
}

export function ImageZoom({
  src,
  alt,
  zoomLevel = 2.5,
  lensSize = 160,
  isSale = false,
  className = "",
}: ImageZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [lensStyle, setLensStyle] = useState<{
    left: number;
    top: number;
    bgPosX: number;
    bgPosY: number;
    bgWidth: number;
    bgHeight: number;
  }>({
    left: 0,
    top: 0,
    bgPosX: 0,
    bgPosY: 0,
    bgWidth: 0,
    bgHeight: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Mouse coordinates relative to container
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Ensure cursor is strictly inside the container
      if (clientX < 0 || clientX > rect.width || clientY < 0 || clientY > rect.height) {
        setIsHovering(false);
        return;
      }

      // Half lens offset
      const halfLens = lensSize / 2;

      // Calculate lens position clamped to container bounds
      const clampedLensX = Math.max(0, Math.min(clientX - halfLens, rect.width - lensSize));
      const clampedLensY = Math.max(0, Math.min(clientY - halfLens, rect.height - lensSize));

      // Zoomed background dimensions
      const bgWidth = rect.width * zoomLevel;
      const bgHeight = rect.height * zoomLevel;

      // Background position inside lens so the cursor point remains centered
      const bgPosX = clientX * zoomLevel - halfLens;
      const bgPosY = clientY * zoomLevel - halfLens;

      setLensStyle({
        left: clampedLensX,
        top: clampedLensY,
        bgPosX,
        bgPosY,
        bgWidth,
        bgHeight,
      });

      if (!isHovering) {
        setIsHovering(true);
      }
    },
    [isHovering, lensSize, zoomLevel]
  );

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl select-none cursor-crosshair group ${className}`}
    >
      {/* Base Product Image */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center pointer-events-none transition-transform duration-300"
      />

      {/* Top-Left SALE Badge */}
      {isSale && (
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-white bg-black/90 px-3 py-1 rounded-sm shadow-md border border-white/10">
            SALE
          </span>
        </div>
      )}

      {/* Circular Magnifying Glass Lens (Active on Hover) */}
      {isHovering && (
        <div
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            left: `${lensStyle.left}px`,
            top: `${lensStyle.top}px`,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${lensStyle.bgWidth}px ${lensStyle.bgHeight}px`,
            backgroundPosition: `-${lensStyle.bgPosX}px -${lensStyle.bgPosY}px`,
          }}
          className="absolute rounded-full border-2 border-white/90 shadow-[0_0_30px_rgba(0,0,0,0.9)] pointer-events-none z-30 bg-zinc-950"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
