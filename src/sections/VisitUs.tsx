import { useScrollReveal } from '@/hooks/useScrollReveal';
import { WHATSAPP_RESERVE_URL } from '@/constants/links';

export default function VisitUs() {
  const infoRef = useScrollReveal<HTMLDivElement>({
    x: -40,
    y: 0,
    duration: 0.9,
    start: 'top 80%',
  });
  const mapRef = useScrollReveal<HTMLDivElement>({
    x: 40,
    y: 0,
    duration: 0.9,
    delay: 0.2,
    start: 'top 80%',
  });

  return (
    <section id="contact" className="relative bg-brand-bg-alt py-[var(--section-padding-y)] scroll-mt-[72px] scroll-anchor overflow-hidden">
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none opacity-[0.035]" aria-hidden="true">
        <img src="/images/logo-dark.png" alt="" className="w-[400px] h-[600px] object-contain" />
      </div>

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Info */}
          <div ref={infoRef} className="w-full lg:w-[50%] flex flex-col justify-between">
            <div>
              <span className="label-text">VISIT &amp; RESERVATIONS</span>
              <h2 className="mt-4 font-heading font-normal text-[clamp(28px,3.5vw,36px)] leading-[1.2] tracking-[0.02em] text-brand-dark">
                Visit Our Cafe
              </h2>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Location Column */}
                <div>
                  <span className="font-ui font-medium text-[clamp(11px,1vw,12px)] tracking-[0.1em] uppercase text-brand-accent-text">
                    Location
                  </span>
                  <div className="mt-3">
                    <p className="font-detail font-normal text-[clamp(14px,1.1vw,15px)] leading-[1.7] text-brand-dark">
                      Cafe PS Cheese by Roastery
                    </p>
                    <p className="mt-1 font-detail font-normal text-[clamp(14px,1.1vw,15px)] leading-[1.7] text-brand-text">
                      1-65/536, Kavuri Hills Road,<br />
                      Madhapur, Hyderabad,<br />
                      Telangana 500081
                    </p>
                  </div>
                </div>

                {/* Hours & Contact Column */}
                <div>
                  <span className="font-ui font-medium text-[clamp(11px,1vw,12px)] tracking-[0.1em] uppercase text-brand-accent-text">
                    Hours &amp; Contact
                  </span>
                  <div className="mt-3 font-detail font-normal text-[clamp(14px,1.1vw,15px)] leading-[1.7] text-brand-text">
                    <p className="font-normal text-brand-dark">Open Daily</p>
                    <p>8:00 AM – 11:00 PM</p>
                    <p className="mt-2 font-normal text-brand-dark">Phone</p>
                    <a href="tel:+919000795776" className="flex items-center min-h-[44px] hover:text-brand-accent-text transition-colors">+91 90007 95776</a>
                    <p className="mt-2 font-normal text-brand-dark">Email</p>
                    <a href="mailto:hello@pscheese.cafe" className="flex items-center min-h-[44px] hover:text-brand-accent-text transition-colors">hello@pscheese.cafe</a>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-brand-border pt-6">
                <p className="font-body font-normal text-[clamp(14px,1.1vw,15px)] leading-[1.65] text-brand-text italic max-w-[620px]">
                  Ready to book your table? We reply instantly on WhatsApp.
                </p>
              </div>
            </div>

            {/* CTA Stack — PRIMARY Reserve on top, then secondary buttons */}
            <div className="mt-10 flex flex-col gap-4">
              <a
                href={WHATSAPP_RESERVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center min-h-[44px] flex items-center justify-center"
              >
                Reserve a Table on WhatsApp
              </a>
              <p className="cta-microcopy text-center">
                Instant reply · No booking fee · No form required
              </p>
              <div className="flex flex-wrap gap-4 mt-2 justify-center sm:justify-start">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=PS+Cheese+Cafe+Kavuri+Hills+Madhapur+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary min-h-[44px] flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Get Directions
                </a>
                <a
                  href="tel:+919000795776"
                  className="btn-secondary min-h-[44px] flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11 19.79 19.79 0 01.01 2.38 2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
                  Call Us
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div ref={mapRef} className="w-full lg:w-[50%]">
            <div className="rounded-2xl overflow-hidden border-4 border-white/90 shadow-xl h-full min-h-[450px] lg:min-h-[550px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3025!2d78.3880!3d17.4385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91ef560a3e3f%3A0x6e60a8dfb0aa5e2b!2sPS%20Cheese%20Cafe!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '450px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cafe PS Cheese by Roastery Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
