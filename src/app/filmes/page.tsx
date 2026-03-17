"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import MovieCard from "../../components/MovieCard"
import SearchBox from "../../components/SearchBox"
import { Film, Filter, ChevronUp, Home, ChevronLeft } from "lucide-react"

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average?: number
  release_date?: string
}



export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [totalResults, setTotalResults] = useState<number | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const loaderRef = useRef<HTMLDivElement | null>(null)
  const initialLoad = useRef(false)
  const mainRef = useRef<HTMLDivElement | null>(null)

  const fetchMovies = useCallback(async (pageNum: number, isInitial: boolean = false) => {
    if (isInitial) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }

    try {
      const res = await fetch(`/api/filme?page=${pageNum}`)
      if (!res.ok) return

      const data = await res.json()

      if (!data.results || data.results.length === 0) {
        setHasMore(false)
        return
      }

      setTotalPages(data.total_pages)
      setTotalResults(data.total_results)

      setMovies((prev) => {
        const newMovies = data.results.filter(
          (movie: Movie) => !prev.some((m) => m.id === movie.id)
        )
        return [...prev, ...newMovies]
      })

      if (pageNum >= data.total_pages) {
        setHasMore(false)
      }

    } catch (error) {
      console.error("Erro ao buscar filmes:", error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initial load
  useEffect(() => {
    if (!initialLoad.current) {
      fetchMovies(1, true)
      initialLoad.current = true
    }
  }, [fetchMovies])

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchMovies(page, false)
    }
  }, [page, fetchMovies])

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !loadingMore && hasMore) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    )

    const current = loaderRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [loading, loadingMore, hasMore])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Variantes de animação para os cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: Math.min(index * 0.05, 0.8),
        duration: 0.5
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2 }
    }
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-foreground/10 safe-top">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Lado Esquerdo: Botão Home + Campo de Pesquisa */}
            <div className="flex items-center gap-3">
              {/* Botão para Home */}
              <Link
                href="/"
                className="
                  group
                  flex items-center gap-2
                  px-4 py-2.5
                  bg-foreground/5 hover:bg-foreground/10
                  rounded-xl
                  transition-all duration-300
                  hover:scale-105 hover:shadow-lg hover:shadow-foreground/5
                  border border-foreground/10
                  active:scale-95
                  mobile-touch-target
                "
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <Home size={18} />
                <span className="text-sm font-medium hidden sm:inline">Home</span>
              </Link>

              {/* Campo de Busca */}
              <div className="w-full sm:w-80">
                <SearchBox endpoint="filme" />
              </div>
            </div>

            {/* Lado Direito: Filmes Populares */}
            <div className="flex items-center gap-3 justify-end">
              <div className="p-3 bg-red-600/10 rounded-xl">
                <Film className="text-red-600" size={24} />
              </div>
              <div>
                <h1 className="
                  text-2xl sm:text-3xl lg:text-4xl font-black
                  bg-gradient-to-r from-red-600 to-red-400
                  bg-clip-text text-transparent
                  tracking-tight
                ">
                  Filmes Populares
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Loading skeleton for initial load - OTIMIZADO PARA MOBILE */}
        {loading && movies.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5"
          >
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-2 sm:space-y-3">
                <div className="aspect-[2/3] bg-foreground/10 rounded-lg sm:rounded-xl animate-pulse" />
                <div className="h-3 sm:h-4 bg-foreground/10 rounded w-3/4 animate-pulse" />
                <div className="h-2 sm:h-3 bg-foreground/10 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </motion.div>
        )}

        {/* Movies Grid - CARDS OTIMIZADOS */}
        <AnimatePresence mode="wait">
          {!loading && movies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12 sm:py-20 px-4"
            >
              <Film size={40} className="mx-auto text-foreground/20 mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl font-medium text-foreground/70 mb-2">
                Nenhum filme encontrado
              </h3>
              <p className="text-sm sm:text-base text-foreground/50">
                Tente buscar por outro título
              </p>

              {/* Botão voltar na empty state */}
              <Link
                href="/"
                className="
                  inline-flex items-center gap-2
                  mt-6 px-5 sm:px-6 py-2.5 sm:py-3
                  bg-foreground/10 hover:bg-foreground/20
                  text-foreground font-medium text-sm sm:text-base
                  rounded-lg
                  transition-all duration-300
                  hover:scale-105
                  active:scale-95
                  mobile-touch-target
                "
              >
                <Home size={16} className="sm:w-[18px]" />
                Voltar para Home
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5"
            >
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  variants={cardVariants}
                  className="transform-gpu will-change-transform"
                >
                  <MovieCard 
                    movie={movie} 
                    variant="movie" 
                    priority={index < 12}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loader for infinite scroll - OTIMIZADO */}
        <div
          ref={loaderRef}
          className="h-16 sm:h-20 md:h-24 flex flex-col items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6"
        >
          {loadingMore && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs sm:text-sm text-foreground/50">Carregando mais filmes...</p>
            </motion.div>
          )}

          {!hasMore && movies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-6 sm:py-8"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Film size={20} className="sm:w-6 sm:h-6 text-foreground/30" />
              </div>
              <p className="text-sm sm:text-base text-foreground/50">
                🎬 Você chegou ao fim da lista
              </p>
              <p className="text-xs sm:text-sm text-foreground/30 mt-1">
                Total de {movies.length} filmes carregados
              </p>

              {/* Botão voltar no fim da lista */}
              <Link
                href="/"
                className="
                  inline-flex items-center gap-2
                  mt-4 px-4 sm:px-5 py-2 sm:py-2.5
                  bg-foreground/5 hover:bg-foreground/10
                  text-foreground/70 hover:text-foreground
                  rounded-lg text-xs sm:text-sm
                  transition-all duration-300
                  border border-foreground/10
                  hover:scale-105
                  active:scale-95
                  mobile-touch-target
                "
              >
                <Home size={14} className="sm:w-4" />
                Voltar para Home
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll to top button - OTIMIZADO PARA MOBILE */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            onClick={scrollToTop}
            className="
              fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50
              p-2.5 sm:p-3 rounded-full
              bg-red-600 hover:bg-red-700
              text-white
              shadow-lg hover:shadow-xl
              transition-all duration-300
              hover:scale-110
              active:scale-90
              focus:outline-none focus:ring-2 focus:ring-red-600/50
              mobile-touch-target
            "
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={18} className="sm:w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}


