import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Send, CheckCircle, AlertCircle, Sparkles, Heart, Star, Navigation
} from "lucide-react";
import { fadeUp, scaleIn, inViewOnce } from "@/lib/animations";

/* ── Formspree Endpoint ────────────────────────────────────────────────────*/
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkoqlokz";

/* ── Schema ────────────────────────────────────────────────────────────────*/
const contactSchema = z.object({
  parentName: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid phone number").regex(/^[+\d\s\-()]{10,16}$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").or(z.literal("")).optional(),
  childName: z.string().min(2, "Enter your child's name"),
  childAge: z.string().min(1, "Enter your child's age"),
  message: z.string().optional(),
});
type ContactFormData = z.infer<typeof contactSchema>;

/* ── GA4 helper ────────────────────────────────────────────────────────────*/
function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof (window as Window & { gtag?: Function }).gtag === "function") {
    (window as Window & { gtag?: Function }).gtag!("event", name, params);
  }
}

/* ── Google Ads conversion helper (AW-17985456869) ─────────────────────────*/
function trackAdsConversion() {
  if (typeof window !== "undefined" && typeof (window as Window & { gtag?: Function }).gtag === "function") {
    (window as Window & { gtag?: Function }).gtag!("event", "conversion", {
      send_to: "AW-17985456869",
    });
  }
}

/* ── Meta Pixel Lead event helper (1886235975211577) ────────────────────────*/
function trackMetaLead() {
  if (typeof window !== "undefined" && typeof (window as Window & { fbq?: Function }).fbq === "function") {
    (window as Window & { fbq?: Function }).fbq!("track", "Lead");
  }
}

