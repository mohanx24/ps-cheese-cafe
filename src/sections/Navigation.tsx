import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import SideMenu from '@/components/SideMenu';
import { WHATSAPP_RESERVE_URL } from '@/constants/links';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu-preview' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const navVariants = {
  default: {
    width: '100%',
    maxWidth: '1920px',
    borderRadius: '0px',
    top: '0px',
    x: '-50%',
    left: '50%',
    height: '72px',
    backgroundColor: 'rgba(247, 243, 238, 0.85)',
    borderColor: 'rgba(229, 221, 209, 0.8)',
    boxShadow: '0 1px 2px rgba(43,29,21,0.05)',
  },
  capsule: {
    width: '90%',
    maxWidth: '820px',
    borderRadius: '9999px',
    top: '16px',
    x: '-50%',
    left: '50%',
    height: '58px',
    backgroundColor: 'rgba(247, 243, 238, 0.65)',
    borderColor: 'rgba(229, 221, 209, 0.4)',
    boxShadow: '0 12px 40px rgba(43, 29, 21, 0.08)',
  }
};

const ctaVariants = {
  default: {
    borderRadius: '0px',
    height: '40px',
    paddingLeft: '20px',
    paddingRight: '20px',
    fontSize: '12px',
    letterSpacing: '0.06em',
    minWidth: '200px',
    minHeight: '40px',
  },
  capsule: {
    borderRadius: '9999px',
    height: '34px',
    paddingLeft: '16px',
    paddingRight: '16px',
    fontSize: '10.5px',
    letterSpacing: '0.06em',
    minWidth: '0px',
    minHeight: '0px',
  }
};

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 120; // Offset for page header
      const sections = ['home', 'menu-preview', 'gallery', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isCapsule = scrolled && !menuOpen;
  const currentVariant = isCapsule ? 'capsule' : 'default';

  return (
    <motion.nav
      ref={navRef}
      initial="default"
      animate={currentVariant}
      variants={navVariants}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 28,
        mass: 0.8
      }}
      className="fixed z-50 border backdrop-blur-xl backdrop-saturate-150 p-0 overflow-visible"
    >
      <div className={`h-full flex items-center justify-between w-full max-w-[var(--max-content-width)] mx-auto transition-all duration-500 ease-out ${isCapsule ? 'px-4 md:px-5' : 'px-6 md:px-10'}`}>
        <motion.a
          layout
          href="#"
          className="flex items-center select-none group h-full"
          aria-label="Cafe PS Cheese by Roastery home"
        >
          <Logo />
        </motion.a>

        {/* Desktop Nav Links & CTA */}
        <motion.div layout className="hidden md:flex items-center gap-8 h-full">
          <motion.div
            layout
            className="flex items-center gap-3 h-full relative"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = targetId === activeSection;
              return (
                <motion.a
                  layout
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredTab(link.href)}
                  initial="initial"
                  whileHover="hover"
                  className={`font-ui font-medium text-[clamp(11px,1.2vw,13px)] tracking-[0.06em] uppercase relative px-4 py-1.5 rounded-full z-10 flex items-center group overflow-visible`}
                >
                  <span className="relative z-20 inline-block h-[18px] overflow-hidden">
                    <motion.span
                      variants={{
                        initial: { y: 0 },
                        hover: { y: '-50%' }
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 24
                      }}
                      className="flex flex-col h-[36px]"
                    >
                      <span className={`block h-[18px] leading-[18px] transition-colors duration-200 ${isActive ? 'text-brand-accent-text' : 'text-brand-dark'}`}>
                        {link.label}
                      </span>
                      <span className="block h-[18px] leading-[18px] text-brand-accent-text">
                        {link.label}
                      </span>
                    </motion.span>
                  </span>
                  {hoveredTab === link.href && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-brand-accent/10 rounded-full z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 26,
                      }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-accent z-20"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 24,
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </motion.div>
          <motion.a
            layout
            variants={ctaVariants}
            animate={currentVariant}
            transition={{
              type: 'spring',
              stiffness: 240,
              damping: 28,
              mass: 0.8
            }}
            href={WHATSAPP_RESERVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary uppercase font-ui font-medium flex items-center justify-center transition-colors duration-200"
          >
            Reserve Table
          </motion.a>
        </motion.div>

        {/* Mobile Hamburger with SVG morph */}
        <button
          className={`relative z-50 md:hidden flex items-center justify-center w-12 h-12 transition-colors duration-300 ${
            menuOpen ? 'text-[#F7F3EE] hover:text-[#C6A15B]' : 'text-brand-dark hover:text-brand-accent-text'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
        >
          <svg
            viewBox="0 0 32 32"
            className="w-7 h-7"
            style={{
              transform: menuOpen ? "rotate(-45deg)" : "rotate(0deg)",
              transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Top/bottom curved line */}
            <path
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              strokeDasharray={menuOpen ? "20 300" : "12 63"}
              strokeDashoffset={menuOpen ? -32.42 : 0}
              style={{
                transition: "stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            {/* Middle line */}
            <path
              d="M7 16 27 16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              style={{
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 300ms ease",
              }}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Side Menu */}
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={navLinks}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
    </motion.nav>
  );
}
