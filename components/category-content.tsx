"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api-mock";
import { ContentCard } from "@/components/card";
import { YouTubeEmbed } from "@/components/youtube-embed";

export function CategoryContent({ categoryId }: { categoryId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<any[]>([]);

  const getContentType = () => {
    switch (categoryId) {
      case "tech":
      case "health":
      case "stocks":
        return "article";
      case "horoscope":
        return "horoscope";
      case "quotes":
        return "quote";
      case "jokes":
        return "joke";
      case "brainteasers":
        return "brainteaser";
      case "videos":
        return "video";
      default:
        return "article";
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        let data;
        switch (categoryId) {
          case "tech":
          case "health":
          case "stocks":
            data = await api.getArticles(categoryId, 12);
            break;
          case "horoscope":
            data = await api.getHoroscopes(12);
            break;
          case "quotes":
            data = await api.getQuotes(12);
            break;
          case "jokes":
            data = await api.getJokes(12);
            break;
          case "brainteasers":
            data = await api.getBrainTeasers(12);
            break;
          case "videos":
            data = await api.getYoutubeVideos(12);
            break;
          default:
            data = [];
        }
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchContent();
    }
  }, [categoryId]);

  const contentType = getContentType();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn(
                "rounded-lg bg-muted animate-pulse",
                contentType === "video" ? "aspect-video" : "h-[300px]"
              )}
            ></div>
          ))}
      </div>
    );
  }

  if (contentType === "video") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((video: any) => (
          <YouTubeEmbed
            key={video.id}
            videoId={video.videoId}
            title={video.title}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {content.map((item) => (
        <ContentCard
          key={item.id}
          id={item.id}
          title={item.title}
          summary={
            contentType === "quote"
              ? `— ${item.author}`
              : contentType === "brainteaser"
              ? item.question
              : item.summary || item.prediction || item.text
          }
          imageUrl={item.imageUrl}
          category={item.category}
          date={item.date}
          readTime={item.readTime}
          type={contentType}
        />
      ))}
    </div>
  );
}