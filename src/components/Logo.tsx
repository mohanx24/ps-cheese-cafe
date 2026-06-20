type LogoProps = {
  variant?: 'light' | 'dark';
  className?: string;
};

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isLight = variant === 'light';
  
  // Color Hierarchy:
  // - Leaf Icon -> Warm Gold (Preserved from original PNG image)
  // - CAFE -> Muted Gold (#C6A15B)
  // - PS CHEESE -> Espresso Brown (#2D1B14) on light background, Warm Ivory (#F7F3EE) on dark background
  // - BY ROASTERY -> Muted Brand Text (#5C4A3F) on light background, Transparent Warm Ivory on dark background
  const cafeColor = '#C6A15B';
  const psCheeseColor = isLight ? '#F7F3EE' : '#2D1B14';
  const byRoasteryColor = isLight ? 'rgba(247,243,238,0.6)' : '#5C4A3F';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={isLight ? '/images/logo-light.png' : '/images/logo-dark.png'}
        alt="Cafe PS Cheese Logo"
        className="h-[38px] w-auto object-contain shrink-0"
        loading="eager"
      />
      <div className="flex flex-col text-left justify-center">
        <span
          className="font-heading font-medium text-[9px] tracking-[0.2em] uppercase leading-none"
          style={{ color: cafeColor }}
        >
          CAFE
        </span>
        <span
          className="font-heading font-bold text-[clamp(16px,1.6vw,19px)] tracking-[0.08em] uppercase leading-none my-1"
          style={{ color: psCheeseColor }}
        >
          PS CHEESE
        </span>
        <span
          className="font-heading font-medium text-[8px] tracking-[0.15em] uppercase leading-none"
          style={{ color: byRoasteryColor }}
        >
          BY ROASTERY
        </span>
      </div>
    </div>
  );
}
