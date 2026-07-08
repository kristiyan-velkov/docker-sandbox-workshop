export function WorkshopLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="logo-bg" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0071E3" />
          <stop offset="1" stopColor="#005BB5" />
        </linearGradient>
        <linearGradient id="logo-shine" x1="8" y1="6" x2="28" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.35" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#logo-bg)" />
      <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#logo-shine)" />
      <rect
        x="9"
        y="11"
        width="22"
        height="18"
        rx="4"
        fill="white"
        fillOpacity="0.12"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1.25"
      />
      <path
        d="M13 17h14M13 21h10M13 25h12"
        stroke="white"
        strokeOpacity="0.85"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <rect x="24" y="22" width="5" height="5" rx="1.5" fill="#34C759" fillOpacity="0.95" />
      <path
        d="M25.5 24.5l1 1 2-2.5"
        stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
