import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Sparkles, Palette, TreeDeciduous, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem, inViewOnce } from "@/lib/animations";

const features = [
  {
    icon: Palette,
    title: "Play Therapy",
    description: "Learning through joyful, structured play-based activities tailored to each child",
    gradient: "from-pink-soft/30 to-card",
    iconGrad: "from-pink-soft to-[hsl(330_60%_68%)]",
  },
  {
    icon: Users,
    title: "Family Partnership",
    description: "Parents as active, empowered partners in every step of the journey",
    gradient: "from-teal-light/60 to-card",
    iconGrad: "from-primary to-teal-medium",
  },
  {
    icon: TreeDeciduous,
    title: "Holistic Growth",
    description: "Nurturing the whole child - cognitive, physical, emotional & social",
    gradient: "from-green-fresh/20 to-card",
    iconGrad: "from-green-fresh to-[hsl(88_38%_40%)]",
  },
  {
    icon: Trophy,
    title: "Proven Results",
    description: `Trusted by ${SITE_CONFIG.familiesSupported} families across North Bengal`,
    gradient: "from-gold/25 to-card",
    iconGrad: "from-gold to-[hsl(40_65%_45%)]",
  },
];

const pills = [
  { label: "Learning", icon: Sparkles },
  { label: "Loving",   icon: Heart },
  { label: "Growing",  icon: Star },
];

const AboutPreview = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: copy */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}
          >
            <span className="section-badge-accent mb-5">
              About Us
            </span>
            <h2
              className="font-heading font-bold text-foreground leading-[1.12] tracking-tight mb-5"
              style={{ fontSize: "clamp(2rem, 3.5vw + 0.5rem, 3rem)" }}
            >
              Nurturing Potential{" "}
              <span className="text-gradient-teal">Since {SITE_CONFIG.since}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-6">
              Khelar Mala Intervention Centre is dedicated to the holistic development of children
              with special needs. Founded on the belief that{" "}
              <strong className="text-primary">"Every Child Matters"</strong>, we have walked
              alongside families across North Bengal for over two decades.
            </p>

            {/* Philosophy pills */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {pills.map(({ label, icon: Icon }, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.82 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={inViewOnce}
                  transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 260 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary border border-border text-primary font-body font-semibold text-sm"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {label}
                </motion.span>
              ))}
            </div>

            <Link to="/about">
              <Button variant="outline" size="lg" className="group border-primary/40 hover:border-primary">
                Our Full Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Link>
          </motion.div>

          {/* Right: feature cards 2×2 */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={inViewOnce}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className={`
                    relative rounded-2xl p-5 overflow-hidden
                    border-2 border-transparent hover:border-primary/20
                    bg-gradient-to-br ${item.gradient}
                    shadow-soft hover:shadow-medium
                    transition-all duration-300 hover:-translate-y-1
                  `}
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.iconGrad} flex items-center justify-center mb-4 shadow-soft`}>
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-1.5 text-base">{item.title}</h3>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
