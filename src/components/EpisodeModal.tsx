import React from 'react';
import { X, Play, Pause } from 'lucide-react';
import { Episode } from '../types/podcast';

interface EpisodeModalProps {
  episode: Episode;
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: number;
  duration: number;
  onTimeUpdate: (time: number) => void;
}

const EpisodeModal: React.FC<EpisodeModalProps> = ({
  episode,
  isOpen,
  onClose,
  isPlaying,
  onPlayPause,
  currentTime,
  duration,
  onTimeUpdate,
}) => {
  if (!isOpen) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-black to-gold-900/30 rounded-2xl overflow-hidden luxury-glass animate-float">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gold-500/10 hover:bg-gold-500/20 transition-colors"
        >
          <X className="w-6 h-6 text-gold-400" />
        </button>

        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Episode Image */}
          <div className="w-full md:w-1/2 aspect-square rounded-xl overflow-hidden relative group">
            <img 
              src={episode.image || "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg"} 
              alt={episode.title}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <button
              onClick={onPlayPause}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-gold-500/90 rounded-full transform transition-all duration-300 group-hover:scale-110">
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-black" />
                ) : (
                  <Play className="w-8 h-8 text-black ml-1" />
                )}
              </div>
            </button>
          </div>

          {/* Episode Details */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
              {episode.title}
            </h3>
            
            <p className="text-[#F6F6F5] mb-6">{episode.description}</p>
            
            {/* Audio Progress */}
            <div className="mt-auto">
              <div className="relative h-1 bg-gold-900/50 rounded-full overflow-hidden mb-2">
                <div
                  className="absolute h-full bg-gradient-to-r from-gold-600 to-gold-400"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => onTimeUpdate(Number(e.target.value))}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              
              <div className="flex justify-between text-sm text-gold-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeModal;