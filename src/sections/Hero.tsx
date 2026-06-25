import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, useReducedMotion } from 'framer-motion';
import { WHATSAPP_RESERVE_URL } from '@/constants/links';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const locationRef = useRef<HTMLSpanElement>(null);
  const headline1Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const leftScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Cinematic visual zoom reveal on mount
      tl.fromTo(
        imageRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 1.8, ease: 'power2.out' },
        0
      );

      // Kicker & Location info
      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, 0.2)
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
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          subRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          [scrollIndicatorRef.current, leftScrollRef.current],
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuSection = document.querySelector('#menu-preview');
    if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col md:flex-row pt-[72px] scroll-mt-[72px] scroll-anchor"
    >
      {/* Visual Moment: Left Section for the Architecture Interior */}
      <div className="relative w-full md:w-[55%] lg:w-[60%] h-[60vh] md:h-auto md:min-h-[calc(100dvh-72px)] overflow-hidden bg-brand-bg-alt">
        <img
          ref={imageRef}
          src="/images/gallery-interior-glass.png"
          srcSet="/images/gallery-interior-glass.webp 1x, /images/gallery-interior-glass@2x.webp 2x"
          alt="Cafe PS Cheese glass-roof interior with arched windows and natural light"
          width="1080"
          height="720"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(43, 29, 21, 0.05), rgba(43, 29, 21, 0.15))',
          }}
        />

        {/* Sleek Vertical Scroll-Down Indicator */}
        <div
          ref={leftScrollRef}
          className="absolute bottom-8 left-8 z-20 hidden md:flex flex-col items-center gap-3.5 opacity-0 select-none pointer-events-none"
        >
          <span className="font-ui text-[9px] tracking-[0.25em] text-white/60 uppercase font-medium [writing-mode:vertical-lr]">
            Scroll
          </span>
          <div className="relative w-px h-12 bg-white/20 overflow-hidden">
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

      {/* Editorial Content: Right Section */}
      <div className="w-full md:w-[45%] lg:w-[40%] flex items-center bg-brand-bg">
        <div className="w-full px-6 py-12 md:px-10 lg:px-14 xl:px-16 max-w-[500px] mx-auto md:mx-0 text-center md:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span
              ref={labelRef}
              className="label-text opacity-0 translate-y-5 inline-block"
            >
              HYDERABAD&apos;S FIRST
            </span>
            <span className="text-brand-accent/50 label-text">·</span>
            <span
              ref={locationRef}
              className="label-text opacity-0 translate-y-5 inline-block"
            >
              KAVURI HILLS
            </span>
          </div>

          <h1 className="mt-5">
            <span
              ref={headline1Ref}
              className="block font-display font-normal text-[clamp(32px,4.17vw+18.7px,72px)] leading-[1.05] tracking-[0.02em] text-brand-dark opacity-0 translate-y-8"
            >
              Hyderabad’s Premier Artisan Cheese Café
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-6 font-body font-normal text-[clamp(15px,1.5vw,17px)] leading-[1.7] text-brand-text opacity-0 translate-y-5 max-w-[90%] mx-auto md:mx-0"
          >
            Glass‑roof ambience • In‑house artisan cheese • Specialty coffee
          </p>

          {/* CTA Buttons — PRIMARY (Reserve) on left, SECONDARY (Menu) on right */}
          <div
            ref={buttonsRef}
            className="mt-10 flex flex-wrap justify-center md:justify-start gap-4 opacity-0 translate-y-5"
          >
            <a
              href={WHATSAPP_RESERVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary min-h-[44px] flex items-center justify-center gap-2 group/btn"
              aria-label="Reserve a table"
            >
              <span>Reserve Now</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">
                &rarr;
              </span>
            </a>
            <button
              onClick={handleMenuClick}
              className="btn-secondary min-h-[44px] flex items-center justify-center gap-2 group/btn"
            >
              <span>See the Menu</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">
                &rarr;
              </span>
            </button>
          </div>

          {/* Microcopy */}
          <p className="mt-4 cta-microcopy text-center md:text-left">
            Instant reply on WhatsApp · No booking fee · Tables fill fast on weekends
          </p>

          {/* Social proof rating */}
          <div
            ref={scrollIndicatorRef}
            className="mt-10 opacity-0 hidden md:flex items-center gap-2 justify-start"
          >
            <span className="flex items-center gap-0.5" aria-label="5 stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C6A15B" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </span>
            <span className="font-detail text-[11px] text-brand-text tracking-wide">
              Rated 4.8 on Google · 500+ guests
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

