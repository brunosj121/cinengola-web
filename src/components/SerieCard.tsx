// src/components/SerieCard.tsx
import Link from "next/link"

interface SerieProps {
  serie: {
    id: number
    name: string
    poster_path: string
  }
}

export default function SerieCard({ serie }: SerieProps) {
  return (
    <Link href={`/series/${serie.id}`}>
      <div className="bg-gray-900 p-3 rounded-lg cursor-pointer hover:scale-105 transition">
        <img
          src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
          alt={serie.name}
          className="rounded-lg"
        />
        <h2 className="text-white mt-2 text-sm">{serie.name}</h2>
      </div>
    </Link>
  )
}