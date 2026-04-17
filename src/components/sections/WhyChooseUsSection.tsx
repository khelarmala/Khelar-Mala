import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Shield, Users, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { USP_ITEMS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="h-7 w-7" />,
  Shield: <Shield className="h-7 w-7" />,
  Users: <Users className="h-7 w-7" />,
  GraduationCap: <GraduationCap className="h-7 w-7" />,
};

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge-accent mb-4"
          >
            Our Promise
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6"
          >
            What Sets Us <span className="text-gradient-teal">Apart</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-muted-foreground font-body"
          >
            Discover why families across North Bengal trust Khelar Mala.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USP_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card-elevated card-hover p-6 h-full rounded-2xl text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-teal-medium flex items-center justify-center text-primary-foreground shadow-medium mb-5"
                >
                  {iconMap[item.icon]}
                </motion.div>

                <h3 className="text-lg font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/approach">
            <Button variant="outline" size="lg" className="group">
              Learn About Our Approach
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;