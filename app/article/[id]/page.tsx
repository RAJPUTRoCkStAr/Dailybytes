// app/article/[id]/page.tsx

import { api } from "@/lib/api-mock";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { AdBanner } from "@/components/ad-banner";
import { CategorySection } from "@/components/category-section";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

export async function generateStaticParams() {
  const articles = await api.getAllArticles(); // implement this in your api-mock
  return articles.slice(0, 50).map((article: any) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await api.getArticleById(params.id);
  if (!article) return notFound();

  const related = await api.getArticles(article.category, 4);
  const relatedArticles = related.filter((item: any) => item.id !== params.id).slice(0, 3);

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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
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
            {article.content.split("\n\n").map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
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
