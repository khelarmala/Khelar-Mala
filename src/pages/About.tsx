import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { Heart, Users, Star, TrendingUp, Sparkles, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import founderPortrait from "@/assets/founder-portrait.webp";
import ContactCTA from "@/components/sections/ContactCTA";

const beliefs = [
  { icon: Heart, title: "Every Child Matters", description: "We see ability, not disability. Every child has inherent worth and unlimited potential.", large: true },
  { icon: Sparkles, title: "Play is Powerful", description: "Play is a child's language, laboratory for learning, and pathway to growth." },
  { icon: Users, title: "Families are Foundational", description: "Parents are essential partners. We equip families to continue the journey at home." },
  { icon: TrendingUp, title: "Progress Over Perfection", description: "We celebrate every milestone. Development is a journey, not a race." },
  { icon: Star, title: "Holistic Growth", description: "We nurture the whole child - cognitive, physical, emotional, social, and behavioral." },
];

const milestones = [
  { year: "1997", title: "Foundation", description: "Khelar Mala was founded by Sucharita Dasgupta with a vision to nurture every child" },
  { year: "2005", title: "Expansion", description: "Added comprehensive therapy programs and expanded our team of specialists" },
  { year: "2015", title: "Recognition", description: "Became North Bengal's leading intervention centre for children with special needs" },
  { year: "2024", title: "Legacy", description: `${SITE_CONFIG.yearsOfExcellence} years of transforming children's lives with ${SITE_CONFIG.familiesSupported} families served` },
];

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About Khelar Mala - {SITE_CONFIG.yearsOfExcellence} Years of Nurturing Potential | Siliguri</title>
        <meta name="description" content="Learn about Khelar Mala Intervention Centre's 27+ year journey. Founded by Sucharita Dasgupta to nurture children with special needs through Play Therapy in North Bengal." />
        <link rel="canonical" href="https://www.khelarmala.in/about" />
        <meta property="og:title" content="About Khelar Mala — 27+ Years Nurturing Potential" />
        <meta property="og:description" content="Founded in 1997 by Sucharita Dasgupta. North Bengal's most trusted intervention centre serving 950+ families with Play Therapy and specialized education." />
        <meta property="og:url" content="https://www.khelarmala.in/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.khelarmala.in/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Khelar Mala — 27+ Years of Excellence" />
        <meta name="twitter:description" content="Our story of nurturing potential since 1997 in Siliguri, North Bengal." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-28 bg-gradient-to-br from-background via-teal-pale/30 dark:via-secondary/20 to-background overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-20 left-[10%] w-32 h-32 bg-accent/10 rounded-full blur-3xl" animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className="absolute bottom-20 right-[10%] w-40 h-40 bg-primary/10 rounded-full blur-3xl" animate={{ y: [0, 15, 0] }} transition={{ duration: 10, repeat: Infinity }} />
        </div>

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-badge mb-6">
              Since {SITE_CONFIG.since}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Our Story of{" "}<span className="text-gradient-teal">Nurturing Potential</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-8 max-w-2xl">
              For over two decades, Khelar Mala has been a beacon of hope for families of children with special needs. Every child who walks through our doors brings a unique story - and leaves with countless victories.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
              <Button asChild variant="hero"><Link to="/approach">Our Approach</Link></Button>
              <Button asChild variant="heroOutline"><a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">Talk to Us</a></Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">The Khelar Mala Journey</h2>
            <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed">
              Born in 1997 from a simple yet powerful belief - that every child matters, regardless of their abilities or challenges. What began as a small initiative has grown into North Bengal's most trusted destination for holistic child development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-secondary/50 rounded-3xl p-8">
              <h3 className="font-heading text-xl text-foreground mb-4">The Name "Khelar Mala"</h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                "Khelar Mala" (খেলার মালা) means "Garland of Play" in Bengali - symbolizing how we weave together different therapeutic approaches into one beautiful, unified experience. Just as a garland brings together individual flowers, we integrate diverse therapies into a cohesive journey of growth.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-accent/5 dark:bg-accent/10 rounded-3xl p-8">
              <h3 className="font-heading text-xl text-foreground mb-4">Our Legacy</h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Over the decades, we have walked alongside hundreds of families, witnessing countless moments of breakthrough, growth, and joy. Each child who has passed through our doors has taught us something new about resilience, potential, and the incredible capacity of the human spirit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gradient-to-b from-background to-card">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Our Milestones</h2>
            <p className="text-muted-foreground font-body">A journey of growth, learning, and transformation</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-6 mb-10 last:mb-0"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-medium">
                  <Calendar className="w-5 h-5 text-primary-foreground" />
                </div>
                {index < milestones.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-10 bg-primary/20" />
                )}
                <div className="flex-grow card-elevated rounded-2xl p-6">
                  <span className="font-heading text-2xl text-primary font-bold">{milestone.year}</span>
                  <h3 className="font-heading text-lg text-foreground mb-2">{milestone.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy - Bento Grid */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full font-playful text-sm mb-4">What We Believe</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Our Philosophy</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {beliefs.map((belief, index) => (
              <motion.div
                key={belief.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card-elevated card-hover rounded-2xl p-6 ${
                  index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <belief.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-3">{belief.title}</h3>
                <p className="font-body text-muted-foreground">{belief.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-gradient-to-br from-primary/5 dark:from-primary/10 via-background to-accent/5 dark:to-accent/10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <img src={founderPortrait} alt="Sucharita Dasgupta - Founder, Khelar Mala" className="rounded-3xl shadow-large w-full max-w-md mx-auto aspect-[3/4] object-cover img-glow" loading="lazy" decoding="async" />
              <div className="absolute -bottom-4 -right-4 card-elevated rounded-2xl p-4">
                <p className="font-accent text-sm text-muted-foreground italic">Special Educator</p>
                <p className="font-heading text-foreground">Since {SITE_CONFIG.since}</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="section-badge mb-4">From the Founder's Desk</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                A Message from<br /><span className="text-gradient-teal">{SITE_CONFIG.founder}</span>
              </h2>

              <blockquote className="border-l-4 border-accent pl-6 mb-6">
                <p className="font-accent text-xl text-foreground italic">
                  "Within every child resides infinite possibility - we simply illuminate the path."
                </p>
              </blockquote>

              <div className="font-body text-muted-foreground space-y-4 leading-relaxed">
                <p>Every child with special needs is endowed with an innate brilliance awaiting the right guidance. At Khelar Mala, we unveil it, nurture it, and empower it to blossom.</p>
                <p>For over two decades, I have witnessed countless children transform, grow, and achieve what many thought impossible.</p>
                <p>To every parent reading this - your child is capable of extraordinary growth. We are here to walk this journey with you.</p>
              </div>

              <div className="mt-8">
                <p className="font-heading text-foreground">{SITE_CONFIG.founder}</p>
                <p className="text-sm text-muted-foreground">{SITE_CONFIG.founderTitle}, Founder & Director</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Visit Khelar Mala</h2>
              <p className="text-base md:text-lg text-muted-foreground font-body mb-8">{SITE_CONFIG.location}</p>
              <Button asChild variant="hero">
                <a href={SITE_CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open Khelar Mala on Google Maps">Get Directions</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
}