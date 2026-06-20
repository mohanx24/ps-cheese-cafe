import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  children?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    ease = 'power3.out',
    start = 'top 85%',
    children = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = children ? el.children : el;

    const ctx = gsap.context(() => {
      const revealX = window.matchMedia('(max-width: 1024px)').matches ? 0 : x;

      gsap.from(targets, {
        y,
        x: revealX,
        opacity,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, x, opacity, duration, delay, stagger, ease, start, children]);

  return ref;
}
