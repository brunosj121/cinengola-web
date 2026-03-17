/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Network {
    id: string
    name: string
    slug: string
    logo: string
    url: string
}

interface NetworkCarouselProps {
    title?: string
    networks?: Network[]
    speed?: number // Velocidade do scroll automático
}

// Dados dos canais - APENAS TMDB
const defaultNetworks: Network[] = [
    { id: '1', name: 'History', slug: 'history', logo: 'https://image.tmdb.org/t/p/w500/9fGgdJz17aBX7dOyfHJtsozB7bf.png', url: '/canais/history/' },
    { id: '2', name: 'TV Osaka', slug: 'tv-osaka', logo: 'https://image.tmdb.org/t/p/w500/6foQmoPac7WCDnDuDbuCZklmDuA.png', url: '/canais/tv-osaka/' },
    { id: '3', name: 'ABC', slug: 'abc', logo: '/images/LOGOS/ABC.png', url: '/canais/abc/' },
    { id: '4', name: 'The WB', slug: 'the-wb', logo: '/images/LOGOS/WB.png', url: '/canais/the-wb/' },
    { id: '5', name: 'BS11', slug: 'bs11', logo: 'https://image.tmdb.org/t/p/w500/JQ5bx6n7Qmdmyqz6sqjo5Fz2iR.png', url: '/canais/bs11/' },
    { id: '6', name: 'Nickelodeon', slug: 'nickelodeon', logo: 'https://image.tmdb.org/t/p/w500/aYkLXz4dxHgOrFNH7Jv7Cpy56Ms.png', url: '/canais/nickelodeon/' },
    { id: '7', name: 'ITV1', slug: 'itv1', logo: 'https://image.tmdb.org/t/p/w500/oz9pjTHnBUmlju8OkaTymhKbh6C.png', url: '/canais/itv1/' },
    { id: '8', name: 'The CW', slug: 'the-cw', logo: 'https://image.tmdb.org/t/p/w500/hEpcdJ4O6eitG9ADSnDXNUrlovS.png', url: '/canais/the-cw/' },
    { id: '9', name: 'Netflix', slug: 'netflix', logo: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png', url: '/canais/netflix/' },
    { id: '10', name: 'Prime Video', slug: 'prime-video', logo: '/images/LOGOS/PV.png', url: '/canais/prime-video/' },
    { id: '11', name: 'Syfy', slug: 'syfy', logo: '/images/LOGOS/syfy2.png', url: '/canais/syfy/' },
    { id: '12', name: 'FOX', slug: 'fox', logo: '/images/LOGOS/FOX.png', url: '/canais/fox/' },
    { id: '13', name: 'TV Tokyo', slug: 'tv-tokyo', logo: 'https://image.tmdb.org/t/p/w500/jnuO8pZNEBLEq5YaOP1f5OkmG91.png', url: '/canais/tv-tokyo/' },
    { id: '14', name: 'NBC', slug: 'nbc', logo: '/images/LOGOS/NBC2.png', url: '/canais/nbc/' },
    { id: '15', name: 'Comedy Central', slug: 'comedy-central', logo: '/images/LOGOS/CC.png', url: '/canais/comedy-central/' },
    { id: '16', name: 'BBC One', slug: 'bbc-one', logo: 'https://image.tmdb.org/t/p/w500/uJjcCg3O4DMEjM0xtno9OWFciRP.png', url: '/canais/bbc-one/' },
    { id: '17', name: 'CBS', slug: 'cbs', logo: '/images/LOGOS/CBS2.png', url: '/canais/cbs/' },
    { id: '18', name: 'Starz', slug: 'starz', logo: 'https://image.tmdb.org/t/p/w500/GMDGZk9iDG4WDijY3VgUgJeyus.png', url: '/canais/starz/' },
    { id: '19', name: 'USA Network', slug: 'usa-network', logo: 'https://image.tmdb.org/t/p/w500/g1e0H0Ka97IG5SyInMXdJkHGKiH.png', url: '/canais/usa-network/' },
    { id: '20', name: 'HBO', slug: 'hbo', logo: '/images/LOGOS/HBO3.png', url: '/canais/hbo/' },
    { id: '21', name: 'Hulu', slug: 'hulu', logo: 'https://image.tmdb.org/t/p/w500/pqUTCleNUiTLAVlelGxUgWn1ELh.png', url: '/canais/hulu/' },
]

export default function NetworkCarousel({
    title = " Canais em Destaque",
    networks = defaultNetworks,
    speed = 50 // Velocidade do scroll (valor mais baixo = mais rápido)
}: NetworkCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number>(null)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer || isPaused) return

        let scrollPosition = scrollContainer.scrollLeft

        const animate = () => {
            if (!scrollContainer || isPaused) return

            scrollPosition += 0.5 // Incremento suave

            // Reset quando chegar ao fim (metade do scroll, pois temos duplicados)
            if (scrollPosition >= scrollContainer.scrollWidth / 2) {
                scrollPosition = 0
            }

            scrollContainer.scrollLeft = scrollPosition
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isPaused, speed])

    // Pausar animação quando o utilizador interage
    const handleMouseEnter = () => setIsPaused(true)
    const handleMouseLeave = () => setIsPaused(false)
    const handleTouchStart = () => setIsPaused(true)
    const handleTouchEnd = () => setIsPaused(false)

    return (
        <section className="w-full py-6 sm:py-8 lg:py-10 bg-background/50">
            {/* Cabeçalho */}
            {title && (
                <div className="flex items-center justify-between mb-4 sm:mb-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="
            text-lg sm:text-xl lg:text-2xl font-bold
            bg-gradient-to-r from-foreground to-foreground/70 
            bg-clip-text text-transparent
          ">
                      
                    </h2>

                   
                </div>
            )}

            {/* Carousel Container */}
            <div
                className="relative overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Gradientes laterais - mais escuros para melhor efeito */}
                <div className="
          absolute left-0 top-0 bottom-0 w-16 sm:w-24 
          bg-gradient-to-r from-background via-background/80 to-transparent 
          pointer-events-none z-10
        " />

                <div className="
          absolute right-0 top-0 bottom-0 w-16 sm:w-24 
          bg-gradient-to-l from-background via-background/80 to-transparent 
          pointer-events-none z-10
        " />

                {/* Container de scroll infinito */}
                <div
                    ref={scrollRef}
                    className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide"
                    style={{
                        scrollBehavior: 'auto',
                        WebkitOverflowScrolling: 'touch' // Scroll suave no iOS
                    }}
                >
                    {/* Duplicamos os networks para efeito infinito */}
                    {[...networks, ...networks].map((network, index) => (
                        <div
                            key={`${network.id}-${index}`}
                           className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px]"
                        >
                            <Link
                                href={network.url}
                                className="
                  group block
                  bg-foreground/5
                  rounded-xl overflow-hidden
                  transition-all duration-300
                  hover:scale-105 hover:shadow-lg hover:shadow-red-600/10
                  active:scale-95
                  touch-manipulation
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600/50
                "
                                aria-label={network.name}
                            >
                                <div className="relative aspect-[2/1] w-full p-4 sm:p-5 md:p-6">
                                    <Image
                                        src={network.logo}
                                        alt={network.name}
                                        fill
                                        className="
                                                    object-contain
                                                    transition-transform duration-500
                                                    group-hover:scale-110
                                                "
                                        sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Nome do canal no hover (apenas desktop) */}
                                <div className="
                  absolute -bottom-8 left-0 right-0
                  bg-foreground/10 backdrop-blur-md
                  text-foreground text-xs text-center py-1
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  pointer-events-none
                  hidden sm:block
                ">
                                    {network.name}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                
                
            </div>

        </section>
    )
}