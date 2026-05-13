"use client";

export function IconBrain({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6C9.79 6 8 7.79 8 10c0 .74.21 1.43.57 2.02C7.02 12.56 6 13.91 6 15.5c0 1.38.7 2.59 1.76 3.31C7.28 19.47 7 20.2 7 21c0 2.21 1.79 4 4 4h1v-2H11c-1.1 0-2-.9-2-2 0-.6.27-1.13.69-1.5C10.35 19.82 11 19 11 18c0 0-.5-.5-.5-1.5S11 14 11 14v-1c0-1.1.9-2 2-2h2v-2h-2c-.35 0-.68.06-1 .15V8c0-1.1.9-2 2-2h1V4h-1c-1.1 0-2.1.45-2.83 1.17L12 6z" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="22" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="10" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="16" y1="14" x2="20" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="16" y1="14" x2="12" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="20" y1="17.5" x2="18" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="17.5" x2="14" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="16" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="22" cy="16" r="1.2" fill="currentColor"/>
      <circle cx="10" cy="16" r="1.2" fill="currentColor"/>
      <circle cx="16" cy="22" r="1.2" fill="currentColor"/>
    </svg>
  );
}

export function IconRobot({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="11" y="15" width="4" height="4" rx="1" fill="currentColor" opacity="0.8"/>
      <rect x="17" y="15" width="4" height="4" rx="1" fill="currentColor" opacity="0.8"/>
      <line x1="13" y1="22" x2="19" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="12" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="8" y1="18" x2="5" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="24" y1="18" x2="27" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="21" x2="5" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="24" y1="21" x2="27" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function IconDice({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="16,4 28,10 28,22 16,28 4,22 4,10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <polygon points="16,4 28,10 16,16 4,10" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
      <line x1="16" y1="16" x2="16" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <circle cx="12" cy="13" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="13" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="20" r="1" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

export function IconCode({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconStar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

export function IconArrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <polyline points="12 5 19 12 12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconGlobe({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function IconHeart({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

export function IconSparkle({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"/>
      <path d="M19 2L19.8 5.2L23 6L19.8 6.8L19 10L18.2 6.8L15 6L18.2 5.2L19 2Z" opacity="0.6"/>
      <path d="M5 16L5.5 18.5L8 19L5.5 19.5L5 22L4.5 19.5L2 19L4.5 18.5L5 16Z" opacity="0.5"/>
    </svg>
  );
}

export function IconPrint3D({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* frame posts */}
      <line x1="6" y1="8" x2="6" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="26" y1="8" x2="26" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* top bar */}
      <line x1="6" y1="8" x2="26" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* extruder carriage */}
      <rect x="12" y="5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* nozzle */}
      <path d="M14.5 11L14 15L16 16.5L18 15L17.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
      {/* print bed */}
      <line x1="7" y1="23" x2="25" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* object being printed */}
      <rect x="11.5" y="18.5" width="9" height="4.5" rx="1" fill="currentColor" opacity="0.25"/>
      <line x1="12.5" y1="20" x2="19.5" y2="20" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.7"/>
      <line x1="12.5" y1="21.5" x2="19.5" y2="21.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function IconChip({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="9" y="9" width="6" height="6" rx="0.5" fill="currentColor" opacity="0.3"/>
      <line x1="9" y1="4" x2="9" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="4" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="15" y1="4" x2="15" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="17" x2="9" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="15" y1="17" x2="15" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="4" y1="9" x2="7" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="4" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="4" y1="15" x2="7" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="17" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="17" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="17" y1="15" x2="20" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
