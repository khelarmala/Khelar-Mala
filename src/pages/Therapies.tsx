import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, THERAPIES } from "@/lib/constants";
import { Palette, Music2, Music, BookOpen, MessageCircle, Brain, Hand, Heart, Flower2, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ContactCTA from "@/components/sections/ContactCTA";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Palette, Music2, Music, BookOpen, MessageCircle, Brain, Hand, Heart, Flower2 };

const borderColors = ["border-t-pink-soft", "border-t-accent", "border-t-gold", "border-t-primary", "border-t-blue-bright", "border-t-purple", "border-t-green-fresh", "border-t-teal-medium", "border-t-gold-light"];

export default function Therapies() {
  return (
    <Layout>
      <Helmet>
        <title>9 Specialized Therapies for Children with Special Needs | Khelar Mala, Siliguri</title>
        <meta name="description" content="Explore Khelar Mala's 9 specialized therapies — Art, Dance, Music, Speech, Language, Cognitive, Occupational, Behavioral therapy and Yoga for children with ASD, ADHD, Down Syndrome & more." />
        <link rel="canonical" href="https://www.khelarmala.in/therapies" />
        <meta property="og:title" content="9 Specialized Therapies | Khelar Mala Intervention Centre" />
        <meta property="og:description" content="Art, Dance, Music, Speech, Language, Cognitive, OT, Behavioral & Yoga therapies for children with special needs in Siliguri." />
        <meta property="og:url" content="https://www.khelarmala.in/therapies" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.khelarmala.in/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="9 Specialized Therapies | Khelar Mala" />
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
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-badge mb-6">9 Specialized Programs</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Comprehensive{" "}<span className="text-gradient-teal">Therapeutic Programs</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-8 max-w-2xl">
              A complete spectrum of therapies, each designed to address specific developmental needs while integrating seamlessly with our Play Therapy approach.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Button asChild variant="hero"><a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">Discuss Your Child's Needs</a></Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Explore Our Therapies</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">Click on any therapy to learn more about how it can help your child</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {THERAPIES.map((therapy, index) => {
              const IconComponent = iconMap[therapy.icon];
              return (
                <motion.div key={therapy.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                  <Link to={`/therapies/${therapy.id}`} className={`block h-full card-elevated card-hover rounded-2xl p-6 border-t-4 ${borderColors[index]} group`}>
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      {IconComponent && <IconComponent className="w-7 h-7 text-primary" />}
                    </div>
                    <h3 className="font-heading text-xl text-foreground mb-1 group-hover:text-primary transition-colors">{therapy.name}</h3>
                    <p className="font-accent text-sm text-accent mb-3 italic">{therapy.tagline}</p>
                    <p className="font-body text-muted-foreground text-sm mb-4">{therapy.description}</p>
                    <div className="flex items-center text-primary font-medium text-sm">
                      Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="section-padding bg-gradient-to-b from-background to-card">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Integrated Play-Based Approach</h2>
            <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-8">
              Your child doesn't just receive isolated sessions - they experience a holistic program where art enhances communication, music supports motor skills, and every activity reinforces multiple areas of development.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="hero"><Link to="/approach">Learn About Our Approach</Link></Button>
              <Button asChild variant="heroOutline"><Link to="/children">Who We Help</Link></Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
}