import { MapPin, Clock, Phone, Instagram, Heart } from 'lucide-react';
import Logo from '@/components/Logo';

const exploreLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu-preview' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const FooterColumnHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mb-6 select-none">
    <h4 className="font-ui text-[clamp(11px,1.2vw,13px)] tracking-[0.12em] text-brand-accent uppercase font-medium">
      {title}
    </h4>
    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/50 shrink-0" />
  </div>
);

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-dark text-brand-inverse relative overflow-hidden">
      {/* Background Subtle Light Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      
      <div className="section-container py-24 md:py-28 relative z-10">
        {/* Asymmetric 12-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1 — Brand (Spans 4 columns) */}
          <div className="space-y-4 lg:col-span-4">
            <Logo variant="light" />
            <span className="font-display italic font-light text-[clamp(20px,2vw,24px)] text-brand-inverse/90 leading-tight tracking-[0.02em] mt-5 block">
              Where Light Meets Cheese.
            </span>
            <p className="font-detail font-normal text-[clamp(11px,1vw,13px)] leading-[1.65] text-brand-inverse/50 max-w-[280px] mt-4">
              Artisanal cheese, specialty coffee, and warm hospitality in the heart of Madhapur.
            </p>
          </div>

          {/* Column 2 — Explore (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <FooterColumnHeader title="Explore" />
            <ul className="space-y-1">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="py-2 flex items-center gap-1 font-ui text-[clamp(11px,1vw,13px)] font-normal transition-all duration-300 hover:text-white text-brand-inverse/70 hover:translate-x-1 group/link"
                  >
                    <span className="opacity-0 w-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:w-3 text-brand-accent font-medium leading-none">
                      &rarr;
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Visit Us (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <FooterColumnHeader title="Visit Us" />
            <div className="space-y-6">
              <div className="flex items-start gap-3.5 group">
                <MapPin className="w-[18px] h-[18px] text-brand-accent shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <p className="font-detail font-normal text-[clamp(11px,1vw,13px)] leading-[1.6] text-brand-inverse/75">
                  1-65/536, Kavuri Hills Road
                  <br />
                  Madhapur, Hyderabad
                  <br />
                  Telangana 500081
                </p>
              </div>
              <div className="flex items-start gap-3.5 group">
                <Clock className="w-[18px] h-[18px] text-brand-accent shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <div className="font-detail font-normal text-[clamp(11px,1vw,13px)] leading-[1.6] text-brand-inverse/75">
                  <p className="font-semibold text-white">Open Daily</p>
                  <p>8:00 AM – 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4 — Contact & Follow (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <FooterColumnHeader title="Connect" />
            <div className="space-y-1">
              <a
                href="tel:+919000795776"
                className="py-2 flex items-center gap-1 group/link hover:translate-x-1 transition-all duration-300"
              >
                <span className="opacity-0 w-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:w-3 text-brand-accent font-medium leading-none">
                  &rarr;
                </span>
                <Phone className="w-[18px] h-[18px] text-brand-accent shrink-0 transition-transform duration-300 group-hover/link:scale-105" aria-hidden="true" />
                <span className="font-detail font-normal text-[clamp(11px,1vw,13px)] leading-[1.6] text-brand-inverse/75 group-hover/link:text-white transition-colors duration-300 ml-1">
                  +91 90007 95776
                </span>
              </a>
              <a
                href="https://instagram.com/pscheese.cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 flex items-center gap-1 group/link hover:translate-x-1 transition-all duration-300"
              >
                <span className="opacity-0 w-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:w-3 text-brand-accent font-medium leading-none">
                  &rarr;
                </span>
                <Instagram className="w-[18px] h-[18px] text-brand-accent shrink-0 transition-transform duration-300 group-hover/link:scale-105" aria-hidden="true" />
                <span className="font-detail font-normal text-[clamp(11px,1vw,13px)] leading-[1.6] text-brand-inverse/75 group-hover/link:text-white transition-colors duration-300 ml-1">
                  @pscheese.cafe
                </span>
              </a>
              <a
                href="https://wa.me/919000795776?text=Hi!%20I%27d%20like%20to%20reserve%20a%20table%20at%20Cafe%20PS%20Cheese."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 flex items-center gap-1 group/link hover:translate-x-1 transition-all duration-300"
              >
                <span className="opacity-0 w-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:w-3 text-brand-accent font-medium leading-none">
                  &rarr;
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#C6A15B" className="shrink-0" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span className="font-detail font-normal text-[clamp(11px,1vw,13px)] leading-[1.6] text-brand-inverse/75 group-hover/link:text-white transition-colors duration-300 ml-1">
                  Reserve on WhatsApp
                </span>
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=PS+Cheese+Cafe+Kavuri+Hills+Madhapur+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 flex items-center gap-1 group/link hover:translate-x-1 transition-all duration-300"
              >
                <span className="opacity-0 w-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:w-3 text-brand-accent font-medium leading-none">
                  &rarr;
                </span>
                <MapPin className="w-[18px] h-[18px] text-brand-accent shrink-0 transition-transform duration-300 group-hover/link:scale-105" aria-hidden="true" />
                <span className="font-detail font-normal text-[clamp(11px,1vw,13px)] leading-[1.6] text-brand-inverse/75 group-hover/link:text-white transition-colors duration-300 ml-1">
                  Find us on Google Maps
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Giant Typographic Wordmark for Luxury Brand Identity */}
        <div className="w-full text-center mt-20 select-none pointer-events-none">
          <h2 className="font-heading font-medium text-[clamp(44px,9vw,110px)] tracking-[0.25em] text-white/[0.04] leading-none uppercase">
            PS CHEESE
          </h2>
        </div>

        {/* Divider & Centered Leaf Twig Emblem */}
        <div className="flex items-center gap-6 mt-12 mb-10">
          <div className="h-px bg-brand-inverse/10 flex-grow" />
          <img
            src="/images/logo-light.png"
            alt="PS Cheese Leaf Divider"
            className="w-[18px] h-[27px] object-contain opacity-50 shrink-0 select-none pointer-events-none"
            loading="lazy"
            aria-hidden="true"
          />
          <div className="h-px bg-brand-inverse/10 flex-grow" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-detail font-normal text-[11px] leading-[1.6] text-brand-inverse/40">
          <p>&copy; 2026 Cafe PS Cheese by Roastery. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-brand-accent shrink-0 fill-brand-accent/20" aria-hidden="true" />
            <span>Crafted with care in Hyderabad.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
