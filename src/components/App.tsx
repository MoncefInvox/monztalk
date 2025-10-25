const handleSelectEpisode = (episode: Episode) => {
  setCurrentEpisode(episode);
  setShowPlayer(true);
  setIsPlayerMinimized(false);
  // Remove auto-scroll that might interfere with player
};

const handlePlayLatest = () => {
  const latestEpisode = podcastData.episodes[0];
  setCurrentEpisode(latestEpisode);
  setShowPlayer(true);
  setIsPlayerMinimized(false);
  // Remove auto-scroll that might interfere with player
};

      {/* Audio Player Modal */}
      {showPlayer && currentEpisode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={handleClosePlayer}
          ></div>
          <div className="relative w-full max-w-sm sm:max-w-lg lg:max-w-2xl">
            <AudioPlayer 
              episode={currentEpisode} 
              onClose={handleClosePlayer}
              onMinimize={handleMinimizePlayer}
            />
          </div>
        </div>
      )}