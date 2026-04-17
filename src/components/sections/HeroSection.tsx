import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Award, Users, Heart, Star, Wind, Blocks } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { useCountUp } from "@/hooks/use-count-up";
import heroImage from "@/assets/hero-illustration.webp";

/* ── 4-pointed sparkle SVG ───────────────────────────────────────────────*/
const SparkleStar = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2 C12 2 13.4 9.2 16 11 C18.6 12.8 22 12 22 12 C22 12 18.6 11.2 16 13 C13.4 14.8 12 22 12 22 C12 22 10.6 14.8 8 13 C5.4 11.2 2 12 2 12 C2 12 5.4 12.8 8 11 C10.6 9.2 12 2 12 2 Z" />
  </svg>
);

/* ── Sparkle particle config - inline colors to bypass Tailwind purge ───*/
const SPARKLE_PARTICLES = [
  /* ── LEFT COLUMN - headline area ── */
  { id:  0, top: "7%",  left: "2%",   size: 26, color: "#d4a030",  delay: 0,    dur: 4.0 },  // gold hero
  { id:  1, top: "22%", left: "0.5%", size: 14, color: "#f08030",  delay: 1.1,  dur: 3.8 },  // orange mid
  { id:  2, top: "42%", left: "3%",   size: 10, color: "#2ab8a0",  delay: 0.5,  dur: 3.4 },  // teal
  { id:  3, top: "63%", left: "1.5%", size: 18, color: "#d4a030",  delay: 2.2,  dur: 4.6 },  // gold mid-low
  { id:  4, top: "80%", left: "5%",   size: 8,  color: "#f08030",  delay: 0.8,  dur: 5.0 },  // orange small
  /* ── CENTRE - above fold ── */
  { id:  5, top: "5%",  left: "38%",  size: 12, color: "#d4a030",  delay: 1.6,  dur: 3.6 },  // gold centre
  { id:  6, top: "12%", left: "52%",  size: 7,  color: "#2ab8a0",  delay: 3.0,  dur: 4.2 },  // teal small
  { id:  7, top: "85%", left: "40%",  size: 9,  color: "#f08030",  delay: 0.4,  dur: 4.8 },  // orange low-centre
  { id:  8, top: "90%", left: "60%",  size: 6,  color: "#d4a030",  delay: 2.8,  dur: 3.2 },  // gold tiny
  /* ── RIGHT COLUMN - image area ── */
  { id:  9, top: "4%",  right: "16%", size: 28, color: "#d4a030",  delay: 0.7,  dur: 4.4 },  // gold hero-right
  { id: 10, top: "18%", right: "1%",  size: 16, color: "#2ab8a0",  delay: 1.8,  dur: 3.8 },  // teal mid
  { id: 11, top: "36%", right: "3%",  size: 11, color: "#f08030",  delay: 0.3,  dur: 4.2 },  // orange
  { id: 12, top: "55%", right: "0.5%",size: 20, color: "#d4a030",  delay: 2.5,  dur: 3.6 },  // gold large
  { id: 13, top: "72%", right: "18%", size: 13, color: "#2ab8a0",  delay: 1.3,  dur: 5.2 },  // teal lower
  { id: 14, top: "88%", right: "4%",  size: 8,  color: "#f08030",  delay: 0.9,  dur: 4.0 },  // orange small
  /* ── EXTRA DUST - tiny accent twinkles ── */
  { id: 15, top: "16%", left: "8%",   size: 6,  color: "#2ab8a0",  delay: 3.5,  dur: 3.0 },
  { id: 16, top: "50%", left: "7%",   size: 5,  color: "#d4a030",  delay: 1.9,  dur: 4.2 },
  { id: 17, top: "30%", right: "8%",  size: 6,  color: "#f08030",  delay: 2.7,  dur: 3.4 },
  { id: 18, top: "66%", right: "12%", size: 5,  color: "#2ab8a0",  delay: 0.2,  dur: 4.6 },
] as const;

/* ── Rotating USP trust badges ────────────────────────────────────────────*/
const USP_BADGES = [
  { Icon: Shield,   label: "24/7 CCTV Monitored",     sub: "Always Safe & Secure",   color: "text-emerald-500" },
  { Icon: Award,    label: "27+ Years",                sub: "Trusted Experience",     color: "text-primary"     },
  { Icon: Users,    label: "950+ Journeys",            sub: "Shared with Love",       color: "text-primary"     },
  { Icon: Wind,     label: "Air Conditioned",          sub: "Cool & Comfortable",     color: "text-sky-500"     },
  { Icon: Blocks,   label: "Child-Safe Play Area",     sub: "Joyful & Secure",        color: "text-violet-500"  },
  { Icon: Heart,    label: "9 Therapies",              sub: "Holistic Approach",      color: "text-rose-500"    },
  { Icon: Star,     label: "Play Therapy",             sub: "Since 1997",             color: "text-amber-500"   },
] as const;

