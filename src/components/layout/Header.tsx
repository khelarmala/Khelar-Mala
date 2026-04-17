import { useState, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, MessageCircle, ChevronDown, ArrowRight,
  Sparkles, Palette, Music2, Music, BookOpen, Brain, Hand,
  Heart, Flower2,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_CONFIG, THERAPIES } from "@/lib/constants";
import logo from "@/assets/khelar-mala-logo.webp";

/* ── Animated brand name: cycles English ↔ Bengali every 3.5 s ─────────── */
const BRAND_VARIANTS = [
  { text: "Khelar Mala",  isBengali: false },
  { text: "খেলার মালা",   isBengali: true  },
];

const AnimatedBrandName = ({ className }: { className?: string }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % BRAND_VARIANTS.length), 3500);
    return () => clearInterval(t);
  }, []);
  const { text, isBengali } = BRAND_VARIANTS[idx];
  return (
    /* initial={false} → skip animation on first paint → no layout pop on fresh load
       fixed min-w prevents reflow when switching between English and Bengali widths  */
    <span className={`relative inline-block ${className ?? ""}`} style={{ minWidth: "9rem" }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="block text-accent"
          style={isBengali ? { fontFamily: "'Tiro Bangla', serif", letterSpacing: "0.02em" } : undefined}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ── Nav links (shortName for compact desktop render) ─────────────────────*/
const NAV_LINKS = [
  { name: "About Us",             shortName: "About",     href: "/about"     },
  { name: "Our Approach",         shortName: "Approach",  href: "/approach"  },
  { name: "Therapies",            shortName: "Therapies", href: "/therapies", hasDropdown: true },
  { name: "Children We Care For", shortName: "Children",  href: "/children"  },
  { name: "Contact",              shortName: "Contact",   href: "/contact"   },
];

/* ── Therapy icon map for mega-dropdown ──────────────────────────────────*/
const therapyIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette, Music2, Music, BookOpen,
  MessageCircle, Brain, Hand, Heart, Flower2,
};

/* ── Brand / social SVG icons ────────────────────────────────────────────*/
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.633 5.906-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/khelarmala?igsh=eWdlYmxuN2xjcXQz&utm_source=qr", label: "Follow on Instagram", Icon: InstagramIcon },
  { href: "https://www.facebook.com/share/1FZMHwKAJJ/?mibextid=wwXIfr",               label: "Follow on Facebook",  Icon: FacebookIcon  },
  { href: "https://x.com/khelarmala?s=11",                                              label: "Follow on X",         Icon: XIcon         },
] as const;

/* ── Animated hamburger icon ─────────────────────────────────────────────*/
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between" aria-hidden="true">
      <motion.span
        className="block h-0.5 bg-foreground rounded-full origin-center"
        animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="block h-0.5 bg-foreground rounded-full"
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="block h-0.5 bg-foreground rounded-full origin-center"
        animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════*/
