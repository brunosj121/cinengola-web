// src/components/Hero.tsx
import Link from "next/link"
import { getTrending } from "../lib/tmdb"
import { Suspense } from "react"

function HeroSkeleton() {
  return (
    <section className="h-screen bg-background flex items-center px-4 sm:px-10">
      <div className="max-w-xl space-y-4 w-full">
        <div className="h-6 bg-foreground/10 rounded-lg w-24 sm:w-32 animate-pulse" />
        <div className="h-10 sm:h-12 lg:h-14 bg-foreground/10 rounded-lg w-3/4 animate-pulse" />
        <div className="h-4 bg-foreground/10 rounded-lg w-32 sm:w-48 animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 sm:h-4 bg-foreground/10 rounded-lg w-full animate-pulse" />
          <div className="h-3 sm:h-4 bg-foreground/10 rounded-lg w-5/6 animate-pulse" />
          <div className="h-3 sm:h-4 bg-foreground/10 rounded-lg w-4/6 animate-pulse" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <div className="h-12 w-full sm:w-32 bg-foreground/10 rounded-lg animate-pulse" />
          <div className="h-12 w-full sm:w-32 bg-foreground/10 rounded-lg animate-pulse" />
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
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      
      <div className="relative z-10 max-w-xl space-y-4 w-full">
        <span className="
          inline-block 
          px-2 sm:px-3 py-1 
          text-xs sm:text-sm 
          bg-foreground/10 backdrop-blur-sm 
          rounded-full text-foreground 
          border border-foreground/20
          mobile-touch-target
        ">
          ⭐ Destaque da Semana
        </span>

        <h1 className="
          text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 
          font-bold text-foreground
          leading-tight
          drop-shadow-lg
        ">
          {movie.title}
        </h1>

        <div className="flex items-center gap-3 text-foreground/90">
          <span className="flex items-center gap-1.5">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="text-base sm:text-lg font-semibold">
              {movie.vote_average?.toFixed(1)}
            </span>
          </span>
          <span className="text-foreground/40 text-lg">•</span>
          <span className="text-base sm:text-lg font-medium">
            {new Date(movie.release_date).getFullYear()}
          </span>
        </div>

        <p className="
          text-sm sm:text-base lg:text-lg 
          text-foreground/90
          line-clamp-3 sm:line-clamp-4
          leading-relaxed
          drop-shadow-md
        ">
          {movie.overview}
        </p>

        <div className="
          flex flex-col sm:flex-row 
          gap-3 pt-4 sm:pt-6
          w-full
        ">
          <Link
            href={`/filmes/${movie.id}`}
            className="
              w-full sm:w-auto
              px-5 sm:px-6 lg:px-8 
              py-3.5 sm:py-4
              bg-foreground text-background 
              rounded-xl sm:rounded-lg
              font-semibold text-base sm:text-base
              transition-all duration-300
              hover:scale-105 hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-foreground/50
              active:scale-95
              flex items-center justify-center gap-2
              mobile-touch-target
            "
          >
            <span className="text-lg">▶</span>
            Assistir Agora
          </Link>
          
        
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