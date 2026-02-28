// src/app/series/page.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import SerieCard from "../../components/SerieCard"


interface TVShow {
  id: number
  name: string
  poster_path: string
}

export default function TVPage() {
  const [series, setSeries] = useState<TVShow[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  const fetchSeries = async () => {
    if (loading || !hasMore) return

    try {
      setLoading(true)

      const res = await fetch(`/api/serie?page=${page}`)
      if (!res.ok) return

      const data = await res.json()

      if (!data.results) {
        setHasMore(false)
        return
      }

      setSeries((prev) => {
        const newItems = data.results.filter(
          (item: TVShow) =>
            !prev.some((s) => s.id === item.id)
        )

        return [...prev, ...newItems]
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

  const initialLoad = useRef(false)

  useEffect(() => {
    if (!initialLoad.current) {
      fetchSeries()
      initialLoad.current = true
    }
  }, [])

  useEffect(() => {
    if (page > 1) {
      fetchSeries()
    }
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
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
        📺 Séries Populares
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {series.map((show) => (
          <SerieCard
            key={show.id}
            serie={{
              id: show.id,
              name: show.name,
              poster_path: show.poster_path
            }}
          />
        ))}
      </div>

      {/* Loader */}
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