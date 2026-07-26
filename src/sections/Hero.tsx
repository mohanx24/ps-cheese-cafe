import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from 'framer-motion';
import { WHATSAPP_RESERVE_URL } from '@/constants/links';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const headlineLine3Ref = useRef<HTMLSpanElement>(null);
  const headlineLine4Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Scale Settings & Nav Setup
      gsap.set(imageRef.current, { scale: 1.05 });
      gsap.set('nav', { opacity: 0 });

      const startTimeline = () => {
        const tl = gsap.timeline({ delay: 0.05 });

        // Smooth cinematic zoom-down of inner image (architecture focus)
        tl.to(imageRef.current, {
          scale: 1.00,
          duration: 1.8,
          ease: 'sine.out',
        }, 0);

        // Navigation fades in gracefully
        tl.to('nav', {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.2);

        // Kicker Eyebrow Label
        tl.to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        }, 0.3);

        // Headline lines split reveal (snappy staggered 4-line reveal)
        tl.to([
          headlineLine1Ref.current,
          headlineLine2Ref.current,
          headlineLine3Ref.current,
          headlineLine4Ref.current
        ], {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
        }, '-=0.25');

        // Brand statement / Subtitle (fades up)
        tl.to(subRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        }, '-=0.4');

        // CTA Buttons
        tl.to(buttonsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        }, '-=0.3');

        // Minimal Centered Discover Indicator
        tl.to(discoverRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, '-=0.2');
      };

      // Listen for intro:reveal (fires 1.5s earlier than intro:complete, during the wipe)
      window.addEventListener('intro:reveal', startTimeline, { once: true });

      // 2. Scroll Parallax Animations (decoupled using outer wrapper)
      if (!prefersReducedMotion) {
        // Background Wrapper Parallax Scale & Position
        gsap.to(imageWrapperRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          scale: 1.08,
          y: '8%',
          ease: 'none',
        });

        // Slow parallax scroll on content wrapper
        gsap.to('.hero-parallax-content', {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          y: '-12%',
          opacity: 0.85,
          ease: 'none',
        });

        // Fade out discover indicator
        gsap.to(discoverRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '20% top',
            scrub: true,
          },
          opacity: 0,
          y: 20,
          ease: 'none',
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuSection = document.querySelector('#menu-preview');
    if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-end items-start overflow-hidden bg-brand-dark scroll-anchor"
    >
      {/* Background Wrapper (Parallax Scroll target) */}
      <div ref={imageWrapperRef} className="absolute inset-0 w-full h-full overflow-hidden z-0 select-none pointer-events-none">
        {/* Inner Background Image (Breathing/Load Zoom target) */}
        <img
          ref={imageRef}
          src="/images/gallery-interior-glass.png"
          srcSet="/images/gallery-interior-glass.webp 1x, /images/gallery-interior-glass@2x.webp 2x"
          alt="Cafe PS Cheese glass-roof interior with arched windows and natural light"
          className="w-full h-full object-cover object-[center_25%] lg:object-center"
          loading="eager"
          fetchPriority="high"
        />
        
        {/* Responsive, multi-directional coffee overlays to support typography legibility */}
        {/* Mobile/Tablet vertical gradient & left vignette */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#2D1B14]/95 via-[#2D1B14]/65 to-[#2D1B14]/25 lg:hidden"
          style={{ mixBlendMode: 'multiply' }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#2D1B14]/85 via-[#2D1B14]/40 to-transparent lg:hidden"
          style={{ mixBlendMode: 'multiply' }}
        />
        
        {/* Desktop left-to-right vignette */}
        <div
          className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#2D1B14]/85 via-[#2D1B14]/55 to-transparent z-10 pointer-events-none"
          style={{ mixBlendMode: 'multiply' }}
        />
        <div
          className="absolute inset-0 hidden lg:block bg-gradient-to-b from-[#2D1B14]/30 via-transparent to-[#2D1B14]/50 pointer-events-none"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Editorial Content Container - Anchored bottom-left with vertical breathing room */}
      <div className="hero-parallax-content relative z-10 w-full max-w-[var(--max-content-width)] mx-auto px-6 pb-20 pt-[140px] lg:pb-24 lg:pt-[72px] min-h-[100dvh] flex flex-col justify-end items-start text-left">
        
        {/* Typography Content Wrapper */}
        <div className="w-full lg:max-w-[620px] xl:max-w-[720px] text-left flex flex-col items-start lg:mt-12">
          
          {/* Eyebrow kicker label */}
          <div className="flex items-center gap-2 flex-wrap justify-start drop-shadow-[0_2px_4px_rgba(45,27,20,0.3)]">
            <span
              ref={labelRef}
              className="font-ui font-semibold text-[10px] tracking-[0.2em] uppercase text-brand-accent opacity-0 translate-y-4"
            >
              HYDERABAD&apos;S FIRST
            </span>
          </div>

          {/* Headline (Editorial 4-line serif presentation with drop shadow for clarity) */}
          <h1 className="mt-4 text-white drop-shadow-[0_4px_16px_rgba(45,27,20,0.55)]">
            <span className="block overflow-hidden py-1">
              <span
                ref={headlineLine1Ref}
                className="block font-display font-normal text-[#FAF7F2] text-[clamp(32px,5.2vw,72px)] leading-[1.15] tracking-[0.02em] opacity-0 translate-y-full"
              >
                Hyderabad’s
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span
                ref={headlineLine2Ref}
                className="block font-display font-normal text-[#FAF7F2] text-[clamp(32px,5.2vw,72px)] leading-[1.15] tracking-[0.02em] opacity-0 translate-y-full"
              >
                Premier
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span
                ref={headlineLine3Ref}
                className="block font-display font-normal text-brand-accent text-[clamp(32px,5.2vw,72px)] leading-[1.15] tracking-[0.02em] opacity-0 translate-y-full italic"
              >
                Artisan
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span
                ref={headlineLine4Ref}
                className="block font-display font-normal text-[#FAF7F2] text-[clamp(32px,5.2vw,72px)] leading-[1.15] tracking-[0.02em] opacity-0 translate-y-full"
              >
                Cheese Café
              </span>
            </span>
          </h1>

          {/* Brand statement */}
          <p
            ref={subRef}
            className="mt-6 font-body font-normal text-[clamp(14px,1.2vw+2px,16px)] leading-[1.7] text-[#FAF7F2]/85 opacity-0 translate-y-5 max-w-[460px] drop-shadow-[0_2px_8px_rgba(45,27,20,0.4)]"
          >
            A glass-roof sanctuary where artisan cheese meets specialty coffee and timeless conversations.
          </p>

          {/* Call to action buttons */}
          <div
            ref={buttonsRef}
            className="mt-8 flex flex-row items-center gap-6 opacity-0 translate-y-5 flex-wrap"
          >
            <a
              href={WHATSAPP_RESERVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C6A15B] hover:bg-[#B8975A] text-[#2D1B14] min-h-[52px] px-8 flex items-center justify-center gap-2 rounded-lg font-ui font-semibold text-xs tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 shadow-md select-none group/btn cursor-pointer min-w-[180px] sm:min-w-[200px]"
              aria-label="Reserve a table"
            >
              <span>Reserve Table</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">
                &rarr;
              </span>
            </a>
            <button
              onClick={handleMenuClick}
              className="inline-flex items-center gap-1.5 font-ui font-semibold text-xs tracking-[0.08em] uppercase text-white hover:text-brand-accent transition-all duration-200 cursor-pointer border-b border-white/20 hover:border-brand-accent pb-0.5 min-h-[44px] group"
            >
              <span>Explore Menu</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
            </button>
          </div>
        </div>

        {/* Minimal Centered Discover Indicator */}
        <div
          ref={discoverRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-0 select-none z-20 pointer-events-none"
        >
          <span className="font-ui text-[9px] tracking-[0.25em] text-[#FAF7F2]/50 uppercase font-medium">
            Discover
          </span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(250, 247, 242, 0.4)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="discover-indicator-arrow"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

      </div>
    </section>
  );
}
