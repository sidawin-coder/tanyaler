import Link from 'next/link';

interface LogoProps {
  size?: number;
  showText?: boolean;
  showBadge?: boolean;
  href?: string;
  className?: string;
}

export default function Logo({
  size = 44,
  showText = true,
  showBadge = true,
  href = '/',
  className = '',
}: LogoProps) {
  const logoSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TanyaLer"
    >
      <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2.5" strokeOpacity="0.2" />
      <path
        d="M12 2C17.5228 2 22 6.47715 22 12"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#10B981" />
      <path d="M12 17V19" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  const content = (
    <div className={`flex items-center gap-4 ${className}`}>
      {logoSvg}
      {showText && (
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Tanya<span className="text-emerald-700">Ler</span>
          </h1>
          {showBadge && (
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-1">
              Premium Edition
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group">
        {content}
      </Link>
    );
  }

  return content;
}
