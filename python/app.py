from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import datetime
from typing import Dict, List, Any, Optional
from pydantic import BaseModel
from scraper import ContentScraper
import uvicorn
from apscheduler.schedulers.background import BackgroundScheduler

app = FastAPI(title="DailyBytes API", description="API for DailyBytes news and entertainment content")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data directory
DATA_DIR = "./data"
os.makedirs(DATA_DIR, exist_ok=True)

# Create a scraper instance
scraper = ContentScraper(output_dir=DATA_DIR)

# Models
class Article(BaseModel):
    id: str
    title: str
    summary: str
    content: str
    category: str
    tags: List[str]
    readTime: int
    date: str
    imageUrl: Optional[str] = None
    source: Optional[str] = None

class Horoscope(BaseModel):
    id: str
    title: str
    summary: str
    date: str
    sign: str
    prediction: str
    imageUrl: Optional[str] = None

class Quote(BaseModel):
    id: str
    title: str
    summary: str
    date: str
    author: str
    text: str
    category: str
    imageUrl: Optional[str] = None

class Joke(BaseModel):
    id: str
    title: str
    summary: str
    date: str
    text: str
    category: str
    imageUrl: Optional[str] = None

class BrainTeaser(BaseModel):
    id: str
    title: str
    summary: str
    date: str
    question: str
    answer: str
    difficulty: str
    category: str
    imageUrl: Optional[str] = None

class YouTubeVideo(BaseModel):
    id: str
    title: str
    summary: str
    date: str
    videoId: str
    channelName: str
    category: str
    viewCount: int
    imageUrl: Optional[str] = None

class FeaturedContent(BaseModel):
    featuredArticle: Article
    techArticles: List[Article]
    healthArticles: List[Article]
    stockArticles: List[Article]
    horoscopes: List[Horoscope]
    quotes: List[Quote]
    jokes: List[Joke]
    brainTeasers: List[BrainTeaser]
    youtubeVideos: List[YouTubeVideo]

# Helper functions
def load_json(filename: str) -> List[Dict[str, Any]]:
    """Load JSON data from a file"""
    filepath = os.path.join(DATA_DIR, filename)
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def get_last_update_time() -> Optional[datetime.datetime]:
    """Get the timestamp of the last content update"""
    filepath = os.path.join(DATA_DIR, "last_update.txt")
    try:
        with open(filepath, 'r') as f:
            timestamp = f.read().strip()
            return datetime.datetime.fromisoformat(timestamp)
    except (FileNotFoundError, ValueError):
        return None

def update_content():
    """Run the scraper to update all content"""
    print(f"[{datetime.datetime.now()}] Updating content...")
    scraper.save_all_content()
    print(f"[{datetime.datetime.now()}] Content updated successfully")

# Schedule daily content updates
scheduler = BackgroundScheduler()
scheduler.add_job(update_content, 'cron', hour=2, minute=0)  # Run at 2:00 AM
scheduler.start()

# Routes
@app.get("/")
async def root():
    last_update = get_last_update_time()
    return {
        "message": "Welcome to DailyBytes API",
        "last_update": last_update.isoformat() if last_update else "Never",
        "endpoints": [
            "/api/featured",
            "/api/tech",
            "/api/health",
            "/api/stocks",
            "/api/horoscopes",
            "/api/quotes",
            "/api/jokes",
            "/api/brainteasers",
            "/api/videos"
        ]
    }

@app.get("/api/featured", response_model=FeaturedContent)
async def get_featured_content():
    """Get featured content for the homepage"""
    tech_articles = load_json("tech_news.json")
    health_articles = load_json("health_tips.json")
    stock_articles = load_json("stock_news.json")
    horoscopes = load_json("horoscopes.json")
    quotes = load_json("quotes.json")
    jokes = load_json("jokes.json")
    brain_teasers = load_json("brain_teasers.json")
    youtube_videos = load_json("youtube_trending.json")
    
    # If any data is missing, run the scraper
    if not all([tech_articles, health_articles, stock_articles, horoscopes, quotes, jokes, brain_teasers, youtube_videos]):
        update_content()
        
        # Reload data
        tech_articles = load_json("tech_news.json")
        health_articles = load_json("health_tips.json")
        stock_articles = load_json("stock_news.json")
        horoscopes = load_json("horoscopes.json")
        quotes = load_json("quotes.json")
        jokes = load_json("jokes.json")
        brain_teasers = load_json("brain_teasers.json")
        youtube_videos = load_json("youtube_trending.json")
    
    return {
        "featuredArticle": tech_articles[0] if tech_articles else None,
        "techArticles": tech_articles[:4],
        "healthArticles": health_articles[:4],
        "stockArticles": stock_articles[:4],
        "horoscopes": horoscopes[:4],
        "quotes": quotes[:4],
        "jokes": jokes[:4],
        "brainTeasers": brain_teasers[:4],
        "youtubeVideos": youtube_videos[:4]
    }

@app.get("/api/tech", response_model=List[Article])
async def get_tech_articles(limit: int = 10):
    """Get tech news articles"""
    articles = load_json("tech_news.json")
    return articles[:limit]

@app.get("/api/health", response_model=List[Article])
async def get_health_articles(limit: int = 10):
    """Get health tips articles"""
    articles = load_json("health_tips.json")
    return articles[:limit]

@app.get("/api/stocks", response_model=List[Article])
async def get_stock_articles(limit: int = 10):
    """Get stock market news articles"""
    articles = load_json("stock_news.json")
    return articles[:limit]

@app.get("/api/horoscopes", response_model=List[Horoscope])
async def get_all_horoscopes():
    """Get daily horoscopes for all signs"""
    horoscopes = load_json("horoscopes.json")
    return horoscopes

@app.get("/api/horoscopes/{sign}", response_model=Horoscope)
async def get_horoscope_by_sign(sign: str):
    """Get horoscope for a specific sign"""
    horoscopes = load_json("horoscopes.json")
    for horoscope in horoscopes:
        if horoscope["sign"].lower() == sign.lower():
            return horoscope
    raise HTTPException(status_code=404, detail=f"Horoscope for sign '{sign}' not found")

@app.get("/api/quotes", response_model=List[Quote])
async def get_quotes(limit: int = 10):
    """Get motivational quotes"""
    quotes = load_json("quotes.json")
    return quotes[:limit]

@app.get("/api/jokes", response_model=List[Joke])
async def get_jokes(limit: int = 10):
    """Get daily jokes"""
    jokes = load_json("jokes.json")
    return jokes[:limit]

@app.get("/api/brainteasers", response_model=List[BrainTeaser])
async def get_brain_teasers(limit: int = 10):
    """Get brain teasers and puzzles"""
    teasers = load_json("brain_teasers.json")
    return teasers[:limit]

@app.get("/api/videos", response_model=List[YouTubeVideo])
async def get_youtube_videos(limit: int = 10):
    """Get trending YouTube videos"""
    videos = load_json("youtube_trending.json")
    return videos[:limit]

@app.get("/api/article/{article_id}", response_model=Article)
async def get_article_by_id(article_id: str):
    """Get a specific article by ID"""
    # Try to find in each article category
    for category in ["tech_news.json", "health_tips.json", "stock_news.json"]:
        articles = load_json(category)
        for article in articles:
            if article["id"] == article_id:
                return article
    
    raise HTTPException(status_code=404, detail=f"Article with ID '{article_id}' not found")

@app.get("/api/update")
async def trigger_update():
    """Manually trigger content update"""
    update_content()
    return {"message": "Content update triggered", "timestamp": datetime.datetime.now().isoformat()}

# Run the server
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)