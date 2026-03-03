// src/components/Hero.tsx
import Link from "next/link"
import { getTrending } from "../lib/tmdb"
import { Suspense } from "react"

function HeroSkeleton() {
  return (
    <section className="h-screen bg-background flex items-center px-4 sm:px-10">
      <div className="max-w-xl space-y-4">
        <div className="h-6 bg-foreground/10 rounded-lg w-32 animate-pulse" />
        <div className="h-12 sm:h-14 lg:h-16 bg-foreground/10 rounded-lg w-3/4 animate-pulse" />
        <div className="h-4 bg-foreground/10 rounded-lg w-48 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-foreground/10 rounded-lg w-full animate-pulse" />
          <div className="h-4 bg-foreground/10 rounded-lg w-5/6 animate-pulse" />
          <div className="h-4 bg-foreground/10 rounded-lg w-4/6 animate-pulse" />
        </div>
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-32 bg-foreground/10 rounded-lg animate-pulse" />
          <div className="h-12 w-32 bg-foreground/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </section>
  )
}

async function HeroContent() {
  const data = await getTrending()
  const movie = data.results[0]
  
  if (!movie) return null

  return (
    <section
      className="h-screen bg-cover bg-center flex items-center px-4 sm:px-10 relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      {/* Gradiente suave em vez de overlay sólido */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-xl space-y-4">
        <span className="inline-block px-3 py-1 text-sm bg-foreground/10 backdrop-blur-sm rounded-full text-foreground border border-foreground/20">
          ⭐ Destaque da Semana
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
          {movie.title}
        </h1>

        <div className="flex items-center gap-4 text-foreground/80">
          <span className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            {movie.vote_average?.toFixed(1)}
          </span>
          <span>•</span>
          <span>{new Date(movie.release_date).getFullYear()}</span>
        </div>

        <p className="text-foreground/80 text-base sm:text-lg line-clamp-3">
          {movie.overview}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href={`/filmes/${movie.id}`}
            className="
              px-6 sm:px-8 py-3 sm:py-4 
              bg-foreground text-background 
              rounded-lg font-semibold
              transition-all duration-300
              hover:scale-105 hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-foreground/50
            "
          >
            ▶ Assistir Agora
          </Link>
          
          <button
            className="
              px-6 sm:px-8 py-3 sm:py-4 
              bg-foreground/10 backdrop-blur-sm
              text-foreground rounded-lg font-semibold
              border border-foreground/20
              transition-all duration-300
              hover:scale-105 hover:bg-foreground/20
              focus:outline-none focus:ring-2 focus:ring-foreground/30
            "
          >
            ➕ Minha Lista
          </button>
        </div>
      </div>
    </section>
  )
}

export default function Hero() {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <HeroContent />
    </Suspense>
  )
}