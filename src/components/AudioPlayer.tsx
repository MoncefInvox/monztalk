import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Heart, Share2, Maximize2, Minimize2 } from 'lucide-react';
import { Episode } from '../types/podcast';

interface AudioPlayerProps {
  episode: Episode;
  onClose?: () => void;
  onMinimize?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ episode, onClose, onMinimize }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Handle close with audio stop
  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setLoadError(null);
    setAudioReady(false);
    if (onClose) {
      onClose();
    }
  };

  // Format time
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const togglePlay = () => {
    if (!audioRef.current || !audioReady) {
      console.log('Audio not ready or ref not available');
      return;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setLoadError(null);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Audio play successful');
          setIsPlaying(true);
        }).catch(error => {
          console.error('Audio play failed:', error);
          setLoadError(`Erreur de lecture: ${error.message}`);
          setIsPlaying(false);
        });
      } else {
        setIsPlaying(true);
      }
    }
  };

  const skip = (seconds: number) => {
    if (!audioRef.current || !audioReady) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
  };

  const changePlaybackRate = () => {
    if (!audioRef.current || !audioReady) return;
    const rates = [0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    audioRef.current.playbackRate = nextRate;
  };
  
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const newTime = audioRef.current.currentTime;
    if (!isNaN(newTime) && isFinite(newTime)) {
      setCurrentTime(newTime);
    }
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && isFinite(value)) {
      try {
        audioRef.current.currentTime = value;
        setCurrentTime(value);
      } catch (error) {
        console.warn('Failed to set currentTime:', error);
      }
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const value = parseFloat(e.target.value);
    setVolume(value);
    audioRef.current.volume = value;
    setIsMuted(value === 0);
  };
  
  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Reset states
    setIsLoading(true);
    setLoadError(null);
    setAudioReady(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    
    const setAudioData = () => {
      console.log('Audio metadata loaded:', {
        duration: audio.duration,
        currentTime: audio.currentTime,
        readyState: audio.readyState,
        networkState: audio.networkState,
        buffered: audio.buffered.length > 0 ? audio.buffered.end(0) : 0
      });
      
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime || 0);
        setAudioReady(true);
      } else {
        console.warn('Invalid audio duration:', audio.duration);
      }
      setIsLoading(false);
    };
    
    const handleLoadStart = () => {
      console.log('Audio load started');
      setIsLoading(true);
      setLoadError(null);
    };
    
    const handleCanPlay = () => {
      console.log('Audio can play');
      setIsLoading(false);
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setAudioReady(true);
        setDuration(audio.duration);
      }
    };
    
    const handleLoadedData = () => {
      console.log('Audio data loaded');
      setIsLoading(false);
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setAudioReady(true);
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime || 0);
      }
    };
    
    const handlePlay = () => {
      console.log('Audio play event triggered');
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      console.log('Audio pause event triggered');
      setIsPlaying(false);
    };
    
    const handleEnded = () => {
      console.log('Audio ended');
      setIsPlaying(false);
      if (audioRef.current) {
        setCurrentTime(audioRef.current.duration || 0);
      }
    };
    
    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      let errorMessage = 'Erreur de chargement audio';
      
      // Log the attempted URL for debugging
      console.error('Failed to load audio from:', target.src);
      console.error('Current working directory files should be in public/ folder');
      
      if (target.error) {
        switch (target.error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = 'Chargement interrompu';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = 'Erreur réseau - Vérifiez votre connexion';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = 'Format audio non supporté - Utilisez MP3';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'FICHIER AUDIO INTROUVABLE - Vérifiez que le fichier existe dans public/Assets/';
            break;
          default:
            errorMessage = `Erreur audio: ${target.error.message || 'Inconnue'}`;
        }
      }
      
      console.error('Audio error details:', {
        message: errorMessage,
        src: target.src,
        error: target.error,
        networkState: target.networkState,
        readyState: target.readyState
      });
      setLoadError(errorMessage);
      setIsLoading(false);
      setIsPlaying(false);
      setAudioReady(false);
    };

    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
        console.log('Audio buffered:', bufferedEnd, 'of', audio.duration);
      }
    };

    const handleSeeking = () => {
      console.log('Audio seeking to:', audio.currentTime);
    };

    const handleSeeked = () => {
      console.log('Audio seeked to:', audio.currentTime);
      setCurrentTime(audio.currentTime);
    };
    
    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('progress', handleProgress);
    audio.addEventListener('seeking', handleSeeking);
    audio.addEventListener('seeked', handleSeeked);
    
    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('progress', handleProgress);
      audio.removeEventListener('seeking', handleSeeking);
      audio.removeEventListener('seeked', handleSeeked);
    };
  }, [episode.audioUrl]);

  // Reset audio when episode changes
  useEffect(() => {
    console.log('Episode changed:', episode.id);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsLoading(true);
      setLoadError(null);
      setAudioReady(false);
      setCurrentTime(0);
      setDuration(0);
      // Force reload the audio
      audioRef.current.load();
      // Reset currentTime after load
      setTimeout(() => {
        if (audioRef.current) {
          try {
            audioRef.current.currentTime = 0;
          } catch (error) {
            console.warn('Failed to reset currentTime:', error);
          }
        }
      }, 100);
    }
  }, [episode.id]);

  return (
    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
      {/* Backdrop */}
      {/* Backdrop is now handled by parent App component */}
      
      {/* Player Container */}
      <div className={`bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
        isExpanded ? 'w-full max-w-4xl' : 'w-full max-w-sm sm:max-w-lg'
      }`}>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-red-500/5 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-3 sm:p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full transition-colors ${
              loadError ? 'bg-red-400 animate-pulse' : 
              isPlaying ? 'bg-green-400 animate-pulse' : 
              isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-gray-400'
            }`} />
            <span className="text-white/70 text-xs sm:text-sm">
              {loadError ? 'Erreur' : 
               isPlaying ? 'En lecture' : 
               isLoading ? 'Chargement...' : 
               audioReady ? 'Prêt' : 'En pause'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white/80 transition-colors"
            >
              {isExpanded ? <Minimize2 size={14} className="sm:w-4 sm:h-4" /> : <Maximize2 size={14} className="sm:w-4 sm:h-4" />}
            </button>
            
            {onMinimize && (
              <button
                onClick={onMinimize}
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white/80 transition-colors"
                title="Réduire"
              >
                <div className="w-3 sm:w-4 h-0.5 bg-current"></div>
              </button>
            )}
            
            {onClose && (
              <button
                onClick={handleClose}
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white/80 transition-colors"
                title="Fermer"
              >
                <X size={14} className="sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {loadError && (
          <div className="relative z-10 mx-4 sm:mx-6 mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
              <span>{loadError}</span>
            </div>
          </div>
        )}
        <div className="relative z-10 p-4 sm:p-6">
          {/* Episode Info */}
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 group">
              <img 
                src={episode.image || "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                alt={episode.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Subtle play overlay */}
              <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${
                isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/90 flex items-center justify-center">
                  {isPlaying ? (
                    <Pause className="text-black w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  ) : (
                    <Play className="text-black w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1 leading-tight">
                {episode.title}
              </h3>
              
              {isExpanded && (
                <p className="text-white/60 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
                  {episode.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-white/50">
                <span>{new Date(episode.date).toLocaleDateString('fr-FR')}</span>
                <span>•</span>
                <span>{episode.duration}</span>
                {playbackRate !== 1 && (
                  <>
                    <span>•</span>
                    <span>{playbackRate}x</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Clean Progress Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="relative mb-2">
              <input 
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSliderChange}
                className="w-full h-1 rounded-full bg-white/20 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                style={{
                  background: `linear-gradient(to right, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0.8) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{Math.round((currentTime / duration) * 100) || 0}%</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Main Controls */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button 
              onClick={() => skip(-10)}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all"
            >
              <SkipBack size={16} className="sm:w-5 sm:h-5" />
            </button>
            
            <button 
              onClick={togglePlay}
              disabled={isLoading || !audioReady || !!loadError}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-r from-gold-500 to-gold-600 rounded-full text-black hover:from-gold-400 hover:to-gold-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadError ? (
                <span className="text-xs">❌</span>
              ) : isLoading ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause size={18} className="sm:w-5 sm:h-5" />
              ) : (
                <Play size={18} className="sm:w-5 sm:h-5 ml-0.5" />
              )}
            </button>
            
            <button 
              onClick={() => skip(10)}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all"
            >
              <SkipForward size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
          
          {/* Bottom Controls */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            {/* Volume */}
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className="p-1 sm:p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX size={14} className="sm:w-4 sm:h-4" /> : <Volume2 size={14} className="sm:w-4 sm:h-4" />}
              </button>
              
              <input 
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-12 sm:w-16 h-1 rounded-full bg-white/20 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
            
            {/* Center Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={changePlaybackRate}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                {playbackRate}x
              </button>
              
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-1.5 rounded-full transition-colors ${
                  isLiked 
                    ? 'text-red-400 hover:text-red-300' 
                    : 'text-white/70 hover:text-red-400'
                }`}
              >
                <Heart size={14} className={`sm:w-4 sm:h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              
              <button className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                <Share2 size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
            
            {/* Time remaining */}
            <div className="text-xs text-white/50 hidden sm:block">
              -{formatTime(duration - currentTime)}
            </div>
          </div>
        </div>
      </div>
      
      <audio 
        ref={audioRef} 
        src={episode.audioUrl} 
        preload="auto"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default AudioPlayer;