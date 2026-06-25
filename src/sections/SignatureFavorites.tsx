import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const dishes = [
  {
    name: 'Cheese Platter',
    image: '/images/cheese-platter.jpg',
    desc: 'A curated selection of fresh in-house cheeses, fruits, and artisanal crackers.',
    tag: 'ARTISANAL'
  },
  {
    name: 'Burrata Arrabbiata Pasta',
    image: '/images/burrata-pasta.jpg',
    desc: 'Fresh, creamy burrata over penne tossed in our spicy marinara sauce.',
    tag: 'SIGNATURE'
  },
  {
    name: 'Basque Cheesecake',
    image: '/images/basque-cheesecake.jpg',
    desc: 'Caramelized, burnt-top cheesecake with a rich, melt-in-your-mouth center.',
    tag: 'BEST SELLER'
  },
  {
    name: 'Handmade Spaghetti Pasta',
    image: '/images/spaghetti.jpg',
    desc: 'Tomato-basil spaghetti, finished with herb crumb and garlic toast.',
    tag: 'HOUSE SPECIAL'
  },
  {
    name: 'Signature Cold Brew & Toast',
    image: '/images/signature-toast-coffee.jpg',
    desc: 'A pairing of thick brioche toast and our signature cold brew coffee.',
    tag: 'DAILY ROAST'
  },
];


/* Slightly bouncier spring for the active card "pop" */
const ACTIVE_SPRING = {
  type: 'spring' as const,
  stiffness: 350,
  damping: 24,
  mass: 0.7,
};

/* Gentler spring for non-active cards fanning out */
const FAN_SPRING = {
  type: 'spring' as const,
  stiffness: 250,
  damping: 30,
  mass: 0.9,
};

