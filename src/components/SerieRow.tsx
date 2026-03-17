/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MovieCard from "./MovieCard"

interface SerieRowProps {
  title: string
  series: any[]
  priority?: boolean
  autoScrollSpeed?: number // velocidade em ms por movimento
}

export default function SerieRow({ 
  title, 
  series, 
  priority = false,
  autoScrollSpeed = 3000 // 3 segundos por movimento
}: SerieRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState<'right' | 'left'>('right')
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const autoScrollInterval = useRef<NodeJS.Timeout | undefined>(undefined)

  
  // Touch handling para mobile
  const touchStartX = useRef<number>(0)

  // Verifica posição do scroll para as setas
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 10)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  // Verifica se chegou ao fim e inverte direção
  const checkAndReverseDirection = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      
      if (direction === 'right' && scrollLeft >= scrollWidth - clientWidth - 10) {
        setDirection('left')
      } else if (direction === 'left' && scrollLeft <= 10) {
        setDirection('right')
      }
    }
  }

  // Scroll manual com setas (apenas desktop)
  const scrollWithArrows = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = 210 + 16 // largura do card + gap
      const visibleCards = Math.floor(container.clientWidth / cardWidth) || 3
      const scrollAmount = cardWidth * visibleCards
      
      container.scrollTo({
        left: direction === 'left' 
          ? container.scrollLeft - scrollAmount 
          : container.scrollLeft + scrollAmount,
        behavior: 'smooth'
      })
      
      // Pausa o auto-scroll por 10 segundos após interação manual
      setIsPaused(true)
      setTimeout(() => {
        setIsPaused(false)
      }, 10000)
    }
  }

  // Scroll suave automático (apenas mobile)
  const performAutoScroll = () => {
    // Só executa auto-scroll em mobile e se não estiver pausado
    if (typeof window !== 'undefined' && window.innerWidth >= 768) return
    if (!scrollContainerRef.current || isPaused) return

    const container = scrollContainerRef.current
    const cardWidth = 210 + 16
    const scrollAmount = cardWidth
    
    let targetScroll
    if (direction === 'right') {
      targetScroll = container.scrollLeft + scrollAmount
      if (targetScroll > container.scrollWidth - container.clientWidth) {
        targetScroll = 0
        setDirection('right')
      }
    } else {
      targetScroll = container.scrollLeft - scrollAmount
      if (targetScroll < 0) {
        targetScroll = container.scrollWidth - container.clientWidth
        setDirection('left')
      }
    }
    
    // Scroll suave com easing
    let start: number | null = null
    const startScroll = container.scrollLeft
    const distance = targetScroll - startScroll
    const duration = 2000
    
    const animateScroll = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = (timestamp - start) / duration
      
      if (progress < 1 && scrollContainerRef.current) {
        const easeProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2
        
        scrollContainerRef.current.scrollLeft = startScroll + distance * easeProgress
        requestAnimationFrame(animateScroll)
      } else if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = targetScroll
        checkAndReverseDirection()
      }
    }
    
    requestAnimationFrame(animateScroll)
  }

  // Inicia o scroll automático apenas em mobile
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    
    if (isMobile && !autoScrollInterval.current && series.length > 0) {
      const timeout = setTimeout(() => {
        performAutoScroll()
        
        autoScrollInterval.current = setInterval(performAutoScroll, autoScrollSpeed)
      }, 1000)
      
      return () => {
        clearTimeout(timeout)
        if (autoScrollInterval.current) {
          clearInterval(autoScrollInterval.current)
        }
      }
    }
  }, [series, direction, isPaused, autoScrollSpeed])

  // Pausa quando usuário interage (mobile)
  const pauseAutoScroll = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsPaused(true)
      setTimeout(() => {
        setIsPaused(false)
      }, 10000)
    }
  }

  // Touch events (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    pauseAutoScroll()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    if (typeof window !== 'undefined' && window.innerWidth >= 768) return
    
    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX.current - touchEndX
    
    if (Math.abs(diffX) > 30) {
      const container = scrollContainerRef.current
      const cardWidth = 210 + 16
      const scrollAmount = cardWidth * (diffX > 0 ? 1 : -1)
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Mouse events para pausar (mobile)
  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsPaused(true)
    }
  }

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsPaused(false)
    }
  }

  // Atualiza setas ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition()
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!series || series.length === 0) {
    return null
  }

  return (
    <section className="w-full py-6 sm:py-8 lg:py-10 group/serie">
      {/* Cabeçalho com título e setas (apenas desktop) */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-6 lg:px-8">
        <h2 className="
          text-xl sm:text-2xl lg:text-3xl font-bold
          bg-gradient-to-r from-foreground to-foreground/70 
          bg-clip-text text-transparent
          flex items-center gap-2
          cursor-default
        ">
          {title}
        </h2>

        {/* SETAS - APENAS VISÍVEIS EM DESKTOP */}
        <div className="hidden md:flex gap-2 opacity-0 group-hover/serie:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => scrollWithArrows('left')}
            disabled={!showLeftArrow}
            className={`
              p-2 rounded-full
              bg-foreground/10 hover:bg-foreground/20
              text-foreground
              transition-all duration-300
              hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-foreground/30
              disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
            `}
            aria-label="Scroll para esquerda"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollWithArrows('right')}
            disabled={!showRightArrow}
            className={`
              p-2 rounded-full
              bg-foreground/10 hover:bg-foreground/20
              text-foreground
              transition-all duration-300
              hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-foreground/30
              disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100
            `}
            aria-label="Scroll para direita"
          >
            <ChevronRight size={20} />
          </button>
        </div>

  
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Gradientes laterais */}
        <div className="
          absolute left-0 top-0 bottom-0 
          w-12 sm:w-16 lg:w-24
          bg-gradient-to-r from-background via-background/80 to-transparent 
          pointer-events-none z-10
        " />
        
        <div className="
          absolute right-0 top-0 bottom-0 
          w-12 sm:w-16 lg:w-24
          bg-gradient-to-l from-background via-background/80 to-transparent 
          pointer-events-none z-10
        " />
        
        {/* Container com scroll */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollPosition}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="
            flex gap-3 sm:gap-4
            overflow-x-auto overflow-y-visible
            pb-6 scrollbar-hide
            items-stretch
            relative
            md:cursor-default
            cursor-grab active:cursor-grabbing
          "
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'auto'
          }}
        >
          {/* Lista de séries */}
          {series.map((serie, index) => (
            <div
              key={serie.id}
              className="
                flex-shrink-0
                w-[130px] xs:w-[150px] 
                sm:w-[170px] md:w-[190px] lg:w-[210px]
                transition-all duration-300
                hover:scale-105 hover:-translate-y-1
                hover:shadow-2xl
                first:ml-0
                animate-fade-in
              "
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <div className="w-full aspect-[2/3] relative">
                <MovieCard
                  movie={serie}
                  variant="serie"
                  priority={priority && index < (typeof window !== 'undefined' && window.innerWidth < 640 ? 3 : 6)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Barra de progresso (apenas mobile) */}
        <div className="md:hidden block h-0.5 w-full bg-foreground/10 rounded-full mt-4 overflow-hidden">
          <div 
            className={`
              h-full bg-gradient-to-r from-red-600 to-red-400 
              rounded-full transition-all duration-1000
              ${isPaused ? 'opacity-30' : 'opacity-100'}
            `}
            style={{ 
              width: scrollContainerRef.current 
                ? `${(scrollContainerRef.current.scrollLeft / (scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth)) * 100}%` 
                : '0%',
              transition: 'width 2s ease-in-out'
            }}
          />
        </div>

      </div>
    </section>
  )
}