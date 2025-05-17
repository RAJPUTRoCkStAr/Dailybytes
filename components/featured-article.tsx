import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface FeaturedArticleProps {
  id: string
  title: string
  summary: string
  category: string
  imageUrl: string
  date: string
  readTime: number
  className?: string
}

export function FeaturedArticle({
  id,
  title,
  summary,
  category,
  imageUrl,
  date,
  readTime,
  className,
}: FeaturedArticleProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-0 shadow-none",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-video md:aspect-square overflow-hidden rounded-lg order-1">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute top-2 left-2">
            <Badge className="font-medium">{category}</Badge>
          </div>
        </div>

        <div className="flex flex-col justify-center order-2">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-2xl md:text-3xl font-bold">{title}</CardTitle>
            <CardDescription className="flex items-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{readTime} min read</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 pb-4">
            <p className="text-muted-foreground">{summary}</p>
          </CardContent>
          <CardFooter className="p-0">
            <Button asChild>
              <Link href={`/article/${id}`}>Read More</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}