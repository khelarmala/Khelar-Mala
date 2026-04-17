import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Music2, Music, BookOpen, MessageCircle, Brain, Hand, Heart, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THERAPIES } from "@/lib/constants";
import { staggerContainer, staggerItem, fadeUp, inViewOnce } from "@/lib/animations";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette, Music2, Music, BookOpen, MessageCircle, Brain, Hand, Heart, Flower2,
};

// Rich gradient combos per therapy
const cardStyles = [
  { icon: "from-pink-soft/60 to-pink-soft/20",    border: "hover:border-pink-soft/60",    iconBg: "from-pink-soft to-[hsl(330_60%_70%)]" },
  { icon: "from-orange-light to-orange-light/30",  border: "hover:border-accent/40",        iconBg: "from-accent to-orange-deep" },
  { icon: "from-gold/40 to-gold/10",               border: "hover:border-gold/50",          iconBg: "from-gold to-[hsl(40_65%_45%)]" },
  { icon: "from-teal-light to-teal-light/30",      border: "hover:border-primary/40",       iconBg: "from-primary to-teal-medium" },
  { icon: "from-blue-bright/30 to-blue-bright/10", border: "hover:border-blue-bright/40",   iconBg: "from-blue-bright to-[hsl(213_55%_50%)]" },
  { icon: "from-purple/25 to-purple/8",            border: "hover:border-purple/40",        iconBg: "from-purple to-[hsl(252_22%_40%)]" },
  { icon: "from-green-fresh/25 to-green-fresh/8",  border: "hover:border-green-fresh/40",   iconBg: "from-green-fresh to-[hsl(88_38%_40%)]" },
  { icon: "from-teal-medium/25 to-teal-medium/8",  border: "hover:border-teal-medium/40",   iconBg: "from-teal-medium to-teal-deep" },
  { icon: "from-gold-light/40 to-gold-light/10",   border: "hover:border-gold-light/50",    iconBg: "from-gold-light to-gold" },
];

const TherapiesGrid = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-cream-warm dark:to-secondary/20">
      <div className="container-custom">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.span
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}
            className="section-badge mb-5"
          >
            Comprehensive Care
          </motion.span>

          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.1}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-5"
          >
            Our <span className="text-gradient-teal">Therapeutic</span> Programs
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.2}
            className="text-base md:text-lg text-muted-foreground font-body"
          >
            Nine specialized therapies woven together under Play Therapy - one seamless, joyful journey.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {THERAPIES.map((therapy, index) => {
            const IconComponent = iconMap[therapy.icon];
            const style = cardStyles[index % cardStyles.length];

            return (
              <motion.div key={therapy.id} variants={staggerItem}>
                <Link to={`/therapies/${therapy.id}`} className="block h-full group">
                  <div
                    className={`
                      relative h-full rounded-2xl border-2 border-transparent ${style.border}
                      bg-card shadow-soft hover:shadow-medium
                      transition-all duration-300 hover:-translate-y-1.5
                      overflow-hidden
                    `}
                  >
                    {/* Subtle gradient fill */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${style.icon} opacity-40 dark:opacity-20`} />

                    <div className="relative p-5">
                      {/* Icon + arrow row */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${style.iconBg} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                          {IconComponent && <IconComponent className="h-5 w-5 text-white" aria-hidden="true" />}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-card/80 border border-border/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                          <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Text */}
                      <h3 className="text-base font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                        {therapy.name}
                      </h3>
                      <p className="text-xs font-heading italic text-accent mb-2">{therapy.tagline}</p>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-2">
                        {therapy.description}
                      </p>

                      {/* Learn more link */}
                      <p className="mt-4 text-xs font-body font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                        Learn more <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} custom={0.3}
          className="text-center mt-8"
        >
          <Link to="/therapies">
            <Button variant="hero" size="lg" className="group shadow-[0_8px_32px_hsl(var(--primary)/0.25)]">
              View All 9 Therapies
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TherapiesGrid;
