import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaEnvelope,
  FaAppStore,
  FaGooglePlay,
} from "react-icons/fa";

const FooterLink = ({
  children,
  href,
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
}) => {
  const className =
    "group relative inline-block w-fit text-[15px] text-white hover:text-white transition-colors duration-300 py-1";

  const inner = (
    <>
      {children}
      <span className="absolute left-0 bottom-0 h-px w-0 bg-primary-500 transition-all duration-500 ease-out group-hover:w-full" />
    </>
  );

  if (external) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {inner}
    </Link>
  );
};

const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    aria-label={label}
    className="group relative w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-all duration-300"
  >
    {children}
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="w-full text-white bg-[#353331]">
      {/* ── Brand Statement ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12 md:pt-24 md:pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <img
                src={Logo}
                alt="Logo Unify"
                className="h-12 sm:h-16 w-auto object-contain"
              />
              <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-extrabold tracking-[-0.04em] leading-[0.9] text-white">
                UNIFY<span className="text-primary-500">.</span>
              </h2>
            </div>
            <p className="text-white text-base sm:text-lg max-w-sm leading-relaxed mt-4 md:mt-6">
              La communauté qui transforme chaque foulée en connexion.
            </p>
          </div>

          {/* CTA + Social icons — desktop: aligned right */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openSignupModal"))
              }
              className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              M&apos;avertir de la sortie
            </button>
            <div className="flex items-center gap-3">
            <SocialLink href="https://instagram.com" label="Instagram">
              <FaInstagram size={16} />
            </SocialLink>
            <SocialLink href="https://linkedin.com" label="LinkedIn">
              <FaLinkedin size={16} />
            </SocialLink>
            <SocialLink href="https://tiktok.com" label="TikTok">
              <FaTiktok size={16} />
            </SocialLink>
            <SocialLink href="mailto:contact@unify-run.com" label="Email">
              <FaEnvelope size={16} />
            </SocialLink>
            </div>
          </div>
        </div>
      </div>

      {/* ── Links Grid ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 md:py-14 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
          {/* Navigation */}
          <nav className="flex flex-col gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/20 mb-2">
              Navigation
            </span>
            <FooterLink href="#" external>
              Accueil
            </FooterLink>
            <FooterLink href="#" external>
              À propos
            </FooterLink>
            <FooterLink href="#abonnements" external>
              Nos abonnements
            </FooterLink>
            <FooterLink href="#footer" external>
              Contact
            </FooterLink>
          </nav>

          {/* Legal */}
          <nav className="flex flex-col gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/20 mb-2">
              Légal
            </span>
            <FooterLink href="/conditions-generales">
              Conditions d&apos;utilisation
            </FooterLink>
            <FooterLink href="/mentions-legales">Mentions légales</FooterLink>
            <FooterLink href="/politique-de-confidentialite">
              Politique de confidentialité
            </FooterLink>
          </nav>

          {/* Download — mobile only */}
          <div className="flex flex-col gap-3 md:hidden col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/20 mb-1">
              Télécharger
            </span>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-white/[0.05] border border-white/10 text-white/70 px-4 py-2.5 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <FaAppStore size={18} />
                <span className="text-sm">App Store</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-white/[0.05] border border-white/10 text-white/70 px-4 py-2.5 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <FaGooglePlay size={18} />
                <span className="text-sm">Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/20">
            &copy; {currentYear} UNIFY &mdash; Tous droits réservés
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs text-white/20 hover:text-white/60 transition-colors duration-300 flex items-center gap-1.5"
          >
            Retour en haut
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="rotate-180"
            >
              <path
                d="M6 2.5v7M3 6.5l3 3 3-3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
