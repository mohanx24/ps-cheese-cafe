import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const categories = [
  'Cheese Platters',
  'Pastas',
  'Pizzas',
  'Desserts',
  'Coffee',
];

const fullMenu = [
  {
    category: 'Artisan Cheese Platters',
    items: [
      { name: 'Classic Cheese Board', price: '₹650', desc: 'Selection of 3 house-made cheeses, seasonal fresh fruits, honeycomb, and house-made artisan crackers.' },
      { name: 'Signature Burrata Platter', price: '₹720', desc: 'Fresh whole burrata served with vine-ripened heirloom tomatoes, fresh basil pesto, and charred sourdough.' },
      { name: 'Warm Baked Feta', price: '₹590', desc: 'In-house goat milk feta baked with cherry tomatoes, kalamata olives, garlic, and fresh olive oil.' }
    ]
  },
  {
    category: 'Specialty Coffee',
    items: [
      { name: 'Mojito Cold Brew', price: '₹280', desc: 'Signature cold brew muddled with fresh mint sprigs, lime wedge, and a splash of soda.' },
      { name: 'Pour Over (Single Origin)', price: '₹250', desc: 'Premium hand-poured coffee using beans sourced and roasted by The Roastery Coffee House.' },
      { name: 'Espresso Tonic', price: '₹260', desc: 'Double shot of signature espresso poured over tonic water, ice, and a slice of fresh orange.' }
    ]
  },
  {
    category: 'Gourmet Pastas & Pizzas',
    items: [
      { name: 'Handmade Spaghetti Pasta', price: '₹590', desc: 'Tomato-basil spaghetti, finished with herb crumb and garlic toast.' },
      { name: 'Burrata Arrabbiata Pasta', price: '₹580', desc: 'Penne tossed in slow-cooked spicy tomato sauce, topped with a whole fresh burrata and microgreens.' },
      { name: 'Four Cheese Sourdough Pizza', price: '₹620', desc: 'House mozzarella, ricotta, cream cheese, and sharp cheddar on a slow-fermented sourdough crust.' },
      { name: 'Spinach & Ricotta Ravioli', price: '₹560', desc: 'Handmade ravioli filled with fresh garden spinach and house ricotta, in a light sage butter sauce.' }
    ]
  },
  {
    category: 'House Desserts',
    items: [
      { name: 'Basque Cheesecake', price: '₹350', desc: 'Rich, creamy burnt-style cheesecake with a gooey center. Baked fresh in-house daily.' },
      { name: 'Coffee-Pairing Tiramisu', price: '₹380', desc: 'Ladyfingers soaked in Roastery espresso, layered with fresh mascarpone and premium dark cocoa.' }
    ]
  }
];

