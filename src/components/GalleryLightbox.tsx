import { useEffect, useRef } from 'react';

type ImageItem = {
  src: string;
  alt: string;
};

type GalleryLightboxProps = {
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const total = images.length;
  const currentImage = images[currentIndex];
  const lightboxRef = useRef<HTMLDivElement>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onNavigate((currentIndex - 1 + total) % total);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onNavigate((currentIndex + 1) % total);
  };

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusableElementsSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const lightbox = lightboxRef.current;
    if (lightbox) {
      const focusables = lightbox.querySelectorAll<HTMLElement>(focusableElementsSelector);
      if (focusables.length > 0) {
        setTimeout(() => {
          focusables[0].focus();
        }, 50);
      } else {
        lightbox.focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + total) % total);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % total);
      } else if (e.key === 'Tab') {
        const lightbox = lightboxRef.current;
        if (!lightbox) return;

        const focusables = Array.from(lightbox.querySelectorAll<HTMLElement>(focusableElementsSelector));
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [currentIndex, onClose, onNavigate, total]);

  return (
    <div
      ref={lightboxRef}
      tabIndex={-1}
      className="lightbox-overlay fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md focus:outline-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* Top Bar: Counter & Close Button */}
      <div className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 z-20 bg-gradient-to-b from-black/50 to-transparent">
        <span className="font-body text-xs tracking-[0.1em] text-white/60">
          {currentIndex + 1} / {total}
        </span>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
          aria-label="Close gallery"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all cursor-pointer z-10 hover:scale-105"
        aria-label="Previous image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all cursor-pointer z-10 hover:scale-105"
        aria-label="Next image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Center Image */}
      <div className="relative max-w-[90vw] max-h-[75vh] md:max-h-[80vh] flex items-center justify-center mt-8">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain rounded shadow-2xl select-none"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

    </div>
  );
}
