/**
 * MobileCTABar - Sticky bottom action bar (mobile only, hidden md+)
 * Provides persistent escape hatch: WhatsApp (primary) + Call
 * Respects iOS safe area inset with env(safe-area-inset-bottom)
 */
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_CONFIG } from "@/lib/constants";

const MobileCTABar = () => {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-40
        md:hidden
        bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
        border-t border-gray-200 dark:border-white/10
        flex items-center gap-2 px-4 py-2
        shadow-[0_-4px_24px_rgba(0,0,0,0.08)]
        dark:shadow-[0_-4px_24px_rgba(0,0,0,0.3)]
      "
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      {/* WhatsApp - primary action */}
      <a
        href={SITE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex-1 flex items-center justify-center gap-2
          bg-[#25D366] hover:bg-[#22c55e]
          text-white font-semibold text-sm
          rounded-xl h-11
          transition-all duration-200 active:scale-95
          shadow-[0_4px_16px_rgba(37,211,102,0.35)]
        "
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
        <span>WhatsApp Us</span>
      </a>

      {/* Call - secondary action */}
      <a
        href={`tel:${SITE_CONFIG.phone}`}
        className="
          flex items-center justify-center gap-2
          bg-primary hover:bg-teal-medium
          text-primary-foreground font-semibold text-sm
          rounded-xl h-11 px-5
          transition-all duration-200 active:scale-95
          shadow-soft
        "
        aria-label={`Call Khelar Mala at ${SITE_CONFIG.phone}`}
      >
        <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Call</span>
      </a>
    </div>
  );
};

export default MobileCTABar;
