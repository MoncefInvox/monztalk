import React, { useEffect, useRef } from 'react';
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { PodcastData } from '../types/podcast';

interface HeroSectionProps {
  podcastData: PodcastData;
  onPlayLatest: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ podcastData, onPlayLatest }) => {
  const [isMuted, setIsMuted] = React.useState(true);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentEpisode = podcastData.episodes[currentEpisodeIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Auto-play episodes every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentEpisodeIndex((prev) => (prev + 1) % podcastData.episodes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, podcastData.episodes.length]);
  const nextEpisode = () => {
    setIsAutoPlaying(false); // Stop auto-play when user interacts
    setCurrentEpisodeIndex((prev) => (prev + 1) % podcastData.episodes.length);
  };

  const prevEpisode = () => {
    setIsAutoPlaying(false); // Stop auto-play when user interacts
    setCurrentEpisodeIndex((prev) => (prev - 1 + podcastData.episodes.length) % podcastData.episodes.length);
  };

  const goToEpisode = (index: number) => {
    setIsAutoPlaying(false); // Stop auto-play when user interacts
    setCurrentEpisodeIndex(index);
  };
  const handlePlayCurrent = () => {
    setIsAutoPlaying(false); // Stop auto-play when playing
    onPlayLatest(); // This will play the latest episode, but we could modify to play current
  };
  
  return (
    <section id="home" className="min-h-screen pt-20 lg:pt-0 relative overflow-hidden bg-black">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-gold-500/20 via-red-500/15 to-gold-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-gold-400/20 via-orange-500/15 to-gold-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-gold-600/10 to-red-600/10 rounded-full blur-2xl animate-bounce"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          poster="https://images.pexels.com/photos/2773498/pexels-photo-2773498.jpeg"
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/70"></div>
        
        {/* Video Controls */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center bg-gold-500/20 backdrop-blur-sm rounded-full text-gold-300 hover:bg-gold-500/30 border border-gold-500/30 transition-colors"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Animated Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500/20 via-red-500/20 to-gold-500/20 border border-gold-500/30 mb-6 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-red-500/10 to-gold-500/10 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                
                <div className="relative flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse delay-300"></div>
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse delay-700"></div>
                </div>
                
                <span className="text-gold-300 font-bold text-sm relative z-10">🎧  EXPÉRIENCE AUTHENTIQUE 🎧</span>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 leading-tight relative">
                  <span className="relative inline-block group">
                    <span className="relative inline-block bg-gradient-to-r from-red-500 via-gold-500 to-red-500 bg-clip-text text-transparent animate-pulse font-black">
                      Forgé dans les tranchées des CRM
                    </span>
                    <span className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-gold-500 to-red-500 rounded-full animate-pulse"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-gold-500/20 to-red-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </span>
                </h1>
                
                <div className="space-y-4">
                  <p className="text-sm sm:text-base lg:text-lg text-[#F6F6F5] max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed px-4 sm:px-0">
                    💰 <span className="text-gold-300 font-bold">Ce que j'ai vécu avec mes clients</span> peut te faire économiser <span className="text-red-400 font-black">6 mois minimum</span> et plus de <span className="text-gold-400 font-black">50k€</span> d'erreurs potentiel.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0">
                    <div className="group p-4 bg-gradient-to-br from-red-500/10 via-gold-500/10 to-red-500/10 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all hover:scale-105">
                      <div className="text-lg sm:text-xl font-black text-red-400 mb-1">2+</div>
                      <div className="text-xs sm:text-xs text-gold-300 font-bold">ANS D'EXPÉRIENCE</div>
                    </div>
                    
                    <div className="group p-4 bg-gradient-to-br from-gold-500/10 via-red-500/10 to-gold-500/10 rounded-xl border border-gold-500/20 hover:border-gold-500/40 transition-all hover:scale-105">
                      <div className="text-lg sm:text-xl font-black text-gold-400 mb-1">+70K€</div>
                      <div className="text-xs sm:text-xs text-gold-300 font-bold">PROJETS CRM GÉRÉS</div>
                    </div>
                    
                    <div className="group p-4 bg-gradient-to-br from-red-500/10 via-gold-500/10 to-red-500/10 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all hover:scale-105">
                      <div className="text-lg sm:text-xl font-black text-red-400 mb-1">100%</div>
                      <div className="text-xs sm:text-xs text-gold-300 font-bold">AUTHENTIQUE</div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
                  <button 
                    onClick={onPlayLatest}
                    className="group relative px-4 sm:px-6 py-3 bg-gradient-to-r from-red-500/20 via-gold-500/20 to-red-500/20 backdrop-blur-xl text-gold-300 font-bold text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 sm:gap-3 hover:from-red-500/30 hover:via-gold-500/30 hover:to-red-500/30 transition-all border border-gold-500/30 hover:border-gold-500/50 transform hover:-translate-y-1 hover:scale-105 shadow-xl hover:shadow-gold-500/30 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-gold-500/10 to-red-500/10 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer opacity-0 group-hover:opacity-100"></div>
                    
                    <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <Play size={16} className="sm:w-5 sm:h-5 transform group-hover:scale-110 transition-transform group-hover:animate-bounce" />
                      <span className="text-center">🎧 ÉCOUTER LE DERNIER ÉPISODE</span>
                    </div>
                  </button>
                  
                  <a 
                    href="#episodes"
                    className="group relative px-4 sm:px-6 py-3 bg-gradient-to-r from-black/60 via-black/40 to-black/60 backdrop-blur-xl text-gold-200 font-bold text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 sm:gap-3 hover:from-black/80 hover:via-black/60 hover:to-black/80 transition-all border border-gold-500/30 hover:border-gold-500/50 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-red-500/5 to-gold-500/5 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <span>🚀 PARCOURIR LES ÉPISODES</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Featured Episode */}
            <div className="lg:pl-8 mt-8 lg:mt-0">
              <div className="relative max-w-lg mx-auto">
                {/* Episode Navigation Header */}
                <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full transition-colors ${
                      isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gold-400'
                    }`}></div>
                    <span className="text-gold-300 font-mono text-sm font-bold">
                      {isAutoPlaying ? 'AUTO' : 'MANUEL'} • ÉPISODE {currentEpisodeIndex + 1}/{podcastData.episodes.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                        isAutoPlaying 
                          ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                          : 'bg-gray-700/50 border border-gray-600/30 text-gray-400'
                      }`}
                      title={isAutoPlaying ? 'Arrêter le défilement auto' : 'Activer le défilement auto'}
                    >
                      {isAutoPlaying ? 'PAUSE' : 'PLAY'}
                    </button>
                    <button
                      onClick={prevEpisode}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-gold-500/30 text-gold-300 hover:bg-black/60 hover:border-gold-500/50 transition-all"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextEpisode}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-gold-500/30 text-gold-300 hover:bg-black/60 hover:border-gold-500/50 transition-all"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-gold-500/20 group border-2 border-gold-500/30 mx-4 sm:mx-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-gold-500/20 to-red-600/20 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer opacity-0 group-hover:opacity-100"></div>
                  
                  <img 
                    src={currentEpisode.image || "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    alt={currentEpisode.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4 sm:p-6 lg:p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-black text-xs sm:text-sm font-bold rounded-full mb-3 sm:mb-4 shadow-lg ${
                        currentEpisode.featured 
                          ? 'bg-gradient-to-r from-red-500 to-gold-500' 
                          : 'bg-gradient-to-r from-gray-600 to-gray-500'
                      }`}>
                        <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
                        {currentEpisode.featured ? (
                          <>
                            <Star size={12} className="fill-current" />
                            ÉPISODE À LA UNE
                          </>
                        ) : (
                          <>
                            <Play size={12} />
                            ÉPISODE #{currentEpisodeIndex + 1}
                          </>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gold-300 mb-2 sm:mb-3 leading-tight">{currentEpisode.title}</h3>
                      <p className="text-sm sm:text-base text-white/90 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">{currentEpisode.description}</p>
                      
                      {/* Episode Info */}
                      <div className="flex items-center gap-3 mb-4 sm:mb-6 text-xs text-white/70">
                        <span>📅 {new Date(currentEpisode.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}</span>
                        <span>⏱️ {currentEpisode.duration}</span>
                      </div>
                      
                      <button 
                        onClick={handlePlayCurrent}
                        className="group/btn relative inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-gold-500/30 to-red-500/30 backdrop-blur-sm rounded-xl sm:rounded-2xl text-white hover:from-gold-500/50 hover:to-red-500/50 transition-all border border-gold-500/40 hover:border-gold-500/60 transform hover:scale-105 shadow-lg hover:shadow-gold-500/30 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-red-500/20 animate-pulse"></div>
                        
                        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                          <Play size={16} className="sm:w-5 sm:h-5 group-hover/btn:animate-bounce" />
                          <span className="font-bold text-sm sm:text-base">🎧 ÉCOUTER MAINTENANT</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Episode Indicators */}
                <div className="flex justify-center gap-2 mt-4 px-4 sm:px-0">
                  {podcastData.episodes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToEpisode(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentEpisodeIndex 
                          ? 'bg-gold-400 w-6' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-r from-red-500/20 to-gold-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-r from-gold-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-gold-600/10 to-red-600/10 rounded-full blur-xl animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;