import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, THERAPIES, USP_ITEMS } from "@/lib/constants";
import {
  TreeDeciduous, Users, Heart, Target, MessageSquare, ClipboardCheck, Pencil, PlayCircle,
  TrendingUp, CheckCircle, ArrowRight, Award, Shield, GraduationCap, Lightbulb, ChevronDown, ChevronUp, Quote
} from "lucide-react";
import { Link } from "react-router-dom";
import ContactCTA from "@/components/sections/ContactCTA";

const processSteps = [
  { step: 1, icon: MessageSquare, title: "Initial Consultation", description: "Warm conversation to understand your child's needs, challenges, and goals." },
  { step: 2, icon: ClipboardCheck, title: "Comprehensive Assessment", description: "Thorough developmental assessment identifying strengths and areas for growth." },
  { step: 3, icon: Pencil, title: "Personalized Program Design", description: "Customized therapy plan combining beneficial approaches for your child." },
  { step: 4, icon: PlayCircle, title: "Active Therapy & Parent Involvement", description: "Regular sessions with parent participation, extending skills beyond therapy." },
  { step: 5, icon: TrendingUp, title: "Ongoing Progress Tracking", description: "Continuous monitoring and program refinement for optimal outcomes." },
];

const partnershipBenefits = [
  { icon: TrendingUp, title: "Faster Progress", description: "Practice continues at home, accelerating development." },
  { icon: Heart, title: "Stronger Bonds", description: "Shared activities strengthen the parent-child relationship." },
  { icon: Users, title: "Empowered Families", description: "Parents gain skills and confidence to support growth." },
  { icon: Target, title: "Seamless Continuity", description: "Learning extends beyond therapy sessions." },
];

const uniqueFactors = [
  { title: "Parent-Child Partnership", description: "Parents don't just drop off - they actively participate in every step." },
  { title: "Play-Based Integration", description: "All 9 therapies unite under Play Therapy for a holistic experience." },
  { title: "Holistic Development", description: "We nurture the whole child - mind, body, and heart simultaneously." },
  { title: "Celebration of Every Milestone", description: "Every step forward, no matter how small, is a victory we celebrate." },
];

const testimonials = [
  { quote: "Khelar Mala transformed our son's life. The progress he's made in communication and confidence is remarkable.", initials: "P.S.", condition: "ASD" },
  { quote: "The parent-partnership model made all the difference. We learned alongside our daughter and the growth continued at home.", initials: "R.D.", condition: "ADHD" },
  { quote: "After trying many centers, Khelar Mala was where our child truly thrived. The team's dedication is unmatched.", initials: "A.M.", condition: "Down Syndrome" },
];

const pillarDetails: Record<string, string[]> = {
  "Institution of Excellence": [
    `${SITE_CONFIG.yearsOfExcellence} years of continuous service since ${SITE_CONFIG.since}`,
    `${SITE_CONFIG.familiesSupported} families supported across North Bengal`,
    "Proven methodologies backed by decades of experience",
  ],
  "Safe & Nurturing Environment": [
    "CCTV-monitored, fully equipped therapy rooms",
    "Child-friendly, vibrant, and sensory-aware spaces",
    "Clean, safe, and welcoming atmosphere",
  ],
  "Personalized Programs": [
    "Individual assessment for every child",
    "Customized combination of therapies",
    "Regular progress reviews and adjustments",
  ],
  "Distinguished Professionals": [
    "Certified and experienced therapists",
    "Ongoing professional development",
    "Passionate, dedicated team members",
  ],
};

const pillarIcons: Record<string, React.ReactNode> = {
  Award: <Award className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
};

