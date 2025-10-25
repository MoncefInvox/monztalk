import React from 'react';
import { Play } from 'lucide-react';
import { Episode } from '../types/podcast';

interface FeaturedEpisodeProps {
  episode: Episode;
  onPlay: (episode: Episode) => void;
}

const FeaturedEpisode: React.FC<FeaturedEpisodeProps> = ({ episode, onPlay }) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Episode</h2>
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">{episode.title}</h3>
                <p className="text-gray-400 mb-4">{new Date(episode.date).toLocaleDateString()}</p>
                <p className="text-gray-300 mb-6 line-clamp-3">{episode.description}</p>
              </div>
              <button
                onClick={() => onPlay(episode)}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                aria-label="Play episode"
              >
                <Play className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {episode.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEpisode;