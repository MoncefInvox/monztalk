export interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: string;
  date: string;
  featured?: boolean;
  image?: string;
}

export interface PodcastData {
  title: string;
  description: string;
  author: string;
  cover: string;
  episodes: Episode[];
}