const HeroSection = () => {
  const [uspIdx, setUspIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setUspIdx(i => (i + 1) % USP_BADGES.length), 3200);
    return () => clearInterval(id);
  }, []);

  const years    = useCountUp(27, 1500);
  const therapies = useCountUp(9, 1200);
  const families  = useCountUp(950, 2200);

  return (
    <section className="relative min-h-[100svh] lg:min-h-[95vh] flex flex-col justify-center overflow-hidden pt-24 pb-16 lg:pb-12">
      {/* ── Background gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-pale via-background to-orange-light/20 dark:from-teal-pale/5 dark:via-background dark:to-accent/5 -z-10" />
      {/* ── Bottom fade - eliminates visible seam / line at section boundary ── */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-background pointer-events-none -z-10" />

      {/* ── Sparkle particles - z-[1] so they sit above bg but below content ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {SPARKLE_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{
              top: p.top,
              color: p.color,
              filter: `drop-shadow(0 0 ${Math.round(p.size * 0.45)}px ${p.color}) drop-shadow(0 0 ${Math.round(p.size * 0.2)}px ${p.color})`,
              ...("left" in p ? { left: p.left } : { right: p.right }),
            }}
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={{
              opacity: [0, 1, 0.7, 1, 0.6, 0],
              scale:   [0, 1.1, 0.85, 1.3, 0.9, 0],
              y:       [0, -18, -8, -24, -12, 0],
              rotate:  [0, 25, -20, 35, -10, 0],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              repeatDelay: p.delay * 0.4 + 0.8,
              ease: "easeInOut",
            }}
          >
            <SparkleStar size={p.size} />
          </motion.div>
        ))}
      </div>

      {/* ── Decorative blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute top-24 left-6 sm:left-14 w-20 h-20 bg-accent/25 rounded-full blur-2xl"
          animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-8 sm:right-24 w-32 h-32 bg-primary/18 rounded-full blur-3xl"
          animate={{ y: [0, 22, 0], x: [0, -14, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gold/18 rounded-full blur-2xl"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
        {/* Large soft background circle */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/4 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-[2]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ── LEFT: Content ── */}
          <div className="text-center lg:text-left order-1">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] sm:text-sm font-body font-semibold mb-6 max-w-full text-center"
            >
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" aria-hidden="true" />
              <span>North Bengal's Most Trusted Centre Since {SITE_CONFIG.since}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-heading font-bold text-foreground leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.6rem, 5vw + 1rem, 4.5rem)" }}
            >
              Where{" "}
              <span className="text-gradient-teal">Play</span>
              <br />
              Meets{" "}
              <span className="relative inline-block">
                <span className="text-gradient-gold">Progress</span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--accent)))" }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
              className="text-base sm:text-lg text-muted-foreground font-body leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              At Khelar Mala, every child discovers their unique strengths through{" "}
              <strong className="text-foreground font-semibold">Play Therapy</strong>.
              We nurture potential, celebrate milestones, and empower children to thrive —
              one joyful step at a time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10"
            >
              <Link to="/contact#booking-form">
                <Button variant="hero" size="lg" className="w-full sm:w-auto group shadow-[0_8px_32px_hsl(var(--primary)/0.3)]">
                  Book your Consultation Today
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
              <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="hidden sm:block">
                <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp Us
                </Button>
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12 pt-7 border-t border-border/60"
            >
              {[
                { ref: years.ref,     count: years.count,     suffix: "+", label: "Years of Excellence", icon: Award },
                { ref: therapies.ref, count: therapies.count, suffix: "",  label: "Specialised Therapies", icon: Sparkles },
                { ref: families.ref,  count: families.count,  suffix: "+", label: "Journeys Shared", icon: Users },
              ].map(({ ref, count, suffix, label, icon: Icon }) => (
                <div
                  key={label}
                  className="text-center"
                  ref={ref as React.RefObject<HTMLDivElement>}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1.5">
                    <Icon className="h-4 w-4 text-primary/70" aria-hidden="true" />
                    <p
                      className="text-3xl sm:text-4xl font-heading font-bold text-primary tracking-tight"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {count}{suffix}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground font-body font-bold">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Hero image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-2 mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            {/* Glow ring */}
            <div className="absolute -inset-6 bg-gradient-to-br from-teal-light via-transparent to-orange-light/40 dark:from-primary/10 dark:to-accent/10 rounded-[2rem] opacity-70" />

            {/* Main image */}
            <img
              src={heroImage}
              alt="Children engaged in therapeutic play activities at Khelar Mala, Siliguri"
              className="relative w-full rounded-[1.5rem] shadow-large img-glow object-cover aspect-[4/3]"
              width="800"
              height="600"
              fetchPriority="high"
              decoding="async"
            />

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="hidden sm:block absolute -bottom-7 -left-7 bg-white/90 dark:bg-[hsl(210,25%,7%)]/90 backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(160%)] rounded-2xl p-4 max-w-[270px] border border-white/55 dark:border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.50),inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <p className="text-sm font-heading italic text-foreground/85 leading-relaxed mb-2">
                "Within every child resides infinite possibility - we simply illuminate the path."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-teal-medium flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                  SD
                </div>
                <p className="text-xs text-primary font-semibold font-body">— {SITE_CONFIG.founder}</p>
              </div>
            </motion.div>

            {/* Dynamic USP trust carousel - top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="hidden sm:block absolute -top-4 -right-4 bg-white/90 dark:bg-[hsl(210,25%,7%)]/90 backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(160%)] rounded-2xl border border-white/55 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.50),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden"
              style={{ minWidth: "170px" }}
            >
              {/* Animated badge content */}
              <div className="relative h-[58px]">
                <AnimatePresence mode="wait">
                  {USP_BADGES.map((badge, i) =>
                    i === uspIdx ? (
                      <motion.div
                        key={badge.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center gap-2.5 px-4 py-3"
                      >
                        <badge.Icon className={`w-4 h-4 shrink-0 ${badge.color}`} aria-hidden="true" />
                        <div>
                          <p className="text-xs font-bold text-foreground font-body leading-none">{badge.label}</p>
                          <p className="text-[10px] text-muted-foreground font-body mt-0.5">{badge.sub}</p>
                        </div>
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </div>
              {/* Progress pip strip */}
              <div className="flex items-center justify-center gap-1 pb-2.5">
                {USP_BADGES.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ width: i === uspIdx ? 16 : 6, opacity: i === uspIdx ? 1 : 0.35 }}
                    transition={{ duration: 0.3 }}
                    className="h-1 bg-primary rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
