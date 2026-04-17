import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, MapPin, Mail, Star } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeUp, scaleIn, inViewOnce } from "@/lib/animations";

const ContactCTA = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-teal-deep to-[hsl(180_55%_18%)]" />
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(ellipse at 15% 50%, hsl(var(--accent) / 0.18) 0%, transparent 60%),
          radial-gradient(ellipse at 85% 30%, hsl(var(--gold) / 0.12) 0%, transparent 50%)
        `,
      }} />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Floating rings */}
      <motion.div
        className="absolute top-8 right-12 w-24 h-24 rounded-full opacity-[0.25]"
        style={{ border: "1px solid rgba(255,255,255,0.18)" }}
        animate={{ y: [0, -16, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-8 left-12 w-40 h-40 rounded-full opacity-[0.18]"
        style={{ border: "1px solid rgba(255,255,255,0.14)" }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.10]"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto text-center">

          {/* Star reviews */}
          <motion.div
            variants={scaleIn} initial="hidden" whileInView="visible" viewport={inViewOnce}
            className="flex items-center justify-center gap-1.5 mb-6"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[hsl(var(--gold))] fill-[hsl(var(--gold))]" aria-hidden="true" />
            ))}
            <span className="ml-2 text-white/80 text-sm font-body">Loved by 500+ families</span>
          </motion.div>

          <motion.span
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}
            className="inline-block px-5 py-2 rounded-full bg-white/12 border border-white/20 text-white text-sm font-body font-semibold mb-5"
          >
            Take the First Step
          </motion.span>

          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.1}
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(2rem, 3.5vw + 0.5rem, 3.2rem)" }}
          >
            Begin Your Child's{" "}
            <span className="relative">
              <span className="text-[hsl(var(--gold))]">Journey</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[hsl(var(--gold))]/60 rounded-full" />
            </span>
            {" "}Today
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.2}
            className="text-base md:text-lg text-white/80 font-body leading-relaxed mb-10 max-w-xl mx-auto"
          >
            Every breakthrough begins with a single conversation. Reach out and let us show you what's possible for your child.
          </motion.p>

          {/* CTAs - 2 primary on mobile, 3rd (Call) shows on sm+ */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.3}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
          >
            <Link to="/contact#booking-form" className="w-full sm:w-auto">
              <Button size="xl"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/92 shadow-large group hover:scale-105 transition-transform">
                Book your Consultation Today
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Link>
            <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="w-full sm:w-auto">
              <Button variant="whatsapp" size="xl"
                className="w-full sm:w-auto shadow-[0_8px_32px_rgba(37,211,102,0.45)] hover:scale-105 transition-transform">
                <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
                Chat on WhatsApp
              </Button>
            </a>
            <a href={`tel:${SITE_CONFIG.phone}`} aria-label={`Call us at ${SITE_CONFIG.phone}`} className="w-full sm:w-auto hidden sm:block">
              <Button variant="outline" size="xl"
                className="w-full sm:w-auto border-white/40 text-white hover:bg-white/12 hover:border-white/70">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Us Now
              </Button>
            </a>
          </motion.div>

          {/* Contact info - Visit Us + Write to Us as full CTA buttons */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.4}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href={SITE_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Khelar Mala"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/40 hover:border-white/80 bg-white/10 hover:bg-white/20 text-white font-body font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              Visit Us
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              aria-label={`Email us at ${SITE_CONFIG.email}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/40 hover:border-white/80 bg-white/10 hover:bg-white/20 text-white font-body font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              Write to Us
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              aria-label={`Call us at ${SITE_CONFIG.phone}`}
              className="inline-flex sm:hidden items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/40 hover:border-white/80 bg-white/10 hover:bg-white/20 text-white font-body font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              Call Us Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