export default function SignatureFavorites() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const [activeIdx, setActiveIdx] = useState(2);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Layout parameters — tuned for each breakpoint
  const spreadX = isMobile ? 55 : isTablet ? 120 : 190;
  const rotateAngle = isMobile ? 4 : isTablet ? 7 : 9;
  const spreadY = isMobile ? 8 : isTablet ? 14 : 20;
  const scaleDiff = isMobile ? 0.09 : 0.08;
  const cardBorderRadius = isMobile ? 16 : isTablet ? 20 : 24;

  const navigateTo = useCallback((newIdx: number) => {
    setActiveIdx(newIdx);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev === 0 ? dishes.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev === dishes.length - 1 ? 0 : prev + 1));
  }, []);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset > threshold || velocity > 500) {
      handlePrev();
    } else if (offset < -threshold || velocity < -500) {
      handleNext();
    }
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIdx) {
      navigateTo(index);
    }
  };

  const handleViewMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuPreview = document.querySelector('#menu-preview');
    if (menuPreview) {
      menuPreview.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-menu-modal'));
      }, 600);
    }
  };

  // Calculate card transforms for each position in the fan
  const getCardVariants = (index: number) => {
    const diff = index - activeIdx;
    const absDiff = Math.abs(diff);

    const isActive = index === activeIdx;
    const rotate = diff * rotateAngle;
    const translateX = diff * spreadX;
    const translateY = absDiff * spreadY;
    const scale = isActive ? 1.0 : 1 - absDiff * scaleDiff;
    const opacity = 1;
    const zIndex = 50 - absDiff * 10;

    return {
      animate: {
        x: translateX,
        y: translateY,
        rotate,
        scale,
        opacity,
        zIndex,
      },
      transition: isActive ? ACTIVE_SPRING : FAN_SPRING,
    };
  };

  return (
    <section id="favorites" className="relative bg-brand-bg py-[var(--section-padding-y)] scroll-mt-[72px] scroll-anchor overflow-hidden">
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none opacity-[0.035]" aria-hidden="true">
        <img src="/images/logo-dark.png" alt="" className="w-[400px] h-[600px] object-contain" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto">
          <span className="label-text">FROM OUR KITCHEN</span>
          <h2 className="mt-4 font-heading font-normal text-[clamp(28px,3.5vw,36px)] leading-[1.2] tracking-[0.02em] text-brand-dark">
            Signature Favorites
          </h2>
          <p className="mt-3 font-body font-normal text-[clamp(14px,1.1vw,15px)] leading-[1.5] text-brand-text">
            Our most loved dishes, fanned to showcase their artisanal details. Drag or click to explore.
          </p>
          <span className="sr-only">
            Signature dishes carousel. Use left and right arrow keys to browse dishes. Click a dish to view its description.
          </span>
        </div>

        {/* ═══ Fan Carousel with Spring Physics ═══ */}
        <motion.div
          className="relative w-full mt-12 overflow-visible select-none outline-none flex items-center justify-center"
          style={{
            height: isMobile ? 360 : isTablet ? 450 : 540,
            cursor: 'grab',
            touchAction: 'pan-y',
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          whileTap={{ cursor: 'grabbing' }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            else if (e.key === 'ArrowRight') handleNext();
          }}
          aria-label="Signature Favorites Carousel"
        >
          {/* Card Stack */}
          <div className="relative w-full h-full flex items-center justify-center">
            {dishes.map((dish, index) => {
              const { animate, transition } = getCardVariants(index);
              const isActive = index === activeIdx;

              return (
                <motion.div
                  key={dish.name}
                  onClick={() => handleCardClick(index)}
                  layout
                  animate={animate}
                  transition={transition}
                  whileHover={!isActive ? {
                    scale: animate.scale + 0.03,
                    y: animate.y - 4,
                    transition: { type: 'spring', stiffness: 400, damping: 25 }
                  } : undefined}
                  whileTap={isActive ? {
                    scale: 0.97,
                    transition: { type: 'spring', stiffness: 500, damping: 30 }
                  } : undefined}
                  style={{
                    position: 'absolute',
                    width: isMobile ? 220 : isTablet ? 270 : 330,
                    height: isMobile ? 310 : isTablet ? 380 : 455,
                    borderRadius: cardBorderRadius,
                    overflow: 'hidden',
                    cursor: isActive ? 'default' : 'pointer',
                    transformOrigin: 'center bottom',
                    willChange: 'transform',
                  }}
                  className={isActive
                    ? 'shadow-[0_30px_60px_-15px_rgba(45,27,20,0.5),0_0_0_1px_rgba(198,161,91,0.2)]'
                    : 'shadow-[0_18px_36px_-12px_rgba(45,27,20,0.3)]'
                  }
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  role="group"
                  aria-label={isActive ? `${dish.name}: ${dish.desc}` : undefined}
                >
                  {/* ── Card Border Ring (rounded corners visible) ── */}
                  <div
                    className="absolute inset-0 pointer-events-none z-30"
                    style={{
                      borderRadius: cardBorderRadius,
                      border: isActive
                        ? '1.5px solid rgba(198, 161, 91, 0.35)'
                        : '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  />

                  {/* ── Image ── */}
                  <motion.img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                    style={{ borderRadius: cardBorderRadius }}
                    initial={false}
                    animate={{
                      scale: isActive ? 1.02 : 1,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 30,
                      duration: 0.8,
                    }}
                  />

                  {/* ── Gradient Overlay ── */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end text-left"
                    style={{
                      borderRadius: cardBorderRadius,
                      background: isActive
                        ? 'linear-gradient(to top, rgba(45,27,20,0.92) 0%, rgba(45,27,20,0.5) 40%, rgba(45,27,20,0.08) 70%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(45,27,20,0.75) 0%, rgba(45,27,20,0.2) 50%, transparent 100%)',
                    }}
                    initial={false}
                    animate={{ opacity: 1 }}
                  >
                    {/* ── Text Content ── */}
                    <div className="p-5 md:p-7">
                      {/* Tag */}
                      <span
                        className="font-ui font-medium tracking-[0.15em] uppercase block"
                        style={{
                          fontSize: isMobile ? 8 : 9,
                          color: 'rgba(198, 161, 91, 0.9)',
                          marginBottom: 8,
                        }}
                      >
                        {dish.tag}
                      </span>

                      {/* Dish Name */}
                      <h3
                        className="font-heading font-normal text-white tracking-wide leading-tight"
                        style={{
                          fontSize: isMobile ? 16 : isTablet ? 20 : 24,
                        }}
                      >
                        {dish.name}
                      </h3>

                      {/* Description */}
                      {isActive && (
                        <p
                          className="font-body font-light text-white/80 leading-[1.6] max-w-[92%]"
                          style={{
                            fontSize: isMobile ? 11 : 12,
                            marginTop: 8,
                          }}
                        >
                          {dish.desc}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* ── Active Card Shimmer/Glow ── */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-20"
                      style={{
                        borderRadius: cardBorderRadius,
                        background: 'linear-gradient(135deg, rgba(198,161,91,0.08) 0%, transparent 50%, rgba(198,161,91,0.04) 100%)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══ Navigation Controls: Arrows + Dots ═══ */}
        <div className="mt-10 flex items-center justify-center gap-4">
          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous dish"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-brand-border text-brand-dark hover:bg-brand-border hover:border-brand-accent/40 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1" role="group" aria-label="Carousel navigation">
            {dishes.map((_, index) => {
              const isActive = index === activeIdx;
              return (
                <button
                  key={index}
                  onClick={() => navigateTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? 'true' : 'false'}
                  className="relative flex items-center justify-center w-11 h-11 cursor-pointer"
                  style={{ border: 'none', padding: 0, background: 'none' }}
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                      opacity: isActive ? 1 : 0.45,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{ display: 'block', width: 7, height: 7, borderRadius: '50%' }}
                  />
                </button>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next dish"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-brand-border text-brand-dark hover:bg-brand-border hover:border-brand-accent/40 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="mt-12 text-center">
          <a href="#menu-preview" onClick={handleViewMenu} className="soft-link">
            View Full Menu →
          </a>
        </div>
      </div>
    </section>
  );
}
