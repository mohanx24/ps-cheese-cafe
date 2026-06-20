import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import GalleryLightbox from '@/components/GalleryLightbox';
import { WHATSAPP_RESERVE_URL } from '@/constants/links';

const galleryImages = [
  {
    src: '/images/hero-interior.jpg',
    alt: 'Sunlit interior dining space of Cafe PS Cheese showing glass roof ceiling, checkered floors, and marble tables',
  },
  {
    src: '/images/coffee-bar.jpg',
    alt: 'Specialty coffee bar counter featuring espresso setups under glass skylight roof',
  },
  {
    src: '/images/gallery-aesthetics.png',
    alt: 'Mediterranean style garden seating terrace with white ornate tables and chairs in front of the yellow building',
  },
  {
    src: '/images/exterior-building.jpg',
    alt: 'Yellow circular outdoor signboard reading CAFE PS CHEESE BY ROASTERY surrounded by green tree leaves',
  },
  {
    src: '/images/interior-garland.jpg',
    alt: 'Cozy interior dining seating area adorned with festive green pine garlands and lights around the arched windows',
  },
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="gallery" className="relative bg-brand-bg py-[var(--section-padding-y)] scroll-mt-[72px] scroll-anchor overflow-hidden">
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none opacity-[0.03]" aria-hidden="true">
        <img src="/images/logo-dark.png" alt="" className="w-[400px] h-[600px] object-contain" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center">
          <span className="label-text">SEE IT FOR YOURSELF</span>
          <h2 className="mt-4 font-heading font-normal text-[clamp(28px,3.5vw,36px)] leading-[1.2] tracking-[0.02em] text-brand-dark">
            Explore the Spots of Cafe PS Cheese
          </h2>
          <p className="mt-3 font-body font-normal text-[clamp(14px,1.1vw,15px)] leading-[1.5] text-brand-text max-w-xl mx-auto">
            Discover the beautiful, sun-drenched corners and Mediterranean aesthetics of our space. Click or tap any spot to experience it in fullscreen.
          </p>
        </div>

        {/* Premium Asymmetric Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto auto-rows-[250px] md:auto-rows-[280px]">
          {galleryImages.map((img, index) => {
            let spanClass = "";
            if (index === 0) spanClass = "md:col-span-1 md:row-span-2 h-full";
            else if (index === 1) spanClass = "md:col-span-2 md:row-span-1 h-full";
            else if (index === 2) spanClass = "md:col-span-1 md:row-span-1 h-full";
            else if (index === 3) spanClass = "md:col-span-1 md:row-span-1 h-full";
            else if (index === 4) spanClass = "md:col-span-3 md:row-span-1 h-full";

            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => setLightboxIdx(index)}
                className={`relative rounded-[24px] overflow-hidden group border border-brand-border/20 cursor-pointer w-full text-left focus:outline-none bg-brand-bg-alt ${spanClass}`}
                whileHover={{
                  y: -8,
                  boxShadow: "0 24px 48px -12px rgba(45,27,20,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                aria-label="View image fullscreen"
              >
                {/* Image */}
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="lazy"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Elegant Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
                
                {/* Subtle zoom icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/15">
                  <div className="p-3.5 rounded-full bg-[rgba(250,247,242,0.9)] backdrop-blur-md text-brand-dark shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="font-body font-normal text-[clamp(14px,1.2vw,16px)] leading-[1.6] text-brand-dark max-w-[clamp(300px,90%,620px)] mx-auto mb-6">
            Want to experience this in person?
          </p>
          <a
            href={WHATSAPP_RESERVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Reserve a Table
          </a>
        </div>
      </div>

      {lightboxIdx !== null && (
        <GalleryLightbox
          images={galleryImages}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNavigate={setLightboxIdx}
        />
      )}
    </section>
  );
}
