import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Highlights from '@/sections/Highlights';
import OurSpace from '@/sections/OurSpace';
import SignatureFavorites from '@/sections/SignatureFavorites';
import CoffeeExperience from '@/sections/CoffeeExperience';
import MenuPreview from '@/sections/MenuPreview';
import Gallery from '@/sections/Gallery';
import VisitUs from '@/sections/VisitUs';
import Footer from '@/sections/Footer';
import MobileReserveBar from '@/components/MobileReserveBar';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let lenis: Lenis | null = null;

    const initLenis = () => {
      if (lenis) return;
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);
    };

    const destroyLenis = () => {
      if (!lenis) return;
      lenis.destroy();
      lenis = null;
      lenisRef.current = null;
    };

    const updateLenis = (time: number) => {
      if (lenis) {
        lenis.raf(time * 1000);
      }
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Track device scale and monitor changes to handle browser layout zoom
    let baseDpr = window.devicePixelRatio;
    let lastScreenWidth = window.screen.width;

    const handleZoomAndScrollState = () => {
      const scale = window.visualViewport ? window.visualViewport.scale : 1;
      const currentDpr = window.devicePixelRatio;
      const currentScreenWidth = window.screen.width;

      // Reset baseDpr if the window changes monitors
      if (currentScreenWidth !== lastScreenWidth) {
        baseDpr = currentDpr;
        lastScreenWidth = currentScreenWidth;
      }

      const isPinchZoomed = scale > 1.01;
      const isLayoutZoomed = Math.abs(currentDpr - baseDpr) > 0.05;
      const isZoomed = isPinchZoomed || isLayoutZoomed;

      if (isZoomed) {
        destroyLenis();
        document.body.style.overflowX = 'auto';
        document.documentElement.style.overflowX = 'auto';
      } else {
        initLenis();
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = '';
      }
    };

    // Prevent Lenis scroll interference during pinch-to-zoom (trackpad/mobile)
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.stopPropagation();
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 1) {
        e.stopPropagation();
      }
    };

    window.addEventListener('wheel', handleWheel, { capture: true, passive: true });
    window.addEventListener('touchmove', handleTouch, { capture: true, passive: true });
    window.addEventListener('resize', handleZoomAndScrollState, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleZoomAndScrollState);
      window.visualViewport.addEventListener('scroll', handleZoomAndScrollState);
    }

    // Run initial check
    handleZoomAndScrollState();

    return () => {
      destroyLenis();
      gsap.ticker.remove(updateLenis);
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchmove', handleTouch, { capture: true });
      window.removeEventListener('resize', handleZoomAndScrollState);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleZoomAndScrollState);
        window.visualViewport.removeEventListener('scroll', handleZoomAndScrollState);
      }
    };
  }, []);

  return (
    <div className="relative">
      <a href="#main-content" className="sr-only focus:not-sr-only btn-primary absolute top-2 left-2 z-[100]">Skip to Content</a>
      {/* Navigation */}
      <Navigation />

      {/* Main Content — Section order follows conversion funnel */}
      <main id="main-content">
        <Hero />
        <Highlights />
        <OurSpace />
        <SignatureFavorites />
        <CoffeeExperience />
        <MenuPreview />
        <Gallery />
        <VisitUs />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile sticky reservation bar */}
      <MobileReserveBar />
    </div>
  );
}
