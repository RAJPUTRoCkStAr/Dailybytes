import os
import json
import random
import time
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional

# This is a simple mock scraper for demonstration purposes
# In a real implementation, we would use libraries like requests, 
# BeautifulSoup, Selenium, or Scrapy to fetch actual content

class ContentScraper:
    def __init__(self, output_dir: str = "./data"):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
    
    def scrape_tech_news(self) -> List[Dict[str, Any]]:
        """Mock scraper for tech news from Medium and Dev.to"""
        print("Scraping tech news...")
        # In a real implementation, we would fetch actual content
        return self._generate_mock_articles("tech", 10)
    
    def scrape_health_tips(self) -> List[Dict[str, Any]]:
        """Mock scraper for health tips from health blogs"""
        print("Scraping health tips...")
        return self._generate_mock_articles("health", 10)
    
    def scrape_stock_news(self) -> List[Dict[str, Any]]:
        """Mock scraper for stock market news"""
        print("Scraping stock market news...")
        return self._generate_mock_articles("stocks", 10)
    
    def scrape_horoscopes(self) -> List[Dict[str, Any]]:
        """Mock scraper for daily horoscopes"""
        print("Scraping horoscopes...")
        
        signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
                "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
        
        horoscopes = []
        today = datetime.now().strftime("%Y-%m-%d")
        
        for i, sign in enumerate(signs):
            horoscopes.append({
                "id": str(i + 100),
                "title": f"{sign} Daily Horoscope",
                "summary": f"Your daily horoscope for {sign}.",
                "date": today,
                "sign": sign,
                "prediction": self._generate_mock_horoscope(sign),
                "imageUrl": f"https://images.pexels.com/photos/{3800516 + i}/pexels-photo-{3800516 + i}.jpeg"
            })
        
        return horoscopes
    
    def generate_quotes(self) -> List[Dict[str, Any]]:
        """Generate motivational quotes using AI (simulated)"""
        print("Generating motivational quotes...")
        
        categories = ["Motivation", "Success", "Happiness", "Growth", "Leadership"]
        quotes = []
        today = datetime.now().strftime("%Y-%m-%d")
        
        for i in range(10):
            category = random.choice(categories)
            quotes.append({
                "id": str(i + 200),
                "title": f"Daily Inspiration",
                "summary": "A motivational quote to inspire your day.",
                "date": today,
                "author": self._get_random_author(),
                "text": self._generate_mock_quote(),
                "category": category,
                "imageUrl": f"https://images.pexels.com/photos/{4709285 + i}/pexels-photo-{4709285 + i}.jpeg"
            })
        
        return quotes
    
    def generate_jokes(self) -> List[Dict[str, Any]]:
        """Generate daily jokes using AI (simulated)"""
        print("Generating jokes...")
        
        categories = ["Dad Jokes", "Puns", "Tech Humor", "Wordplay"]
        jokes = []
        today = datetime.now().strftime("%Y-%m-%d")
        
        for i in range(10):
            category = random.choice(categories)
            jokes.append({
                "id": str(i + 300),
                "title": f"Daily Laugh",
                "summary": "A joke to brighten your day.",
                "date": today,
                "text": self._generate_mock_joke(),
                "category": category,
                "imageUrl": f"https://images.pexels.com/photos/{7875418 + i}/pexels-photo-{7875418 + i}.jpeg"
            })
        
        return jokes
    
    def generate_brain_teasers(self) -> List[Dict[str, Any]]:
        """Generate brain teasers using AI (simulated)"""
        print("Generating brain teasers...")
        
        categories = ["Logic Puzzle", "Math Problem", "Riddle", "Word Puzzle"]
        difficulties = ["easy", "medium", "hard"]
        teasers = []
        today = datetime.now().strftime("%Y-%m-%d")
        
        for i in range(10):
            category = random.choice(categories)
            difficulty = random.choice(difficulties)
            question, answer = self._generate_mock_brain_teaser()
            
            teasers.append({
                "id": str(i + 400),
                "title": f"Daily Brain Teaser #{i+1}",
                "summary": "Challenge your mind with this brain teaser.",
                "date": today,
                "question": question,
                "answer": answer,
                "difficulty": difficulty,
                "category": category,
                "imageUrl": f"https://images.pexels.com/photos/{7567774 + i}/pexels-photo-{7567774 + i}.jpeg"
            })
        
        return teasers
    
    def fetch_youtube_trending(self) -> List[Dict[str, Any]]:
        """Mock fetcher for YouTube trending videos"""
        print("Fetching YouTube trending videos...")
        
        categories = ["Technology", "Health", "Finance", "Entertainment"]
        videos = []
        today = datetime.now().strftime("%Y-%m-%d")
        
        video_ids = [
            "5KWELtJZvRU", "UEEsdXn8oG8", "Xn7KWR9EOGQ", "LL8Fa5pQEXY",
            "dQw4w9WgXcQ", "QH2-TGUlwu4", "9bZkp7q19f0", "kJQP7kiw5Fk",
            "RgKAFK5djSk", "JGwWNGJdvx8"
        ]
        
        for i in range(10):
            category = random.choice(categories)
            video_id = video_ids[i % len(video_ids)]
            
            videos.append({
                "id": str(i + 500),
                "title": f"Trending Video #{i+1}",
                "summary": f"A trending {category.lower()} video on YouTube.",
                "date": today,
                "videoId": video_id,
                "channelName": f"Channel {i+1}",
                "category": category,
                "viewCount": random.randint(10000, 1000000),
                "imageUrl": f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
            })
        
        return videos
    
    def save_all_content(self):
        """Save all scraped and generated content to JSON files"""
        content = {
            "tech_news": self.scrape_tech_news(),
            "health_tips": self.scrape_health_tips(),
            "stock_news": self.scrape_stock_news(),
            "horoscopes": self.scrape_horoscopes(),
            "quotes": self.generate_quotes(),
            "jokes": self.generate_jokes(),
            "brain_teasers": self.generate_brain_teasers(),
            "youtube_trending": self.fetch_youtube_trending()
        }
        
        # Save each content type to a separate file
        for content_type, data in content.items():
            filename = os.path.join(self.output_dir, f"{content_type}.json")
            with open(filename, 'w') as f:
                json.dump(data, f, indent=2)
            print(f"Saved {len(data)} items to {filename}")
        
        # Save a timestamp file to track the last update
        with open(os.path.join(self.output_dir, "last_update.txt"), 'w') as f:
            f.write(datetime.now().isoformat())
    
    def _generate_mock_articles(self, category: str, count: int) -> List[Dict[str, Any]]:
        """Generate mock articles for the given category"""
        articles = []
        base_id = {"tech": 1000, "health": 2000, "stocks": 3000}[category]
        
        for i in range(count):
            # Generate a date within the last week
            date = (datetime.now() - timedelta(days=random.randint(0, 6))).strftime("%Y-%m-%d")
            
            articles.append({
                "id": str(base_id + i),
                "title": self._generate_mock_title(category),
                "summary": self._generate_mock_summary(category),
                "content": self._generate_mock_content(category),
                "category": category,
                "tags": self._generate_mock_tags(category),
                "readTime": random.randint(3, 12),
                "date": date,
                "imageUrl": self._get_random_image_url(),
                "source": self._get_random_source(category)
            })
        
        return articles
    
    def _generate_mock_title(self, category: str) -> str:
        """Generate a mock title based on category"""
        if category == "tech":
            templates = [
                "The Future of {tech} Technology",
                "{tech} Trends to Watch in {year}",
                "How {tech} is Revolutionizing {industry}",
                "{number} Ways {tech} is Changing {industry}"
            ]
            techs = ["AI", "Blockchain", "Cloud", "IoT", "5G", "Quantum Computing"]
            industries = ["Healthcare", "Finance", "Education", "Manufacturing", "Retail"]
            template = random.choice(templates)
            return template.format(
                tech=random.choice(techs),
                industry=random.choice(industries),
                year=datetime.now().year + random.randint(0, 1),
                number=random.randint(5, 10)
            )
        
        elif category == "health":
            templates = [
                "The Benefits of {activity} for {benefit}",
                "{number} {food} That Boost {health_aspect}",
                "How to Improve Your {health_aspect} in {time} Minutes a Day",
                "The Science Behind {health_trend}"
            ]
            activities = ["Meditation", "Yoga", "Intermittent Fasting", "HIIT Workouts", "Walking"]
            benefits = ["Mental Health", "Immunity", "Longevity", "Brain Function", "Sleep Quality"]
            foods = ["Superfoods", "Herbs", "Vegetables", "Nutrients", "Supplements"]
            health_aspects = ["Sleep", "Focus", "Energy", "Gut Health", "Stress Management"]
            health_trends = ["Mindfulness", "Plant-Based Diet", "Cold Therapy", "Breathwork", "Chronobiology"]
            
            template = random.choice(templates)
            return template.format(
                activity=random.choice(activities),
                benefit=random.choice(benefits),
                number=random.randint(3, 7),
                food=random.choice(foods),
                health_aspect=random.choice(health_aspects),
                time=random.choice([5, 10, 15, 20, 30]),
                health_trend=random.choice(health_trends)
            )
        
        elif category == "stocks":
            templates = [
                "{market} Market: {direction} Ahead?",
                "Investing in {sector} Stocks: {assessment}",
                "{company} Stock Analysis: Buy, Hold or Sell?",
                "The Impact of {event} on {market} Markets"
            ]
            markets = ["US", "Global", "European", "Asian", "Emerging"]
            directions = ["Rally", "Correction", "Volatility", "Stability", "Growth"]
            sectors = ["Tech", "Healthcare", "Energy", "Finance", "Consumer"]
            assessments = ["Opportunities and Risks", "A Long-term Perspective", "Expert Insights", "Strategic Analysis"]
            companies = ["Apple", "Amazon", "Google", "Microsoft", "Tesla"]
            events = ["Inflation", "Interest Rate Changes", "Geopolitical Tensions", "Regulatory Changes", "Earnings Season"]
            
            template = random.choice(templates)
            return template.format(
                market=random.choice(markets),
                direction=random.choice(directions),
                sector=random.choice(sectors),
                assessment=random.choice(assessments),
                company=random.choice(companies),
                event=random.choice(events)
            )
        
        return f"Article about {category.title()}"
    
    def _generate_mock_summary(self, category: str) -> str:
        """Generate a mock article summary"""
        templates = [
            "An in-depth look at the latest developments in {topic}.",
            "Exploring the implications of recent changes in {topic}.",
            "Expert analysis of trends shaping the future of {topic}.",
            "What you need to know about {topic} in today's rapidly changing landscape."
        ]
        
        topics = {
            "tech": ["artificial intelligence", "blockchain technology", "cloud computing", "cybersecurity", "digital transformation"],
            "health": ["nutrition research", "fitness science", "mental wellness", "preventive healthcare", "sleep optimization"],
            "stocks": ["market volatility", "investment strategies", "economic indicators", "sector rotation", "dividend investing"]
        }
        
        template = random.choice(templates)
        return template.format(topic=random.choice(topics.get(category, ["this field"])))
    
    def _generate_mock_content(self, category: str) -> str:
        """Generate mock article content with multiple paragraphs"""
        paragraphs = []
        for _ in range(random.randint(4, 8)):
            words = random.randint(40, 100)
            paragraph = " ".join(["Lorem ipsum"] * (words // 2))
            paragraphs.append(paragraph)
        
        return "\n\n".join(paragraphs)
    
    def _generate_mock_tags(self, category: str) -> List[str]:
        """Generate mock tags based on category"""
        tag_pools = {
            "tech": ["AI", "Machine Learning", "Blockchain", "Cloud", "Cybersecurity", "IoT", "Data Science", "Programming", "DevOps", "Web3"],
            "health": ["Nutrition", "Fitness", "Mental Health", "Sleep", "Wellness", "Diet", "Exercise", "Mindfulness", "Supplements", "Immunity"],
            "stocks": ["Investing", "Market Analysis", "ETFs", "Dividends", "Growth Stocks", "Value Investing", "Retirement", "Trading", "Financial Planning", "Economy"]
        }
        
        pool = tag_pools.get(category, ["General"])
        return random.sample(pool, k=random.randint(2, 4))
    
    def _get_random_source(self, category: str) -> str:
        """Get a random source based on category"""
        sources = {
            "tech": ["medium.com", "dev.to", "techcrunch.com", "wired.com", "theverge.com"],
            "health": ["healthline.com", "webmd.com", "medicalnewstoday.com", "health.harvard.edu", "mayoclinic.org"],
            "stocks": ["finance.yahoo.com", "moneycontrol.com", "bloomberg.com", "cnbc.com", "marketwatch.com"]
        }
        
        return random.choice(sources.get(category, ["example.com"]))
    
    def _get_random_image_url(self) -> str:
        """Get a random placeholder image URL"""
        image_ids = [
            "2977565", "3861969", "4050315", "5483077", "5483064", 
            "5483071", "5473950", "5473947", "5473945", "5473954"
        ]
        image_id = random.choice(image_ids)
        return f"https://images.pexels.com/photos/{image_id}/pexels-photo-{image_id}.jpeg"
    
    def _generate_mock_horoscope(self, sign: str) -> str:
        """Generate a mock horoscope prediction"""
        templates = [
            "Today brings a focus on {area}. You may find yourself {action}, which could lead to {outcome}. Take time to {advice}.",
            "The alignment of {planet} suggests {area} will be significant today. Consider {advice} to make the most of opportunities.",
            "{area} takes center stage today. Your natural tendency to {trait} serves you well, but remember to {advice}.",
            "A {aspect} aspect between {planet} and your sign brings attention to {area}. This is an excellent day to {action}."
        ]
        
        areas = ["relationships", "career matters", "personal growth", "financial decisions", "creative pursuits", "home and family"]
        actions = ["reflecting on past decisions", "making bold moves", "connecting with old friends", "reassessing your goals", "exploring new opportunities"]
        outcomes = ["unexpected insights", "positive developments", "meaningful connections", "a clearer perspective", "renewed enthusiasm"]
        advice = ["trust your intuition", "maintain balance", "communicate openly", "focus on priorities", "be patient with yourself and others"]
        planets = ["Mercury", "Venus", "Mars", "Jupiter", "Saturn", "the Moon", "the Sun"]
        traits = ["be analytical", "show compassion", "take initiative", "seek harmony", "stay grounded", "adapt to change"]
        aspects = ["favorable", "challenging", "transformative", "enlightening", "balancing"]
        
        template = random.choice(templates)
        return template.format(
            area=random.choice(areas),
            action=random.choice(actions),
            outcome=random.choice(outcomes),
            advice=random.choice(advice),
            planet=random.choice(planets),
            trait=random.choice(traits),
            aspect=random.choice(aspects)
        )
    
    def _get_random_author(self) -> str:
        """Get a random author name for quotes"""
        first_names = ["Albert", "Maya", "Marcus", "Marie", "Nelson", "Eleanor", "Mahatma", "Oprah", "Martin", "Jane"]
        last_names = ["Einstein", "Angelou", "Aurelius", "Curie", "Mandela", "Roosevelt", "Gandhi", "Winfrey", "Luther King", "Austen"]
        
        i = random.randint(0, len(first_names) - 1)
        return f"{first_names[i]} {last_names[i]}"
    
    def _generate_mock_quote(self) -> str:
        """Generate a mock motivational quote"""
        templates = [
            "The only way to do great work is to {action}.",
            "{concept} is not the absence of {challenge}, but the ability to {action} despite it.",
            "The future belongs to those who {action}.",
            "Life is 10% what happens to you and 90% how you {action}.",
            "Success is not final, failure is not fatal; it's the {concept} that counts."
        ]
        
        actions = [
            "love what you do", 
            "believe in yourself", 
            "persist in the face of obstacles", 
            "learn from yesterday", 
            "build their dreams today",
            "respond to it",
            "embrace change"
        ]
        
        concepts = ["Courage", "Happiness", "Success", "Wisdom", "Strength", "Resilience"]
        challenges = ["fear", "difficulty", "uncertainty", "failure", "doubt"]
        
        template = random.choice(templates)
        return template.format(
            action=random.choice(actions),
            concept=random.choice(concepts),
            challenge=random.choice(challenges)
        )
    
    def _generate_mock_joke(self) -> str:
        """Generate a mock joke"""
        jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
            "Parallel lines have so much in common. It's a shame they'll never meet.",
            "Why do we tell actors to 'break a leg?' Because every play has a cast.",
            "I'm reading a book about anti-gravity. It's impossible to put down!",
            "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
            "Why was six afraid of seven? Because seven eight nine!",
            "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
            "I would tell you a construction joke, but I'm still working on it.",
            "How does a penguin build its house? Igloos it together!"
        ]
        
        return random.choice(jokes)
    
    def _generate_mock_brain_teaser(self) -> tuple[str, str]:
        """Generate a mock brain teaser with question and answer"""
        teasers = [
            (
                "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
                "An echo"
            ),
            (
                "The more you take, the more you leave behind. What am I?",
                "Footsteps"
            ),
            (
                "What has keys but no locks, space but no room, and you can enter but not go in?",
                "A keyboard"
            ),
            (
                "What gets wetter as it dries?",
                "A towel"
            ),
            (
                "Forward I'm heavy, but backward I'm not. What am I?",
                "The word 'ton'"
            ),
            (
                "I have cities but no houses, forests but no trees, and rivers but no water. What am I?",
                "A map"
            ),
            (
                "What can travel around the world while staying in a corner?",
                "A stamp"
            ),
            (
                "The person who makes it doesn't want it. The person who buys it doesn't use it. The person who uses it doesn't know it. What is it?",
                "A coffin"
            ),
            (
                "What has a head and a tail, but no body?",
                "A coin"
            ),
            (
                "If you have me, you want to share me. If you share me, you don't have me. What am I?",
                "A secret"
            )
        ]
        
        return random.choice(teasers)

# Main function to run the scraper
if __name__ == "__main__":
    scraper = ContentScraper()
    scraper.save_all_content()
    print("Content scraping and generation complete!")