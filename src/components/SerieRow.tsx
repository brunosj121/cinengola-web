/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"

interface SerieRowProps {
  title: string
  series: any[]
}

export default function SerieRow({ title, series }: SerieRowProps) {
  return (
    <section className="px-10 py-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto">
        {series.map((serie) => (
          <Link
            key={serie.id}
            href={`/series/${serie.id}`}   // ✅ link para detalhes
            className="min-w-[150px] hover:scale-105 transition-transform"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`}
              alt={serie.name}
              className="rounded-lg"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}