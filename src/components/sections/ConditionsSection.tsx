import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONDITIONS } from "@/lib/constants";

const conditionDescriptions: Record<string, string> = {
  "Autism Spectrum Disorder (ASD)": "Affecting communication, social interaction, and behavior",
  "ADHD / ADD / ODD": "Challenges with attention, impulse control, and regulation",
  "Learning Disabilities": "Difficulties with reading, writing, or math skills",
  "Hearing Impairment": "Partial or complete hearing loss affecting development",
  "Speech & Language Disorders": "Difficulties with speech production or comprehension",
  "Cerebral Palsy": "Affecting movement, muscle tone, and posture",
  "Intellectual Impairment": "Limitations in intellectual functioning and adaptive behavior",
  "Down Syndrome": "Genetic condition with developmental delays across areas",
  "Multiple Disabilities": "Two or more disabilities requiring coordinated care",
  "Global Developmental Delay": "Delays in multiple developmental domains",
  "Sensory Processing Disorder": "Difficulty processing sensory information",
  "Developmental Coordination Disorder": "Difficulty with motor coordination and balance",
};

const ConditionsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-cream-warm dark:from-secondary/20 to-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge-accent mb-4"
          >
            Specialized Care
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6"
          >
            Children We <span className="text-gradient-gold">Care For</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-muted-foreground font-body"
          >
            We believe in abilities, not labels. While understanding a child's diagnosis helps
            us tailor our approach, we always see the whole child.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto"
        >
          {CONDITIONS.map((condition, index) => (
            <motion.div
              key={condition.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 + 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="group relative flex items-center gap-2.5 px-4 py-3 rounded-xl bg-card border border-border shadow-soft font-playful text-sm font-medium text-foreground cursor-pointer transition-all hover:bg-primary/5 hover:border-primary/30"
            >
              <span className="w-2 h-2 rounded-full bg-primary/60 shrink-0" aria-hidden="true" />
              {condition.name}
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-medium text-xs text-muted-foreground font-body w-48 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {conditionDescriptions[condition.name]}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-block bg-accent/5 dark:bg-accent/10 rounded-2xl p-6 mb-6 border border-accent/10">
            <p className="text-muted-foreground font-body font-medium">
              🤔 Not sure where your child fits? Every child is unique - reach out for a conversation.
            </p>
          </div>
          <br />
          <Link to="/children">
            <Button variant="outline" size="lg" className="group">
              Learn More About Each Condition
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ConditionsSection;