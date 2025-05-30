"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api-mock";
import { ContentCard } from "@/components/card";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 20;

export function CategoryContent({ categoryId }: { categoryId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

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

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      let data: any[];
      switch (categoryId) {
        case "tech":
        case "health":
        case "stocks":
          data = await api.getArticles(categoryId, ITEMS_PER_PAGE);
          break;
        case "horoscope":
          data = await api.getHoroscopes(ITEMS_PER_PAGE);
          break;
        case "quotes":
          data = await api.getQuotes(ITEMS_PER_PAGE);
          break;
        case "jokes":
          data = await api.getJokes(ITEMS_PER_PAGE);
          break;
        case "brainteasers":
          data = await api.getBrainTeasers(ITEMS_PER_PAGE);
          break;
        case "videos":
          data = await api.getYoutubeVideos(ITEMS_PER_PAGE);
          break;
        default:
          data = [];
      }
      setContent(data);
      setHasMore(data.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const nextPage = page + 1;
      let moreData: any[];
      
      switch (categoryId) {
        case "tech":
        case "health":
        case "stocks":
          moreData = await api.getArticles(categoryId, ITEMS_PER_PAGE);
          break;
        case "horoscope":
          moreData = await api.getHoroscopes(ITEMS_PER_PAGE);
          break;
        case "quotes":
          moreData = await api.getQuotes(ITEMS_PER_PAGE);
          break;
        case "jokes":
          moreData = await api.getJokes(ITEMS_PER_PAGE);
          break;
        case "brainteasers":
          moreData = await api.getBrainTeasers(ITEMS_PER_PAGE);
          break;
        case "videos":
          moreData = await api.getYoutubeVideos(ITEMS_PER_PAGE);
          break;
        default:
          moreData = [];
      }

      setContent(prev => [...prev, ...moreData]);
      setPage(nextPage);
      setHasMore(moreData.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error loading more content:", error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchContent();
    }
  }, [categoryId]);

  const contentType = getContentType();

  if (isLoading) {
    return (
      <div className="content-grid">
        {Array(ITEMS_PER_PAGE)
          .fill(0)
          .map((_, i) => (
            <Skeleton
              key={i}
              className={cn(
                "rounded-lg",
                contentType === "video" ? "aspect-video" : "h-[300px]"
              )}
            />
          ))}
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={content.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<div className="flex justify-center py-4"><Skeleton className="h-8 w-32" /></div>}
      endMessage={<p className="text-center text-muted-foreground py-4">No more content to load.</p>}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={contentType === "video" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "content-grid"}
      >
        {content.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {contentType === "video" ? (
              <YouTubeEmbed
                videoId={item.videoId}
                title={item.title}
              />
            ) : (
              <ContentCard
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
            )}
          </motion.div>
        ))}
      </motion.div>
    </InfiniteScroll>
  );
}