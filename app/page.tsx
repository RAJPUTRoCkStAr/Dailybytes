"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";

import { api } from "@/lib/api-mock";
import { Article, BrainTeaser, Horoscope, Joke, Quote, YouTubeVideo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AdBanner } from "@/components/ad-banner";
import { buttonVariants } from "@/components/ui/button";
import { CategorySection } from "@/components/category-section";
import { ContentCard } from "@/components/card";
import { FeaturedArticle } from "@/components/featured-article";
import { SectionHeader } from "@/components/section-header";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState<{
    featuredArticle: Article | null;
    techArticles: Article[];
    healthArticles: Article[];
    stockArticles: Article[];
    horoscopes: Horoscope[];
    quotes: Quote[];
    jokes: Joke[];
    brainTeasers: BrainTeaser[];
    youtubeVideos: YouTubeVideo[];
  }>({
    featuredArticle: null,
    techArticles: [],
    healthArticles: [],
    stockArticles: [],
    horoscopes: [],
    quotes: [],
    jokes: [],
    brainTeasers: [],
    youtubeVideos: [],
  });

  const fetchContent = async () => {
    try {
      const data = await api.getFeaturedContent();
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const nextPage = page + 1;
      const moreContent = await api.getFeaturedContent();
      
      setContent(prev => ({
        ...prev,
        techArticles: [...prev.techArticles, ...moreContent.techArticles],
        healthArticles: [...prev.healthArticles, ...moreContent.healthArticles],
        stockArticles: [...prev.stockArticles, ...moreContent.stockArticles],
        horoscopes: [...prev.horoscopes, ...moreContent.horoscopes],
        quotes: [...prev.quotes, ...moreContent.quotes],
        jokes: [...prev.jokes, ...moreContent.jokes],
        brainTeasers: [...prev.brainTeasers, ...moreContent.brainTeasers],
        youtubeVideos: [...prev.youtubeVideos, ...moreContent.youtubeVideos],
      }));
      
      setPage(nextPage);
      
      // Check if we've reached the end of available content
      if (nextPage * ITEMS_PER_PAGE >= 100) { // Assuming 100 total items
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more content:", error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <InfiniteScroll
      dataLength={content.techArticles.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<div className="flex justify-center py-4"><Skeleton className="h-8 w-32" /></div>}
      endMessage={<p className="text-center text-muted-foreground py-4">No more content to load.</p>}
    >
      <div className="container pb-8">
        {/* Hero Section */}
        <motion.section 
          className="py-6 md:py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            <div className="h-[400px] rounded-lg bg-muted animate-pulse" />
          ) : content.featuredArticle ? (
            <FeaturedArticle
              id={content.featuredArticle.id}
              title={content.featuredArticle.title}
              summary={content.featuredArticle.summary}
              category={content.featuredArticle.category}
              imageUrl={content.featuredArticle.imageUrl || ""}
              date={content.featuredArticle.date}
              readTime={content.featuredArticle.readTime}
            />
          ) : null}
        </motion.section>

        {/* Ad Banner */}
        <AdBanner />

        {/* Tech & AI Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategorySection
            title="Tech & AI News"
            contentType="article"
            viewAllLink="/category/tech"
            items={content.techArticles}
          />
        </motion.div>

        {/* Health Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CategorySection
            title="Health Tips"
            contentType="article"
            viewAllLink="/category/health"
            items={content.healthArticles}
          />
        </motion.div>

        {/* Ad Banner */}
        <AdBanner />

        {/* Stock Market News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CategorySection
            title="Stock Market News"
            contentType="article"
            viewAllLink="/category/stocks"
            items={content.stockArticles}
          />
        </motion.div>

        {/* YouTube Videos Section */}
        <motion.section 
          className="py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SectionHeader
            title="Trending Videos"
            action={
              <a
                href="/category/videos"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "gap-1"
                )}
              >
                View All <ArrowRight className="h-4 w-4" />
              </a>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="aspect-video rounded-lg bg-muted animate-pulse"
                    />
                  ))
              : content.youtubeVideos
                  .slice(0, 3)
                  .map((video) => (
                    <YouTubeEmbed
                      key={video.id}
                      videoId={video.videoId}
                      title={video.title}
                    />
                  ))}
          </div>
        </motion.section>

        {/* Ad Banner */}
        <AdBanner />

        {/* Quick Reads Section */}
        <motion.section 
          className="py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <SectionHeader title="Quick Reads" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quotes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Motivational Quotes</h3>
              <div className="space-y-4">
                {isLoading
                  ? Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="h-[100px] rounded-lg bg-muted animate-pulse"
                        />
                      ))
                  : content.quotes.map((quote) => (
                      <ContentCard
                        key={quote.id}
                        id={quote.id}
                        title={quote.text}
                        summary={`— ${quote.author}`}
                        type="quote"
                        className="h-auto"
                      />
                    ))}
              </div>
              <a
                href="/category/quotes"
                className="text-sm font-medium text-primary inline-flex items-center gap-1"
              >
                More Quotes <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            {/* Jokes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Daily Jokes</h3>
              <div className="space-y-4">
                {isLoading
                  ? Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="h-[100px] rounded-lg bg-muted animate-pulse"
                        />
                      ))
                  : content.jokes.map((joke) => (
                      <ContentCard
                        key={joke.id}
                        id={joke.id}
                        title={joke.title}
                        summary={joke.text}
                        type="joke"
                        className="h-auto"
                      />
                    ))}
              </div>
              <a
                href="/category/jokes"
                className="text-sm font-medium text-primary inline-flex items-center gap-1"
              >
                More Jokes <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            {/* Brain Teasers */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Brain Teasers</h3>
              <div className="space-y-4">
                {isLoading
                  ? Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="h-[100px] rounded-lg bg-muted animate-pulse"
                        />
                      ))
                  : content.brainTeasers.map((teaser) => (
                      <ContentCard
                        key={teaser.id}
                        id={teaser.id}
                        title={teaser.title}
                        summary={teaser.question}
                        type="brainteaser"
                        className="h-auto"
                      />
                    ))}
              </div>
              <a
                href="/category/brainteasers"
                className="text-sm font-medium text-primary inline-flex items-center gap-1"
              >
                More Teasers <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* Final Ad Banner */}
        <AdBanner />
      </div>
    </InfiniteScroll>
  );
}