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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const allArticles = [...techArticles, ...healthArticles, ...stockArticles];

export const api = {
  async getFeaturedContent() {
    await delay(500);
    return {
      featuredArticle: techArticles[0],
      techArticles: techArticles.slice(0, 20),
      healthArticles: healthArticles.slice(0, 20),
      stockArticles: stockArticles.slice(0, 20),
      horoscopes: horoscopes.slice(0, 20),
      quotes: quotes.slice(0, 20),
      jokes: jokes.slice(0, 20),
      brainTeasers: brainTeasers.slice(0, 20),
      youtubeVideos: youtubeVideos.slice(0, 20),
    };
  },

  async getArticles(category: string, limit = 20) {
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
    return allArticles.find(article => article.id === id);
  },

  async getAllArticles() {
    await delay(300);
    return allArticles;
  },

  async getHoroscopes(limit = 20) {
    await delay(300);
    return horoscopes.slice(0, limit);
  },

  async getHoroscopeById(id: string) {
    await delay(200);
    return horoscopes.find(horoscope => horoscope.id === id);
  },

  async getQuotes(limit = 20) {
    await delay(300);
    return quotes.slice(0, limit);
  },

  async getQuoteById(id: string) {
    await delay(200);
    return quotes.find(quote => quote.id === id);
  },

  async getJokes(limit = 20) {
    await delay(300);
    return jokes.slice(0, limit);
  },

  async getJokeById(id: string) {
    await delay(200);
    return jokes.find(joke => joke.id === id);
  },

  async getBrainTeasers(limit = 20) {
    await delay(300);
    return brainTeasers.slice(0, limit);
  },

  async getBrainTeaserById(id: string) {
    await delay(200);
    return brainTeasers.find(teaser => teaser.id === id);
  },

  async getYoutubeVideos(limit = 20) {
    await delay(300);
    return youtubeVideos.slice(0, limit);
  },

  async getYoutubeVideoById(id: string) {
    await delay(200);
    return youtubeVideos.find(video => video.id === id);
  },
};