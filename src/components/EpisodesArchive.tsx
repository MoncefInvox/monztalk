import React, { useState, useEffect, useRef } from 'react';
import { Episode, PodcastData } from '../types/podcast';
import { ChevronDown, Search, Filter, Calendar, Star, Play, Clock, TrendingUp, Zap, Headphones, Radio, Volume2, Eye, Target, Flame, Sparkles, Music, Mic, Users, Heart, Award, Crown, CloudLightning as Lightning, Rocket } from 'lucide-react';

interface EpisodesSectionProps {
  podcastData: PodcastData;
  currentEpisode: Episode | null;
  onSelectEpisode: (episode: Episode) => void;
}

const EpisodesSection: React.FC<EpisodesSectionProps> = ({ podcastData, currentEpisode, onSelectEpisode }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleEpisodes, setVisibleEpisodes] = useState(6);
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredEpisodes = podcastData.episodes
    .filter(episode => {
      if (searchTerm) {
        return episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               episode.description.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (filter === 'featured') return episode.featured;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  const displayedEpisodes = filteredEpisodes.slice(0, visibleEpisodes);

  const handleEpisodeSelect = (episode: Episode) => {
    onSelectEpisode(episode);
  };

  return (
    <section ref={sectionRef} id="episodes" className="py-20 relative overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black">
      {/* ULTRA Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
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

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Clean Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-gold-500/10 to-red-500/10 border border-gold-500/20 mb-4 sm:mb-6 mx-4">
            <Headphones size={18} className="text-gold-400" />
            <span className="text-gold-300 font-medium text-xs sm:text-sm">ÉPISODES DISPONIBLES</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-6 sm:mb-8 leading-tight relative px-4">
            <span className="bg-gradient-to-r from-gold-300 via-red-400 to-gold-500 bg-clip-text text-transparent animate-pulse">
              LES 5 MINUTES QUI POURRAIENT 
            </span>
            <br />
            <span className="relative inline-block group">
              <span className="bg-gradient-to-r from-red-500 via-gold-400 to-red-600 bg-clip-text text-transparent font-black">
                SAUVER TON BUSINESS
              </span>
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-gold-500/20 to-red-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-gold-400 to-red-600 rounded-full animate-pulse"></div>
            </span>
          </h2>
          
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              J'ai vécu des projets CRM qui partaient dans tous les sens. Et tu sais quoi ? C'est toujours les mêmes erreurs évitables qui se répètent ! J'ai décidé de te révéler tous les secrets que les experts gardent pour eux, les vraies solutions qu'on te cache, pour que tu puisses enfin exploiter tout le potentiel de ton CRM.
            </p>
            
            {/* Simple Disclaimer */}
            <div className="max-w-2xl mx-auto p-3 sm:p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 mb-6 sm:mb-8">
              <p className="text-xs sm:text-sm text-gray-400 italic text-center">
                <span className="text-gold-300 font-medium">DISCLAIMER :</span> Ces histoires, galères et leçons sont bien les miennes. La voix est sous-traitée pour me permettre de consacrer plus de temps à sauver des CRM.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
              <div className="p-3 sm:p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <Zap className="w-6 h-6 text-red-400 mb-2" />
                <h3 className="text-gold-300 font-medium mb-1 text-xs sm:text-sm">RETOURS TERRAIN</h3>
                <p className="text-gray-400 text-xs">Vécu réel sur projets CRM</p>
              </div>
              
              <div className="p-3 sm:p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <Target className="w-6 h-6 text-gold-400 mb-2" />
                <h3 className="text-gold-300 font-medium mb-1 text-xs sm:text-sm">CONSEILS CONCRETS</h3>
                <p className="text-gray-400 text-xs">Actions directement applicables</p>
              </div>
              
              <div className="p-3 sm:p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <Heart className="w-6 h-6 text-red-400 mb-2" />
                <h3 className="text-gold-300 font-medium mb-1 text-xs sm:text-sm">SANS FILTRE</h3>
                <p className="text-gray-400 text-xs">Vérités brutes du terrain</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Search Bar */}
        <div className="mb-8 sm:mb-12 px-4">
          <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 sm:p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher un épisode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 sm:py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-gold-500/50 text-white placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
              
              <div className="flex gap-2 flex-col sm:flex-row">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2.5 sm:py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white text-sm flex-1 sm:flex-none"
                >
                  <option value="all">Tous</option>
                  <option value="featured">Favoris</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2.5 sm:py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white text-sm flex-1 sm:flex-none"
                >
                  <option value="date">Récents</option>
                  <option value="title">A-Z</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/30">
              <div className="flex items-center gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm">
                <span>{filteredEpisodes.length} épisodes</span>
                <span>~{Math.round(filteredEpisodes.reduce((acc, ep) => acc + parseInt(ep.duration.split(':')[0]) * 60 + parseInt(ep.duration.split(':')[1]), 0) / 60)} min</span>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-400 text-xs hover:bg-red-500/30 whitespace-nowrap"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Clean Episodes List */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-4">
          {displayedEpisodes.map((episode, index) => (
            <div
              key={episode.id}
              className={`group relative p-4 sm:p-6 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer ${
                currentEpisode?.id === episode.id
                  ? 'bg-gradient-to-r from-gold-500/10 to-red-500/10 border border-gold-500/30' 
                  : 'bg-gray-800/30 border border-gray-700/30 hover:bg-gray-800/50 hover:border-gray-600/50'
              }`}
              onMouseEnter={() => setHoveredEpisode(episode.id)}
              onMouseLeave={() => setHoveredEpisode(null)}
              onClick={() => handleEpisodeSelect(episode)}
            >
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                {/* Episode Number */}
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
                    currentEpisode?.id === episode.id
                      ? 'bg-gradient-to-r from-gold-500 to-red-500 text-black'
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Episode Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={episode.image || "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                    alt={episode.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity ${
                    hoveredEpisode === episode.id || currentEpisode?.id === episode.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Play size={16} className="sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
                
                {/* Episode Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <h3 className={`font-semibold text-base sm:text-lg leading-tight pr-2 ${
                      currentEpisode?.id === episode.id ? 'text-gold-300' : 'text-white group-hover:text-gold-300'
                    }`}>
                      {episode.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 sm:gap-2 ml-2 sm:ml-4 flex-shrink-0">
                      {episode.featured && (
                        <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs font-medium">
                          <Star size={10} className="sm:w-3 sm:h-3 inline mr-1" />
                          <span className="hidden sm:inline">TOP</span>
                        </div>
                      )}
                      
                      {currentEpisode?.id === episode.id && (
                        <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-medium">
                          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse inline-block mr-1"></div>
                          <span className="hidden sm:inline">ACTUEL</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 line-clamp-2">
                    {episode.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span>📅 {new Date(episode.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short'
                      })}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} className="sm:w-3 sm:h-3" />
                        {episode.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gold-400">
                      <Headphones size={10} className="sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline">ÉCOUTER</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleEpisodes < filteredEpisodes.length && (
          <div className="flex justify-center px-4">
            <button 
              onClick={() => setVisibleEpisodes(prev => prev + 6)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-gold-500/20 to-red-500/20 border border-gold-500/30 rounded-lg text-gold-300 font-medium hover:from-gold-500/30 hover:to-red-500/30 hover:border-gold-500/50 transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              <span>Voir plus d'épisodes</span>
              <ChevronDown size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EpisodesSection;