export default function Approach() {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <Layout>
      <Helmet>
        <title>Our Approach - Play Therapy for Holistic Child Development | Khelar Mala</title>
        <meta name="description" content="Discover Khelar Mala's Play Therapy approach, Parent-Child Partnership Model, and what sets us apart in special needs education in North Bengal." />
        <link rel="canonical" href="https://www.khelarmala.in/approach" />
        <meta property="og:title" content="Our Approach — Play Therapy & Parent Partnership | Khelar Mala" />
        <meta property="og:description" content="9 specialized therapies unified under Play Therapy. Parents actively participate in every session. 27+ years of proven results." />
        <meta property="og:url" content="https://www.khelarmala.in/approach" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.khelarmala.in/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Play Therapy Approach | Khelar Mala" />
        <meta name="twitter:description" content="How Khelar Mala uses Play Therapy and parent involvement for holistic child development." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-28 bg-gradient-to-br from-background via-teal-pale/30 dark:via-secondary/20 to-background overflow-hidden">
        {/* Bottom fade - prevents visible seam at section boundary */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-20 left-[10%] w-32 h-32 bg-accent/10 rounded-full blur-3xl" animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} />
          <motion.div className="absolute bottom-20 right-[10%] w-40 h-40 bg-primary/10 rounded-full blur-3xl" animate={{ y: [0, 15, 0] }} transition={{ duration: 10, repeat: Infinity }} />
        </div>
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-badge mb-6">Our Methodology</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Play Therapy —{" "}<span className="text-gradient-teal">The Heart of Everything We Do</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-8 max-w-2xl">
              Play is a child's natural way of learning, communicating, and understanding the world. At Khelar Mala, we harness this powerful force to unlock every child's potential.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
              <Button asChild variant="hero"><Link to="/therapies">Explore Therapies</Link></Button>
              <Button asChild variant="heroOutline"><a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">Schedule Consultation</a></Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1: Understanding Play Therapy */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TreeDeciduous className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Understanding Play Therapy</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {["Express what words cannot", "Develop essential cognitive, motor & social skills", "Build confidence and self-esteem", "Process emotions in a safe environment", "Reach developmental milestones naturally", "Learn to communicate and connect with others"].map((item, index) => (
                <motion.div key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-body text-foreground text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="card-elevated rounded-3xl p-8">
              <p className="font-body text-base text-foreground leading-relaxed">
                At Khelar Mala, Play Therapy is the umbrella under which all our specialized therapies unite.
                Like a great tree with deep roots and many branches, our approach provides a strong foundation
                while addressing each child's unique needs through 9 specialized therapies.
              </p>
              <p className="font-accent text-lg text-primary mt-4 italic">
                "Every game has a purpose. Every activity has a goal. Every moment of play becomes an opportunity for growth."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Therapy Tree */}
      <section className="section-padding bg-gradient-to-b from-background to-card">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">The Therapy Tree</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">Our integrated approach weaves multiple therapies into one cohesive experience</p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <div className="text-center mb-6">
                <div className="inline-block bg-primary/10 rounded-2xl p-5 border border-primary/20">
                  <Lightbulb className="w-7 h-7 text-primary mx-auto mb-1" />
                  <h3 className="font-heading text-lg text-foreground">Child's Potential</h3>
                </div>
              </div>
              <div className="flex justify-center mb-6"><div className="w-0.5 h-12 bg-gradient-to-b from-primary/20 to-primary rounded-full" /></div>
              <div className="text-center mb-8">
                <div className="inline-block bg-primary rounded-2xl p-5 text-primary-foreground">
                  <TreeDeciduous className="w-7 h-7 mx-auto mb-1" />
                  <h3 className="font-heading text-lg">Play Therapy</h3>
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {THERAPIES.map((therapy, index) => (
                  <motion.div key={therapy.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                    <Link to={`/therapies/${therapy.id}`} className="block card-elevated rounded-xl p-3 text-center group hover:border-primary/30 transition-all">
                      <h4 className="font-playful text-xs text-foreground group-hover:text-primary transition-colors">{therapy.name}</h4>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Parents as Partners */}
      <section className="section-padding bg-accent/5 dark:bg-accent/5">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full font-playful text-sm mb-4">Our Unique Model</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Parents as Partners</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">Unlike traditional centres, at Khelar Mala parents actively participate in every step of the therapeutic journey.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {partnershipBenefits.map((benefit, index) => (
              <motion.div key={benefit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="card-elevated card-hover rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto card-elevated rounded-3xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-foreground mb-3">Why Parent Involvement Matters</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  When parents learn alongside their children, progress happens faster, bonds grow stronger, and learning continues seamlessly at home. Parents are a child's first and most powerful teachers - we empower them with the tools and confidence to nurture their child's development every day.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: What Sets Us Apart - Accordion */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full font-playful text-sm mb-4">The 4 Pillars</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">What Sets Us Apart</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {USP_ITEMS.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <button
                  onClick={() => setExpandedPillar(expandedPillar === item.title ? null : item.title)}
                  className="w-full card-elevated rounded-2xl p-6 text-left flex items-center gap-4 hover:shadow-medium transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-teal-medium rounded-2xl flex items-center justify-center text-primary-foreground flex-shrink-0">
                    {pillarIcons[item.icon]}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-heading text-lg text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{item.description}</p>
                  </div>
                  {expandedPillar === item.title ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>
                {expandedPillar === item.title && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-secondary/30 rounded-b-2xl p-6 -mt-2">
                    <ul className="space-y-2">
                      {pillarDetails[item.title]?.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: What Makes Us Unique */}
      <section className="section-padding bg-gradient-to-b from-background to-card">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">What Makes Us <span className="text-gradient-gold">Unique</span></h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {uniqueFactors.map((factor, index) => (
              <motion.div key={factor.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="card-elevated card-hover rounded-2xl p-6">
                <h3 className="font-heading text-lg text-foreground mb-2">{factor.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="section-padding bg-accent/5 dark:bg-accent/5">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">What Parents Say</h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-elevated rounded-3xl p-8 text-center">
              <Quote className="w-10 h-10 text-accent/30 mx-auto mb-4" />
              <p className="font-accent text-lg text-foreground italic leading-relaxed mb-6">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <p className="font-heading text-primary font-bold">{testimonials[activeTestimonial].initials}</p>
              <p className="text-sm text-muted-foreground font-body">Parent of child with {testimonials[activeTestimonial].condition}</p>
            </motion.div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => setActiveTestimonial(index)} className={`w-3 h-3 rounded-full transition-all ${index === activeTestimonial ? "bg-primary w-8" : "bg-border"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Our Process */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="section-badge mb-4">Your Child's Journey</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Our Process</h2>
          </motion.div>

          {/* Desktop: horizontal stepper */}
          <div className="hidden md:block max-w-5xl mx-auto">
            <div className="flex items-start justify-between relative">
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-primary/20" />
              {processSteps.map((step, index) => (
                <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative flex flex-col items-center text-center w-1/5">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-heading text-xl font-bold shadow-medium z-10">
                    {step.step}
                  </div>
                  <h3 className="font-heading text-sm text-foreground mt-4 mb-2">{step.title}</h3>
                  <p className="font-body text-xs text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden max-w-md mx-auto">
            {processSteps.map((step, index) => (
              <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative flex items-start gap-4 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-heading font-bold">{step.step}</div>
                  {index < processSteps.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-8 bg-primary/20" />}
                </div>
                <div className="card-elevated rounded-xl p-4 flex-grow">
                  <h3 className="font-heading text-sm text-foreground mb-1">{step.title}</h3>
                  <p className="font-body text-xs text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
}