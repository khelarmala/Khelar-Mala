import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, THERAPIES } from "@/lib/constants";
import { Palette, Music2, Music, BookOpen, MessageCircle, Brain, Hand, Heart, Flower2, CheckCircle, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Palette, Music2, Music, BookOpen, MessageCircle, Brain, Hand, Heart, Flower2 };

const therapyDetails: Record<string, { tagline: string; overview: string; involves: string[]; benefits: string[]; benefitsFor: string[] }> = {
  "art-therapy": { tagline: "Creative Expression for Holistic Growth", overview: "Art Therapy uses painting, drawing, and crafting to support emotional, cognitive, and physical development.", involves: ["Painting & drawing", "Crafting with materials", "Sensory art", "Guided expression", "Collaborative projects"], benefits: ["Fine motor development", "Creative expression", "Emotional confidence", "Cognitive skills", "Sensory integration"], benefitsFor: ["ASD", "ADHD", "Learning Disabilities", "SPD", "Fine motor delays"] },
  "dance-therapy": { tagline: "Movement & Rhythm for Body and Mind", overview: "Dance Therapy enhances physical coordination, body awareness, and emotional expression through movement.", involves: ["Rhythmic exercises", "Guided dance", "Free movement", "Music-based motor activities", "Balance games"], benefits: ["Physical coordination", "Body awareness", "Emotional expression", "Social skills", "Confidence"], benefitsFor: ["DCD", "Cerebral Palsy", "ADHD", "ASD", "SPD", "GDD"] },
  "music-therapy": { tagline: "Harmony for Development and Connection", overview: "Music Therapy uses singing, instruments, and rhythm to enhance auditory processing and emotional connection.", involves: ["Singing & vocalization", "Instrument play", "Rhythm games", "Musical storytelling", "Sound discrimination"], benefits: ["Auditory skills", "Memory enhancement", "Emotional connection", "Communication", "Social engagement"], benefitsFor: ["Hearing Impairment", "Speech Disorders", "ASD", "ADHD", "Intellectual Impairment"] },
  "language-therapy": { tagline: "Building Meaningful Communication", overview: "Language Therapy develops vocabulary, comprehension, and meaningful communication through interactive activities.", involves: ["Storytelling", "Vocabulary games", "Comprehension exercises", "Conversation practice", "Picture communication"], benefits: ["Vocabulary growth", "Comprehension", "Communication skills", "Social language", "Literacy foundation"], benefitsFor: ["Speech/Language Disorders", "ASD", "Hearing Impairment", "GDD", "Learning Disabilities"] },
  "speech-therapy": { tagline: "Clarity and Confidence in Communication", overview: "Speech Therapy improves articulation, fluency, and spoken communication through targeted exercises.", involves: ["Articulation exercises", "Speech games", "Oral motor exercises", "Fluency techniques", "Pronunciation training"], benefits: ["Clear articulation", "Improved fluency", "Communication confidence", "Oral motor skills", "Effective speech"], benefitsFor: ["Speech Disorders", "Stuttering", "Hearing Impairment", "Cerebral Palsy", "Down Syndrome"] },
  "cognitive-therapy": { tagline: "Building Thinking Skills for Life", overview: "Cognitive Therapy develops attention, memory, thinking skills, and academic readiness through engaging tasks.", involves: ["Puzzles & brain games", "Memory exercises", "Attention training", "Reasoning tasks", "Academic preparation"], benefits: ["Extended attention", "Problem-solving", "Memory improvement", "Academic readiness", "Executive function"], benefitsFor: ["ADHD/ADD", "Learning Disabilities", "Intellectual Impairment", "GDD", "ASD"] },
  "occupational-therapy": { tagline: "Independence in Daily Life", overview: "Occupational Therapy develops the ability to perform everyday activities independently.", involves: ["Sensory integration", "Fine motor development", "Gross motor activities", "Self-care training", "Handwriting preparation"], benefits: ["Motor control", "Daily independence", "Sensory processing", "Handwriting skills", "Life skills"], benefitsFor: ["SPD", "Cerebral Palsy", "DCD", "ASD", "Fine motor delays", "GDD"] },
  "behavioral-therapy": { tagline: "Positive Patterns for Social Success", overview: "Behavioral Therapy develops positive behavior patterns and social understanding through structured activities.", involves: ["Role-play scenarios", "Positive reinforcement", "Behavior modification", "Social skills training", "Emotional regulation"], benefits: ["Positive behavior", "Social understanding", "Self-control", "Relationship skills", "Coping strategies"], benefitsFor: ["ADHD/ODD", "ASD", "Behavioral challenges", "Emotional regulation difficulties"] },
  "yoga-meditation": { tagline: "Inner Peace for Growing Minds", overview: "Yoga and Meditation develops flexibility, focus, and emotional self-regulation through mindful movement.", involves: ["Child-friendly yoga poses", "Breathing exercises", "Guided relaxation", "Mindfulness activities", "Calming techniques"], benefits: ["Flexibility", "Focus enhancement", "Emotional regulation", "Stress relief", "Mind-body connection"], benefitsFor: ["ADHD", "ASD", "Anxiety", "SPD", "All children benefit"] },
};

