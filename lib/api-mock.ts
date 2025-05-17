// This file provides a client-side mock API for development
// In production, these would be replaced with actual API calls

import {
  techArticles,
  healthArticles,
  stockArticles,
  horoscopes,
  quotes,
  jokes,
  brainTeasers,
  youtubeVideos,
} from './data';

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const api = {
  // Get featured content for homepage
  async getFeaturedContent() {
    await delay(500);
    return {
      featuredArticle: techArticles[0],
      techArticles: techArticles.slice(0, 4),
      healthArticles: healthArticles.slice(0, 4),
      stockArticles: stockArticles.slice(0, 4),
      horoscopes: horoscopes.slice(0, 4),
      quotes: quotes.slice(0, 4),
      jokes: jokes.slice(0, 4),
      brainTeasers: brainTeasers.slice(0, 4),
      youtubeVideos: youtubeVideos.slice(0, 4),
    };
  },

  // Articles
  async getArticles(category: string, limit = 10) {
    await delay(300);
    switch (category) {
      case 'tech':
        return techArticles.slice(0, limit);
      case 'health':
        return healthArticles.slice(0, limit);
      case 'stocks':
        return stockArticles.slice(0, limit);
      default:
        return [];
    }
  },

  async getArticleById(id: string) {
    await delay(200);
    const allArticles = [...techArticles, ...healthArticles, ...stockArticles];
    return allArticles.find(article => article.id === id);
  },

  // Horoscopes
  async getHoroscopes(limit = 12) {
    await delay(300);
    return horoscopes.slice(0, limit);
  },

  async getHoroscopeById(id: string) {
    await delay(200);
    return horoscopes.find(horoscope => horoscope.id === id);
  },

  // Quotes
  async getQuotes(limit = 10) {
    await delay(300);
    return quotes.slice(0, limit);
  },

  async getQuoteById(id: string) {
    await delay(200);
    return quotes.find(quote => quote.id === id);
  },

  // Jokes
  async getJokes(limit = 10) {
    await delay(300);
    return jokes.slice(0, limit);
  },

  async getJokeById(id: string) {
    await delay(200);
    return jokes.find(joke => joke.id === id);
  },

  // Brain Teasers
  async getBrainTeasers(limit = 10) {
    await delay(300);
    return brainTeasers.slice(0, limit);
  },

  async getBrainTeaserById(id: string) {
    await delay(200);
    return brainTeasers.find(teaser => teaser.id === id);
  },

  // YouTube Videos
  async getYoutubeVideos(limit = 10) {
    await delay(300);
    return youtubeVideos.slice(0, limit);
  },

  async getYoutubeVideoById(id: string) {
    await delay(200);
    return youtubeVideos.find(video => video.id === id);
  },
};