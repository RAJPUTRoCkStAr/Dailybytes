"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

import { api } from "@/lib/api-mock";
import { Article } from "@/lib/types";
import { AdBanner } from "@/components/ad-banner";
import { buttonVariants } from "@/components/ui/button";
import { CategorySection } from "@/components/category-section";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const data = await api.getArticleById(articleId);
        setArticle(data || null);

        if (data?.category) {
          const related = await api.getArticles(data.category, 4);
          setRelatedArticles(
            related.filter((item) => item.id !== articleId).slice(0, 3)
          );
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-2/3 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          <Skeleton className="aspect-video w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-8">The article you're looking for doesn't exist.</p>
        <Link href="/" className={buttonVariants()}>
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/category/${article.category}`}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {article.category}
          </Link>

          <div className="mt-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
              {article.source && <span>Source: {article.source}</span>}
            </div>
          </div>

          {article.imageUrl && (
            <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-lg">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <AdBanner />

      <div className="container py-8">
        <Separator className="mb-8" />
        {relatedArticles.length > 0 && (
          <CategorySection
            title="Related Articles"
            contentType="article"
            viewAllLink={`/category/${article.category}`}
            items={relatedArticles}
          />
        )}
      </div>
    </>
  );
}