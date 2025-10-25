import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-black/80 backdrop-blur-md border-b border-gold-500/20' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#home" className="flex items-center group">
            <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczNxD1k1NCFFBIOJ3FMRaTvm1JeacBUTVb3Pf2Khl4ROZ32t309V8qujFMOfBzVOlgHroI0P7axBaNhhIl56Fk5u_WoNxJNanitTlBNXwJtsuWomVlI=w600-h315-p-k" 
              alt="Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain transition-transform group-hover:scale-110"
            />
          </a>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#home">Accueil</NavLink>
            <NavLink href="#episodes">Épisodes</NavLink>
            <NavLink href="#about">À Propos</NavLink>
            <NavLink href="#contact">Consultation</NavLink>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gold-400 hover:text-gold-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
          <MobileNavLink href="#home" onClick={() => setIsMobileMenuOpen(false)}>Accueil</MobileNavLink>
          <MobileNavLink href="#episodes" onClick={() => setIsMobileMenuOpen(false)}>Épisodes</MobileNavLink>
          <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>À Propos</MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Consultation</MobileNavLink>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a 
      href={href}
      className="relative text-gold-200 hover:text-gold-400 transition-colors py-2 group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, onClick, children }) => {
  return (
    <a 
      href={href}
      onClick={onClick}
      className="text-gold-200 hover:text-gold-400 transition-colors py-2 hover:scale-110 transform transition-transform"
    >
      {children}
    </a>
  );
};

export default Header;