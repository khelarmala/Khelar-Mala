import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeUp, inViewOnce } from "@/lib/animations";

const FounderSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-card dark:to-secondary/10">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}
          className="max-w-3xl mx-auto"
        >
          {/* Card - mt-6 gives room for the -top-5 quote bubble above */}
          <div className="relative rounded-3xl mt-6 ring-1 ring-primary/25 shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
            <div className="relative bg-card rounded-3xl p-8 md:p-12">

              {/* Quote icon */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={inViewOnce}
                transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
                className="absolute -top-5 left-8 md:left-12 w-11 h-11 rounded-full bg-gradient-to-br from-primary to-teal-medium shadow-medium flex items-center justify-center"
              >
                <Quote className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
              </motion.div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6 mt-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={inViewOnce}
                    transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 300 }}
                  >
                    <Star className="w-5 h-5 text-[hsl(var(--gold))] fill-[hsl(var(--gold))]" aria-hidden="true" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-heading italic text-foreground leading-relaxed mb-8">
                  "Within every child resides{" "}
                  <span className="text-gradient-teal not-italic font-bold">infinite possibility</span>
                  {" "}— we simply illuminate the path."
                </p>
              </motion.blockquote>

              {/* Divider */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inViewOnce}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-4 justify-center"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-teal-medium flex items-center justify-center text-primary-foreground text-xl font-heading font-bold shadow-medium shrink-0">
                  SD
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-foreground text-lg leading-tight">
                    {SITE_CONFIG.founder}
                  </p>
                  <p className="text-sm text-muted-foreground font-body">
                    {SITE_CONFIG.founderTitle}, Founder &amp; Director
                  </p>
                  <p className="text-xs text-primary font-body font-semibold mt-0.5">
                    Leading Khelar Mala since {SITE_CONFIG.since}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
