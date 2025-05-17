"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ContentCardProps {
  id: string
  title: string
  summary?: string
  category?: string
  imageUrl?: string
  date?: string
  readTime?: number
  type: "article" | "horoscope" | "joke" | "quote" | "brainteaser" | "video"
  className?: string
}

export function ContentCard({
  id,
  title,
  summary,
  category,
  imageUrl,
  date,
  readTime,
  type,
  className,
}: ContentCardProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Generate dynamic path based on content type
  const getPath = () => {
    switch (type) {
      case "article":
        return `/article/${id}`
      case "video":
        return `/video/${id}`
      default:
        return `/${type}/${id}`
    }
  }

  return (
    <Link href={getPath()}>
      <Card
        className={cn(
          "overflow-hidden h-full transition-all duration-300 hover:shadow-lg",
          isDark
            ? "hover:bg-card/70 bg-card/50 backdrop-blur-md border-muted/40"
            : "hover:bg-card/80 bg-card/70 backdrop-blur-sm border-muted/30",
          className
        )}
      >
        {imageUrl && (
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {category && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="font-medium">
                  {category}
                </Badge>
              </div>
            )}
          </div>
        )}
        <CardHeader className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
        </CardHeader>
        {summary && (
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-3">{summary}</p>
          </CardContent>
        )}
        {(date || readTime) && (
          <CardFooter className="p-4 pt-0 flex items-center gap-4 text-xs text-muted-foreground">
            {date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readTime} min read</span>
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}