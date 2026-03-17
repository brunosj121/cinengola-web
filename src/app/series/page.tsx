// src/app/series/page.tsx
"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Tv, Home, ChevronLeft, ChevronUp } from "lucide-react"
import SerieCard from "../../components/SerieCard"
import SearchBox from "../../components/SearchBox"

interface TVShow {
  id: number
  name: string
  poster_path: string
  vote_average?: number
  first_air_date?: string
}

export default function TVPage() {
  const [series, setSeries] = useState<TVShow[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [totalResults, setTotalResults] = useState<number | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const loaderRef = useRef<HTMLDivElement | null>(null)
  const initialLoad = useRef(false)

  const fetchSeries = useCallback(async (pageNum: number, isInitial: boolean = false) => {
    if (isInitial) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }

    try {
      const res = await fetch(`/api/serie?page=${pageNum}`)
      if (!res.ok) return

      const data = await res.json()

      if (!data.results || data.results.length === 0) {
        setHasMore(false)
        return
      }

      setTotalPages(data.total_pages)
      setTotalResults(data.total_results)

      setSeries((prev) => {
        const newItems = data.results.filter(
          (item: TVShow) => !prev.some((s) => s.id === item.id)
        )
        return [...prev, ...newItems]
      })

      if (pageNum >= data.total_pages) {
        setHasMore(false)
      }

    } catch (error) {
      console.error("Erro ao buscar séries:", error)
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
      fetchSeries(1, true)
      initialLoad.current = true
    }
  }, [fetchSeries])

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchSeries(page, false)
    }
  }, [page, fetchSeries])

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-foreground/10">
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
                "
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <Home size={18} />
                <span className="text-sm font-medium hidden sm:inline">Home</span>
              </Link>

              {/* Campo de Busca */}
              <div className="w-full sm:w-80">
                <SearchBox endpoint="serie" />
              </div>
            </div>

            {/* Lado Direito: Séries Populares */}
            <div className="flex items-center gap-3 justify-end">
              <div className="p-3 bg-red-600/10 rounded-xl">
                <Tv className="text-red-600" size={24} />
              </div>
              <div>
                <h1 className="
      text-2xl sm:text-3xl lg:text-4xl font-black
      bg-gradient-to-r from-red-600 to-red-400
      bg-clip-text text-transparent
      tracking-tight
    ">
                  Séries Populares
                </h1>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading skeleton for initial load */}
        {loading && series.length === 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[2/3] bg-foreground/10 rounded-xl animate-pulse" />
                <div className="h-4 bg-foreground/10 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-foreground/10 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Series Grid */}
        <AnimatePresence mode="wait">
          {!loading && series.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Tv size={48} className="mx-auto text-foreground/20 mb-4" />
              <h3 className="text-xl font-medium text-foreground/70 mb-2">
                Nenhuma série encontrada
              </h3>
              <p className="text-foreground/50">
                Tente buscar por outro título
              </p>

              {/* Botão voltar na empty state */}
              <Link
                href="/"
                className="
                  inline-flex items-center gap-2
                  mt-6 px-6 py-3
                  bg-foreground/10 hover:bg-foreground/20
                  text-foreground font-medium
                  rounded-lg
                  transition-all duration-300
                  hover:scale-105
                "
              >
                <Home size={18} />
                Voltar para Home
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
            >
              {series.map((show, index) => (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <SerieCard
                    serie={{
                      id: show.id,
                      name: show.name,
                      poster_path: show.poster_path,
                      vote_average: show.vote_average,
                      first_air_date: show.first_air_date
                    }}
                    priority={index < 12}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loader for infinite scroll */}
        <div
          ref={loaderRef}
          className="h-24 flex flex-col items-center justify-center gap-3"
        >
          {loadingMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-foreground/50 text-sm">Carregando mais séries...</p>
            </motion.div>
          )}

          {!hasMore && series.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tv size={24} className="text-foreground/30" />
              </div>
              <p className="text-foreground/50 text-sm">
                📺 Você chegou ao fim da lista
              </p>
              <p className="text-foreground/30 text-xs mt-1">
                Total de {series.length} séries carregadas
              </p>

              {/* Botão voltar no fim da lista */}
              <Link
                href="/"
                className="
                  inline-flex items-center gap-2
                  mt-4 px-4 py-2
                  bg-foreground/5 hover:bg-foreground/10
                  text-foreground/70 hover:text-foreground
                  rounded-lg text-sm
                  transition-all duration-300
                  border border-foreground/10
                "
              >
                <Home size={16} />
                Voltar para Home
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="
        fixed right-6 bottom-6 z-50
        p-3 rounded-full
        bg-red-600 hover:bg-red-700
        text-white
        shadow-lg hover:shadow-xl
        transition-all duration-300 
        hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-red-600/50
      "
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}