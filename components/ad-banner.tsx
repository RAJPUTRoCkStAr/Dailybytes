"use client"

import { useEffect, useRef } from "react"

interface AdBannerProps {
  adClient?: string
  adSlot?: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  className?: string
  responsive?: boolean
}

export function AdBanner({
  adClient = "ca-pub-xxxxxxxxxxxxxxxx",
  adSlot = "1234567890",
  format = "auto",
  className = "",
  responsive = true,
}: AdBannerProps) {
  // Use the correct type for <ins> element: HTMLModElement
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

    // Push ads
    if (window.adsbygoogle && adRef.current) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error("AdSense error:", error)
      }
    }
  }, [adClient])

  return (
    <div className={`ad-container my-8 text-center ${className}`}>
      <p className="text-xs text-muted-foreground mb-2">Advertisement</p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      ></ins>
    </div>
  )
}

// Add this to a types/global.d.ts file if needed
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}
