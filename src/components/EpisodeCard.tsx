import React from 'react';
import { Play } from 'lucide-react';
import { Episode } from '../types/podcast';

interface EpisodeCardProps {
  episode: Episode;
  onSelect: (episode: Episode) => void;
  isActive: boolean;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onSelect, isActive }) => {
  return (
    <div 
      className={`group relative p-4 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm ${
        isActive 
          ? 'bg-gold-500/20 border border-gold-500/40 shadow-lg shadow-gold-500/10' 
          : 'bg-black/30 border border-gold-500/10 hover:bg-black/40 hover:border-gold-500/20'
      }`}
      onClick={() => onSelect(episode)}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-32 h-32 overflow-hidden rounded-lg shrink-0">
          <img 
            src={episode.image || "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
            alt={episode.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
            isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <div className="w-12 h-12 flex items-center justify-center bg-gold-500/80 rounded-full">
              <Play size={20} className="text-black ml-1" />
            </div>
          </div>
          {isActive && (
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gold-400 shadow-sm shadow-gold-400/50 animate-pulse"></div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className={`font-medium text-lg mb-1 ${isActive ? 'text-gold-300' : 'text-gold-200'}`}>{episode.title}</h3>
          <p className="text-[#F6F6F5] text-sm mb-3 line-clamp-3">{episode.description}</p>
          
          <div className="flex justify-between items-center text-xs text-gold-400">
            {episode.featured && !isActive && (
              <span className="px-2 py-1 rounded-full bg-gold-900/30 text-gold-400 border border-gold-500/20">
                Featured
              </span>
            )}
            {isActive && (
              <span className="px-2 py-1 rounded-full bg-gold-900/30 text-gold-400 border border-gold-500/20">
                Now Playing
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;