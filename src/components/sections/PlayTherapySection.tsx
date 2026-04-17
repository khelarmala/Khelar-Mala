import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TreeDeciduous } from "lucide-react";
import { Button } from "@/components/ui/button";
import playHomescreenImg from "@/assets/play-homescreen.webp";

const therapyBranches = [
  { name: "Art",          color: "bg-pink-soft/30 dark:bg-pink-soft/10",       href: "/therapies/art-therapy"          },
  { name: "Dance",        color: "bg-orange-light dark:bg-accent/10",           href: "/therapies/dance-therapy"        },
  { name: "Music",        color: "bg-gold/20 dark:bg-gold/10",                  href: "/therapies/music-therapy"        },
  { name: "Language",     color: "bg-teal-light dark:bg-primary/10",            href: "/therapies/language-therapy"     },
  { name: "Speech",       color: "bg-blue-bright/20 dark:bg-blue-bright/10",   href: "/therapies/speech-therapy"       },
  { name: "Cognitive",    color: "bg-purple/15 dark:bg-purple/10",              href: "/therapies/cognitive-therapy"    },
  { name: "Occupational", color: "bg-green-fresh/20 dark:bg-green-fresh/10",   href: "/therapies/occupational-therapy" },
  { name: "Behavioral",   color: "bg-teal-medium/20 dark:bg-teal-medium/10",   href: "/therapies/behavioral-therapy"   },
  { name: "Yoga",         color: "bg-gold-light/40 dark:bg-gold-light/10",     href: "/therapies/yoga-meditation"      },
];

const PlayTherapySection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <TreeDeciduous className="h-4 w-4" />
            Our Core Approach
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6"
          >
            Play Therapy - The Building Block of{" "}
            <span className="text-gradient-gold">Growth</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-muted-foreground font-body leading-relaxed"
          >
            Play is a child's natural way of learning, communicating, and understanding the world.
            Through carefully guided play activities, children express what words cannot, develop
            essential skills, and reach milestones at their own pace.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Therapy branches */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="text-center mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="inline-flex items-center justify-center w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-[0_16px_48px_rgba(26,92,90,0.32)] ring-4 ring-primary/20"
              >
                <img
                  src={playHomescreenImg}
                  alt="Khelar Mala - Play Therapy at the core of all our therapies"
                  width="208"
                  height="208"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Mobile: free-wrap / Desktop: fixed 5+4 rows */}
            <div className="flex flex-wrap lg:hidden justify-center gap-2.5">
              {therapyBranches.map((branch, index) => (
                <motion.div
                  key={branch.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -4 }}
                >
                  <Link
                    to={branch.href}
                    className={`block px-4 py-2 rounded-full ${branch.color} font-semibold font-playful text-sm text-foreground shadow-soft transition-all border border-border/50 hover:border-primary/40 hover:shadow-md hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                  >
                    {branch.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            {/* Desktop row 1 — 5 pills */}
            <div className="hidden lg:flex justify-center gap-2.5 mb-2.5">
              {therapyBranches.slice(0, 5).map((branch, index) => (
                <motion.div
                  key={branch.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -4 }}
                >
                  <Link
                    to={branch.href}
                    className={`block px-4 py-2 rounded-full ${branch.color} font-semibold font-playful text-sm text-foreground shadow-soft transition-all border border-border/50 hover:border-primary/40 hover:shadow-md hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                  >
                    {branch.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            {/* Desktop row 2 — 4 pills */}
            <div className="hidden lg:flex justify-center gap-2.5">
              {therapyBranches.slice(5).map((branch, index) => (
                <motion.div
                  key={branch.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index + 5) * 0.05 + 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -4 }}
                >
                  <Link
                    to={branch.href}
                    className={`block px-4 py-2 rounded-full ${branch.color} font-semibold font-playful text-sm text-foreground shadow-soft transition-all border border-border/50 hover:border-primary/40 hover:shadow-md hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                  >
                    {branch.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <p className="text-center mt-3 text-sm text-muted-foreground italic font-accent">
              All therapies branch from Play Therapy - our holistic approach
            </p>
          </motion.div>

          {/* Content card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="card-elevated p-6 rounded-2xl">
              <h3 className="text-lg md:text-xl font-heading font-bold text-foreground mb-3">
                At Khelar Mala, Play Therapy is the umbrella under which all our
                specialized therapies unite.
              </h3>

              <p className="text-muted-foreground font-body leading-relaxed mb-4 text-sm md:text-base">
                We integrate multiple therapeutic disciplines into a holistic, seamless,
                play-based experience designed around each child's unique needs.
              </p>

              <div className="space-y-3 mb-5">
                {[
                  "Every game has a purpose",
                  "Every activity has a goal",
                  "Every moment of play becomes an opportunity for growth",
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 font-bold text-sm">
                      ✓
                    </span>
                    <p className="font-playful font-medium text-foreground">{point}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center lg:justify-start">
                <Link to="/approach">
                  <Button variant="default" size="lg" className="group w-full sm:w-auto">
                    Explore Our Approach
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlayTherapySection;