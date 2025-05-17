"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  className?: string
  autoplay?: boolean
}

export function YouTubeEmbed({
  videoId,
  title = "YouTube video player",
  className,
  autoplay = false,
}: YouTubeEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="relative pb-[56.25%] h-0 overflow-hidden">
          {isLoading && (
            <Skeleton className="absolute inset-0 w-full h-full bg-muted" />
          )}
          <iframe
            className={cn(
              "absolute top-0 left-0 w-full h-full border-0 transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${
              autoplay ? 1 : 0
            }&origin=${
              typeof window !== "undefined" ? window.location.origin : ""
            }`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </CardContent>
    </Card>
  )
}