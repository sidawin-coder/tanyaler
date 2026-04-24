import Link from 'next/link';

interface LogoProps {
  size?: number;
  showText?: boolean;
  href?: string | null;
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}

/**
 * TanyaLer Logo — "Pintu Pengetahuan"
 *
 * Concept:
 * - Outer ring = perjalanan pembelajaran (never-ending growth)
 * - Inner "T" architecture = pintu / gateway ke jawapan
 * - Dot di atas = spark of insight / "aha moment"
 * - Emerald color = kebijaksanaan + kepercayaan (Malaysian identity)
 */
export default function Logo({
  size = 40,
  showText = true,
  href = '/',
  className = '',
  variant = 'default',
}: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900';
  const accentColor = variant === 'light' ? 'text-emerald-300' : 'text-emerald-600';

  const logoSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TanyaLer"
    >
      {/* Outer ring - perjalanan pembelajaran */}
      <circle
        cx="24"
        cy="24"
        r="21"
        stroke="#10B981"
        strokeWidth="2"
        strokeOpacity="0.15"
      />

      {/* Arc progress - growth journey */}
      <path
        d="M 24 3 A 21 21 0 0 1 42.19 34.5"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Inner gateway structure - stylized "T" as doorway */}
      <g>
        {/* Top crossbar */}
        <rect x="14" y="15" width="20" height="3" rx="1.5" fill="#10B981" />

        {/* Vertical stem */}
        <rect x="22.5" y="15" width="3" height="16" rx="1.5" fill="#10B981" />

        {/* Bottom accent - "standing on knowledge" */}
        <rect x="18" y="31" width="12" height="2" rx="1" fill="#10B981" opacity="0.6" />
      </g>

      {/* Spark of insight - the "aha" moment */}
      <circle cx="24" cy="10" r="1.8" fill="#FBBF24" />
    </svg>
  );

  const textContent = (
    <span className={`font-bold text-lg tracking-tight ${textColor} leading-none`}>
      Tanya<span className={accentColor}>Ler</span>
    </span>
  );

  const content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {logoSvg}
      {showText && textContent}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
