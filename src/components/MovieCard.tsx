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
  variant?: "movie" | "serie"
  index?: number // Para controlar lazy loading
}

export default function MovieCard({ 
  movie, 
  priority = false, 
  variant = "movie",
  index = 0 
}: MovieProps) {
  const title = movie.title || movie.name || "Título indisponível"
  const date = movie.release_date || movie.first_air_date
  const year = date ? new Date(date).getFullYear() : null
  const href = variant === "movie" ? `/filmes/${movie.id}` : `/series/${movie.id}`
  
  // Calcular prioridade com base no índice (primeiros 8 cards têm prioridade)
  const shouldPrioritize = priority || index < 8

  return (
    <Link 
      href={href} 
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
      aria-label={`Ver detalhes de ${title}${year ? ` (${year})` : ''}`}
    >
      <div className="
        relative
        bg-foreground/5
        rounded-xl overflow-hidden
        transition-all duration-300 ease-out
        hover:scale-[1.03] active:scale-[0.98]
        hover:shadow-2xl hover:shadow-red-600/10
        focus-within:scale-[1.03]
        will-change-transform
        touch-manipulation
      ">
        {/* Container da imagem com aspecto 2:3 */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-foreground/5">
          {/* Imagem do filme/série */}
          <MovieImage
            src={movie.poster_path}
            alt={title}
            width={500}
            height={750}
            priority={shouldPrioritize}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 250px"
            quality={85}
          />

          {/* Overlay gradiente no hover (apenas desktop) */}
          <div className="
            absolute inset-0
            bg-gradient-to-t from-background via-background/30 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none
            hidden sm:block
          " />

          {/* Nota (se disponível) */}
          {movie.vote_average ? (
            <div className="
              absolute top-2 right-2
              px-2 py-1
              bg-black/60 backdrop-blur-md
              text-yellow-400 text-xs font-bold
              rounded-md
              border border-white/10
              z-10
              transition-transform duration-300
              group-hover:scale-110
              pointer-events-none
              shadow-lg
            ">
              ★ {movie.vote_average.toFixed(1)}
            </div>
          ) : null}

          {/* Badge de qualidade (para séries) */}
         
        </div>

        {/* Informações do card - optimizado para mobile */}
        <div className="p-2.5 sm:p-3 space-y-1">
          <h3 className="text-foreground font-medium text-xs sm:text-sm line-clamp-2">
            {title}
          </h3>
          
          {year && (
            <p className="text-foreground/40 text-[10px] sm:text-xs font-medium">
              {year}
            </p>
          )}

          {/* Indicador subtil de hover (apenas desktop) */}
          <div className="
            w-6 h-0.5 bg-red-600/0 group-hover:bg-red-600/50
            transition-all duration-300
            rounded-full
            hidden sm:block
          " />
        </div>

        {/* Efeito de brilho no hover (apenas desktop) */}
        <div className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/5 to-transparent
          -translate-x-full
          group-hover:translate-x-full
          transition-transform duration-1000
          pointer-events-none
          hidden sm:block
        " />
      </div>
    </Link>
  )
}