export default function Logo({ size = 44, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 100 100" className="flex-shrink-0">
        <polygon points="50,4 91,27 91,73 50,96 9,73 9,27" fill="#14173A" stroke="#E0A800" strokeWidth="3" />
        <path d="M50 10 L50 4 L55 -2 L50 -8 L45 -2 L50 4 Z" fill="#E0A800" transform="translate(0,14) scale(1.3)" />
        <text x="50" y="64" textAnchor="middle" fontFamily="Georgia, serif" fontSize="34" fontWeight="700" fill="#E0A800">MD</text>
      </svg>
      {withText && (
        <div className="leading-tight">
          <div className="font-heading font-bold text-navy-700 text-lg sm:text-xl tracking-tight">MD Fashion</div>
          <div className="text-gold-500 text-[10px] sm:text-xs font-medium tracking-widest uppercase">Boutique</div>
        </div>
      )}
    </div>
  );
}
