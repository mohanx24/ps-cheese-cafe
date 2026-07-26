import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

/**
 * CinematicIntro v6 — "Parallel Dual-Branch Wipe & Portal Reveal"
 * ─────────────────────────────────────────────────────────────────────────
 * 1. Stage: Deep warm espresso brown (`#1B120D`) with organic noise texture.
 * 2. Parallel Dual-Branch Wipe:
 *    - Left 2 leaves: Wipes from BOTTOM to TOP (inset bottom 100% → 0%).
 *    - Right 2 leaves: Wipes in parallel from TOP to BOTTOM (inset top 100% → 0%).
 * 3. Slim Progress Bar: Ultra-thin 1.5px gold progress line.
 * 4. Smooth Portal Scale: Logo zooms up (1x → 24x) into the camera handing off to the page.
 * ─────────────────────────────────────────────────────────────────────────
 */

type Props = { onComplete?: () => void };

export default function CinematicIntro({ onComplete }: Props) {
  const overlayRef     = useRef<HTMLDivElement>(null);
  const darkBgRef      = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef       = useRef<HTMLDivElement>(null);
  const strandRef      = useRef<HTMLDivElement>(null);

  // Left branch (bottom -> top) & Right branch (top -> bottom) wipe states
  const [wipeLeft, setWipeLeft]   = useState(100); // 100 = hidden at bottom, 0 = fully revealed
  const [wipeRight, setWipeRight] = useState(100); // 100 = hidden at top, 0 = fully revealed

  useEffect(() => {
    // Reduced motion check
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      handleFinish();
      return;
    }

    document.body.style.overflow = 'hidden';

    // Register smooth portal ease matching Framer/Cinematic acceleration
    CustomEase.create('portalEase', 'M0,0 C0.22,0 0.08,1 1,1');

    const tl = gsap.timeline();

    // ── Initial States ──────────────────────────────────────────────────
    gsap.set(trackRef.current,  { opacity: 0 });
    gsap.set(strandRef.current, { scaleX: 0, transformOrigin: 'left center' });

    // ── Phase 1: Parallel Dual-Branch Wipe Animation ────────────────────
    // Both branches animate simultaneously starting at 0.3s
    const wipeObj = { left: 100, right: 100 };

    tl.to(wipeObj, {
      left: 0,
      right: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        setWipeLeft(wipeObj.left);
        setWipeRight(wipeObj.right);
      },
    }, 0.3);

    // ── Phase 2: Slim Progress Bar ──────────────────────────────────────
    const pStart = 1.6;
    tl.to(trackRef.current,  { opacity: 1, duration: 0.25, ease: 'power2.out' }, pStart);
    tl.to(strandRef.current, { scaleX: 1,  duration: 0.9,  ease: 'power2.inOut' }, pStart + 0.1);
    tl.to(trackRef.current,  { opacity: 0, duration: 0.25, ease: 'power2.in' }, pStart + 1.0);

    // ── Phase 3: Smooth Portal Scale Reveal ─────────────────────────────
    const zoomAt = pStart + 1.25;

    // Scale up the logo wrapper smoothly into the camera (1x → 24x)
    tl.to(logoWrapperRef.current, {
      scale: 24,
      opacity: 0,
      duration: 1.3,
      ease: 'portalEase',
      transformOrigin: 'center center',
    }, zoomAt);

    // Fade out the espresso dark background cleanly to reveal the page
    tl.to(darkBgRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.inOut',
    }, zoomAt + 0.1);

    // Dispatch early reveal event for background page content
    tl.call(() => {
      window.dispatchEvent(new CustomEvent('intro:reveal'));
    }, [], zoomAt + 0.15);

    // Fade out main overlay wrapper at the end of zoom
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power1.out',
      onComplete: handleFinish,
    }, zoomAt + 1.25);

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFinish() {
    document.body.style.overflow = '';
    if (overlayRef.current) overlayRef.current.style.display = 'none';
    window.dispatchEvent(new CustomEvent('intro:reveal'));
    window.dispatchEvent(new CustomEvent('intro:complete'));
    onComplete?.();
  }

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* ── 1. Dark Espresso Background Stage ───────────────────────────── */}
      <div
        ref={darkBgRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, #251710 0%, #160D08 100%)',
          willChange: 'opacity',
        }}
      >
        {/* Organic texture layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      {/* ── 2. Centered Logo Stage & Progress Line ──────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Logo container wrapper for zoom scaling */}
          <div
            ref={logoWrapperRef}
            style={{
              position: 'relative',
              width: 'clamp(140px, 15vw, 190px)',
              height: 'clamp(210px, 22.5vw, 285px)',
              willChange: 'transform, opacity',
              transformOrigin: 'center center',
            }}
          >
            {/* LEFT BRANCH (2 Leaves): Wiping Bottom to Top */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: `inset(0% 48% ${wipeLeft}% 0%)`,
                WebkitClipPath: `inset(0% 48% ${wipeLeft}% 0%)`,
                willChange: 'clip-path',
              }}
            >
              <img
                src="/images/logo-light.png"
                alt="PS Cheese Cafe Logo Left Branch"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* RIGHT BRANCH (2 Leaves): Wiping Top to Bottom in Parallel */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: `inset(${wipeRight}% 0% 0% 48%)`,
                WebkitClipPath: `inset(${wipeRight}% 0% 0% 48%)`,
                willChange: 'clip-path',
              }}
            >
              <img
                src="/images/logo-light.png"
                alt="PS Cheese Cafe Logo Right Branch"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* ── 3. Slim Elegant Progress Line ───────────────────────────── */}
          <div
            ref={trackRef}
            style={{
              position: 'relative',
              marginTop: '42px',
              width: 'clamp(120px, 14vw, 170px)',
              height: '1.5px', // Ultra-thin progress line
              background: 'rgba(198, 161, 91, 0.18)',
              borderRadius: '1px',
              overflow: 'hidden',
              willChange: 'opacity',
            }}
          >
            <div
              ref={strandRef}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, #B8923F 0%, #FFDF78 50%, #B8923F 100%)',
                borderRadius: '1px',
                willChange: 'transform',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