/* ── Floating label input ──────────────────────────────────────────────────*/
interface FloatFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm<ContactFormData>>["register"]>;
}
function FloatField({ id, label, type = "text", placeholder, required, error, registration }: FloatFieldProps) {
  return (
    <div className="relative group">
      <input
        id={id}
        type={type}
        placeholder={placeholder ?? " "}
        className={`
          peer w-full bg-background/60 dark:bg-card/60
          border-2 rounded-xl px-4 pt-6 pb-3
          text-foreground font-body text-sm
          placeholder-transparent
          transition-all duration-200
          focus:outline-none focus:border-primary
          ${error ? "border-destructive" : "border-border hover:border-primary/50"}
        `}
        aria-required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        {...registration}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 top-4 text-xs font-body font-medium
          transition-all duration-200
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary
          ${error ? "text-destructive" : "text-muted-foreground"}
          pointer-events-none
        `}
      >
        {label}{required && <span className="text-destructive ml-0.5" aria-hidden="true">*</span>}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-xs text-destructive flex items-center gap-1 font-body"
          >
            <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Trust badges ──────────────────────────────────────────────────────────*/
const trustBadges = [
  { icon: Star,    text: "Trusted since 1997" },
  { icon: Heart,   text: "500+ families helped" },
  { icon: Sparkles, text: "Consultation included" },
];

/* ── Main component ────────────────────────────────────────────────────────*/
export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, submitCount },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const [submitError, setSubmitError] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Parent Name": data.parentName,
          "Phone": data.phone,
          "Email": data.email || "Not provided",
          "Child Name": data.childName,
          "Child Age": data.childAge,
          "Message": data.message || "Not provided",
          "_subject": `New enquiry from ${data.parentName} - Khelar Mala`,
          "_replyto": data.email || data.phone,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      trackEvent("contact_form_submit", { child_age: data.childAge });
      trackAdsConversion();
      trackMetaLead();
    } catch {
      setSubmitError(true);
      throw new Error("Submission failed");
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Khelar Mala | Book your Consultation Today | Siliguri</title>
        <meta name="description" content={`Contact Khelar Mala. WhatsApp: ${SITE_CONFIG.phone}. Book a consultation for your child's development journey.`} />
        <link rel="canonical" href="https://www.khelarmala.in/contact" />
      </Helmet>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-teal-pale via-background to-orange-light/30 dark:from-teal-pale/5 dark:via-background dark:to-accent/5">
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/8 dark:bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -bottom-10 -left-20 w-64 h-64 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        </div>

        <div className="container-custom relative">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div variants={scaleIn} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-body font-semibold mb-6">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Consultation - No Pressure
            </motion.div>

            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-5 leading-tight">
              Let's Begin Your{" "}
              <span className="text-gradient-teal relative">
                Child's Journey
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-teal-medium rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
              className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-8">
              Reach out and we'll listen. Every great breakthrough starts with a single conversation.
            </motion.p>

            {/* Trust badges */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
              className="flex flex-wrap justify-center gap-4 mb-2">
              {trustBadges.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                  <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUICK CONTACT CARDS ─────────────────────────────────────────── */}
      <section className="py-10 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {/* WhatsApp */}
            <motion.a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0}
              className="group relative card-elevated rounded-2xl p-5 text-center overflow-hidden hover:-translate-y-1 transition-all duration-300"
              aria-label={`Chat on WhatsApp at ${SITE_CONFIG.phone}`}
              onClick={() => trackEvent("whatsapp_click", { location: "contact_cards" })}>
              <div className="absolute inset-0 bg-[#25D366]/5 group-hover:bg-[#25D366]/10 transition-colors duration-300" />
              <div className="relative">
                <div className="w-12 h-12 bg-[#25D366] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-[0_4px_16px_rgba(37,211,102,0.35)] group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <p className="font-heading text-sm font-bold text-foreground mb-0.5">WhatsApp</p>
                <p className="text-xs text-[#25D366] font-body font-semibold">Fastest</p>
              </div>
            </motion.a>

            {/* Call */}
            <motion.a href={`tel:${SITE_CONFIG.phone}`}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.05}
              className="group relative card-elevated rounded-2xl p-5 text-center overflow-hidden hover:-translate-y-1 transition-all duration-300"
              aria-label={`Call ${SITE_CONFIG.phone}`}
              onClick={() => trackEvent("phone_click", { location: "contact_cards" })}>
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300" />
              <div className="relative">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-medium group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
                </div>
                <p className="font-heading text-sm font-bold text-foreground mb-0.5">Call Us</p>
                <p className="text-xs text-muted-foreground font-body">Mon–Sat</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a href={`mailto:${SITE_CONFIG.email}`}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.1}
              className="group relative card-elevated rounded-2xl p-5 text-center overflow-hidden hover:-translate-y-1 transition-all duration-300"
              aria-label={`Email ${SITE_CONFIG.email}`}>
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300" />
              <div className="relative">
                <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-soft group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-accent-foreground" aria-hidden="true" />
                </div>
                <p className="font-heading text-sm font-bold text-foreground mb-0.5">Email</p>
                <p className="text-xs text-muted-foreground font-body">24hr reply</p>
              </div>
            </motion.a>

            {/* Visit */}
            <motion.a
              href={SITE_CONFIG.mapsUrl}
              target="_blank" rel="noopener noreferrer"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.15}
              className="group relative card-elevated rounded-2xl p-5 text-center overflow-hidden hover:-translate-y-1 transition-all duration-300"
              aria-label="Get directions to Khelar Mala on Google Maps">
              <div className="absolute inset-0 bg-[hsl(var(--purple-primary))]/5 group-hover:bg-[hsl(var(--purple-primary))]/10 transition-colors duration-300" />
              <div className="relative">
                <div className="w-12 h-12 bg-[hsl(var(--purple-primary))] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-soft group-hover:scale-110 transition-transform duration-300">
                  <Navigation className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <p className="font-heading text-sm font-bold text-foreground mb-0.5">Directions</p>
                <p className="text-xs text-muted-foreground font-body">Open in Maps</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── FORM + MAP SECTION ──────────────────────────────────────────── */}
      <section id="booking-form" className="section-padding bg-gradient-to-b from-background to-card pb-safe-cta">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 max-w-6xl mx-auto items-start">

            {/* ── THE FORM ──────────────────────────────────────────────── */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}>

              {isSubmitSuccessful ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="card-elevated rounded-3xl p-10 md:p-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    className="w-20 h-20 bg-[hsl(var(--green-fresh))]/15 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-[hsl(var(--green-fresh))]" aria-hidden="true" />
                  </motion.div>
                  <h2 className="font-heading text-3xl text-foreground mb-3">Message Received!</h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-2">
                    Thank you for reaching out to Khelar Mala. We've received your enquiry and will contact you within <strong className="text-foreground">24 hours</strong>.
                  </p>
                  <p className="font-body text-sm text-muted-foreground mb-8">
                    For an immediate response, our team is available on WhatsApp.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="whatsapp" size="lg" className="w-full sm:w-auto gap-2">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        Continue on WhatsApp
                      </Button>
                    </a>
                    <Button variant="outline" size="lg" onClick={() => reset()} className="w-full sm:w-auto">
                      Send Another Message
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Form */
                <div className="card-elevated rounded-3xl p-7 md:p-10">
                  {/* Form header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Send className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl font-bold text-foreground leading-tight">Book your Consultation Today</h2>
                        <p className="text-sm text-muted-foreground font-body">We respond within 24 hours</p>
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-primary/30 via-border to-transparent" />
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form" className="space-y-4">

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FloatField id="parentName" label="Parent / Guardian Name" required
                        error={errors.parentName?.message}
                        registration={register("parentName")} />
                      <FloatField id="phone" label="Phone Number" type="tel" placeholder=" " required
                        error={errors.phone?.message}
                        registration={register("phone")} />
                    </div>

                    <FloatField id="email" label="Email Address (optional)" type="email"
                      error={errors.email?.message}
                      registration={register("email")} />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FloatField id="childName" label="Child's Name" required
                        error={errors.childName?.message}
                        registration={register("childName")} />
                      <FloatField id="childAge" label="Child's Age" required
                        placeholder=" "
                        error={errors.childAge?.message}
                        registration={register("childAge")} />
                    </div>

                    {/* Message textarea */}
                    <div className="relative group">
                      <textarea
                        id="message"
                        placeholder=" "
                        rows={4}
                        className="
                          peer w-full bg-background/60 dark:bg-card/60
                          border-2 border-border hover:border-primary/50 rounded-xl
                          px-4 pt-6 pb-3
                          text-foreground font-body text-sm
                          placeholder-transparent resize-none
                          transition-all duration-200
                          focus:outline-none focus:border-primary
                        "
                        {...register("message")}
                      />
                      <label htmlFor="message"
                        className="absolute left-4 top-4 text-xs font-body font-medium text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary pointer-events-none">
                        Tell us about your child's needs (optional)
                      </label>
                    </div>

                    {/* Error banner */}
                    <AnimatePresence>
                      {submitError && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          role="alert" className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <p className="text-sm font-semibold text-destructive">Couldn't send your message</p>
                            <p className="text-xs text-destructive/80 font-body mt-0.5">
                              Please try WhatsApp or call us directly at {SITE_CONFIG.phone}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <p className="text-xs text-muted-foreground font-body">
                      <span className="text-destructive">*</span> Required. Your information is private and never shared.
                    </p>

                    {/* Submit */}
                    <Button type="submit" variant="hero" size="lg" className="w-full group" disabled={isSubmitting} aria-busy={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin shrink-0" aria-hidden="true" />
                          Sending your message…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {/* Non-refundable notice */}
                    <p className="text-[11px] text-muted-foreground/70 font-body text-center">
                      * Consultation fees are non-refundable.
                    </p>

                    {/* WhatsApp nudge */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-xs text-muted-foreground font-body">or</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackEvent("whatsapp_click", { location: "form_alternative" })}
                      className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border-2 border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/8 transition-all duration-200 font-body font-semibold text-sm">
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Get an instant reply on WhatsApp →
                    </a>
                  </form>
                </div>
              )}
            </motion.div>

            {/* ── RIGHT SIDEBAR ─────────────────────────────────────────── */}
            <div className="space-y-5">

              {/* Info card */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.1}
                className="card-elevated rounded-2xl overflow-hidden">
                {/* Map */}
                <div className="relative">
                  <iframe
                    src={SITE_CONFIG.mapsEmbed}
                    width="100%" height="220"
                    style={{ border: 0 }} allowFullScreen loading="lazy"
                    title="Khelar Mala Intervention Centre - Arabinda Pally, Siliguri"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                  <a href={SITE_CONFIG.mapsUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="absolute bottom-2 right-2 px-3 py-1.5 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-lg text-xs font-body font-semibold text-primary shadow-soft hover:shadow-medium transition-all flex items-center gap-1"
                    aria-label="Open Khelar Mala location in Google Maps">
                    <Navigation className="w-3 h-3" aria-hidden="true" />
                    Get Directions →
                  </a>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-heading text-base font-bold text-foreground">Find Us</h3>
                  <address className="not-italic space-y-2.5">
                    {[
                      { icon: MapPin,  text: SITE_CONFIG.location, href: SITE_CONFIG.mapsUrl },
                      { icon: Phone,   text: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                      { icon: Mail,    text: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                      { icon: Clock,   text: SITE_CONFIG.hours, href: undefined },
                    ].map(({ icon: Icon, text, href }) => (
                      <div key={text} className="flex items-start gap-3">
                        <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                        </div>
                        {href ? (
                          <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                            className="font-body text-sm text-muted-foreground hover:text-primary transition-colors leading-snug">
                            {text}
                          </a>
                        ) : (
                          <span className="font-body text-sm text-muted-foreground leading-snug">{text}</span>
                        )}
                      </div>
                    ))}
                  </address>
                </div>
              </motion.div>

              {/* WhatsApp CTA card */}
              <motion.a
                href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer"
                variants={scaleIn} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.2}
                className="group flex items-center gap-4 card-elevated rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 border-[#25D366]/20 hover:border-[#25D366]/40 cursor-pointer"
                onClick={() => trackEvent("whatsapp_click", { location: "sidebar_cta" })}
                aria-label="Chat on WhatsApp for fastest response">
                <div className="w-12 h-12 bg-[#25D366] rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(37,211,102,0.35)] group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm font-bold text-foreground">Chat on WhatsApp</p>
                  <p className="text-xs text-muted-foreground font-body">Get an instant response from our team</p>
                </div>
                <span className="text-[#25D366] text-lg font-bold group-hover:translate-x-1 transition-transform shrink-0" aria-hidden="true">→</span>
              </motion.a>

              {/* Testimonial snippet */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.3}
                className="card-elevated rounded-2xl p-5 bg-gradient-to-br from-primary/5 to-card border border-primary/10">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[hsl(var(--gold))] fill-[hsl(var(--gold))]" aria-hidden="true" />
                  ))}
                </div>
                <p className="font-heading text-sm italic text-foreground leading-relaxed mb-3">
                  "Khelar Mala transformed our son's life. The progress in communication and confidence is remarkable."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-heading font-bold shrink-0">P</div>
                  <div>
                    <p className="text-xs font-semibold text-foreground font-body">P.S.</p>
                    <p className="text-xs text-muted-foreground font-body">Parent of child with ASD</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}

