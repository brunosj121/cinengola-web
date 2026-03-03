/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react"
import { MovieImage } from "./MovieImage"

interface Props {
  cast: any[]
  title?: string
}

export default function CastCarousel({ cast, title = "Elenco" }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Verificar posição do scroll para mostrar/esconder setas
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.7 // Rola 70% da largura
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      })
      
      // Pequeno delay para atualizar as setas após o scroll
      setTimeout(checkScroll, 100)
    }
  }

  const calcularIdade = (birthday: string | null, deathday?: string | null) => {
    if (!birthday) return null
    
    const birth = new Date(birthday)
    const end = deathday ? new Date(deathday) : new Date()
    
    let age = end.getFullYear() - birth.getFullYear()
    const monthDiff = end.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  if (!cast || cast.length === 0) {
    return null
  }

  return (
    <div className="w-full py-8 sm:py-10">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6 px-4 sm:px-6 lg:px-8">
        <h2 className="
          text-xl sm:text-2xl font-bold
          bg-gradient-to-r from-foreground to-foreground/70 
          bg-clip-text text-transparent
          flex items-center gap-2
        ">
          <User size={20} className="text-foreground/50" />
          {title}
        </h2>
        
        <span className="text-sm text-foreground/50">
          {cast.length} {cast.length === 1 ? 'ator' : 'atores'}
        </span>
      </div>

      {/* Container do carrossel */}
      <div className="relative group/carousel px-4 sm:px-6 lg:px-8">
        {/* Setas de navegação */}
        <button
          onClick={() => scroll("left")}
          className={`
            absolute left-2 top-1/2 -translate-y-1/2 z-20
            p-3 rounded-full
            bg-background/80 backdrop-blur-sm
            border border-foreground/10
            text-foreground
            shadow-lg
            transition-all duration-300
            hover:scale-110 hover:bg-foreground/10
            focus:outline-none focus:ring-2 focus:ring-foreground/30
            ${showLeftArrow 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
            }
            group-hover/carousel:opacity-100
          `}
          aria-label="Scroll para esquerda"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => scroll("right")}
          className={`
            absolute right-2 top-1/2 -translate-y-1/2 z-20
            p-3 rounded-full
            bg-background/80 backdrop-blur-sm
            border border-foreground/10
            text-foreground
            shadow-lg
            transition-all duration-300
            hover:scale-110 hover:bg-foreground/10
            focus:outline-none focus:ring-2 focus:ring-foreground/30
            ${showRightArrow 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
            }
            group-hover/carousel:opacity-100
          `}
          aria-label="Scroll para direita"
        >
          <ChevronRight size={20} />
        </button>

        {/* Gradientes indicadores */}
        <div className={`
          absolute left-0 top-0 bottom-0 w-16 
          bg-gradient-to-r from-background to-transparent 
          pointer-events-none z-10
          transition-opacity duration-300
          ${showLeftArrow ? 'opacity-100' : 'opacity-0'}
        `} />

        <div className={`
          absolute right-0 top-0 bottom-0 w-16 
          bg-gradient-to-l from-background to-transparent 
          pointer-events-none z-10
          transition-opacity duration-300
          ${showRightArrow ? 'opacity-100' : 'opacity-0'}
        `} />

        {/* Carrossel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto overflow-y-visible pb-6 scrollbar-hide scroll-smooth"
          onScroll={checkScroll}
        >
          {cast.slice(0, 20).map((ator) => {
            const idade = calcularIdade(ator.birthday, ator.deathday)
            const isDead = !!ator.deathday

            return (
              <motion.a
                href={`/ator/${ator.id}`}
                key={ator.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="
                  min-w-[120px] sm:min-w-[140px] md:min-w-[160px]
                  flex-shrink-0
                  group
                  cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-foreground/30
                  rounded-xl
                "
              >
                <div className="relative">
                  {/* Foto do ator */}
                  <div className="
                    relative aspect-square w-full
                    rounded-xl overflow-hidden
                    shadow-lg group-hover:shadow-xl
                    transition-all duration-300
                  ">
                    {ator.profile_path ? (
                      <MovieImage
                        src={ator.profile_path}
                        alt={ator.name}
                        width={300}
                        height={300}
                        className="object-cover"
                      />
                    ) : (
                      <div className="
                        w-full h-full
                        bg-gradient-to-br from-foreground/10 to-foreground/5
                        flex items-center justify-center
                      ">
                        <User size={40} className="text-foreground/30" />
                      </div>
                    )}

                    {/* Overlay com personagem no hover */}
                    <div className="
                      absolute inset-0
                      bg-gradient-to-t from-background via-background/50 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      flex items-end
                    ">
                      {ator.character && (
                        <div className="p-3 text-left">
                          <p className="text-foreground text-xs font-medium">
                            {ator.character}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Badge de idade/falecimento */}
                  {idade && (
                    <div className={`
                      absolute top-2 right-2
                      px-2 py-1
                      rounded-md text-xs font-bold
                      backdrop-blur-sm
                      border
                      transition-transform duration-300
                      group-hover:scale-110
                      ${isDead 
                        ? 'bg-foreground/20 text-foreground/80 border-foreground/20' 
                        : 'bg-background/80 text-foreground/70 border-foreground/10'
                      }
                    `}>
                      {isDead ? `† ${idade}` : `${idade} anos`}
                    </div>
                  )}
                </div>

                {/* Informações do ator */}
                <div className="mt-3 text-center">
                  <p className="
                    text-foreground font-medium text-sm
                    line-clamp-1
                    group-hover:text-foreground/90
                    transition-colors duration-300
                  ">
                    {ator.name}
                  </p>
                  
                  {ator.character && (
                    <p className="
                      text-foreground/50 text-xs
                      line-clamp-1
                      mt-1
                    ">
                      {ator.character}
                    </p>
                  )}
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </div>
  )
}