export default function TherapyDetail() {
  const { therapyId } = useParams<{ therapyId: string }>();
  const therapy = THERAPIES.find(t => t.id === therapyId);
  const details = therapyId ? therapyDetails[therapyId] : null;
  if (!therapy || !details) return <Navigate to="/therapies" replace />;

  const IconComponent = iconMap[therapy.icon];
  const currentIndex = THERAPIES.findIndex(t => t.id === therapyId);
  const prevTherapy = currentIndex > 0 ? THERAPIES[currentIndex - 1] : null;
  const nextTherapy = currentIndex < THERAPIES.length - 1 ? THERAPIES[currentIndex + 1] : null;

  return (
    <Layout>
      <Helmet>
        <title>{therapy.name} | Khelar Mala Intervention Centre</title>
        <meta name="description" content={`${therapy.name} at Khelar Mala: ${details.overview}`} />
              <link rel="canonical" href={`https://www.khelarmala.in/therapies/${therapyId}`} />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-28 bg-gradient-to-br from-background via-teal-pale/30 dark:via-secondary/20 to-background overflow-hidden">
        <div className="container-custom relative">
          <Link to="/therapies" className="inline-flex items-center text-primary hover:text-primary/80 font-medium mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />Back to All Therapies
          </Link>
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                {IconComponent && <IconComponent className="w-10 h-10 text-primary" />}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4">{therapy.name}</h1>
              <p className="font-accent text-xl text-accent italic mb-6">{details.tagline}</p>
              <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-8 max-w-3xl">{details.overview}</p>
              <Button asChild variant="hero"><a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">Inquire About {therapy.name}</a></Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What It Involves + Benefits */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">What It Involves</h2>
              <div className="space-y-3">
                {details.involves.map((item, i) => (
                  <motion.div key={item} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span className="font-body text-foreground text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">Benefits</h2>
              <div className="space-y-3">
                {details.benefits.map((benefit, i) => (
                  <motion.div key={benefit} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3 bg-accent/5 dark:bg-accent/10 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" /><span className="font-body text-foreground text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="section-padding bg-gradient-to-b from-background to-card">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Who Benefits from {therapy.name}?</h2>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {details.benefitsFor.map((condition, i) => (
                <motion.span key={condition} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="px-4 py-2 bg-card rounded-full border border-primary/20 text-foreground font-body text-sm hover:bg-primary/5 transition-colors">
                  {condition}
                </motion.span>
              ))}
            </div>
            <div className="mt-12"><Button asChild variant="heroOutline"><Link to="/children">All Conditions We Support</Link></Button></div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 bg-card border-t border-border">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            {prevTherapy ? (
              <Link to={`/therapies/${prevTherapy.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" /><span className="font-body text-sm">{prevTherapy.name}</span>
              </Link>
            ) : <div />}
            {nextTherapy && (
              <Link to={`/therapies/${nextTherapy.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <span className="font-body text-sm">{nextTherapy.name}</span><ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary via-teal-deep to-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Explore {therapy.name}?</h2>
            <p className="font-body text-lg opacity-90 mb-8">Speak with our team about integrating {therapy.name} into your child's personalized program.</p>
            <Button asChild variant="accent" size="lg"><a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer">Chat with Us on WhatsApp</a></Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}