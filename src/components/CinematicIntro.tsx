import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

/**
 * CinematicIntro v8 — Clean "Double Door Brand Gateway"
 * ─────────────────────────────────────────────────────────────────────────
 * 1. Stage: Deep warm espresso brown (`#1B120D`) with organic noise texture.
 * 2. Parallel Dual-Branch Wipe (Clean, no flashy shimmer):
 *    - Left Group: Bottom-to-top clip-path reveal.
 *    - Right Group: Top-to-bottom clip-path reveal.
 *    - Meets smoothly in the center.
 * 3. Rest Pause: 300ms pause after logo completion.
 * 4. Slim Progress Bar: Ultra-thin 1.5px gold progress line.
 * 5. Double Door Reveal: Left & Right door panels carrying the logo halves
 *    slide apart smoothly to reveal the website from the center.
 * 6. Final Transition: Staggered Hero section entrance.
 * ─────────────────────────────────────────────────────────────────────────
 */

type Props = { onComplete?: () => void };

export default function CinematicIntro({ onComplete }: Props) {
  const overlayRef    = useRef<HTMLDivElement>(null);
  const leftDoorRef   = useRef<HTMLDivElement>(null);
  const rightDoorRef  = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const strandRef     = useRef<HTMLDivElement>(null);

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

    // Register bespoke smooth door ease
    CustomEase.create('doorEase', 'M0,0 C0.25,0 0.1,1 1,1');

    const tl = gsap.timeline();

    // ── Initial States ──────────────────────────────────────────────────
    gsap.set(trackRef.current,   { opacity: 0 });
    gsap.set(strandRef.current,  { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(leftDoorRef.current,  { x: '0%' });
    gsap.set(rightDoorRef.current, { x: '0%' });

    // ── Phase 1: Parallel Dual-Branch Drawing Reveal (0.2s - 1.6s) ──────
    const wipeObj = { left: 100, right: 100 };

    tl.to(wipeObj, {
      left: 0,
      right: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        setWipeLeft(wipeObj.left);
        setWipeRight(wipeObj.right);
      },
    }, 0.2);

    // ── Phase 2: Rest Pause (1.6s - 1.9s) ──────────────────────────────
    // 300ms calm rest pause after logo finishes drawing

    // ── Phase 3: Slim Progress Line (1.9s - 3.0s) ───────────────────────
    const pStart = 1.9;
    tl.to(trackRef.current,  { opacity: 1, duration: 0.25, ease: 'power2.out' }, pStart);
    tl.to(strandRef.current, { scaleX: 1,  duration: 1.0,  ease: 'power2.inOut' }, pStart + 0.1);
    tl.to(trackRef.current,  { opacity: 0, duration: 0.25, ease: 'power2.in' }, pStart + 1.1);

    // ── Phase 4 & 5: Logo Separation & Double Door Reveal (3.15s - 4.45s)
    const doorAt = pStart + 1.25;

    // Trigger hero reveal sequence in sync as doors start parting
    tl.call(() => {
      window.dispatchEvent(new CustomEvent('intro:reveal'));
    }, [], doorAt + 0.1);

    // Left door slides smoothly left (-100% of half-screen = -50vw offscreen)
    tl.to(leftDoorRef.current, {
      x: '-100%',
      duration: 1.3,
      ease: 'doorEase',
    }, doorAt);

    // Right door slides smoothly right (+100% of half-screen = +50vw offscreen)
    tl.to(rightDoorRef.current, {
      x: '100%',
      duration: 1.3,
      ease: 'doorEase',
    }, doorAt);

    // ── Phase 6: Final Transition Cleanup (4.45s) ───────────────────────
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: handleFinish,
    }, doorAt + 1.25);

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
      {/* ── LEFT DOOR PANEL (0 to 50vw) ─────────────────────────────────── */}
      <div
        ref={leftDoorRef}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '50vw',
          background: 'radial-gradient(circle at 100% 50%, #251710 0%, #160D08 100%)',
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* Organic texture overlay */}
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

        {/* Left half of centered stage */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: 0, // anchored to center seam (50vw)
            transform: 'translate(50%, -50%)', // centers the logo bounding box on the seam
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Logo Bounding Box */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(140px, 15vw, 190px)',
              height: 'clamp(210px, 22.5vw, 285px)',
            }}
          >
            {/* LEFT GROUP (Bottom-left & Left-middle leaves): Bottom-Up Wipe */}
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
                alt="PS Cheese Cafe Left Group Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT DOOR PANEL (50vw to 100vw) ────────────────────────────── */}
      <div
        ref={rightDoorRef}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50vw',
          width: '50vw',
          background: 'radial-gradient(circle at 0% 50%, #251710 0%, #160D08 100%)',
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* Organic texture overlay */}
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

        {/* Right half of centered stage */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0, // anchored to center seam (50vw)
            transform: 'translate(-50%, -50%)', // centers the logo bounding box on the seam
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Logo Bounding Box */}
          <div
            style={{
              position: 'relative',
              width: 'clamp(140px, 15vw, 190px)',
              height: 'clamp(210px, 22.5vw, 285px)',
            }}
          >
            {/* RIGHT GROUP (Top leaf & Right leaf): Top-Down Wipe */}
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
                alt="PS Cheese Cafe Right Group Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── CENTERED SLIM PROGRESS LINE (Overlay on seam) ───────────────── */}
      <div
        ref={trackRef}
        style={{
          position: 'absolute',
          top: 'calc(50% + clamp(120px, 13vw, 160px))',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(120px, 14vw, 170px)',
          height: '1.5px', // Ultra-thin progress line
          background: 'rgba(198, 161, 91, 0.18)',
          borderRadius: '1px',
          overflow: 'hidden',
          zIndex: 9005,
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
  );
}
