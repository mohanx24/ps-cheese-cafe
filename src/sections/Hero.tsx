import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { WHATSAPP_RESERVE_URL } from '@/constants/links';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const locationRef = useRef<HTMLSpanElement>(null);
  const headline1Ref = useRef<HTMLSpanElement>(null);
  const headline2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const leftScrollRef = useRef<HTMLDivElement>(null);

  // Mouse move parameters for spring physics tilt (arch portal)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 25, mass: 0.4 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-8, 8]);
  const imageX = useTransform(xSpring, [-0.5, 0.5], [-12, 12]);

  // Scroll parallax parameters
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Window portal reveal on mount
      tl.fromTo(
        portalRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' },
        0
      );

      // Visual zoom inside portal
      tl.fromTo(
        imageRef.current,
        { scale: 1.25 },
        { scale: 1.1, duration: 1.8, ease: 'power2.out' },
        0
      );

      // Kicker & Location info
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, 0.3)
        .to(
          locationRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          headline1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          headline2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          subRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          [scrollIndicatorRef.current, leftScrollRef.current],
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left - width / 2;
    const mouseYVal = e.clientY - rect.top - height / 2;
    mouseX.set(mouseXVal / width);
    mouseY.set(mouseYVal / height);

    // Spotlight cursor coordinates for grid lines
    const gridContainer = e.currentTarget.querySelector('.grid-container') as HTMLElement;
    if (gridContainer) {
      const gridRect = gridContainer.getBoundingClientRect();
      const x = e.clientX - gridRect.left;
      const y = e.clientY - gridRect.top;
      gridContainer.style.setProperty('--mouse-x', `${x}px`);
      gridContainer.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuSection = document.querySelector('#menu-preview');
    if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] flex items-center justify-center bg-[#FAF8F5] pt-[72px] scroll-mt-[72px] scroll-anchor"
    >
      {/* Structural Glass Grid Container */}
      <div className="grid grid-container grid-cols-1 md:grid-cols-12 max-w-7xl mx-auto w-full border-x border-[#2D1B14]/[0.06] min-h-[calc(100dvh-72px)] bg-[#FAF8F5] relative group/hero">
        
        {/* Glass Pane Grid Borders with Interactive Spotlight Glow */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
          {/* Left vertical border */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-[#2D1B14]/[0.06]">
            <div 
              className="absolute inset-0 w-full h-full opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(120px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(198, 161, 91, 0.4) 0%, transparent 100%)',
              }}
            />
          </div>
          {/* Right vertical border */}
          <div className="absolute top-0 bottom-0 right-0 w-px bg-[#2D1B14]/[0.06]">
            <div 
              className="absolute inset-0 w-full h-full opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(120px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(198, 161, 91, 0.4) 0%, transparent 100%)',
              }}
            />
          </div>
          {/* Middle vertical divider */}
          <div className="absolute top-0 bottom-0 left-[41.6666%] w-px bg-[#2D1B14]/[0.06]">
            <div 
              className="absolute inset-0 w-full h-full opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(120px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(198, 161, 91, 0.4) 0%, transparent 100%)',
              }}
            />
          </div>
        </div>

        {/* Left Column: Editorial Typography & CTAs (Col span 5) */}
        <div className="col-span-1 md:col-span-5 flex flex-col justify-center p-8 md:p-10 lg:p-12 border-b md:border-b-0 md:border-r border-[#2D1B14]/[0.06] bg-[#FAF8F5] relative z-20">
          
          {/* Location Kicker */}
          <div className="flex items-center gap-1.5 justify-start flex-wrap">
            <span ref={labelRef} className="label-text opacity-0 translate-y-5 inline-block text-[10px] tracking-[0.2em] font-medium text-brand-accent uppercase">
              HYDERABAD&apos;S FIRST
            </span>
            <span className="text-brand-accent/30 label-text text-[10px]">·</span>
            <span ref={locationRef} className="label-text opacity-0 translate-y-5 inline-block text-[10px] tracking-[0.2em] font-medium text-brand-accent uppercase">
              KAVURI HILLS
            </span>
          </div>
 
          {/* Main Editorial Headline */}
          <h1 className="mt-5 flex flex-col gap-1">
            <div className="overflow-hidden py-1">
              <span
                ref={headline1Ref}
                className="block font-display font-light text-[clamp(32px,3.8vw,56px)] leading-[1.05] text-brand-dark opacity-0 translate-y-full tracking-[0.02em] font-serif"
              >
                Hyderabad’s Premier
              </span>
            </div>
            <div className="overflow-hidden py-1">
              <span
                ref={headline2Ref}
                className="block font-display font-normal italic text-[clamp(32px,3.8vw,56px)] leading-[1.05] text-brand-dark opacity-0 translate-y-full tracking-[0.02em] font-serif"
              >
                Artisan Cheese Café
              </span>
            </div>
          </h1>

          {/* Description */}
          <p
            ref={subRef}
            className="mt-6 font-body font-normal text-[clamp(14px,1.3vw,16px)] leading-[1.7] text-brand-text opacity-0 translate-y-5 max-w-[95%] md:max-w-none"
          >
            Glass‑roof ambience &bull; In‑house artisan cheese &bull; Roastery specialty coffee
          </p>

          {/* Action Buttons */}
          <div
            ref={buttonsRef}
            className="mt-8 flex flex-wrap gap-4 opacity-0 translate-y-5"
          >
            <a
              href={WHATSAPP_RESERVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary min-h-[44px] flex-1 md:flex-none px-8 flex items-center justify-center gap-2 group/btn"
              aria-label="Reserve a table"
            >
              <span>Reserve Now</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">
                &rarr;
              </span>
            </a>
            <button
              onClick={handleMenuClick}
              className="btn-secondary min-h-[44px] flex-1 md:flex-none px-8 flex items-center justify-center gap-2 group/btn"
            >
              <span>See Menu</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">
                &rarr;
              </span>
            </button>
          </div>

          {/* Microcopy & Ratings */}
          <div ref={scrollIndicatorRef} className="mt-8 flex flex-col gap-3 opacity-0 border-t border-[#2D1B14]/[0.06] pt-6">
            <p className="cta-microcopy text-left">
              Instant reply on WhatsApp &bull; No booking fee &bull; Tables fill fast
            </p>
            <div className="flex items-center gap-2 justify-start">
              <span className="flex items-center gap-0.5" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#C6A15B" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </span>
              <span className="font-detail text-[11px] text-brand-text/80 tracking-wide">
                Rated 4.8 on Google &bull; 500+ guests
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Visual Arched Portal (Col span 7) */}
        <div className="col-span-1 md:col-span-7 flex items-center justify-center p-8 md:p-12 lg:p-16 relative bg-[#FAF8F5]">
          
          {/* Centered Arched Window Portal */}
          <motion.div
            ref={portalRef}
            style={{
              rotateX: prefersReducedMotion ? 0 : rotateX,
              rotateY: prefersReducedMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-[85%] sm:w-[65%] md:w-[60%] lg:w-[50%] aspect-[1/1.4] rounded-t-full overflow-hidden border border-brand-border/10 shadow-[0_32px_64px_rgba(45,27,20,0.1)] bg-[#FAF8F5] transition-shadow duration-300 hover:shadow-[0_48px_96px_rgba(45,27,20,0.15)]"
          >
            {/* Inner Image with Parallax & Spring pan */}
            <motion.img
              ref={imageRef}
              src="/images/gallery-interior-glass.png"
              srcSet="/images/gallery-interior-glass.webp 1x, /images/gallery-interior-glass@2x.webp 2x"
              alt="Cafe PS Cheese glass-roof interior with arched windows and natural light"
              style={{
                y: imageParallaxY,
                x: prefersReducedMotion ? 0 : imageX,
                scale: imageScale,
              }}
              width="1080"
              height="720"
              className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
              loading="eager"
              fetchPriority="high"
            />
            {/* Gentle, glowing gradient filter */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(43, 29, 21, 0) 50%, rgba(43, 29, 21, 0.12) 100%)',
              }}
            />
          </motion.div>

          {/* Sleek vertical scroll indicator on the right panel */}
          <div
            ref={leftScrollRef}
            className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-3.5 opacity-0 select-none pointer-events-none"
          >
            <span className="font-ui text-[9px] tracking-[0.25em] text-[#2D1B14]/40 uppercase font-medium [writing-mode:vertical-lr]">
              Scroll
            </span>
            <div className="relative w-px h-12 bg-[#2D1B14]/10 overflow-hidden">
              {!prefersReducedMotion ? (
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 top-0 w-full h-5 bg-brand-accent"
                />
              ) : (
                <div className="absolute left-0 top-0 w-full h-full bg-brand-accent/40" />
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

