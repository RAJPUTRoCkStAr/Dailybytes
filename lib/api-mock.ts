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

// Helper function to paginate results
const paginateResults = (items: any[], page: number, limit: number) => {
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
};

// Combine all articles
const allArticles = [...techArticles, ...healthArticles, ...stockArticles];

// Mock API functions
export const api = {
  // Get featured content for homepage
  async getFeaturedContent(page = 1, limit = 20) {
    await delay(500);
    return {
      featuredArticle: techArticles[0],
      techArticles: paginateResults(techArticles, page, limit),
      healthArticles: paginateResults(healthArticles, page, limit),
      stockArticles: paginateResults(stockArticles, page, limit),
      horoscopes: paginateResults(horoscopes, page, limit),
      quotes: paginateResults(quotes, page, limit),
      jokes: paginateResults(jokes, page, limit),
      brainTeasers: paginateResults(brainTeasers, page, limit),
      youtubeVideos: paginateResults(youtubeVideos, page, limit),
    };
  },

  // Articles
  async getArticles(category: string, page = 1, limit = 20) {
    await delay(300);
    let articles;
    switch (category) {
      case 'tech':
        articles = techArticles;
        break;
      case 'health':
        articles = healthArticles;
        break;
      case 'stocks':
        articles = stockArticles;
        break;
      default:
        articles = [];
    }
    return paginateResults(articles, page, limit);
  },

  async getArticleById(id: string) {
    await delay(200);
    return allArticles.find(article => article.id === id);
  },

  async getAllArticles() {
    await delay(300);
    return allArticles;
  },

  // Horoscopes
  async getHoroscopes(page = 1, limit = 20) {
    await delay(300);
    return paginateResults(horoscopes, page, limit);
  },

  // Quotes
  async getQuotes(page = 1, limit = 20) {
    await delay(300);
    return paginateResults(quotes, page, limit);
  },

  // Jokes
  async getJokes(page = 1, limit = 20) {
    await delay(300);
    return paginateResults(jokes, page, limit);
  },

  // Brain Teasers
  async getBrainTeasers(page = 1, limit = 20) {
    await delay(300);
    return paginateResults(brainTeasers, page, limit);
  },

  // YouTube Videos
  async getYoutubeVideos(page = 1, limit = 20) {
    await delay(300);
    return paginateResults(youtubeVideos, page, limit);
  },
};