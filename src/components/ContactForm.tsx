import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, HelpCircle, Zap, Target, Flame, Star, Crown, Shield, CloudLightning as Lightning, Sparkles, Eye, Brain, Heart, Trophy, Briefcase, Rocket, Award, TrendingUp, Users, Database, Settings, ChevronRight, Mail, Phone, Clock, CheckCircle, AlertCircle, AlertTriangle, Headphones, Volume2, Radio, Crosshair, Radar, Satellite, Monitor, Wifi, Signal } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    currentCRM: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [missionStatus, setMissionStatus] = useState<'standby' | 'active' | 'complete'>('standby');
  const [scanProgress, setScanProgress] = useState(0);
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
    // Auto-activate mission after 2 seconds
    const timer = setTimeout(() => {
      setMissionStatus('active');
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setMissionStatus('active');

    try {
      // Send to Make.com webhook
      const webhookResponse = await fetch('https://hook.us2.make.com/da2ikljeldc9c8cyfy5kl5yjvbg2qsaw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          currentCRM: formData.currentCRM,
          message: formData.message,
          timestamp: new Date().toISOString(),
          source: 'MONZTALK_CONSULTATION_FORM'
        })
      });

      if (!webhookResponse.ok) {
        throw new Error('Webhook failed');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company_name: formData.company,
        crm_system: formData.currentCRM,
        consultation_message: formData.message,
        to_name: "Moncef",
        subject: `🔥 NOUVELLE DEMANDE CONSULTATION CRM - ${formData.name}`,
        reply_to: formData.email
      };

      await emailjs.send(
        'service_41crwi7',
        'template_7o2a0mt',
        templateParams
      );

      setSubmitStatus('success');
      setMissionStatus('complete');
      setFormData({
        name: '',
        email: '',
        company: '',
        currentCRM: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      setMissionStatus('standby');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 relative overflow-hidden bg-black">
      {/* Agent Command Center Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radar Sweep */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 rounded-full border border-gold-400/20 animate-ping"></div>
          <div className="absolute inset-8 rounded-full border border-gold-400/30 animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute inset-16 rounded-full border border-gold-400/40 animate-ping" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Command Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>
        
        {/* Crosshair Overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gold-500/30 animate-pulse"></div>
          <div className="absolute left-1/2 top-0 w-px h-full bg-gold-500/30 animate-pulse"></div>
        </div>

        {/* Target Tracker */}
        <div 
          className={`absolute w-16 h-16 border-2 transition-all duration-300 pointer-events-none ${
            missionStatus === 'complete' ? 'border-green-400' : 'border-gold-400'
          }`}
          style={{
            left: mousePosition.x - 32,
            top: mousePosition.y - 32,
            transform: `scale(${hoveredField ? 1.5 : 1})`,
            borderRadius: missionStatus === 'complete' ? '50%' : '0'
          }}
        >
          <div className="absolute inset-2 border border-current opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-current rounded-full animate-pulse"></div>
        </div>

        {/* Floating Command Data */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gold-400/40 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            {['AGENT', 'CRM', 'MISSION', '█████', 'SECURE'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Command Center Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            {/* Mission Status Display */}
            <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg bg-black/95 border-2 border-red-500/60 mb-6 sm:mb-8 backdrop-blur-sm relative overflow-hidden mx-4">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
              
              <Crosshair size={20} className="sm:w-6 sm:h-6 text-red-400 animate-spin" />
              <span className="text-red-400 font-mono font-bold text-sm sm:text-base lg:text-lg tracking-wider">
                {missionStatus === 'complete' ? 'MISSION ACCOMPLIE' : 
                 missionStatus === 'active' ? 'OPÉRATION EN COURS' : 'CENTRE DE COMMANDEMENT'}
              </span>
              <Radar size={20} className="sm:w-6 sm:h-6 text-red-400 animate-pulse" />
            </div>
            
            {/* Mission Briefing */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 leading-tight font-mono px-4">
              <span className="text-red-400">OPÉRATION:</span>
              <br />
              <span className="relative inline-block group">
                <span className="bg-gradient-to-r from-gold-400 via-red-500 to-gold-400 bg-clip-text text-transparent font-black">
                  CONSULTATION CRM
                </span>
                <div className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-gold-400 via-red-500 to-gold-400 rounded-full animate-pulse"></div>
              </span>
            </h2>
            
            {/* Mission Parameters */}
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
              <div className="bg-black/90 border border-gold-400/40 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 font-mono">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Shield size={16} className="sm:w-5 sm:h-5 text-gold-400" />
                  <span className="text-gold-400 font-bold text-xs sm:text-sm">COMMENT JE PEUX AIDER</span>
                </div>
                <p className="text-sm sm:text-base text-[#F6F6F5] font-medium leading-relaxed">
                  J'analyse votre situation CRM actuelle, identifie les blocages spécifiques qui ralentissent votre équipe, et je vous livre un plan d'action concret avec les étapes exactes à suivre pour optimiser vos performances.
                </p>
              </div>
              
              {/* Mission Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <Clock size={18} className="sm:w-5 sm:h-5 text-red-400 mb-2" />
                  <div className="text-red-400 font-mono font-bold text-xs sm:text-sm">RÉPONSE 24H</div>
                  <div className="text-gray-300 text-xs">Intervention rapide</div>
                </div>
                <div className="p-3 sm:p-4 bg-gold-500/10 border border-gold-500/30 rounded-lg">
                  <Target size={18} className="sm:w-5 sm:h-5 text-gold-400 mb-2" />
                  <div className="text-gold-400 font-mono font-bold text-xs sm:text-sm">AGENT TERRAIN</div>
                  <div className="text-gray-300 text-xs">Expérience opérationnelle</div>
                </div>
                <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <Shield size={18} className="sm:w-5 sm:h-5 text-red-400 mb-2" />
                  <div className="text-red-400 font-mono font-bold text-xs sm:text-sm">MISSION SÉCURISÉE</div>
                  <div className="text-gray-300 text-xs">Confidentialité garantie</div>
                </div>
              </div>
            </div>

            {/* Scanning Progress */}
            {missionStatus === 'active' && (
              <div className="max-w-md mx-auto mb-6 sm:mb-8">
                <div className="bg-black/80 border border-gold-400/40 rounded-lg p-3 sm:p-4 font-mono">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor size={14} className="sm:w-4 sm:h-4 text-gold-400" />
                    <span className="text-gold-400 text-xs sm:text-sm">ANALYSE SYSTÈME EN COURS...</span>
                    <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></div>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 sm:h-2 mb-2">
                    <div 
                      className="h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-gold-400 to-red-500 transition-all duration-100"
                      style={{ width: `${scanProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-gold-400/80 text-xs">
                    {scanProgress}% ANALYSÉ
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Agent Intel Panel */}
            <div className="space-y-6 sm:space-y-8 px-4">
              {/* Agent Profile */}
              <div className="relative p-4 sm:p-6 lg:p-8 bg-black/90 border-2 border-gold-500/40 rounded-xl sm:rounded-2xl backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-red-500/5 to-gold-500/5 animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-gold-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-red-500/50">
                      <Shield size={20} className="sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-gold-300 mb-1 sm:mb-2 font-mono">AGENT MONCEF</h3>
                      <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-red-500 to-gold-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm">
                    <div className="flex justify-between items-center border-b border-gold-400/20 pb-1 sm:pb-2">
                      <span className="text-gray-400 flex items-center gap-1 sm:gap-2">
                        <Eye size={12} className="sm:w-3.5 sm:h-3.5" />
                        STATUT:
                      </span>
                      <span className="text-green-400 font-bold flex items-center gap-1 sm:gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="hidden sm:inline">OPÉRATIONNEL</span>
                        <span className="sm:hidden">OK</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gold-400/20 pb-1 sm:pb-2">
                      <span className="text-gray-400 flex items-center gap-1 sm:gap-2">
                        <Target size={12} className="sm:w-3.5 sm:h-3.5" />
                        SPÉCIALITÉ:
                      </span>
                      <span className="text-gold-400 font-bold">
                        <span className="hidden sm:inline">CRM RESCUE</span>
                        <span className="sm:hidden">CRM</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gold-400/20 pb-1 sm:pb-2">
                      <span className="text-gray-400 flex items-center gap-1 sm:gap-2">
                        <Trophy size={12} className="sm:w-3.5 sm:h-3.5" />
                        MISSIONS:
                      </span>
                      <span className="text-gold-400 font-bold">70K€+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1 sm:gap-2">
                        <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                        RÉPONSE:
                      </span>
                      <span className="text-red-400 font-bold">{"< 24H"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mission Protocol */}
              <div className="relative p-4 sm:p-6 lg:p-8 bg-black/90 border-2 border-red-500/40 rounded-xl sm:rounded-2xl backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-gold-500/5 to-red-500/5 animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-gold-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-red-500/50">
                      <AlertTriangle size={20} className="sm:w-7 sm:h-7 text-white animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-black text-red-400 mb-1 sm:mb-2 font-mono">PROTOCOLE DE CONSULTATION</h3>
                      <div className="w-32 sm:w-48 h-0.5 sm:h-1 bg-gradient-to-r from-red-500 to-gold-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <ProtocolStep number="1" title="SIGNAL DE DÉTRESSE" description="Transmission de votre situation critique" />
                    <ProtocolStep number="2" title="ANALYSE SITUATION" description="Diagnostic complet de votre CRM" />
                    <ProtocolStep number="3" title="PLAN D'ACTION" description="Stratégie d'optimisation personnalisée" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Command Terminal */}
            <div className="relative">
              <div className="relative p-4 sm:p-6 lg:p-8 bg-black/95 border-2 border-gold-500/40 rounded-2xl sm:rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl shadow-gold-500/20 mx-4 lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-red-500/5 to-gold-500/5 animate-pulse"></div>
                
                {/* Terminal Header */}
                <div className="relative z-10 mb-6 sm:mb-8">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gold-500 animate-pulse"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                    <span className="text-gold-400 font-mono text-xs hidden sm:inline">SECURE_TERMINAL_v2.1</span>
                  </div>
                  
                  <div className="bg-black/80 border border-gold-400/30 rounded-lg p-3 sm:p-4 font-mono">
                    <div className="text-green-400 text-xs sm:text-sm mb-1 sm:mb-2">
                      {"> INITIALISATION TERMINAL SÉCURISÉ..."}
                    </div>
                    <div className="text-gold-400 text-xs sm:text-sm mb-1 sm:mb-2">
                      {"> CONNEXION AGENT MONCEF... [OK]"}
                    </div>
                    <div className="text-red-400 text-xs sm:text-sm">
                      {"> PRÊT POUR TRANSMISSION D'URGENCE"}
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
                  <AgentFormField
                    label="NOM"
                    name="name"
                    type="text"
                    placeholder=""
                    value={formData.name}
                    onChange={handleChange}
                    icon={<Users size={20} />}
                    required
                    disabled={isSubmitting}
                    onFocus={() => setHoveredField('name')}
                    onBlur={() => setHoveredField(null)}
                  />
                  
                  <AgentFormField
                    label="EMAIL"
                    name="email"
                    type="email"
                    placeholder=""
                    value={formData.email}
                    onChange={handleChange}
                    icon={<Mail size={20} />}
                    required
                    disabled={isSubmitting}
                    onFocus={() => setHoveredField('email')}
                    onBlur={() => setHoveredField(null)}
                  />

                  <AgentFormField
                    label="ENTREPRISE"
                    name="company"
                    type="text"
                    placeholder=""
                    value={formData.company}
                    onChange={handleChange}
                    icon={<Briefcase size={20} />}
                    disabled={isSubmitting}
                    onFocus={() => setHoveredField('company')}
                    onBlur={() => setHoveredField(null)}
                  />

                  <div className="relative group">
                    <label className="block text-sm sm:text-base font-bold text-gold-300 mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 font-mono">
                      <Database size={18} className="sm:w-5 sm:h-5 text-gold-400" />
                      CRM ACTUEL
                    </label>
                    <div className="relative">
                      <select
                        name="currentCRM"
                        value={formData.currentCRM}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        onFocus={() => setHoveredField('crm')}
                        onBlur={() => setHoveredField(null)}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/70 border-2 border-gold-500/30 rounded-lg sm:rounded-xl focus:outline-none focus:border-gold-500/60 focus:bg-black/90 text-gold-200 transition-all text-sm sm:text-base font-mono appearance-none cursor-pointer hover:border-gold-500/50"
                      >
                        <option value="">Sélectionner un CRM</option>
                        <option value="salesforce">🚀 Salesforce</option>
                        <option value="dynamics">💼 Microsoft Dynamics</option>
                        <option value="hubspot">🧡 HubSpot</option>
                        <option value="zoho">📊 Zoho</option>
                        <option value="other">🔧 Autre système</option>
                        <option value="none">❌ Aucun système actuel</option>
                      </select>
                      <ChevronRight className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gold-400/60 pointer-events-none" size={18} className="sm:w-5 sm:h-5" />
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <label className="block text-sm sm:text-base font-bold text-gold-300 mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 font-mono">
                      <AlertTriangle size={18} className="sm:w-5 sm:h-5 text-red-400 animate-pulse" />
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      disabled={isSubmitting}
                      onFocus={() => setHoveredField('message')}
                      onBlur={() => setHoveredField(null)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/70 border-2 border-gold-500/30 rounded-lg sm:rounded-xl focus:outline-none focus:border-gold-500/60 focus:bg-black/90 text-gold-200 placeholder-gold-400/60 transition-all text-sm sm:text-base font-mono resize-none"
                      placeholder=""
                      required
                    />
                  </div>
                  
                  {/* Mission Launch Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-red-500/30 via-black/80 to-gold-500/30 backdrop-blur-xl text-gold-300 font-black text-base sm:text-lg rounded-lg sm:rounded-xl flex items-center justify-center gap-3 sm:gap-4 hover:from-red-500/50 hover:via-black/90 hover:to-gold-500/50 transition-all border-2 border-red-500/40 hover:border-red-500/60 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 shadow-2xl hover:shadow-red-500/30 overflow-hidden font-mono ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-gold-500/10 to-red-500/20 animate-pulse"></div>
                    
                    <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-center">🚨 TRANSMISSION EN COURS...</span>
                        </>
                      ) : (
                        <>
                          <Rocket size={20} className="sm:w-6 sm:h-6 group-hover:animate-bounce transition-transform text-red-400" />
                          <span className="text-center">🚀 DEMANDER CONSULTATION</span>
                          <Target size={20} className="sm:w-6 sm:h-6 text-gold-400 animate-pulse" />
                        </>
                      )}
                    </div>
                  </button>

                  {/* Mission Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="relative p-4 sm:p-6 bg-gradient-to-r from-green-500/20 via-green-400/10 to-green-500/20 border-2 border-green-500/40 rounded-lg sm:rounded-xl text-green-300 backdrop-blur-sm overflow-hidden animate-[slideUp_0.5s_ease-out]">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-400/10 animate-pulse"></div>
                      <div className="relative z-10 flex items-start gap-3 sm:gap-4 font-mono">
                        <CheckCircle size={20} className="sm:w-6 sm:h-6 animate-bounce flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-base sm:text-lg mb-1">✅ DEMANDE REÇUE</h4>
                          <p className="text-sm sm:text-base">Votre demande de consultation a été envoyée. Moncef vous contacte dans les 24h.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="relative p-4 sm:p-6 bg-gradient-to-r from-red-500/20 via-red-400/10 to-red-500/20 border-2 border-red-500/40 rounded-lg sm:rounded-xl text-red-300 backdrop-blur-sm overflow-hidden animate-[slideUp_0.5s_ease-out]">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-400/10 animate-pulse"></div>
                      <div className="relative z-10 flex items-start gap-3 sm:gap-4 font-mono">
                        <AlertCircle size={20} className="sm:w-6 sm:h-6 animate-bounce flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-base sm:text-lg mb-1">❌ ENVOI ÉCHOUÉ</h4>
                          <p className="text-sm sm:text-base">Une erreur s'est produite. Veuillez réessayer.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Floating Command Elements */}
              <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-gold-500/20 to-red-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500/20 to-gold-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProtocolStepProps {
  number: string;
  title: string;
  description: string;
}

const ProtocolStep: React.FC<ProtocolStepProps> = ({ number, title, description }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 group">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-gold-500 to-red-500 flex items-center justify-center text-black font-black text-base sm:text-lg shadow-lg shadow-gold-500/50 group-hover:scale-110 transition-transform flex-shrink-0">
        {number}
      </div>
      <div>
        <h4 className="text-gold-300 font-bold font-mono group-hover:text-white transition-colors text-sm sm:text-base">{title}</h4>
        <p className="text-white/80 text-xs sm:text-sm group-hover:text-white transition-colors">{description}</p>
      </div>
    </div>
  );
};

interface AgentFormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const AgentFormField: React.FC<AgentFormFieldProps> = ({ 
  label, 
  name, 
  type, 
  placeholder, 
  value, 
  onChange, 
  icon, 
  required = false, 
  disabled = false,
  onFocus,
  onBlur
}) => {
  return (
    <div className="relative group">
      <label className="block text-sm sm:text-base font-bold text-gold-300 mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 font-mono">
        <span className="text-gold-400">{icon}</span>
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/70 border-2 border-gold-500/30 rounded-lg sm:rounded-xl focus:outline-none focus:border-gold-500/60 focus:bg-black/90 text-gold-200 placeholder-gold-400/60 transition-all text-sm sm:text-base font-mono hover:border-gold-500/50"
        />
        <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
          <Target className="text-gold-400/60 group-focus-within:text-gold-400 group-focus-within:animate-pulse transition-all" size={14} className="sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;