// src/components/MovieCard.tsx
import Link from "next/link"
import { MovieImage } from "./MovieImage"

interface MovieProps {
  movie: {
    id: number
    title: string
    name?: string  // Para séries
    poster_path: string
    vote_average?: number
    release_date?: string
    first_air_date?: string
  }
  priority?: boolean
  variant?: "movie" | "serie" // Para reutilizar com séries
}

export default function MovieCard({ movie, priority = false, variant = "movie" }: MovieProps) {
  const title = movie.title || movie.name || "Título indisponível"
  const date = movie.release_date || movie.first_air_date
  const year = date ? new Date(date).getFullYear() : null
  const href = variant === "movie" ? `/filmes/${movie.id}` : `/series/${movie.id}`

  return (
    <Link href={href} className="group block">
      <div className="
        relative
        bg-background/5 
        rounded-xl overflow-hidden
        transition-all duration-500
        group-hover:scale-105 group-hover:shadow-2xl
        group-hover:shadow-foreground/10
        group-focus:scale-105
        outline-none
      ">
        {/* Container da imagem com aspecto 2:3 */}
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <MovieImage
            src={movie.poster_path}
            alt={title}
            width={500}
            height={750}
            priority={priority}
            className="rounded-t-xl"
          />

          {/* Overlay gradiente no hover */}
          <div className="
            absolute inset-0
            bg-gradient-to-t from-background via-background/50 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none
          " />

        

          {/* Nota (se disponível) */}
          {movie.vote_average ? (
            <div className="
              absolute top-2 right-2
              px-2 py-1
              bg-background/80 backdrop-blur-sm
              text-yellow-500 text-xs font-bold
              rounded-md
              border border-foreground/10
              z-10
              transition-transform duration-300
              group-hover:scale-110
              pointer-events-none
            ">
              ★ {movie.vote_average.toFixed(1)}
            </div>
          ) : null}
        </div>

        {/* Informações do card */}
        <div className="p-3 space-y-1">
          <h3 className="
            text-foreground font-medium text-sm
            line-clamp-2
            group-hover:text-foreground/90
            transition-colors duration-300
          ">
            {title}
          </h3>
          
          {year && (
            <p className="text-foreground/50 text-xs">
              {year}
            </p>
          )}
        </div>

        {/* Efeito de brilho no hover */}
        <div className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-foreground/5 to-transparent
          -translate-x-full
          group-hover:translate-x-full
          transition-transform duration-1000
          pointer-events-none
        " />
      </div>
    </Link>
  )
}