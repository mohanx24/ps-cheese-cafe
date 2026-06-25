import { motion } from 'framer-motion';

const highlights = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8E6D30" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M19 6V4a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2c0-1.1.9-2 2-2h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1a2 2 0 0 0-2 2Z"/>
        <circle cx="5" cy="5" r="0.75" fill="#8E6D30" />
        <circle cx="9" cy="13" r="0.75" fill="#8E6D30" />
        <circle cx="5" cy="13" r="1" fill="#8E6D30" />
        <circle cx="13" cy="9" r="1.2" fill="#8E6D30" />
      </svg>
    ),
    title: 'Artisan Cheese',
    description: "Hyderabad's first in-house cheese factory. Fresh cream cheese, feta, ricotta, and mozzarella made daily from scratch.",
    colSpan: 'md:col-span-2',
    bg: 'bg-gradient-to-br from-white to-[rgba(200,167,106,0.035)]',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8E6D30" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    ),
    title: 'Specialty Coffee',
    description: 'Powered by Roastery Coffee House. Freshly roasted beans, pour-overs, cold brews, and signature espresso drinks.',
    colSpan: 'md:col-span-1',
    bg: 'bg-white',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8E6D30" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="7" r="2.5" />
        <line x1="12" y1="2" x2="12" y2="3.5" />
        <line x1="17" y1="4" x2="16" y2="5" />
        <line x1="7" y1="4" x2="8" y2="5" />
        <path d="M2 17c0-5.52 4.48-10 10-10s10 4.48 10 10v4H2v-4Z" />
        <line x1="12" y1="7" x2="12" y2="21" />
        <line x1="12" y1="7" x2="6" y2="21" />
        <line x1="12" y1="7" x2="18" y2="21" />
        <path d="M6 13.5a10.2 10.2 0 0 1 12 0" />
      </svg>
    ),
    title: 'Glass Roof Ambience',
    description: "A stunning, modern all-glass ceiling that floods the space with natural light. A magical vibe when it rains.",
    colSpan: 'md:col-span-1',
    bg: 'bg-white',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8E6D30" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 3L2 11h20L12 3Z" />
        <path d="M12 3v8" />
        <line x1="12" y1="11" x2="12" y2="21" />
        <path d="M8 17h8" />
        <line x1="10" y1="17" x2="9" y2="21" />
        <line x1="14" y1="17" x2="15" y2="21" />
        <path d="M5 16h2v3H5z" />
        <path d="M17 16h2v3H17z" />
      </svg>
    ),
    title: 'Outdoor Seating',
    description: 'Beautiful Mediterranean-style garden seating under the shade of large trees with elegant white furniture.',
    colSpan: 'md:col-span-1',
    bg: 'bg-white',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8E6D30" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 10a4 4 0 0 0-4 4c0 1.66 1.34 3 3 3h2c1.66 0 3-1.34 3-3a4 4 0 0 0-4-4Z" />
        <circle cx="8" cy="7" r="1.5" fill="#8E6D30" />
        <circle cx="12" cy="5" r="1.5" fill="#8E6D30" />
        <circle cx="16" cy="7" r="1.5" fill="#8E6D30" />
        <circle cx="6" cy="11" r="1.2" fill="#8E6D30" />
        <circle cx="18" cy="11" r="1.2" fill="#8E6D30" />
      </svg>
    ),
    title: 'Pet Friendly',
    description: 'Bring your furry companions along. Our outdoor green terrace welcomes pets to relax by your side.',
    colSpan: 'md:col-span-1',
    bg: 'bg-white',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8E6D30" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M16 11V7l-8 4v4l8-4Z" />
        <circle cx="10" cy="13" r="0.6" fill="#8E6D30" />
        <circle cx="13" cy="11.5" r="0.4" fill="#8E6D30" />
        <path d="M19 14.5v5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-5c0-1.5.8-2.5 1.8-3v-4.5h2v4.5c1 .5 1.8 1.5 1.8 3z" />
        <circle cx="5" cy="9" r="1" fill="#8E6D30" />
        <circle cx="7" cy="8.5" r="1" fill="#8E6D30" />
        <circle cx="6" cy="10.5" r="1" fill="#8E6D30" />
        <circle cx="4.5" cy="11.5" r="0.8" fill="#8E6D30" />
      </svg>
    ),
    title: 'Guided Cheese Tastings',
    description: 'Learn the art of cheesemaking. Our experts guide you through origin, pairing notes, and sensory tasting workshops.',
    colSpan: 'md:col-span-3',
    bg: 'bg-gradient-to-r from-white to-[rgba(200,167,106,0.035)]',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 20,
    },
  },
};

export default function Highlights() {
  return (
    <section id="highlights" className="relative bg-brand-bg py-[var(--section-padding-y)] overflow-hidden">
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none opacity-[0.035]" aria-hidden="true">
        <img src="/images/logo-dark.png" alt="" className="w-[400px] h-[600px] object-contain" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="label-text">WHY GUESTS LOVE IT</span>
          <h2 className="mt-4 font-heading font-normal text-[clamp(28px,3.5vw,36px)] leading-[1.2] tracking-[0.03em] text-brand-dark">
            The PS Cheese Experience
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -6,
                borderColor: 'rgba(200,167,106,0.35)',
                boxShadow: '0 20px 40px -15px rgba(45,27,20,0.08)',
              }}
              className={`group relative p-8 rounded-3xl border border-brand-border/40 ${item.bg} flex flex-col justify-between transition-colors duration-300 ${item.colSpan}`}
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/10 mb-6 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="font-heading font-normal text-[clamp(16px,1.5vw,19px)] text-brand-dark tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-3 font-body font-normal text-[clamp(13.5px,1.1vw,14.5px)] leading-[1.65] text-brand-text max-w-xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