export default function MenuPreview() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const headerRef = useScrollReveal<HTMLDivElement>();
  const categoriesRef = useScrollReveal<HTMLDivElement>({
    children: true,
    stagger: 0.08,
    y: 20,
    duration: 0.6,
    start: 'top 80%',
  });
  const ctaRef = useScrollReveal<HTMLDivElement>({ y: 20, delay: 0.3 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  useEffect(() => {
    if (!isMenuOpen) {
      setIsBookOpen(false);
      return;
    }

    // Auto-open book after mounting modal transition completes
    const timer = setTimeout(() => {
      setIsBookOpen(true);
    }, 700);

    const previousFocus = document.activeElement as HTMLElement | null;
    const focusableElementsSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = modalRef.current;

    if (modal) {
      const focusables = modal.querySelectorAll<HTMLElement>(focusableElementsSelector);
      if (focusables.length > 0) {
        setTimeout(() => {
          focusables[0].focus();
        }, 50);
      } else {
        modal.focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }

      // Focus trap: Tab cycles within modal
      if (e.key === 'Tab' && modal) {
        const focusables = Array.from(
          modal.querySelectorAll<HTMLElement>(focusableElementsSelector)
        ).filter((el) => !(el as HTMLButtonElement | HTMLInputElement).disabled && el.offsetParent !== null);

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleOpenModal = () => setIsMenuOpen(true);
    window.addEventListener('open-menu-modal', handleOpenModal);
    return () => window.removeEventListener('open-menu-modal', handleOpenModal);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  return (
    <section id="menu-preview" className="bg-brand-bg-alt py-[var(--section-padding-y)] scroll-mt-[72px] scroll-anchor">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto">
          {/* Header */}
          <div ref={headerRef}>
            <span className="label-text">EXPLORE OUR MENU</span>
            <h2 className="mt-4 font-display font-normal text-[clamp(28px,3.5vw,42px)] leading-[1.2] tracking-[0.02em] text-brand-dark">
              Something For
              <br />
              Every Palate
            </h2>
          </div>

          {/* Categories — Pill grid on mobile, horizontal on desktop */}
          <div
            ref={categoriesRef}
            className="mt-10"
          >
            {/* Mobile: pill grid */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:hidden">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-block px-4 py-2 rounded-full border border-brand-border bg-white font-ui font-medium text-[12px] uppercase tracking-[0.06em] text-brand-dark"
                >
                  {category}
                </span>
              ))}
            </div>
            {/* Desktop: horizontal with bullet separators */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {categories.map((category, index) => (
                <span key={index} className="flex items-center gap-6">
                  <span className="font-ui font-medium text-[clamp(13px,1.2vw,14px)] uppercase tracking-[0.06em] text-brand-dark whitespace-nowrap">
                    {category}
                  </span>
                  {index < categories.length - 1 && (
                    <span className="text-brand-accent" aria-hidden="true">&bull;</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="mt-12 flex flex-col items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="btn-secondary min-h-[52px] flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              View Full Menu
            </button>
            <p className="cta-microcopy">Click to open interactive menu &bull; Changes seasonally</p>
          </div>
        </div>
      </div>

      {/* 3D Restaurant Menu Modal Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
          >
            {/* Close Overlay Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-brand-bg border border-brand-accent/20 text-brand-dark hover:bg-brand-bg-alt hover:scale-105 transition-all cursor-pointer z-50 shadow-lg"
              aria-label="Close menu modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* 3D Container */}
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative focus:outline-none flex items-center justify-center"
              style={{
                perspective: 1600,
                width: isMobile ? '340px' : '860px',
                height: isMobile ? '500px' : '580px',
              }}
            >
              {!isMobile ? (
                /* ═════════════════════════════════════════
                   DESKTOP BI-FOLD 3D BOOK MENU
                   ═════════════════════════════════════════ */
                <motion.div
                  className="w-full h-full relative"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ x: isBookOpen ? 0 : -215 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                >
                  {/* static right page (Underneath cover on the right side) */}
                  <div
                    className="absolute left-1/2 top-0 w-1/2 h-full bg-brand-bg border border-brand-accent/20 border-l-0 rounded-r-lg pt-8 pb-5 px-10 text-left overflow-y-auto z-10 shadow-2xl flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div 
                      className="flex flex-col h-full justify-between transition-opacity duration-200"
                      style={{ opacity: isBookOpen ? 1 : 0 }}
                    >
                      <div className="space-y-4 pr-1">
                        {/* Section 3: Pastas & Pizzas */}
                        <div className="space-y-2">
                          <h4 className="font-heading font-bold text-[13px] text-brand-accent-text tracking-[0.07em] uppercase border-b border-brand-accent/20 pb-2">
                            Gourmet Pastas &amp; Pizzas
                          </h4>
                          <div className="space-y-3.5">
                            {fullMenu[2].items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-start gap-4">
                                <div className="space-y-0.5">
                                  <h5 className="font-heading font-bold text-[14px] text-brand-dark leading-tight tracking-[0.02em]">{item.name}</h5>
                                  <p className="font-body font-light text-[11.5px] text-brand-text/90 leading-[1.55]">{item.desc}</p>
                                </div>
                                <span className="font-heading font-bold text-[12.5px] text-brand-accent-text whitespace-nowrap">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section 4: Desserts */}
                        <div className="space-y-2 pt-1.5">
                          <h4 className="font-heading font-bold text-[13px] text-brand-accent-text tracking-[0.07em] uppercase border-b border-brand-accent/20 pb-2">
                            House Desserts
                          </h4>
                          <div className="space-y-3.5">
                            {fullMenu[3].items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-start gap-4">
                                <div className="space-y-0.5">
                                  <h5 className="font-heading font-bold text-[14px] text-brand-dark leading-tight tracking-[0.02em]">{item.name}</h5>
                                  <p className="font-body font-light text-[11.5px] text-brand-text/90 leading-[1.55]">{item.desc}</p>
                                </div>
                                <span className="font-heading font-bold text-[12.5px] text-brand-accent-text whitespace-nowrap">{item.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="font-detail font-medium text-[8.5px] text-brand-text/30 text-center tracking-[0.06em] uppercase mt-2">
                        Tap page left edge to fold cover back
                      </p>
                    </div>
                  </div>

                  {/* 3D Hinge crease shadow (adds realistic book-fold crease) */}
                  {isBookOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.65 }}
                      transition={{ delay: 0.4 }}
                      className="absolute left-1/2 top-0 w-8 h-full bg-gradient-to-r from-black/10 via-black/25 to-black/10 -translate-x-1/2 pointer-events-none z-30 blur-[0.5px]"
                      aria-hidden="true"
                    />
                  )}

                  {/* 3D folding page (Contains front cover and left inner page) */}
                  <motion.div
                    onClick={() => setIsBookOpen(!isBookOpen)}
                    style={{
                      transformOrigin: 'left center',
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{ rotateY: isBookOpen ? -180 : 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 1 }}
                    className="absolute left-1/2 top-0 w-1/2 h-full z-20 cursor-pointer origin-left"
                  >
                    {/* FRONT FACE: Cover page */}
                    <div
                      style={{ backfaceVisibility: 'hidden' }}
                      className="absolute inset-0 bg-[#2D1B14] border-2 border-brand-accent/30 rounded-r-lg p-8 flex flex-col items-center justify-between text-center shadow-xl select-none"
                    >
                      {/* Gold framing border */}
                      <div className="absolute inset-2 border border-brand-accent/20 rounded pointer-events-none" />

                      {/* Header emblem */}
                      <div className="mt-12 flex flex-col items-center">
                        <img
                          src="/images/logo-light.png"
                          alt=""
                          className="w-[38px] h-[56px] object-contain opacity-80"
                        />
                        <span className="font-heading font-medium text-[11px] tracking-[0.22em] text-brand-accent mt-4.5">
                          CAFE
                        </span>
                        <h3 className="font-heading font-bold text-2xl text-brand-inverse tracking-[0.12em] mt-2 uppercase">
                          PS CHEESE
                        </h3>
                        <span className="font-heading font-medium text-[9px] tracking-[0.18em] text-brand-inverse/40 mt-1.5">
                          BY ROASTERY
                        </span>
                      </div>

                      {/* Cover prompt */}
                      <div className="mb-8 flex flex-col items-center gap-3">
                        <span className="font-heading font-medium text-[10.5px] tracking-[0.15em] text-brand-accent uppercase">
                          View Full Menu
                        </span>
                        <p className="font-body font-light text-[11.5px] text-brand-inverse/50 italic">
                          Click cover to unfold
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsBookOpen(true);
                          }}
                          className="mt-1 px-5 py-2 rounded-full border border-brand-accent/40 text-brand-accent text-xs tracking-wider uppercase font-ui hover:bg-brand-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D1B14]"
                        >
                          Open Menu
                        </button>
                      </div>
                    </div>

                    {/* BACK FACE: Left inner page (Revealed when open) */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                      className="absolute inset-0 bg-brand-bg border border-brand-accent/20 border-r-0 rounded-l-lg pt-8 pb-5 px-10 text-left overflow-y-auto flex flex-col justify-between"
                    >
                      <div 
                        className="flex flex-col h-full justify-between transition-opacity duration-200"
                        style={{ opacity: isBookOpen ? 1 : 0 }}
                      >
                        <div className="space-y-4 pr-1">
                          {/* Section 1: Artisan Cheese Platters */}
                          <div className="space-y-2">
                            <h4 className="font-heading font-bold text-[13px] text-brand-accent-text tracking-[0.07em] uppercase border-b border-brand-accent/20 pb-2">
                              Artisan Cheese Platters
                            </h4>
                            <div className="space-y-3.5">
                              {fullMenu[0].items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start gap-4">
                                  <div className="space-y-0.5">
                                    <h5 className="font-heading font-bold text-[14px] text-brand-dark leading-tight tracking-[0.02em]">{item.name}</h5>
                                    <p className="font-body font-light text-[11.5px] text-brand-text/90 leading-[1.55]">{item.desc}</p>
                                  </div>
                                  <span className="font-heading font-bold text-[12.5px] text-brand-accent-text whitespace-nowrap">{item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Section 2: Coffee Program */}
                          <div className="space-y-2 pt-1.5">
                            <h4 className="font-heading font-bold text-[13px] text-brand-accent-text tracking-[0.07em] uppercase border-b border-brand-accent/20 pb-2">
                              Specialty Coffee
                            </h4>
                            <div className="space-y-3.5">
                              {fullMenu[1].items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start gap-4">
                                  <div className="space-y-0.5">
                                    <h5 className="font-heading font-bold text-[14px] text-brand-dark leading-tight tracking-[0.02em]">{item.name}</h5>
                                    <p className="font-body font-light text-[11.5px] text-brand-text/90 leading-[1.55]">{item.desc}</p>
                                  </div>
                                  <span className="font-heading font-bold text-[12.5px] text-brand-accent-text whitespace-nowrap">{item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                /* ═════════════════════════════════════════
                   MOBILE SINGLE-PAGE 3D CARD FLIP
                   ═════════════════════════════════════════ */
                <motion.div
                  onClick={() => setIsBookOpen(!isBookOpen)}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{ rotateY: isBookOpen ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  className="w-full h-full relative cursor-pointer"
                >
                  {/* FRONT FACE: Mobile Cover */}
                  <div
                    style={{ backfaceVisibility: 'hidden' }}
                    className="absolute inset-0 bg-[#2D1B14] border-2 border-brand-accent/30 rounded-lg p-6 flex flex-col items-center justify-between text-center shadow-xl select-none"
                  >
                    <div className="absolute inset-2 border border-brand-accent/20 rounded pointer-events-none" />

                    <div className="mt-12 flex flex-col items-center">
                      <img
                        src="/images/logo-light.png"
                        alt=""
                        className="w-[34px] h-[48px] object-contain opacity-80"
                      />
                      <span className="font-heading font-medium text-[10.5px] tracking-[0.2em] text-brand-accent mt-4">
                        CAFE
                      </span>
                      <h3 className="font-heading font-bold text-xl text-brand-inverse tracking-[0.12em] mt-1.5 uppercase">
                        PS CHEESE
                      </h3>
                      <span className="font-heading font-medium text-[8.5px] tracking-[0.15em] text-brand-inverse/40 mt-1">
                        BY ROASTERY
                      </span>
                    </div>

                    <div className="mb-8 flex flex-col items-center gap-2">
                      <span className="font-heading font-medium text-[9.5px] tracking-[0.12em] text-brand-accent uppercase">
                        Tap To Flip &amp; Open Menu
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsBookOpen(true);
                        }}
                        className="mt-2 px-4 py-1.5 rounded-full border border-brand-accent/40 text-brand-accent text-[10px] tracking-wider uppercase font-ui hover:bg-brand-accent/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                      >
                        Open Menu
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE: Mobile Menu Scrollable List */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                    className="absolute inset-0 bg-brand-bg border-2 border-brand-accent/20 rounded-lg p-6 text-left flex flex-col shadow-xl"
                  >
                    <div 
                      className="flex flex-col h-full overflow-hidden transition-opacity duration-200"
                      style={{ opacity: isBookOpen ? 1 : 0 }}
                    >
                      <div className="border-b border-brand-border pb-3 flex justify-between items-center shrink-0">
                        <span className="font-heading font-bold text-xs text-brand-dark tracking-wide uppercase">The Menu</span>
                        <span className="font-detail font-normal text-[8px] text-brand-text/50 uppercase">Tap card to close</span>
                      </div>

                      <div className="flex-grow overflow-y-auto mt-4 pr-1 space-y-6">
                        {fullMenu.map((sec, sIdx) => (
                          <div key={sIdx} className="space-y-2.5">
                            <h4 className="font-heading font-bold text-[13px] text-brand-accent-text tracking-[0.06em] uppercase border-b border-brand-accent/20 pb-1.5">
                              {sec.category}
                            </h4>
                            <div className="space-y-4">
                              {sec.items.map((item, iIdx) => (
                                <div key={iIdx} className="flex justify-between items-start gap-4">
                                  <div className="space-y-1">
                                    <h5 className="font-heading font-bold text-[13.5px] text-brand-dark leading-tight tracking-[0.02em]">{item.name}</h5>
                                    <p className="font-body font-light text-[11.5px] text-brand-text/90 leading-[1.5]">{item.desc}</p>
                                  </div>
                                  <span className="font-heading font-bold text-[12.5px] text-brand-accent-text whitespace-nowrap">{item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