const Header = () => {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileOpen,     setIsMobileOpen]     = useState(false);
  const [isTherapiesOpen,  setIsTherapiesOpen]  = useState(false);
  const location = useLocation();
  const mobileMenuId   = useId();
  const therapiesMenuId = useId();
  const dropdownWrapRef = useRef<HTMLDivElement>(null);

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close on route change */
  useEffect(() => {
    setIsMobileOpen(false);
    setIsTherapiesOpen(false);
  }, [location]);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  /* Escape + outside-click for dropdown */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsTherapiesOpen(false); setIsMobileOpen(false); }
    };
    const onOutside = (e: MouseEvent) => {
      if (dropdownWrapRef.current && !dropdownWrapRef.current.contains(e.target as Node)) {
        setIsTherapiesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  /* ──────────────────────────────────────────────────────────────────────*/
  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/85 dark:bg-background/90 backdrop-blur-2xl shadow-[0_1px_0_hsl(var(--border)/0.8),0_4px_32px_rgba(0,0,0,0.05)] py-2"
          : "bg-background/40 dark:bg-background/50 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none py-3 lg:py-4"
      }`}
    >
      <div className="container-custom">
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="flex items-center justify-between gap-3"
        >

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0 rounded-xl"
            aria-label="Khelar Mala - go to homepage"
          >
            <motion.img
              src={logo}
              alt=""
              aria-hidden="true"
              width="60"
              height="60"
              className={`rounded-full object-cover shadow-soft transition-all duration-300 ${
                isScrolled ? "h-11 w-11" : "h-[60px] w-[60px]"
              }`}
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            />
            <div>
              <span className="font-heading text-[1.05rem] sm:text-[1.3rem] font-bold leading-none block tracking-tight">
                <AnimatedBrandName />
              </span>
              <span className="hidden sm:block text-[11px] text-muted-foreground font-body tracking-wide mt-0.5">
                Where Play Meets Progress
              </span>
              <span className="sm:hidden text-[10px] text-muted-foreground font-body tracking-wide mt-0.5 block">
                Since 1997
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────────────────── */}
          <ul
            className="hidden lg:flex items-center gap-0.5 list-none m-0 p-0 flex-1 justify-center"
            role="list"
          >
            {NAV_LINKS.map((item) => (
              <li key={item.name} className="relative">
                {item.hasDropdown ? (

                  /* ── Therapies with mega-dropdown ── */
                  <div
                    ref={dropdownWrapRef}
                    onMouseEnter={() => setIsTherapiesOpen(true)}
                    onMouseLeave={() => setIsTherapiesOpen(false)}
                  >
                    <button
                      type="button"
                      className={`relative flex items-center gap-1 px-3.5 py-2 text-[0.83rem] font-medium font-body rounded-lg transition-all duration-200 ${
                        isActive(item.href)
                          ? "text-primary bg-primary/8"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                      }`}
                      aria-expanded={isTherapiesOpen}
                      aria-haspopup="listbox"
                      aria-controls={therapiesMenuId}
                      onClick={() => setIsTherapiesOpen((v) => !v)}
                      onFocus={() => setIsTherapiesOpen(true)}
                    >
                      {item.shortName}
                      <motion.span
                        animate={{ rotate: isTherapiesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3 h-3" aria-hidden="true" />
                      </motion.span>
                    </button>

                    {/* Mega-dropdown */}
                    <AnimatePresence>
                      {isTherapiesOpen && (
                        <motion.div
                          id={therapiesMenuId}
                          role="listbox"
                          aria-label="All therapies"
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-[600px] rounded-2xl overflow-hidden"
                          style={{
                            isolation: "isolate",
                            backgroundColor: "var(--nav-bg)",
                            backdropFilter: "blur(20px) saturate(160%)",
                            WebkitBackdropFilter: "blur(20px) saturate(160%)",
                            border: "1px solid var(--nav-border)",
                            boxShadow: "var(--nav-shadow)",
                          }}
                          onMouseEnter={() => setIsTherapiesOpen(true)}
                          onMouseLeave={() => setIsTherapiesOpen(false)}
                        >
                          {/* Header row */}
                          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--nav-border)", background: "var(--nav-section)" }}>
                            <div>
                              <p className="font-heading text-sm font-bold text-gray-900 dark:text-white">Our 9 Therapies</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-body mt-0.5">
                                All delivered through Play Therapy since 1997
                              </p>
                            </div>
                            <Link
                              to="/therapies"
                              className="flex items-center gap-1.5 text-xs font-semibold text-primary font-body hover:gap-2.5 transition-all duration-200 rounded-md px-2 py-1 hover:bg-primary/8"
                              role="option"
                              aria-selected={false}
                            >
                              View all therapies
                              <ArrowRight className="w-3 h-3" aria-hidden="true" />
                            </Link>
                          </div>

                          {/* 3-col therapy grid */}
                          <div className="grid grid-cols-3 gap-1 p-3">
                            {THERAPIES.map((therapy) => {
                              const Icon = therapyIcons[therapy.icon];
                              return (
                                <Link
                                  key={therapy.id}
                                  to={`/therapies/${therapy.id}`}
                                  role="option"
                                  aria-selected={false}
                                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-primary/6 dark:hover:bg-white/8 transition-all duration-150 group/t"
                                >
                                  <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 group-hover/t:bg-primary/20 transition-colors">
                                    {Icon && (
                                      <Icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                                    )}
                                  </div>
                                  <span className="text-[0.75rem] font-medium font-body text-gray-700 dark:text-gray-200 group-hover/t:text-primary leading-tight transition-colors">
                                    {therapy.name}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Footer CTA */}
                          <div className="px-5 py-3" style={{ borderTop: "1px solid var(--nav-border)", background: "var(--nav-section)" }}>
                            <Link
                              to="/contact#booking-form"
                              className="flex items-center gap-2 text-xs text-muted-foreground font-body hover:text-primary transition-colors rounded-md"
                              role="option"
                              aria-selected={false}
                            >
                              <Sparkles className="w-3 h-3 text-primary" aria-hidden="true" />
                              Not sure which therapy is right? Book a consultation →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                ) : (
                  /* ── Regular nav link ── */
                  <Link
                    to={item.href}
                    className={`relative px-3.5 py-2 text-[0.83rem] font-medium font-body rounded-lg transition-all duration-200 block ${
                      isActive(item.href)
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.shortName}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* ── Desktop CTAs ──────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            {/* Phone */}
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              aria-label={`Call us at ${SITE_CONFIG.phone}`}
              className="flex items-center gap-1.5 px-3 py-2 text-[0.78rem] text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/70 transition-all duration-200 font-body font-medium"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="hidden xl:inline">{SITE_CONFIG.phone}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366]/12 hover:bg-[#25D366] border border-[#25D366]/35 hover:border-[#25D366] text-[#25D366] hover:text-white rounded-full text-[0.78rem] font-semibold font-body transition-all duration-200 hover:shadow-[0_4px_18px_rgba(37,211,102,0.40)] active:scale-[0.97]"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Book CTA */}
            <Link
              to="/contact#booking-form"
              className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/90 active:scale-[0.97] text-primary-foreground rounded-full text-[0.78rem] font-semibold font-body transition-all duration-200 shadow-sm hover:shadow-[0_4px_20px_hsl(var(--primary)/0.4)]"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="hidden xl:inline">Book your Consultation Today</span>
              <span className="xl:hidden">Book Today</span>
            </Link>

            {/* Social icons - desktop only, icon-only with divider */}
            <div className="hidden xl:flex items-center gap-0.5 border-l border-border/40 pl-2.5">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-primary rounded-lg hover:bg-secondary/60 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            <ThemeToggle />
          </div>

          {/* ── Mobile action strip ───────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-1">
            <ThemeToggle />

            {/* Hamburger - always-visible bg so it shows on any page background */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((v) => !v)}
              className="relative z-50 flex items-center justify-center w-10 h-10 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-secondary transition-colors shadow-sm"
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileOpen}
              aria-controls={mobileMenuId}
            >
              <HamburgerIcon isOpen={isMobileOpen} />
            </button>
          </div>

        </nav>
      </div>

      {/* ══ Mobile Drawer - rendered via Portal so backdrop-filter on <header>
            never creates a containing block for position:fixed children ══════*/}
      {createPortal(
        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Scrim - inline style so nothing can override it */}
              <motion.div
                key="scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 9998,
                  backgroundColor: "rgba(0,0,0,0.62)",
                }}
                onClick={() => setIsMobileOpen(false)}
                aria-hidden="true"
              />

              {/* Drawer panel - position/z via inline style; glass bg via Tailwind so dark: works */}
              <motion.div
                key="drawer"
                id={mobileMenuId}
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                className="flex flex-col"
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 9999,
                  width: "320px",
                  maxWidth: "90vw",
                  backgroundColor: "var(--nav-bg)",
                  backdropFilter: "blur(20px) saturate(160%)",
                  WebkitBackdropFilter: "blur(20px) saturate(160%)",
                  borderLeft: "1px solid var(--nav-border)",
                  boxShadow: "-24px 0 80px rgba(0,0,0,0.28), var(--nav-shadow)",
                }}
              >
              {/* Drawer top bar */}
              <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ borderBottom: "1px solid var(--nav-border)", background: "var(--nav-section)" }}>
                <Link
                  to="/"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg"
                  aria-label="Khelar Mala Home"
                >
                  <img
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    width="42"
                    height="42"
                    className="h-[42px] w-[42px] rounded-full object-cover"
                  />
                  <div>
                    <span className="font-heading text-base font-bold block tracking-tight">
                      <AnimatedBrandName />
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-body">
                      Since 1997
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/8 dark:hover:bg-white/12 transition-colors text-gray-600 dark:text-gray-300"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable nav body */}
              <div className="flex-1 overflow-y-auto">
                <nav className="px-3 py-4" aria-label="Mobile navigation">
                  <ul className="space-y-0.5 list-none m-0 p-0" role="list">
                    {NAV_LINKS.map((item, i) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.045 + 0.06, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          to={item.href}
                          className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-body text-sm font-semibold transition-all duration-150 ${
                            isActive(item.href)
                              ? "text-primary"
                              : "text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                          }`}
                          style={isActive(item.href)
                            ? { background: "var(--nav-section)", borderLeft: "3px solid hsl(var(--primary))", paddingLeft: "13px" }
                            : undefined
                          }
                          aria-current={isActive(item.href) ? "page" : undefined}
                        >
                          <span>{item.name}</span>
                          {isActive(item.href) && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                          )}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Quick therapy tiles */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.32 }}
                    className="mt-5 pt-4"
                    style={{ borderTop: "1px solid var(--nav-border-sub)" }}
                  >
                    <p className="px-4 mb-3 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest font-body">
                      Our Therapies
                    </p>
                    <div className="grid grid-cols-2 gap-1 px-1">
                      {THERAPIES.map((therapy) => {
                        const Icon = therapyIcons[therapy.icon];
                        return (
                          <Link
                            key={therapy.id}
                            to={`/therapies/${therapy.id}`}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-primary/6 dark:hover:bg-white/8 transition-colors group/t"
                          >
                            {Icon && (
                              <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center shrink-0 group-hover/t:bg-primary/20 transition-colors">
                                <Icon className="w-3 h-3 text-primary" aria-hidden="true" />
                              </div>
                            )}
                            <span className="text-xs font-body font-medium text-gray-700 dark:text-gray-300 group-hover/t:text-gray-900 dark:group-hover/t:text-white leading-tight transition-colors">
                              {therapy.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                </nav>
              </div>

              {/* Drawer footer CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="px-4 py-5 space-y-2.5 shrink-0"
                style={{ borderTop: "1px solid var(--nav-border)", background: "var(--nav-section)", paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
              >
                {/* Call */}
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/10 transition-all"
                  style={{ border: "1px solid var(--nav-border)" }}
                  aria-label={`Call ${SITE_CONFIG.phone}`}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-body leading-none mb-0.5">Call Us</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white font-body">{SITE_CONFIG.phone}</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#22c55e] active:scale-[0.98] text-white rounded-xl font-semibold font-body text-sm transition-all shadow-sm"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>

                {/* Book */}
                <Link
                  to="/contact#booking-form"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground rounded-xl font-semibold font-body text-sm transition-all shadow-sm hover:shadow-[0_4px_16px_hsl(var(--primary)/0.4)]"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Book your Consultation Today
                </Link>

                {/* Social icons - mobile drawer */}
                <div className="flex items-center justify-center gap-1 pt-1 mt-1" style={{ borderTop: "1px solid var(--nav-border-sub)" }}>
                  {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center w-11 h-11 text-muted-foreground hover:text-primary rounded-xl hover:bg-secondary/60 transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
};

export default Header;
