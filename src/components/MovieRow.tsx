/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"

interface MovieRowProps {
  title: string
  movies: any[]
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <section className="px-10 py-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/filmes/${movie.id}`}   // ✅ link para detalhes
            className="min-w-[150px] hover:scale-105 transition-transform"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}