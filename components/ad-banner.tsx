"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

interface AdBannerProps {
  adClient?: string
  adSlot?: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  className?: string
  responsive?: boolean
}

export function AdBanner({
  adClient = "ca-pub-xxxxxxxxxxxxxxxx", // Replace with your AdSense client ID
  adSlot = "1234567890", // Replace with your ad slot ID
  format = "auto",
  className = "",
  responsive = true,
}: AdBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  })
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    // Load AdSense script only once
    if (!document.querySelector("script[src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js']")) {
      const script = document.createElement("script")
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      script.async = true
      script.crossOrigin = "anonymous"
      script.dataset.adClient = adClient
      document.head.appendChild(script)
    }

    // Push ads when in view
    if (inView && window.adsbygoogle && adRef.current && !isLoaded) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setIsLoaded(true)
      } catch (error) {
        console.error("AdSense error:", error)
      }
    }
  }, [adClient, inView, isLoaded])

  return (
    <div ref={ref} className={`ad-container my-8 text-center ${className}`}>
      <p className="text-xs text-muted-foreground mb-2">Advertisement</p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "100px" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  )
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}