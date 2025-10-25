import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EpisodesSection from './components/EpisodesArchive';
import AboutSection from './components/AboutSection';
import WarStories from './components/WarStories';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import { podcastData } from './data/podcastData';
import { Episode } from './types/podcast';

function App() {
  const [currentEpisode, setCurrentEpisode] = React.useState<Episode | null>(null);
  const [showPlayer, setShowPlayer] = React.useState(false);
  const [isPlayerMinimized, setIsPlayerMinimized] = React.useState(false);
  
  const handleSelectEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setShowPlayer(true);
    setIsPlayerMinimized(false);
    if (window.scrollY > 100) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlayLatest = () => {
    const latestEpisode = podcastData.episodes[0];
    setCurrentEpisode(latestEpisode);
    setShowPlayer(true);
    setIsPlayerMinimized(false);
    if (window.scrollY > 100) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setIsPlayerMinimized(false);
    setCurrentEpisode(null);
  };

  const handleMinimizePlayer = () => {
    setShowPlayer(false);
    setIsPlayerMinimized(true);
  };

  const handleRestorePlayer = () => {
    setShowPlayer(true);
    setIsPlayerMinimized(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <Header />
      
      <main>
        <HeroSection 
          podcastData={podcastData}
          onPlayLatest={handlePlayLatest}
        />
        <EpisodesSection 
          podcastData={podcastData}
          currentEpisode={currentEpisode}
          onSelectEpisode={handleSelectEpisode}
        />
        <AboutSection />
        <WarStories />
        <ContactForm />
      </main>
      
      <Footer />
      
      {/* Mini Player Button - Affiché quand le lecteur est minimisé */}
      {isPlayerMinimized && currentEpisode && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
          <button
            onClick={handleRestorePlayer}
            className="group relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-gold-500 to-red-500 rounded-full shadow-2xl shadow-gold-500/30 hover:shadow-gold-500/50 transition-all hover:scale-110 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-red-400/20 animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-1" style={{animationDelay: '0.5s'}}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-1" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-2 sm:px-3 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Rouvrir le lecteur
            </div>
          </button>
        </div>
      )}

      {/* Audio Player Modal */}
      {showPlayer && currentEpisode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClosePlayer}></div>
          <div className="relative w-full max-w-sm sm:max-w-lg lg:max-w-2xl">
            <AudioPlayer 
              episode={currentEpisode} 
              onClose={handleClosePlayer}
              onMinimize={handleMinimizePlayer}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;