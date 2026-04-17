/**
 * Khelar Mala - Shared Framer Motion Variants
 * Single source of truth for all animation patterns.
 * Import and reuse instead of duplicating per-component.
 */
import type { Variants } from "framer-motion";

// ── Fade up - standard entrance for text/cards ─────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ── Fade in - opacity only ─────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

// ── Scale in - for badges, pills, icons ───────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ── Slide in from left ─────────────────────────────────────────────────────
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ── Slide in from right ────────────────────────────────────────────────────
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ── Stagger children container ─────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// ── Stagger child item ─────────────────────────────────────────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Shared viewport config ─────────────────────────────────────────────────
export const inViewOnce = { once: true, margin: "0px 0px -80px 0px" } as const;

// ── Floating blob (decorative) ─────────────────────────────────────────────
export const blobFloat = (yRange = 20, duration = 8, delay = 0) => ({
  animate: { y: [0, -yRange, 0] },
  transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
});
