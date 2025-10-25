import React, { useState } from 'react';
import { AlertTriangle, Shield, Lock, Mail, Send, Key, Eye, CheckCircle, AlertCircle } from 'lucide-react';

// Composant pour l'effet de transmission cryptée
const EncryptedTransmission: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [isGlitching, setIsGlitching] = React.useState(false);
  const [showStatic, setShowStatic] = React.useState(false);

  const fullText = "Ici se cache mon arsenal d'astuces CRM les plus secrètes, celles qui transforment un système basique en machine de guerre commerciale. Des stratégies cachées que j'ai testées personnellement et qui donnent des résultats garantis. Une fois que t'as les codes, la victoire sera garantie.";
  const words = fullText.split(' ');

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        // Effet de glitch aléatoire
        if (Math.random() < 0.15) {
          setIsGlitching(true);
          setShowStatic(true);
          setTimeout(() => {
            setIsGlitching(false);
            setShowStatic(false);
          }, 150);
        }
        
        setCurrentWordIndex(prev => prev + 1);
      } else {
        // Redémarrer la transmission après une pause
        setTimeout(() => {
          setCurrentWordIndex(0);
        }, 3000);
      }
    }, 200 + Math.random() * 300); // Vitesse variable pour effet réaliste

    return () => clearInterval(interval);
  }, [currentWordIndex, words.length]);

  // Effet de glitch aléatoire indépendant
  React.useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
      }
    }, 1000);

    return () => clearInterval(glitchInterval);
  }, []);

  const displayedWords = words.slice(0, currentWordIndex);
  const currentWord = words[currentWordIndex];

  return (
    <div className="relative font-mono leading-relaxed">
      {/* Interface de transmission militaire */}
      <div className="flex items-center gap-3 mb-4 text-xs">
        <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <span className="text-red-400 font-bold">ENCRYPTED</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-bold">RECEIVING</span>
        </div>
        <div className="text-gold-400">FREQ: 127.5 MHz</div>
      </div>

      {/* Barre de signal */}
      <div className="flex items-center gap-1 mb-4">
        <span className="text-xs text-gray-400 mr-2">SIGNAL:</span>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-1 h-3 transition-all duration-200 ${
              i < 6 ? 'bg-green-400' : i < 7 ? 'bg-yellow-400' : 'bg-red-400'
            } ${Math.random() < 0.3 ? 'opacity-30' : 'opacity-100'}`}
            style={{
              height: `${8 + i * 2}px`,
              animationDelay: `${i * 100}ms`
            }}
          />
        ))}
      </div>

      {/* Texte de transmission */}
      <div className={`relative p-4 bg-black/80 border border-green-400/30 rounded-lg transition-all duration-100 ${
        isGlitching ? 'animate-pulse border-red-400/60' : ''
      }`}>
        {/* Effet de scan lines */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.03)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
        
        {/* Static overlay pendant les glitchs */}
        {showStatic && (
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJzdGF0aWMiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgogICAgICA8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIi8+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8cmVjdCB4PSIyIiB5PSIxIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHJlY3QgeD0iMSIgeT0iMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI3N0YXRpYykiLz4KPC9zdmc+')] opacity-20 animate-pulse"></div>
        )}

        <div className={`relative z-10 text-sm transition-all duration-100 ${
          isGlitching ? 'blur-sm transform translate-x-1' : ''
        }`}>
          {/* Mots déjà reçus */}
          <span className={`text-green-400 transition-all duration-200 ${
            isGlitching ? 'text-red-400' : ''
          }`}>
            {displayedWords.join(' ')}
          </span>
          
          {/* Mot en cours de réception */}
          {currentWord && currentWordIndex < words.length && (
            <span className={`ml-1 text-green-300 animate-pulse font-bold ${
              isGlitching ? 'text-red-300 animate-bounce' : ''
            }`}>
              {currentWord}
            </span>
          )}
          
          {/* Curseur clignotant */}
          {currentWordIndex < words.length && (
            <span className={`ml-1 text-green-400 animate-pulse text-lg ${
              isGlitching ? 'text-red-400' : ''
            }`}>
              █
            </span>
          )}
        </div>

        {/* Indicateur de progression */}
        <div className="mt-3 pt-3 border-t border-green-400/20">
          <div className="flex items-center justify-between text-xs text-green-400/80">
            <span>DECRYPTING...</span>
            <span>{Math.round((currentWordIndex / words.length) * 100)}%</span>
          </div>
          <div className="w-full bg-green-900/30 rounded-full h-1 mt-1">
            <div 
              className={`h-1 rounded-full transition-all duration-200 ${
                isGlitching ? 'bg-red-400' : 'bg-green-400'
              }`}
              style={{ width: `${(currentWordIndex / words.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Messages d'état */}
      <div className="mt-3 space-y-1 text-xs font-mono">
        {showStatic && (
          <div className="text-red-400 animate-pulse">
            ⚠ SIGNAL INTERFERENCE DETECTED
          </div>
        )}
        {currentWordIndex >= words.length && (
          <div className="text-green-400 animate-pulse">
            ✓ TRANSMISSION COMPLETE - RESTARTING IN 3s
          </div>
        )}
        <div className="text-gray-500">
          [CLASSIFIED] • EYES ONLY • DESTROY AFTER READING
        </div>
      </div>
    </div>
  );
};

const WarStories: React.FC = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: '',
    email: '',
    company: '',
    reason: ''
  });

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRequestStatus('idle');
    
    // Send to Make.com webhook
    fetch('https://hook.us2.make.com/2i8jwpa69hl3a0plmb3vzi9xplkk8gr2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: requestForm.name,
        email: requestForm.email,
        company: requestForm.company,
        reason: requestForm.reason,
        timestamp: new Date().toISOString(),
        source: 'MONZTALK_ACCESS_REQUEST_FORM'
      })
    })
    .then(response => {
      if (response.ok) {
        console.log('Access request sent successfully');
        setRequestStatus('success');
        setRequestForm({
          name: '',
          email: '',
          company: '',
          reason: ''
        });
      } else {
        throw new Error('Webhook failed');
      }
    })
    .catch(error => {
      console.error('Failed to send access request:', error);
      setRequestStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === 'MoncefWarStories') {
      setIsUnlocked(true);
      setShowAccessForm(false);
    } else {
      alert('Code d\'accès invalide. Veuillez réessayer ou demander un accès.');
    }
  };

  return (
    <section id="war-stories" className="py-20 relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)] opacity-90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.025)_50%)] bg-[length:100%_4px] animate-[scanline_4s_linear_infinite]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-red-500/10 rounded-full text-red-400 text-sm font-medium mb-4">
              <AlertTriangle size={16} className="animate-pulse" />
              <span>CONTENU CONFIDENTIEL</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
             J'SUIS PAS CENSÉ PARTAGER ÇA
            </h2>
            
           <p className="text-sm md:text-base text-[#F6F6F5] max-w-3xl mx-auto font-mono mb-8 leading-relaxed">
              <EncryptedTransmission />
            </p>

            {!isUnlocked && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowAccessForm(true)}
                  className="px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all font-mono flex items-center gap-2"
                >
                  <Key size={18} />
                  Entrer le Code d'Accès
                </button>
                <button
                  onClick={() => setShowRequestForm(true)}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all font-mono flex items-center gap-2"
                >
                  <Mail size={18} />
                  Demander l'Accès
                </button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((story, index) => (
              <div 
                key={index}
                className={`group relative bg-black/40 border border-red-500/20 rounded-xl overflow-hidden transition-all ${
                  isUnlocked ? 'hover:border-red-500/40 cursor-pointer' : 'filter blur-sm'
                }`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                
                <div className="relative p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                      {story.icon}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-red-400 font-mono mb-2">{story.title}</h3>
                      <p className={`text-[#F6F6F5] font-mono text-sm mb-4 ${isUnlocked ? '' : 'blur-sm'}`}>
                        {isUnlocked ? story.fullDescription : story.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-red-400/60 text-sm font-mono">
                        {isUnlocked ? (
                          <Eye size={14} />
                        ) : (
                          <Lock size={14} />
                        )}
                        <span>{isUnlocked ? 'Déclassifié' : 'Information Classifiée'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Access Code Form Modal */}
          {showAccessForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowAccessForm(false)}></div>
              
              <div className="relative w-full max-w-md bg-black border border-red-500/20 rounded-xl p-6 animate-[fadeIn_0.3s_ease-out]">
                <h3 className="text-xl font-bold text-red-400 mb-4 font-mono">Entrer le Code d'Accès</h3>
                
                <form onSubmit={handleAccessSubmit} className="space-y-4">
                  <input
                    type="password"
                    placeholder="Code d'Accès"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="w-full px-4 py-2 bg-black/30 border border-red-500/20 rounded-lg focus:outline-none focus:border-red-500/40 text-white font-mono placeholder:text-red-500/40"
                    required
                  />
                  
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all font-mono flex items-center justify-center gap-2"
                    >
                      <Key size={18} />
                      Déverrouiller
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAccessForm(false)}
                      className="px-6 py-3 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-all font-mono"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Access Request Form Modal */}
          {showRequestForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowRequestForm(false)}></div>
              
              <div className="relative w-full max-w-md bg-black border border-red-500/20 rounded-xl p-6 animate-[fadeIn_0.3s_ease-out]">
                <h3 className="text-xl font-bold text-red-400 mb-4 font-mono">Demande d'Accès</h3>
                
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Votre Nom"
                    value={requestForm.name}
                    onChange={(e) => setRequestForm({...requestForm, name: e.target.value})}
                    className="w-full px-4 py-2 bg-black/30 border border-red-500/20 rounded-lg focus:outline-none focus:border-red-500/40 text-white font-mono placeholder:text-red-500/40"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Votre Email"
                    value={requestForm.email}
                    onChange={(e) => setRequestForm({...requestForm, email: e.target.value})}
                    className="w-full px-4 py-2 bg-black/30 border border-red-500/20 rounded-lg focus:outline-none focus:border-red-500/40 text-white font-mono placeholder:text-red-500/40"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nom de l'Entreprise"
                    value={requestForm.company}
                    onChange={(e) => setRequestForm({...requestForm, company: e.target.value})}
                    className="w-full px-4 py-2 bg-black/30 border border-red-500/20 rounded-lg focus:outline-none focus:border-red-500/40 text-white font-mono placeholder:text-red-500/40"
                    required
                  />
                  <textarea
                    placeholder="Pourquoi avez-vous besoin d'accès ?"
                    value={requestForm.reason}
                    onChange={(e) => setRequestForm({...requestForm, reason: e.target.value})}
                    className="w-full px-4 py-2 bg-black/30 border border-red-500/20 rounded-lg focus:outline-none focus:border-red-500/40 text-white font-mono placeholder:text-red-500/40 h-32"
                    required
                  />
                  
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all font-mono flex items-center justify-center gap-2 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                          TRANSMISSION...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Envoyer la Demande
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRequestForm(false)}
                      className="px-6 py-3 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-all font-mono"
                    >
                      Annuler
                    </button>
                  </div>
                  
                  {/* Status Messages */}
                  {requestStatus === 'success' && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg animate-[fadeIn_0.5s_ease-out]">
                      <div className="flex items-start gap-3 text-green-300 font-mono">
                        <CheckCircle size={20} className="animate-bounce flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm">Votre demande a été envoyée. Vous recevrez le code d'accès par email.</p>
                          <button
                            onClick={() => {
                              setShowRequestForm(false);
                              setRequestStatus('idle');
                            }}
                            className="mt-3 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded text-green-300 text-sm hover:bg-green-500/30 transition-all"
                          >
                            Fermer
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {requestStatus === 'error' && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg animate-[fadeIn_0.5s_ease-out]">
                      <div className="flex items-start gap-3 text-red-300 font-mono">
                        <AlertCircle size={20} className="animate-bounce flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm">Une erreur s'est produite lors de l'envoi. Veuillez réessayer.</p>
                          <button
                            onClick={() => setRequestStatus('idle')}
                            className="mt-3 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-sm hover:bg-red-500/30 transition-all"
                          >
                            Réessayer
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const stories = [
  {
    icon: <Shield className="text-red-400" />,
    title: "Opération Exodus Legacy",
    description: "[CONFIDENTIEL] Migration critique de données impliquant [CONFIDENTIEL] enregistrements clients depuis [CONFIDENTIEL] système...",
    fullDescription: "Une migration à haut risque de plus d'1M d'enregistrements clients depuis un système legacy de 20 ans. L'opération impliquait une synchronisation en temps réel, des algorithmes de mapping personnalisés et une stratégie de déploiement sans interruption.",
    status: "CLASSIFIÉ"
  },
  {
    icon: <AlertTriangle className="text-red-400" />,
    title: "Opération Restauration Système",
    description: "[CONFIDENTIEL] Mission de récupération CRM d'urgence après [CONFIDENTIEL] dans une institution financière majeure...",
    fullDescription: "48 heures de réponse d'urgence suite à une panne critique du CRM dans une institution financière majeure. L'équipe a implémenté une technique novatrice de restauration de sauvegarde tout en maintenant la conformité réglementaire.",
    status: "CLASSIFIÉ"
  },
  {
    icon: <Shield className="text-red-400" />,
    title: "Opération Neural Link",
    description: "[CONFIDENTIEL] Intégration de [CONFIDENTIEL] systèmes disparates dans [CONFIDENTIEL] écosystème pour un fabricant mondial...",
    fullDescription: "Intégration transparente de 12 systèmes d'entreprise différents dans un écosystème CRM unifié. Développement de middleware personnalisé et synchronisation des données en temps réel à travers plusieurs continents.",
    status: "CLASSIFIÉ"
  },
  {
    icon: <Shield className="text-red-400" />,
    title: "Opération Aube Digitale",
    description: "[CONFIDENTIEL] Initiative complète de transformation digitale pour [CONFIDENTIEL] avec [CONFIDENTIEL] sites...",
    fullDescription: "Transformation digitale révolutionnaire pour une chaîne de retail avec plus de 500 sites. Implémentation d'insights clients basés sur l'IA et d'analyses prédictives à travers tout le réseau.",
    status: "CLASSIFIÉ"
  }
];

export default WarStories;