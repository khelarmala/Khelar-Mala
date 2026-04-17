import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Heart, Instagram, Facebook, Twitter } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_CONFIG, NAV_ITEMS, THERAPIES } from "@/lib/constants";
import logo from "@/assets/khelar-mala-logo.webp";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-fg))]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="" aria-hidden="true" className="h-14 w-14 rounded-full object-cover" loading="lazy" decoding="async" />
              <div>
                <span className="font-heading text-xl font-bold block">Khelar Mala</span>
                <span className="text-sm opacity-80 font-body">{SITE_CONFIG.tagline}</span>
              </div>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed mb-4 font-body">
              Nurturing children with special needs through the transformative power of Play Therapy since 1997.
            </p>
            <p className="text-sm italic font-accent opacity-90 mb-6">
              "Learning, Loving, Growing"
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Follow us on X"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity font-playful link-underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Therapies */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Our Therapies</h3>
            <ul className="space-y-3">
              {THERAPIES.slice(0, 6).map((therapy) => (
                <li key={therapy.id}>
                  <Link
                    to={`/therapies/${therapy.id}`}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity font-playful link-underline"
                  >
                    {therapy.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/therapies"
                  className="text-accent font-semibold text-sm font-playful"
                >
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-2.5">
              {/* Visit Us */}
              <li>
                <a href={SITE_CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Get directions - Visit Us"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/8 hover:bg-white/16 border border-white/15 hover:border-white/30 text-sm font-semibold font-body transition-all w-full">
                  <MapPin className="h-4 w-4 text-accent shrink-0" />
                  <div>
                    <span className="block text-[10px] opacity-55 font-body leading-none mb-0.5">Our Location</span>
                    <span className="opacity-90 text-sm">Visit Us →</span>
                  </div>
                </a>
              </li>
              {/* Call Us */}
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} aria-label={`Call us at ${SITE_CONFIG.phone}`}
                  className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/8 hover:bg-white/16 border border-white/15 hover:border-white/30 text-sm font-semibold font-body transition-all w-full">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <div>
                    <span className="block text-[10px] opacity-55 font-body leading-none mb-0.5">Phone</span>
                    <span className="opacity-90 text-sm">{SITE_CONFIG.phone}</span>
                  </div>
                </a>
              </li>
              {/* Write to Us */}
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} aria-label="Send us an email - Write to Us"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/8 hover:bg-white/16 border border-white/15 hover:border-white/30 text-sm font-semibold font-body transition-all w-full">
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <div>
                    <span className="block text-[10px] opacity-55 font-body leading-none mb-0.5">Email Us</span>
                    <span className="opacity-90 text-sm">Write to Us →</span>
                  </div>
                </a>
              </li>
              {/* Hours */}
              <li>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 w-full">
                  <Clock className="h-4 w-4 text-accent shrink-0" />
                  <div>
                    <span className="block text-[10px] opacity-55 font-body leading-none mb-0.5">Working Hours</span>
                    <span className="opacity-80 text-xs font-body">{SITE_CONFIG.hours}</span>
                  </div>
                </div>
              </li>
            </ul>

            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] rounded-xl text-white font-semibold font-playful shadow-lg hover:opacity-90 transition-all w-full justify-center sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-60 font-body text-center md:text-left">
            © {new Date().getFullYear()} Khelar Mala Intervention Centre. All Rights Reserved.
          </p>
          <p className="text-sm opacity-60 font-body flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-accent fill-accent" /> for every child
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;