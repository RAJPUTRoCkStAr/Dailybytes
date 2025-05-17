# DailyBytes - Digital News and Entertainment Website

A fully automated, multi-page digital news and entertainment website with daily updated content, dark mode support, and a modern glassmorphism UI design.

## Features

- Multi-category content system with daily updates
- Responsive design for all devices
- Dark/light mode toggle
- SEO-optimized layout
- Google AdSense integration
- Content from various sources including tech, health, stocks, horoscope, quotes, jokes, and more
- YouTube trending videos integration

## Tech Stack

### Frontend
- Next.js 13.5
- React 18
- Tailwind CSS
- shadcn/ui components
- TypeScript

### Backend
- Python FastAPI
- Content scraping with custom scraper
- Automated content generation

## Getting Started

### Prerequisites
- Node.js 16+
- Python 3.9+

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

### Backend Setup

1. Create Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the API server:
```bash
cd python
python app.py
```

## Content Sources

The application fetches and updates content from various sources:

- Tech & AI News: Scraped from Medium and Dev.to
- Health Tips: Scraped from health blogs
- Stock Market News: Scraped from Yahoo Finance and MoneyControl
- Horoscope: Daily horoscopes scraped from public sites
- Motivational Quotes: AI-generated
- Short Jokes: AI-generated
- Mind Games & Brain Teasers: AI-generated
- YouTube Trending Videos: Embedded via YouTube API

## Content Update Schedule

Content is automatically updated daily at 2:00 AM server time.

## Project Structure

```
├── app/                 # Next.js pages and components
├── components/          # Reusable React components
├── lib/                 # Utility functions and types
├── python/              # Backend API and scraper
│   ├── app.py           # FastAPI server
│   ├── scraper.py       # Content scraper
│   └── data/            # Scraped content storage
├── public/              # Static assets
├── .env                 # Environment variables
└── README.md            # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.