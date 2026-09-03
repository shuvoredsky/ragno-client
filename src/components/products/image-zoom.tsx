"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position of the magnifying lens box
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });

  // Background position for the zoomed-in image inside the lens
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const [bgDimensions, setBgDimensions] = useState({ width: 0, height: 0 });

  // Detect touch device / hover capability
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(hover: none)").matches);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Ensure cursor is within bounds
      if (mouseX < 0 || mouseX > rect.width || mouseY < 0 || mouseY > rect.height) {
        setIsHovering(false);
        return;
      }

      // Calculate lens position (centered on cursor and clamped to container edges)
      const halfLens = lensSize / 2;
      const lensX = Math.max(0, Math.min(mouseX - halfLens, rect.width - lensSize));
      const lensY = Math.max(0, Math.min(mouseY - halfLens, rect.height - lensSize));

      setLensPosition({ x: lensX, y: lensY });

      // Calculate background image dimensions & position for the zoom effect
      const zoomedWidth = rect.width * zoomLevel;
      const zoomedHeight = rect.height * zoomLevel;

      setBgDimensions({ width: zoomedWidth, height: zoomedHeight });

      const bgX = mouseX * zoomLevel - halfLens;
      const bgY = mouseY * zoomLevel - halfLens;

      setBgPosition({ x: bgX, y: bgY });
    },
    [isTouchDevice, lensSize, zoomLevel]
  );

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovering(true);
    }
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
        className="object-cover object-center transition-transform duration-300"
      />

      {/* Top-Left SALE Badge */}
      {isSale && (
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-white bg-black/90 px-3 py-1 rounded-sm shadow-md border border-white/10">
            SALE
          </span>
        </div>
      )}

      {/* Circular Magnifying Glass Lens (Desktop Hover) */}
      {isHovering && !isTouchDevice && (
        <div
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            transform: `translate3d(${lensPosition.x}px, ${lensPosition.y}px, 0)`,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${bgDimensions.width}px ${bgDimensions.height}px`,
            backgroundPosition: `-${bgPosition.x}px -${bgPosition.y}px`,
          }}
          className="absolute top-0 left-0 rounded-full border-2 border-white/90 shadow-[0_0_30px_rgba(0,0,0,0.85)] pointer-events-none z-20 will-change-transform bg-zinc-950"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
