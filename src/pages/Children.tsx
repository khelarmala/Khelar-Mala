import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, CONDITIONS } from "@/lib/constants";
import { Heart, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ContactCTA from "@/components/sections/ContactCTA";

const conditionDetails: Record<string, { description: string; approach: string }> = {
  "Autism Spectrum Disorder (ASD)": { description: "Affecting communication, social interaction, and behavior patterns.", approach: "Social skills, communication abilities, and sensory processing through individualized play-based interventions." },
  "ADHD / ADD / ODD": { description: "Conditions affecting attention, impulse control, and behavioral regulation.", approach: "Channel energy productively, develop focus and self-regulation through structured play and positive strategies." },
  "Learning Disabilities": { description: "Specific difficulties with reading, writing, or mathematical concepts.", approach: "Multi-sensory, play-based approaches to build academic foundations engagingly." },
  "Hearing Impairment": { description: "Partial or complete hearing loss affecting speech and language development.", approach: "Speech, language, and music therapies with visual and tactile approaches for communication." },
  "Speech & Language Disorders": { description: "Difficulties with speech production, language comprehension, or expression.", approach: "Play-based speech and language techniques for clarity, vocabulary, and confident communication." },
  "Cerebral Palsy": { description: "Disorders affecting movement, muscle tone, and posture.", approach: "Occupational therapy, dance therapy, and adapted activities for motor control and independence." },
  "Intellectual Impairment": { description: "Limitations in intellectual functioning and adaptive behavior.", approach: "Skills broken into achievable steps with repetition, multi-sensory approaches, and celebration." },
  "Down Syndrome": { description: "Genetic condition causing developmental delays across multiple areas.", approach: "Comprehensive speech, motor, cognitive, and social development through joyful play." },
  "Multiple Disabilities": { description: "Two or more disabilities requiring specialized, coordinated intervention.", approach: "Highly individualized programs addressing multiple areas simultaneously." },
  "Global Developmental Delay": { description: "Delays in motor, language, cognitive, and social-emotional development.", approach: "Integrated therapy addressing all developmental domains through comprehensive play programs." },
  "Sensory Processing Disorder": { description: "Difficulty processing and responding to sensory information.", approach: "Occupational therapy and sensory integration for regulated experiences and daily functioning." },
  "Developmental Coordination Disorder": { description: "Difficulty with motor coordination affecting movement and balance.", approach: "Occupational and dance therapy for motor planning, coordination, and confidence." },
};

export default function Children() {
  return (
    <Layout>
      <Helmet>
        <title>Children We Care For - ASD, ADHD, Down Syndrome & More | Khelar Mala</title>
        <meta name="description" content="Khelar Mala provides specialized care for children with Autism, ADHD, Down Syndrome, Cerebral Palsy, Learning Disabilities, and other developmental conditions." />
              <link rel="canonical" href="https://www.khelarmala.in/children" />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-28 bg-gradient-to-br from-background via-teal-pale/30 dark:via-secondary/20 to-background overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-20 left-[10%] w-32 h-32 bg-accent/10 rounded-full blur-3xl" animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        </div>
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-badge mb-6">Every Child Matters</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Children We{" "}<span className="text-gradient-teal">Care For</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-4 max-w-2xl">
              We believe in abilities, not labels. While understanding a child's diagnosis helps us tailor our approach, we always see the whole child - their strengths, their potential, their unique gifts.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Button asChild variant="hero"><a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">Discuss Your Child's Needs</a></Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Specialized Care for Every Need</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {CONDITIONS.map((condition, index) => {
              const details = conditionDetails[condition.name];
              return (
                <motion.div key={condition.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="group card-elevated card-hover rounded-2xl p-6 hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-heading text-lg text-foreground">{condition.name}</h3>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">{condition.short}</span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground mb-3">{details?.description}</p>
                      <div className="bg-secondary/50 rounded-xl p-3">
                        <p className="font-body text-sm text-foreground">
                          <span className="text-primary font-medium">Our Approach:</span> {details?.approach}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Not Sure Section */}
      <section className="section-padding bg-gradient-to-b from-background to-card">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <div className="card-elevated rounded-3xl p-8 md:p-12 text-center border border-accent/10">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Not Sure Where Your Child Fits?</h2>
              <p className="text-base md:text-lg text-muted-foreground font-body mb-8 leading-relaxed">
                Every child is unique. If you're unsure or don't see their condition listed, reach out. We'll listen carefully and guide you toward the right support.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="hero"><a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">Chat with Us</a></Button>
                <Button asChild variant="heroOutline"><Link to="/contact#booking-form">Schedule Consultation <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy of Care */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Our Philosophy of Care</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "See Ability, Not Disability", description: "Every child has inherent worth and unlimited potential waiting to be discovered." },
                { title: "Celebrate Every Milestone", description: "Development is a journey, not a race. We celebrate every step forward." },
                { title: "Family as Foundation", description: "Parents are essential partners in their child's growth. Together, we achieve more." },
              ].map((item, index) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="card-elevated rounded-2xl p-6 text-center">
                  <h3 className="font-heading text-lg text-foreground mb-3">{item.title}</h3>
                  <p className="font-body text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
}