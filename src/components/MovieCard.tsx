import Link from "next/link"

// src/components/MovieCard.tsx
interface MovieProps {
  movie: {
    id: number
    title: string
    poster_path: string
  }
}

export default function MovieCard({ movie }: MovieProps) {
  return (
    <Link href={`/filmes/${movie.id}`}>
      <div className="bg-gray-900 p-3 rounded-lg cursor-pointer hover:scale-105 transition">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
        />
        <h2 className="text-white mt-2 text-sm">{movie.title}</h2>
      </div>
    </Link>
  )
}