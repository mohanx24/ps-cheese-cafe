import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_RESERVE_URL } from '@/constants/links';

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ label: string; href: string }>;
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export default function SideMenu({
  isOpen,
  onClose,
  navLinks,
  activeSection,
  onNavClick,
}: SideMenuProps) {
  const [height, setHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Focus trap + Escape to close + body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Store element that opened the menu
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus first focusable element inside menu
    const focusableSelector = 'a, button, [tabindex]:not([tabindex="-1"])';
    const focusables = menuRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
    focusables?.[0]?.focus();

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && menuRef.current) {
        const elements = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(focusableSelector)
        ).filter((el) => !(el as HTMLButtonElement | HTMLInputElement).disabled && el.offsetParent !== null);

        if (elements.length === 0) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Return focus to the element that opened the menu
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  // Dynamically constructed curved SVG paths for the liquid reveal effect
  const initialPath = `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L100 ${height} Q100 ${height / 2} 100 0`;

  const sidebarVariants = {
    closed: {
      x: '100%',
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const },
    },
    open: {
      x: '0%',
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  const curveVariants = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  const linksContainerVariants = {
    initial: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
    enter: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
  };

  const linkVariants = {
    initial: { x: 50, opacity: 0 },
    enter: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-[1.5px] z-40 cursor-pointer"
          />

          {/* Sidebar Drawer */}
          <motion.div
            ref={menuRef}
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-screen w-full sm:w-[360px] bg-[#2D1B14] text-[#F7F3EE] z-45 flex flex-col justify-between p-12 sm:p-16 box-border shadow-2xl"
          >
            {/* SVG Liquid Curve Border (Desktop/Tablet scale style) */}
            <div className="hidden sm:block absolute top-0 left-[-99px] w-[100px] h-full pointer-events-none">
              <svg className="w-full h-full fill-[#2D1B14] stroke-none">
                <motion.path
                  variants={curveVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                />
              </svg>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col flex-1 justify-center mt-12">
              <span className="font-ui font-semibold text-[10px] tracking-[0.2em] text-[#C6A15B] uppercase border-b border-[#FAF7F2]/10 pb-3 mb-6 select-none">
                Navigation
              </span>
              
              <motion.div
                variants={linksContainerVariants}
                initial="initial"
                animate="enter"
                exit="initial"
                className="flex flex-col gap-6"
              >
                {navLinks.map((link) => {
                  const targetId = link.href.replace('#', '');
                  const isActive = targetId === activeSection;

                  return (
                    <motion.div key={link.href} variants={linkVariants} className="overflow-hidden">
                      <a
                        href={link.href}
                        onClick={(e) => onNavClick(e, link.href)}
                        className={`font-heading font-normal text-3xl transition-colors duration-200 block py-1 relative ${
                          isActive ? 'text-[#C6A15B]' : 'text-[#F7F3EE] hover:text-[#C6A15B]'
                        }`}
                      >
                        {link.label}
                      </a>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Reservation CTA & Footer Socials */}
            <div className="flex flex-col gap-8 mt-auto pt-6 border-t border-[#FAF7F2]/10">
              <a
                href={WHATSAPP_RESERVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="btn-primary w-full py-3.5 text-center text-xs tracking-wider uppercase font-ui flex items-center justify-center gap-2 bg-[#F7F3EE] text-[#2D1B14] hover:bg-[#FAF7F2] hover:scale-[1.02] transition-all rounded-full"
              >
                <span>Reserve on WhatsApp</span>
              </a>
              
              <div className="flex justify-between items-center text-xs font-ui text-[#FAF7F2]/50">
                <span className="select-none">© 2026 PS Cheese</span>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FAF7F2] transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FAF7F2] transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
