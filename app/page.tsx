"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
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

    fetchContent();
  }, []);

  return (
    <div className="container pb-8">
      {/* Hero Section */}
      <section className="py-6 md:py-10">
        {isLoading ? (
          <div className="h-[400px] rounded-lg bg-muted animate-pulse"></div>
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
      </section>

      {/* Tech & AI Section */}
      <CategorySection
        title="Tech & AI News"
        contentType="article"
        viewAllLink="/category/tech"
        items={content.techArticles}
      />

      {/* Ad Banner */}
      <AdBanner />

      {/* Health Section */}
      <CategorySection
        title="Health Tips"
        contentType="article"
        viewAllLink="/category/health"
        items={content.healthArticles}
      />

      {/* Stock Market News */}
      <CategorySection
        title="Stock Market News"
        contentType="article"
        viewAllLink="/category/stocks"
        items={content.stockArticles}
      />

      {/* YouTube Videos Section */}
      <section className="py-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading
            ? Array(2)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-lg bg-muted animate-pulse"
                  ></div>
                ))
            : content.youtubeVideos
                .slice(0, 2)
                .map((video) => (
                  <YouTubeEmbed
                    key={video.id}
                    videoId={video.videoId}
                    title={video.title}
                  />
                ))}
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner />

      {/* Daily Horoscope */}
      <section className="py-8">
        <SectionHeader
          title="Daily Horoscope"
          action={
            <a
              href="/category/horoscope"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "gap-1"
              )}
            >
              View All <ArrowRight className="h-4 w-4" />
            </a>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-[200px] rounded-lg bg-muted animate-pulse"
                  ></div>
                ))
            : content.horoscopes.map((horoscope) => (
                <ContentCard
                  key={horoscope.id}
                  id={horoscope.id}
                  title={horoscope.title}
                  summary={horoscope.prediction}
                  imageUrl={horoscope.imageUrl}
                  date={horoscope.date}
                  type="horoscope"
                />
              ))}
        </div>
      </section>

      {/* Quick Reads Section */}
      <section className="py-8">
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
                      ></div>
                    ))
                : content.quotes.slice(0, 3).map((quote) => (
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
                      ></div>
                    ))
                : content.jokes.slice(0, 3).map((joke) => (
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
                      ></div>
                    ))
                : content.brainTeasers.slice(0, 3).map((teaser) => (
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
      </section>

      {/* Final Ad Banner */}
      <AdBanner />
    </div>
  );
}