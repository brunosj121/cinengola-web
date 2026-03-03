// src/components/MovieImage.tsx
'use client'

import Image from "next/image"
import { useState } from "react"

interface MovieImageProps {
  src: string | null
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
}

export function MovieImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 150px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 250px",
  quality = 75
}: MovieImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fallback para imagens que não carregam
  const imageSrc = src && !error 
    ? `https://image.tmdb.org/t/p/w500${src}`
    : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750"%3E%3Crect width="500" height="750" fill="%23%7Bforeground%7D10"/%3E%3Ctext x="250" y="375" fontFamily="Arial" fontSize="24" fill="%23%7Bforeground%7D30" textAnchor="middle" dominantBaseline="middle"%3E%3C/text%3E%3C/svg%3E'

  return (
    <div className="relative w-full h-full">
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`
          ${className}
          transition-opacity duration-500
          ${loading ? 'opacity-0' : 'opacity-100'}
        `}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        priority={priority}
        sizes={sizes}
        quality={quality}
        // Placeholder blur enquanto carrega
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      />

      {/* Skeleton loader enquanto carrega */}
      {loading && !error && (
        <div className="
          absolute inset-0
          bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5
          animate-shimmer
        " />
      )}
    </div>
  )
}