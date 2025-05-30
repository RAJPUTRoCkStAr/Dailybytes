// Generate more mock data for each category
function generateMoreData(baseData: any[], count: number): any[] {
  const result = [...baseData];
  const baseLength = baseData.length;
  
  for (let i = 0; i < count - baseLength; i++) {
    const baseItem = baseData[i % baseLength];
    const newItem = {
      ...baseItem,
      id: `${baseItem.id}-${i + baseLength}`,
      title: `${baseItem.title} ${i + baseLength + 1}`,
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0]
    };
    result.push(newItem);
  }
  
  return result;
}

// Existing data imports and definitions...
export const techArticles = generateMoreData(existingTechArticles, 100);
export const healthArticles = generateMoreData(existingHealthArticles, 100);
export const stockArticles = generateMoreData(existingStockArticles, 100);
export const horoscopes = generateMoreData(existingHoroscopes, 100);
export const quotes = generateMoreData(existingQuotes, 100);
export const jokes = generateMoreData(existingJokes, 100);
export const brainTeasers = generateMoreData(existingBrainTeasers, 100);
export const youtubeVideos = generateMoreData(existingYoutubeVideos, 100);