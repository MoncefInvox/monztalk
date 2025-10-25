import React, { useEffect, useRef, useState } from 'react';
import { Settings, ArrowUpRight, Database, Users, Target, Zap, Flame, Star, TrendingUp, Award, Rocket, Crown, Shield, CloudLightning as Lightning, Sparkles, Eye, Brain, Heart, Trophy, Briefcase, Code, Wrench, ChevronRight, Play, CheckCircle, Lock, Unlock, AlertTriangle, Search, FileText, Camera, Headphones, Crosshair, Radar, Satellite, Monitor, Wifi, Signal } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [isTargetLocked, setIsTargetLocked] = useState(false);
  const [scanningProgress, setScanningProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [surveillanceActive, setSurveillanceActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    // Auto-lock target after 2 seconds
    const timer = setTimeout(() => {
      setSurveillanceActive(true);
      const interval = setInterval(() => {
        setScanningProgress(prev => {
          if (prev >= 100) {
            setIsTargetLocked(true);
            clearInterval(interval);
            return 100;
          }
          return prev + 3;
        });
      }, 80);
      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden bg-black">
      {/* Surveillance Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Crosshair Overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gold-500/30 animate-pulse"></div>
          <div className="absolute left-1/2 top-0 w-px h-full bg-gold-500/30 animate-pulse"></div>
        </div>
        
        {/* Radar Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 rounded-full border border-gold-400/20 animate-ping"></div>
          <div className="absolute inset-8 rounded-full border border-gold-400/30 animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute inset-16 rounded-full border border-gold-400/40 animate-ping" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Scanning Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>
        
        {/* Target Tracker */}
        <div 
          className={`absolute w-16 h-16 border-2 transition-all duration-300 pointer-events-none ${
            isTargetLocked ? 'border-gold-400' : 'border-red-500'
          }`}
          style={{
            left: mousePosition.x - 32,
            top: mousePosition.y - 32,
            transform: `scale(${hoveredSkill ? 1.5 : 1})`,
            borderRadius: isTargetLocked ? '50%' : '0'
          }}
        >
          <div className="absolute inset-2 border border-current opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-current rounded-full animate-pulse"></div>
        </div>

        {/* Data Points */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gold-400/40 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            {['TARGET', 'SCAN', '█████', 'CRM', 'AGENT'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Surveillance Header */}
          <div className="text-center mb-12 sm:mb-16 px-4">
            <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg bg-black/90 border-2 border-red-500/60 mb-6 sm:mb-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 via-transparent to-gold-500/20 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
              
              <Crosshair size={20} className="sm:w-6 sm:h-6 text-red-400 animate-spin" />
              <span className="text-red-400 font-mono font-bold text-sm sm:text-base lg:text-lg tracking-wider">
                {surveillanceActive ? 'CIBLE VERROUILLÉE' : 'SURVEILLANCE ACTIVE'}
              </span>
              <Radar size={20} className="sm:w-6 sm:h-6 text-red-400 animate-pulse" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight font-mono">
              <span className="text-gold-400">AGENT:</span>{' '}
              <span className="relative inline-block group">
                <span className="bg-gradient-to-r from-red-500 via-gold-400 to-red-600 bg-clip-text text-transparent">
                  MONCEF
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-gold-400 to-red-600 animate-pulse"></div>
              </span>
            </h2>
            
            {/* Scanning Status */}
            <div className="max-w-md mx-auto mb-6 sm:mb-8">
              <div className="bg-black/80 border border-gold-400/40 rounded-lg p-3 sm:p-4 font-mono">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor size={14} className="sm:w-4 sm:h-4 text-gold-400" />
                  <span className="text-gold-400 text-xs sm:text-sm">
                    {isTargetLocked ? 'ANALYSE TERMINÉE' : 'ANALYSE EN COURS...'}
                  </span>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isTargetLocked ? 'bg-gold-400' : 'bg-red-400'}`}></div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-100 ${
                      isTargetLocked ? 'bg-gradient-to-r from-gold-400 to-gold-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${scanningProgress}%` }}
                  ></div>
                </div>
                <div className="text-gold-400/80 text-xs">
                  {isTargetLocked ? 'PROFIL DÉCHIFFRÉ' : `${scanningProgress}% ANALYSÉ`}
                </div>
              </div>
            </div>
          </div>
          
          {/* Agent Profile Card */}
          <div className="relative max-w-5xl mx-auto mb-12 sm:mb-16 px-4">
            <div className={`relative bg-black/95 border-2 rounded-2xl overflow-hidden transition-all duration-1000 ${
              isTargetLocked ? 'border-gold-400/60 shadow-2xl shadow-gold-500/30' : 'border-red-500/60 shadow-2xl shadow-red-500/30'
            }`}>
              {/* Status Bar */}
              <div className={`absolute top-0 left-0 right-0 h-6 sm:h-8 flex items-center justify-between px-3 sm:px-4 text-xs font-mono font-bold ${
                isTargetLocked ? 'bg-gold-500 text-black' : 'bg-red-500 text-white animate-pulse'
              }`}>
                <span>
                  {isTargetLocked ? '✓ CIBLE IDENTIFIÉE' : '⚠ SURVEILLANCE EN COURS'}
                </span>
                <span className="flex items-center gap-1 sm:gap-2">
                  <Signal size={10} className="sm:w-3 sm:h-3" />
                  <span className="hidden sm:inline">{isTargetLocked ? 'SIGNAL FORT' : 'ACQUISITION...'}</span>
                </span>
              </div>

              <div className="pt-8 sm:pt-12 p-4 sm:p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                  {/* Surveillance Photo */}
                  <div className="relative">
                    <div className="relative group">
                      <div className={`aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-1000 ${
                        isTargetLocked ? 'border-gold-400/60' : 'border-red-500/60'
                      }`}>
                        <img 
                          src="/Assets/photo/QUOTE.png" 
                          alt="Agent Moncef" 
                          className={`w-full h-full object-cover transition-all duration-1000 ${
                            isTargetLocked ? 'filter-none' : 'filter blur-sm grayscale contrast-125'
                          }`}
                        />
                        
                        {/* Scanning Overlay */}
                        {!isTargetLocked && (
                          <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/30 to-transparent animate-pulse">
                              <div 
                                className="absolute left-0 w-full h-0.5 sm:h-1 bg-red-500 transition-all duration-100 shadow-lg shadow-red-500/50"
                                style={{ top: `${scanningProgress}%` }}
                              ></div>
                            </div>
                            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-red-400 font-mono text-xs animate-pulse">
                              SCANNING...
                            </div>
                          </div>
                        )}

                        {/* Target Lock Indicator */}
                        {isTargetLocked && (
                          <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gold-400 flex items-center justify-center animate-pulse">
                              <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Agent Status */}
                      <div className={`absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl font-mono font-bold text-xs sm:text-sm transition-all duration-1000 ${
                        isTargetLocked 
                          ? 'bg-green-500 text-black border-2 border-green-400' 
                          : 'bg-red-500 text-white border-2 border-red-400 animate-pulse'
                      }`}>
                        <span className="hidden sm:inline">{isTargetLocked ? 'AGENT CONFIRMÉ' : 'IDENTIFICATION...'}</span>
                        <span className="sm:hidden">{isTargetLocked ? 'OK' : '...'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Agent Intel */}
                  <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
                    <div className={`transition-all duration-1000 ${isTargetLocked ? 'opacity-100' : 'opacity-60'}`}>
                      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <Shield size={20} className="sm:w-6 sm:h-6 text-gold-400" />
                        <h3 className="text-lg sm:text-xl font-bold text-gold-400 font-mono">DOSSIER OPÉRATIONNEL</h3>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4 font-mono text-sm">
                        <div className="flex justify-between items-center border-b border-gold-400/20 pb-1 sm:pb-2">
                          <span className="text-gray-400 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Eye size={12} className="sm:w-3.5 sm:h-3.5" />
                            IDENTITÉ:
                          </span>
                          <span className="text-gold-400 font-bold text-xs sm:text-sm">MONCEF BURI</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gold-400/20 pb-1 sm:pb-2">
                          <span className="text-gray-400 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Target size={12} className="sm:w-3.5 sm:h-3.5" />
                            MISSION:
                          </span>
                          <span className="text-gold-400 font-bold text-xs sm:text-sm">CRM SPECIALIST</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gold-400/20 pb-1 sm:pb-2">
                          <span className="text-gray-400 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Trophy size={12} className="sm:w-3.5 sm:h-3.5" />
                            EXPÉRIENCE:
                          </span>
                          <span className="text-gold-400 font-bold text-xs sm:text-sm">2+ ANS TERRAIN</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gold-400/20 pb-1 sm:pb-2">
                          <span className="text-gray-400 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Briefcase size={12} className="sm:w-3.5 sm:h-3.5" />
                            PROJETS:
                          </span>
                          <span className="text-gold-400 font-bold text-xs sm:text-sm">70K€+ GÉRÉS</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Satellite size={12} className="sm:w-3.5 sm:h-3.5" />
                            STATUT:
                          </span>
                          <span className="text-gold-400 font-bold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                            EN MISSION
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mission Brief */}
                    <div className={`p-4 sm:p-6 bg-gold-500/10 border border-gold-400/30 rounded-lg transition-all duration-1000 ${
                      isTargetLocked ? 'opacity-100' : 'opacity-40'
                    }`}>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <FileText size={14} className="sm:w-4 sm:h-4 text-gold-400" />
                        <span className="text-gold-400 font-mono font-bold text-xs sm:text-sm">PROFIL OPÉRATIONNEL</span>
                      </div>
                      <div className="space-y-2 sm:space-y-3 text-gray-300 text-xs sm:text-sm leading-relaxed">
                        <p>
                          <span className="text-green-400 font-bold">AGENT:</span> Moncef, 2+ ans à révolutionner HubSpot et Pardot pour créer des systèmes qui génèrent des résultats en autopilote.
                        </p>
                        <p>
                          <span className="text-green-400 font-bold">TERRAIN:</span> PME et grands groupes, tous secteurs (logiciel → construction). Challenges uniques, solutions sur-mesure.
                        </p>
                        <p>
                          <span className="text-green-400 font-bold">MÉTHODE:</span> Comprendre ton process → Auditer ce qui marche pas → Proposer 1000+ approches pour un CRM qui soutient ta croissance au lieu de la freiner.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills Surveillance Grid */}
          <div className={`transition-all duration-1000 delay-500 px-4 ${isTargetLocked ? 'opacity-100' : 'opacity-50'}`}>
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-black/80 border border-green-400/40 rounded-lg font-mono">
                <Radar size={16} className="sm:w-5 sm:h-5 text-gold-400 animate-spin" />
                <span className="text-green-400 font-bold text-sm sm:text-base">COMPÉTENCES DÉTECTÉES</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <SurveillanceSkillCard 
                icon={<Database />}
                title="SETUP CRM & PARAMÉTRAGE"
                description="Je configure les CRM en créant une structure claire qui respecte les processus existants, avec les bons champs, les bons pipelines et les étapes de vente adaptées."
                level={98}
                onHover={() => setHoveredSkill('data')}
                onLeave={() => setHoveredSkill(null)}
                isLocked={isTargetLocked}
              />
              <SurveillanceSkillCard 
                icon={<Database />}
                title="DATA MANAGEMENT & MIGRATION"
                description="Je nettoie, structure et migre les données pour construire une base propre, cohérente et immédiatement exploitable."
                level={95}
                onHover={() => setHoveredSkill('system')}
                onLeave={() => setHoveredSkill(null)}
                isLocked={isTargetLocked}
              />
              <SurveillanceSkillCard 
                icon={<TrendingUp />}
                title="REPORTING & DASHBOARDS"
                description="Je conçois des tableaux de bord lisibles, avec des KPI pertinents pour suivre et piloter l'activité marketing et commerciale."
                level={92}
                onHover={() => setHoveredSkill('intel')}
                onLeave={() => setHoveredSkill(null)}
                isLocked={isTargetLocked}
              />
              <SurveillanceSkillCard 
                icon={<Target />}
                title="STRATÉGIE SALES & MARKETING INTÉGRÉE"
                description="J'aligne les équipes sales et marketing en structurant l'attribution des leads, le scoring et les workflows de gestion interne ou externe."
                level={90}
                onHover={() => setHoveredSkill('team')}
                onLeave={() => setHoveredSkill(null)}
                isLocked={isTargetLocked}
              />
              <SurveillanceSkillCard 
                icon={<Settings />}
                title="AUTOMATISATION & OPTIMISATION"
                description="Je mets en place des automatisations qui simplifient le quotidien, optimisent les relances, fluidifient les parcours et améliorent l'efficacité globale."
                level={94}
                onHover={() => setHoveredSkill('automation')}
                onLeave={() => setHoveredSkill(null)}
                isLocked={isTargetLocked}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SurveillanceSkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  level: number;
  onHover: () => void;
  onLeave: () => void;
  isLocked: boolean;
}

const SurveillanceSkillCard: React.FC<SurveillanceSkillCardProps> = ({ 
  icon, 
  title, 
  description, 
  level, 
  onHover, 
  onLeave, 
  isLocked 
}) => {
  return (
    <div 
      className={`group relative p-4 sm:p-6 bg-black/80 border rounded-lg sm:rounded-xl transition-all cursor-crosshair overflow-hidden ${
        isLocked 
          ? 'border-gold-400/30 hover:border-gold-400/60 hover:bg-black/90' 
          : 'border-red-500/30 hover:border-red-500/60'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={`absolute inset-0 transition-opacity ${
        isLocked 
          ? 'bg-gradient-to-r from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100' 
          : 'bg-gradient-to-r from-red-500/5 to-transparent opacity-50'
      }`}></div>
      
      {/* Target Corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-current opacity-50"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-current opacity-50"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-current opacity-50"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-current opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border flex items-center justify-center group-hover:scale-110 transition-transform ${
            isLocked 
              ? 'bg-gold-500/10 border-gold-400/30 text-gold-400' 
              : 'bg-red-500/10 border-red-400/30 text-red-400'
          }`}>
            <div className="w-5 h-5 sm:w-6 sm:h-6">{icon}</div>
          </div>
          <div>
            <h3 className={`font-bold font-mono text-xs sm:text-sm transition-colors ${
              isLocked 
                ? 'text-green-400 group-hover:text-green-300' 
                : 'text-red-400'
            }`}>
              {title}
            </h3>
            <div className={`font-mono text-xs ${
              isLocked ? 'text-green-400/60' : 'text-red-400/60'
            }`}>
              {level}% MAÎTRISE
            </div>
          </div>
        </div>
        
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
          {description}
        </p>
        
        <div className="w-full bg-gray-800 rounded-full h-1.5 sm:h-2">
          <div 
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-1000 ${
              isLocked 
                ? 'bg-gradient-to-r from-gold-400 to-gold-600' 
                : 'bg-gradient-to-r from-red-400 to-red-600'
            }`}
            style={{ width: `${level}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;