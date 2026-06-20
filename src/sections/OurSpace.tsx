import { useScrollReveal } from '@/hooks/useScrollReveal';

const features = [
  'All-glass roof with steel grid framing',
  'Mediterranean yellow & white interiors',
  'Arched lattice windows',
  'Indoor & outdoor seating',
  'Lush greenery throughout',
];

export default function OurSpace() {
  const imageRef = useScrollReveal<HTMLDivElement>({
    x: -40,
    y: 0,
    duration: 0.9,
    start: 'top 80%',
  });
  const contentRef = useScrollReveal<HTMLDivElement>({
    x: 40,
    y: 0,
    duration: 0.9,
    delay: 0.2,
    start: 'top 80%',
  });

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="our-space" className="relative bg-brand-bg-alt py-[var(--section-padding-y)] scroll-mt-[72px] scroll-anchor overflow-hidden">
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none opacity-[0.035]" aria-hidden="true">
        <img src="/images/logo-dark.png" alt="" className="w-[400px] h-[600px] object-contain" />
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-14 lg:gap-20">
          {/* Asymmetrical Editorial Image - Occupies 58% width */}
          <div ref={imageRef} className="w-full md:w-[52%] lg:w-[58%]">
            <div className="image-hover-zoom rounded-none overflow-hidden">
              <img
                src="/images/space-interior.jpg"
                alt="Cafe PS Cheese by Roastery interior with glass roof, checkered floor, and arched windows"
                className="w-full aspect-[3/2] md:aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Supporting Text Column - Offset with pt-12 on desktop */}
          <div ref={contentRef} className="w-full md:w-[44%] lg:w-[38%] lg:pt-12">
            <span className="label-text">THE AMBIENCE</span>
            <h2 className="mt-4 font-heading font-normal text-[clamp(28px,3.5vw,36px)] leading-[1.2] tracking-[0.02em] text-brand-dark">
              Where Light Meets Cheese
            </h2>
            <p className="mt-6 font-body font-normal text-[clamp(14px,1.1vw,15px)] leading-[1.75] text-brand-text max-w-[90%]">
              Step into a Mediterranean-inspired sanctuary in the heart of Hyderabad.
              Our all-glass structure — including the ceiling — floods the space with
              natural light, while yellow and white checkered floors, arched lattice
              windows, and abundant greenery create an atmosphere unlike any other cafe
              in the city. Every corner is designed to make you pause, breathe, and savor.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <span className="w-5 h-px bg-brand-accent flex-shrink-0" aria-hidden="true" />
                  <span className="font-body font-normal text-[clamp(14px,1.1vw,15px)] leading-[1.65] text-brand-dark">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="soft-link"
              >
                Find us in Kavuri Hills, Madhapur →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
