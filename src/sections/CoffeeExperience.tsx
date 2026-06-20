import { useScrollReveal } from '@/hooks/useScrollReveal';

const coffees = [
  { name: 'Mojito Cold Brew', badge: 'SIGNATURE' },
  { name: 'Single Origin Pour Over', badge: null },
  { name: 'Flat White', badge: null },
  { name: 'Classic Espresso', badge: null },
];

export default function CoffeeExperience() {
  const contentRef = useScrollReveal<HTMLDivElement>({
    x: -40,
    y: 0,
    duration: 0.9,
    start: 'top 80%',
  });
  const imageRef = useScrollReveal<HTMLDivElement>({
    x: 40,
    y: 0,
    duration: 0.9,
    delay: 0.2,
    start: 'top 80%',
  });

  return (
    <section id="coffee" className="bg-brand-dark py-[var(--section-padding-y)]">
      <div className="section-container">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content */}
          <div ref={contentRef} className="w-full lg:w-[45%]">
            <span
              className="font-ui font-medium text-[clamp(11px,1vw,12px)] tracking-[0.12em] uppercase text-brand-accent"
            >
              THE ROASTERY
            </span>
            <h2 className="mt-4 font-heading font-normal text-[clamp(26px,3.5vw,44px)] leading-[1.15] tracking-[0.02em] text-brand-inverse">
              Coffee, Crafted
              <br />
              With Care
            </h2>
            <p className="mt-3 font-ui font-medium text-[clamp(11px,1.1vw,13px)] tracking-[0.08em] uppercase text-white/60">
              In partnership with Roastery Coffee House
            </p>
            <p className="mt-6 font-body font-normal text-[clamp(14px,1.4vw,16px)] leading-[1.7] text-brand-inverse/70 max-w-[clamp(300px,90%,620px)]">
              Our coffee program is proudly backed by{' '}
              <strong className="font-semibold text-brand-accent">
                The Roastery Coffee House
              </strong>{' '}
              — Hyderabad&apos;s specialty coffee pioneers. From single-origin pour-overs to our signature
              Mojito Cold Brew, every cup is brewed with precision and passion.
            </p>

            <ul className="mt-8 space-y-2 max-w-[400px]">
              {coffees.map((coffee, index) => (
                <li key={index} className="flex items-center justify-between py-3 border-b border-brand-accent/20">
                  <span className="font-ui font-medium text-[clamp(12px,1.2vw,14px)] uppercase tracking-[0.08em] text-brand-inverse">
                    {coffee.name}
                  </span>
                  {coffee.badge && (
                    <span
                      className="font-ui font-medium text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 bg-brand-accent text-brand-dark rounded-sm"
                    >
                      {coffee.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a
                href="https://www.roasterycoffee.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-ui font-medium text-[13px] text-white border-b border-brand-accent pb-0.5 hover:text-brand-accent transition-colors duration-200 cursor-pointer min-h-[44px]"
              >
                Roastery Coffee House Partnership
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="w-full lg:w-[55%]">
            <div className="image-hover-zoom rounded-none overflow-hidden">
              <img
                src="/images/coffee-brewing.jpg"
                alt="Specialty pour-over coffee brewing at Cafe PS Cheese by Roastery"
                className="w-full aspect-[16/10] md:aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
