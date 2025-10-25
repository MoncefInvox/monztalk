import React from 'react';
import { Mail, MessageSquare, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4 sm:mb-6">
              <a href="#home">
                <img 
                  src="https://lh3.googleusercontent.com/pw/AP1GczNxD1k1NCFFBIOJ3FMRaTvm1JeacBUTVb3Pf2Khl4ROZ32t309V8qujFMOfBzVOlgHroI0P7axBaNhhIl56Fk5u_WoNxJNanitTlBNXwJtsuWomVlI=w600-h315-p-k" 
                  alt="Logo" 
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain transition-transform hover:scale-110"
                />
              </a>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Des retours d'expérience, des leçons réelles, et tout ce qu'on ne te dit pas sur les projets CRM.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <SocialLink 
                icon={<Linkedin size={18} />} 
                href="https://www.linkedin.com/in/moncef-buri-0644a31bb/"
                label="LinkedIn"
              />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Liens Rapides</h3>
            <ul className="space-y-3 sm:space-y-4">
              <FooterLink href="#home">Accueil</FooterLink>
              <FooterLink href="#episodes">Épisodes</FooterLink>
              <FooterLink href="#about">À Propos</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Contactez-moi</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <a href="mailto:Burimoncef@gmail.com">Burimoncef@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400 hover:text-white transition-colors">
                <MessageSquare size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <a href="#contact">Envoyez un Message</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex justify-center">
            <p className="text-gray-400 text-xs sm:text-sm text-center">
              © {new Date().getFullYear()} Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href, label }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
    >
      <div className="w-4 h-4 sm:w-5 sm:h-5">{icon}</div>
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <a 
        href={href}
        className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
      >
        {children}
      </a>
    </li>
  );
};

export default Footer;