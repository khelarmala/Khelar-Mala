import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ExternalLink, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_CONFIG, THERAPIES, CONDITIONS } from "@/lib/constants";
import malaImg from "@/assets/mala.webp";

type ChatStep = "welcome" | "main-menu" | "services" | "conditions" | "child-needs" | "age-selection" | "concern-areas" | "contact-redirect";
type PhaseType = "figurine" | "logo";

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  options?: { label: string; value: string }[];
}

const ageOptions = [
  { label: "0–2 years (Infant/Toddler)", value: "0-2" },
  { label: "3–5 years (Preschool)", value: "3-5" },
  { label: "6–10 years (School Age)", value: "6-10" },
  { label: "11+ years (Older Child)", value: "11+" },
];

const concernAreas = [
  { label: "Speech & Communication", value: "speech" },
  { label: "Social Interaction", value: "social" },
  { label: "Attention & Focus", value: "attention" },
  { label: "Movement & Motor Skills", value: "movement" },
  { label: "Learning & Academics", value: "learning" },
  { label: "Behavior & Emotions", value: "behavior" },
  { label: "Sensory Processing", value: "sensory" },
  { label: "Overall Development", value: "overall" },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<PhaseType>("figurine");
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>("welcome");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hideBubble = setTimeout(() => setShowBubble(false), 2400);
    const goLogo    = setTimeout(() => setPhase("logo"),       2900);
    return () => { clearTimeout(hideBubble); clearTimeout(goLogo); };
  }, []);

  /* Auto-scroll to latest message */
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const addMessage = (type: "bot" | "user", content: string, options?: { label: string; value: string }[]) => {
    setMessages(prev => [...prev, { id: Date.now(), type, content, options }]);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage("bot",
          "Hi! I'm Mala, your Khelar Mala assistant.\n\nHow can I help you today?",
          [
            { label: "Our services & therapies", value: "services" },
            { label: "My child needs support", value: "child-needs" },
            { label: "Questions about conditions", value: "conditions" },
            { label: "Speak to someone", value: "contact" },
          ]
        );
        setCurrentStep("main-menu");
      }, 400);
    }
  };

  const handleOptionClick = (value: string) => {
    switch (value) {
      case "services":
        addMessage("user", "I want to know about your services");
        setTimeout(() => addMessage("bot",
          `At Khelar Mala we offer 9 Play Therapy programmes:\n\n${THERAPIES.map(t => `• ${t.name}`).join("\n")}\n\nAll therapies are play-based and holistic.`,
          [{ label: "Our approach", value: "approach" }, { label: "My child needs support", value: "child-needs" }, { label: "Talk to our team", value: "contact" }]
        ), 500); break;
      case "conditions":
        addMessage("user", "I have questions about conditions");
        setTimeout(() => addMessage("bot",
          `We support children with:\n\n${CONDITIONS.slice(0, 6).map(c => `• ${c.name}`).join("\n")}\n…and more.\n\nWe see ability, not disability.`,
          [{ label: "Tell us about your child", value: "child-needs" }, { label: "View all conditions", value: "all-conditions" }, { label: "Speak to our team", value: "contact" }]
        ), 500); break;
      case "child-needs":
        addMessage("user", "My child needs support");
        setTimeout(() => { addMessage("bot", "I'd love to help! What is your child's age group?", ageOptions); setCurrentStep("age-selection"); }, 500); break;
      case "0-2": case "3-5": case "6-10": case "11+":
        addMessage("user", ageOptions.find(a => a.value === value)?.label ?? value);
        setTimeout(() => { addMessage("bot", "Thank you! What areas are you most concerned about?", concernAreas); setCurrentStep("concern-areas"); }, 500); break;
      case "speech": case "social": case "attention": case "movement": case "learning": case "behavior": case "sensory": case "overall": {
        const concern = concernAreas.find(c => c.value === value);
        if (concern && !selectedConcerns.includes(value)) { setSelectedConcerns(p => [...p, value]); addMessage("user", concern.label); }
        setTimeout(() => addMessage("bot",
          "Our Play Therapy approach can definitely help with this! Let me connect you with our team.",
          [{ label: "Chat on WhatsApp", value: "whatsapp" }, { label: "Call Us", value: "call" }, { label: "Email", value: "email" }]
        ), 500); break;
      }
      case "approach":
        addMessage("user", "Tell me about your approach");
        setTimeout(() => addMessage("bot",
          "Play Therapy is at the heart of everything at Khelar Mala!\n\nThrough play, children:\n• Express what words cannot\n• Develop essential skills\n• Build confidence naturally\n\nParents actively participate too!",
          [{ label: "Book a consultation", value: "contact" }, { label: "My child needs support", value: "child-needs" }]
        ), 500); break;
      case "contact": case "whatsapp":
        addMessage("user", "I'd like to speak with someone");
        setTimeout(() => addMessage("bot",
          `Happy to connect you!\n\nWhatsApp / Phone: ${SITE_CONFIG.phone}\nEmail: ${SITE_CONFIG.email}\nHours: ${SITE_CONFIG.hours}`
        ), 500); break;
      case "call": window.location.href = `tel:${SITE_CONFIG.phone}`; break;
      case "email": window.location.href = `mailto:${SITE_CONFIG.email}`; break;
      case "all-conditions":
        addMessage("user", "Show me all conditions");
        setTimeout(() => addMessage("bot",
          `We support children with:\n\n${CONDITIONS.map(c => `• ${c.name}`).join("\n")}\n\nEvery child is unique - reach out for personalised guidance.`,
          [{ label: "Talk to our team", value: "contact" }, { label: "Tell us about your child", value: "child-needs" }]
        ), 500); break;
    }
  };

  return (
    <>
      {/* Trigger button */}
      <div className="fixed z-50 right-3 bottom-[72px] md:right-6 md:bottom-6">
        <AnimatePresence mode="wait">
          {phase === "figurine" ? (
            <motion.div
              key="figurine"
              initial={{ opacity: 0, y: 40, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3, y: 20, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-end gap-1"
            >
              <AnimatePresence>
                {showBubble && (
                  <motion.div
                    key="bubble"
                    initial={{ opacity: 0, scale: 0.7, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: -8 }}
                    transition={{ duration: 0.28, delay: 0.35 }}
                    className="relative bg-white dark:bg-gray-800 rounded-2xl rounded-br-sm px-3.5 py-2 shadow-lg border border-gray-100 dark:border-white/10 mb-1.5"
                  >
                    <p className="text-xs font-semibold text-gray-800 dark:text-white whitespace-nowrap">Hi! I'm Mala 👋</p>
                    <span className="absolute -bottom-1.5 right-3 border-8 border-transparent border-t-white dark:border-t-gray-800 border-b-0 w-0 h-0" />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                onClick={handleOpen}
                className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-[0_8px_28px_rgba(26,92,90,0.4)] ring-2 ring-primary/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open Mala chat assistant"
              >
                <img src={malaImg} alt="Mala" className="w-full h-full object-cover" />
                <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping opacity-40" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              key="logo"
              onClick={() => isOpen ? setIsOpen(false) : handleOpen()}
              initial={{ opacity: 0, scale: 0.2, rotate: -200 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
              className="relative w-14 h-14 rounded-full overflow-hidden shadow-[0_8px_28px_rgba(26,92,90,0.45)] ring-2 ring-primary/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Close Mala chat" : "Open Mala chat assistant"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="w-full h-full bg-primary flex items-center justify-center">
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.img key="mala" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} src={malaImg} alt="Chat with Mala" className="w-full h-full object-cover" />
                )}
              </AnimatePresence>
              {!isOpen && <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping opacity-30" />}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.93 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Mala, Khelar Mala virtual assistant"
            className="fixed z-50 w-[340px] max-w-[calc(100vw-1.5rem)] rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] right-3 bottom-[calc(72px+4rem)] md:right-6 md:bottom-[calc(1.5rem+4rem)] bg-white/85 dark:bg-gray-900/85 backdrop-blur-2xl"
          >
            <div className="bg-gradient-to-r from-primary to-teal-deep px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/30 shrink-0">
                <img src={malaImg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-white text-sm leading-none">Mala</h3>
                <p className="text-white/70 text-[10px] font-body mt-0.5">Khelar Mala Assistant</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
            </div>

            <div className="h-64 overflow-y-auto p-3 space-y-3 bg-gray-50/50 dark:bg-gray-800/30" role="log" aria-live="polite">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start items-end gap-1.5"}`}>
                  {msg.type === "bot" && (
                    <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 mb-0.5">
                      <img src={malaImg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
                    </div>
                  )}
                  <div className={`max-w-[82%] rounded-2xl px-3 py-2.5 text-xs leading-relaxed ${msg.type === "user" ? "bg-primary text-white rounded-br-sm" : "bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-white/8 text-gray-800 dark:text-gray-100 rounded-bl-sm"}`}>
                    <p className="whitespace-pre-line">{msg.content}</p>
                    {msg.options && (
                      <div className="mt-2.5 space-y-1">
                        {msg.options.map((opt) => (
                          <button key={opt.value} onClick={() => handleOptionClick(opt.value)} className="w-full text-left px-2.5 py-2 bg-gray-50 dark:bg-gray-600 hover:bg-primary/8 dark:hover:bg-primary/20 border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-700 dark:text-gray-200 flex items-center justify-between transition-all hover:border-primary/30 hover:text-primary group">
                            <span>{opt.label}</span>
                            <ChevronRight className="w-3 h-3 text-primary opacity-60 group-hover:opacity-100 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 py-2.5 border-t border-gray-100 dark:border-white/8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm flex gap-2">
              <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#25D366] hover:bg-[#22c55e] text-white rounded-xl text-xs font-semibold transition-all active:scale-95">
                <WhatsAppIcon className="w-3.5 h-3.5" />
                Continue on WhatsApp
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </a>
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center justify-center gap-1 px-3 py-2 border border-primary/30 text-primary hover:bg-primary/8 rounded-xl text-xs font-semibold transition-all" aria-label="Call us">
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
