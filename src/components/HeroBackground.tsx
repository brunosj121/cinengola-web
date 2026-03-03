// src/components/HeroBackground.tsx
"use client"

import { useState } from "react"
import Image from "next/image"

interface HeroBackgroundProps {
  imageUrl: string
  alt: string
}

export default function HeroBackground({ imageUrl, alt }: HeroBackgroundProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  if (imageError) {
    // Fallback quando a imagem não carrega
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 to-background" />
    )
  }

  return (
    <div className="absolute inset-0">
      {/* Imagem principal */}
      <Image
        src={imageUrl}
        alt={alt}
        fill
        priority
        className={`
          object-cover transition-opacity duration-1000
          ${imageLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        sizes="100vw"
        quality={90}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      
      {/* Placeholder enquanto carrega */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 animate-shimmer" />
      )}
    </div>
  )
}