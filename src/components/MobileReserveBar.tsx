import { useEffect, useState } from 'react';
import { WHATSAPP_RESERVE_URL } from '@/constants/links';

export default function MobileReserveBar() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Add body class for bottom padding
    document.body.classList.add('has-mobile-bar');

    // IntersectionObserver to hide when #contact section is visible
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHidden(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(contactSection);

    return () => {
      document.body.classList.remove('has-mobile-bar');
      observer.disconnect();
    };
  }, []);

  return (
    <aside role="complementary" aria-label="Mobile Reservations" className={`mobile-reserve-bar${isHidden ? ' is-hidden' : ''}`}>
      <a
        href={WHATSAPP_RESERVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-reserve-bar__button"
      >
        {/* WhatsApp SVG icon — white, 20px */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="shrink-0"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.388 2.01 13.916.996 12.22.996c-5.433 0-9.859 4.37-9.863 9.8-.001 1.742.469 3.44 1.357 4.952L2.73 21.03l5.35-1.4c1.554.848 3.186 1.295 4.567 1.295h.001zM17.57 14.398c-.3-.149-1.777-.864-2.052-.962-.275-.099-.475-.149-.675.15-.2.298-.775.962-.95 1.162-.175.199-.35.223-.65.074-1.614-.765-2.795-1.328-3.922-2.28-.299-.254-.085-.203.243-.538.256-.254.343-.4.512-.676.17-.275.085-.515-.043-.715-.128-.2-.675-1.637-.925-2.235-.24-.576-.484-.497-.675-.506-.175-.009-.375-.01-.575-.01-.2 0-.525.074-.8.374-.275.299-1.05 1.01-1.05 2.463s1.075 2.85 1.225 3.05c.15.199 2.113 3.182 5.118 4.463.715.305 1.273.487 1.708.625.719.223 1.373.192 1.89.117.575-.085 1.777-.715 2.027-1.408.25-.693.25-1.287.175-1.408-.075-.12-.275-.22-.575-.37z" />
        </svg>
        Reserve a Table on WhatsApp
      </a>
      <span className="mobile-reserve-bar__microcopy">
        Instant reply · No booking fee
      </span>
    </aside>
  );
}
