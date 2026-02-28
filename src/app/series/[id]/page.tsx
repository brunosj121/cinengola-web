/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSerie } from "../../../lib/tmdb"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SerieDetalhe({ params }: PageProps) {
  const { id } = await params
  const serie = await getSerie(id)

  const imagem = `https://image.tmdb.org/t/p/original${serie.poster_path}`
  const ano = serie.first_air_date?.split("-")[0]
  const avaliacao = serie.vote_average?.toFixed(1)

  return (
    <div className="p-10 text-white max-w-6xl mx-auto">
      <div className="flex gap-10">
        {/* IMAGEM */}
        <img
          src={imagem}
          alt={serie.name}
          className="w-80 rounded-lg shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{serie.name}</h1>

          <p className="text-gray-400 mb-2">
            📅 {ano} • ⭐ {avaliacao}
          </p>

          <p className="mt-4">{serie.overview}</p>

          {/* ELENCO */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Elenco</h2>
          <div className="flex flex-wrap gap-4">
            {serie.credits.cast.slice(0, 8).map((ator: any) => (
              <div key={ator.id} className="text-sm">
                <p className="font-semibold">{ator.name}</p>
                <p className="text-gray-400">{ator.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}