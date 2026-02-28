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
}

export function MovieImage({ src, alt, width, height, className }: MovieImageProps) {
  const [error, setError] = useState(false)

  const imageSrc = src && !error 
    ? `https://image.tmdb.org/t/p/w500${src}`
    : '/placeholder-movie.jpg'

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  )
}