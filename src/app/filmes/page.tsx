// src/app/filmes/page.tsx

"use client"

import { useEffect, useRef, useState } from "react"
import MovieCard from "../../components/MovieCard"

interface Movie {
  id: number
  title: string
  poster_path: string
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalPages, setTotalPages] = useState<number | null>(null)

  const loaderRef = useRef<HTMLDivElement | null>(null)
  const initialLoad = useRef(false)

  const fetchMovies = async () => {
    if (loading || !hasMore) return

    try {
      setLoading(true)

      const res = await fetch(`/api/filme?page=${page}`)
      if (!res.ok) return

      const data = await res.json()


      if (!data.results) {
        setHasMore(false)
        return
      }

      setTotalPages(data.total_pages)

      setMovies((prev) => {
        const newMovies = data.results.filter(
          (movie: Movie) =>
            !prev.some((m) => m.id === movie.id)
        )

        return [...prev, ...newMovies]
      })

      if (page >= data.total_pages) {
        setHasMore(false)
      }

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // 👇 Evita dupla execução no Strict Mode
  useEffect(() => {
    if (!initialLoad.current) {
      fetchMovies()
      initialLoad.current = true
    }
  }, [])

  useEffect(() => {
    if (page > 1) {
      fetchMovies()
    }
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          hasMore
        ) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 0.5 }
    )

    const current = loaderRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [loading, hasMore])

  return (
    <div className="bg-black min-h-screen p-8">
      <h1 className="text-white text-3xl font-bold mb-10">
        🎬 Filmes Populares
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div
        ref={loaderRef}
        className="h-20 flex justify-center items-center"
      >
        {loading && (
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        )}

        {!hasMore && (
          <p className="text-gray-500 text-sm">
            🎬 Você chegou ao fim.
          </p>
        )}
      </div>
    </div>
  )
}