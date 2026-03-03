/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MovieCard from "./MovieCard"

interface SerieRowProps {
  title: string
  series: any[]
  priority?: boolean
}

export default function SerieRow({ title, series, priority = false }: SerieRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const currentScroll = scrollContainerRef.current.scrollLeft
      
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  if (!series || series.length === 0) {
    return null
  }

  return (
    <section className="w-full py-6 sm:py-8 lg:py-10 group/serie">
      {/* Cabeçalho com título e setas */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-6 lg:px-8">
        <h2 className="
          text-xl sm:text-2xl lg:text-3xl font-bold
          bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent
          flex items-center gap-2
        ">
          <span className="text-2xl sm:text-3xl">📺</span>
          {title}
        </h2>

        {/* Setas de navegação */}
        <div className="flex gap-2 opacity-0 group-hover/serie:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => scroll('left')}
            className="
              p-2 rounded-full
              bg-foreground/10 hover:bg-foreground/20
              text-foreground
              transition-all duration-300
              hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-foreground/30
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Scroll para esquerda"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="
              p-2 rounded-full
              bg-foreground/10 hover:bg-foreground/20
              text-foreground
              transition-all duration-300
              hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-foreground/30
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Scroll para direita"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Container com scroll */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Gradientes indicadores */}
        <div className="
          absolute left-0 top-0 bottom-0 w-16 
          bg-gradient-to-r from-background to-transparent 
          pointer-events-none z-10
        " />
        <div className="
          absolute right-0 top-0 bottom-0 w-16 
          bg-gradient-to-l from-background to-transparent 
          pointer-events-none z-10
        " />
        
        {/* Lista de séries com scroll */}
        <div
          ref={scrollContainerRef}
          className="
            flex gap-3 sm:gap-4 lg:gap-5 
            overflow-x-auto overflow-y-visible
            pb-4 scrollbar-hide
            snap-x snap-mandatory
            scroll-smooth
          "
        >
          {series.map((serie, index) => (
            <div
              key={serie.id}
              className="
                min-w-[120px] xs:min-w-[140px] 
                sm:min-w-[160px] md:min-w-[180px] 
                lg:min-w-[200px]
                snap-start
              "
            >
              <MovieCard
                movie={serie}
                variant="serie"
                priority={priority && index < 6}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}