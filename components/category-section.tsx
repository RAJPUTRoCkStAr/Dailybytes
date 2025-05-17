import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ContentCard } from "@/components/card"
import { SectionHeader } from "@/components/section-header"

interface CategorySectionProps {
  title: string
  contentType: "article" | "horoscope" | "joke" | "quote" | "brainteaser" | "video"
  viewAllLink: string
  items: any[]
  className?: string
}

export function CategorySection({
  title,
  contentType,
  viewAllLink,
  items,
  className,
}: CategorySectionProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className={cn("py-8", className)}>
      <SectionHeader
        title={title}
        action={
          <Link
            href={viewAllLink}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1"
            )}
          >
            View All
          </Link>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            summary={item.summary}
            category={item.category}
            imageUrl={item.imageUrl}
            date={item.date}
            readTime={item.readTime}
            type={contentType}
          />
        ))}
      </div>
    </section>
  )
}