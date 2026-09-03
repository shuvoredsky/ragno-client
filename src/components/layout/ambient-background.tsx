export function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      aria-hidden="true"
    >
      {/* 1. Top Centered Wine Ambient Glow (Signature HEEMS / Ragno Look) */}
      <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] h-[450px] sm:h-[550px] bg-gradient-to-b from-rose-900/35 via-rose-950/25 to-transparent blur-[130px] rounded-full" />

      {/* 2. Middle-Left Subtle Maroon Ambient Orb */}
      <div className="absolute top-[30%] -left-[120px] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-rose-950/20 blur-[150px] rounded-full" />

      {/* 3. Middle-Right Subtle Wine Ambient Orb */}
      <div className="absolute top-[60%] -right-[120px] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-rose-950/20 blur-[150px] rounded-full" />

      {/* 4. Bottom Center Warm Ambient Glow */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[70vw] max-w-[800px] h-[350px] bg-rose-950/15 blur-[140px] rounded-full" />
    </div>
  );
}
