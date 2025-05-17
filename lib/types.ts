// Types for the application

// Base content type with common properties
export interface BaseContent {
  id: string;
  title: string;
  summary: string;
  date: string;
  source?: string;
  imageUrl?: string;
}

// News article content
export interface Article extends BaseContent {
  content: string;
  category: 'tech' | 'health' | 'stocks';
  tags: string[];
  readTime: number;
}

// Horoscope content
export interface Horoscope extends BaseContent {
  sign: string;
  prediction: string;
}

// Quote content
export interface Quote extends BaseContent {
  author: string;
  text: string;
  category: string;
}

// Joke content
export interface Joke extends BaseContent {
  text: string;
  category: string;
}

// Brain Teaser content
export interface BrainTeaser extends BaseContent {
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

// YouTube Video content
export interface YouTubeVideo extends BaseContent {
  videoId: string;
  channelName: string;
  category: string;
  viewCount: number;
}

// Category metadata
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}