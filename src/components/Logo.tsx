interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo = ({ size = 40, className = '' }: LogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#818cf8' }} />
          <stop offset="100%" style={{ stopColor: '#f472b6' }} />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="80" fill="url(#logoBg)" />
      {/* Heartbeat line */}
      <path
        d="M40 280 L120 280 L150 280 L170 220 L190 340 L210 260 L230 280 L280 280 L300 280 L320 220 L340 340 L360 260 L380 280 L472 280"
        stroke="white"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {/* Runner silhouette */}
      <g fill="#1a1a2e">
        {/* Head */}
        <circle cx="280" cy="120" r="35" />
        {/* Hair/ponytail */}
        <path d="M290 100 Q320 90 330 120 Q340 100 320 85 Q300 80 290 100" />
        {/* Body */}
        <path d="M260 155 Q240 200 235 260 L255 265 Q265 220 280 180 Q295 220 305 265 L325 260 Q320 200 300 155 Z" />
        {/* Front arm */}
        <path d="M270 175 Q230 160 200 130 Q195 140 210 155 Q235 175 265 190 Z" />
        {/* Back arm */}
        <path d="M295 175 Q340 200 380 195 Q382 182 365 185 Q330 188 300 170 Z" />
        {/* Front leg */}
        <path d="M245 255 Q200 300 170 380 Q160 420 180 430 Q195 425 190 400 Q205 340 250 280 Z" />
        {/* Back leg */}
        <path d="M315 255 Q360 310 400 340 Q430 360 420 380 Q400 375 385 355 Q350 320 310 270 Z" />
        {/* Front foot */}
        <path d="M175 425 Q150 435 145 430 Q150 420 175 420 Z" />
        {/* Back foot */}
        <path d="M420 375 Q445 380 450 375 Q445 365 420 370 Z" />
      </g>
    </svg>
  );
};
