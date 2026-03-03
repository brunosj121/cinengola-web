/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSerie, extractTrailer } from "../../../lib/tmdb"
import TrailerModal from "../../../components/TrailerModal"
import CastCarousel from "@/src/components/CastCarousel"
import { MovieImage } from "../../../components/MovieImage"
import Link from "next/link"
import { Calendar, Star, Tv, Film, ChevronLeft, Award } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function SerieDetalhe({ params }: PageProps) {
  const { id } = await params

  const serie = await getSerie(id)
  const youtubeKey = extractTrailer(serie)

  const ano = serie.first_air_date?.split("-")[0]
  const avaliacao = serie.vote_average?.toFixed(1)
  const temporadas = serie.number_of_seasons
  const episodios = serie.number_of_episodes
  
  const generos = serie.genres || []
  const elencoPrincipal = serie.credits?.cast?.slice(0, 15) || []
  const criadores = serie.created_by || []
  const produtoras = serie.production_companies || []

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero section com backdrop */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {/* Imagem de fundo (backdrop) */}
        {serie.backdrop_path && (
          <div className="absolute inset-0">
            <MovieImage
              src={serie.backdrop_path}
              alt={serie.name}
              width={1920}
              height={1080}
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          </div>
        )}

        {/* Conteúdo do hero */}
        <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster */}
            <div className="hidden md:block w-64 lg:w-80 rounded-2xl overflow-hidden shadow-2xl transform translate-y-12">
              <MovieImage
                src={serie.poster_path}
                alt={serie.name}
                width={500}
                height={750}
                className="object-cover"
                priority
              />
            </div>

            {/* Informações da série - AGORA COM LETRAS BRANCAS */}
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                {serie.name}
              </h1>

              <div className="flex flex-wrap gap-4 text-gray-300">
                {ano && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{ano}</span>
                  </div>
                )}
                
                {temporadas && (
                  <div className="flex items-center gap-1">
                    <Tv size={16} />
                    <span>{temporadas} {temporadas === 1 ? 'temporada' : 'temporadas'}</span>
                  </div>
                )}
                
                {episodios && (
                  <div className="flex items-center gap-1">
                    <Film size={16} />
                    <span>{episodios} episódios</span>
                  </div>
                )}
                
                {avaliacao && (
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>{avaliacao}</span>
                  </div>
                )}
              </div>

              {/* Gêneros - AGORA COM LETRAS BRANCAS */}
              {generos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {generos.map((genero: any) => (
                    <span
                      key={genero.id}
                      className="px-3 py-1 text-xs bg-foreground/10 text-white rounded-full border border-foreground/10"
                    >
                      {genero.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Criadores - AGORA COM LETRAS BRANCAS */}
              {criadores.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Award size={16} className="text-gray-400" />
                  <span className="text-gray-400">Criado por:</span>
                  <span className="text-white font-medium">
                    {criadores.map((c: any) => c.name).join(", ")}
                  </span>
                </div>
              )}

              {/* Botões de ação */}
              <div className="flex flex-wrap gap-4 pt-4">
                {youtubeKey && (
                  <TrailerModal youtubeId={youtubeKey} title={`Trailer de ${serie.name}`} />
                )}
                
                <Link
                  href="/series"
                className="
                    inline-flex items-center gap-2
                    px-6 py-3
                    bg-foreground/10 hover:bg-foreground/20
                    text-foreground font-semibold
                    rounded-lg
                    transition-all duration-300
                    hover:scale-105
                  "
                >
                  <ChevronLeft size={18} />
                  <span>Voltar </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal - AGORA COM LETRAS BRANCAS */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da esquerda - Informações adicionais */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sinopse */}
            <div className="bg-foreground/5 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                <Film size={20} className="text-gray-400" />
                Sinopse
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {serie.overview || "Sinopse não disponível."}
              </p>
            </div>

            {/* Status e informações */}
            <div className="bg-foreground/5 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Informações da Série</h3>
              
              {serie.status && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className="text-white font-medium">{serie.status}</span>
                </div>
              )}
              
              {serie.last_air_date && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Último episódio</span>
                  <span className="text-white font-medium">
                    {new Date(serie.last_air_date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
              
              {serie.original_language && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Idioma Original</span>
                  <span className="text-white font-medium uppercase">
                    {serie.original_language}
                  </span>
                </div>
              )}
            </div>

            {/* Produtoras */}
            {produtoras.length > 0 && (
              <div className="bg-foreground/5 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-medium text-gray-400">Produção</h3>
                <div className="flex flex-wrap gap-2">
                  {produtoras.slice(0, 5).map((produtora: any) => (
                    <span
                      key={produtora.id}
                      className="
                        px-3 py-1
                        bg-foreground/10
                        text-gray-300
                        rounded-full text-xs
                      "
                    >
                      {produtora.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna da direita - Elenco */}
          <div className="lg:col-span-2">
            <CastCarousel cast={elencoPrincipal} title="Elenco Principal" />
          </div>
        </div>

        {/* Seção de recomendações (se houver) */}
        {serie.recommendations?.results?.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
              <Tv size={24} className="text-gray-400" />
              <span>Séries Recomendadas</span>
            </h2>
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {serie.recommendations.results.slice(0, 10).map((rec: any) => (
                <Link
                  key={rec.id}
                  href={`/series/${rec.id}`}
                  className="
                    group/card
                    min-w-[140px] sm:min-w-[160px] md:min-w-[180px]
                    snap-start
                    transition-transform duration-300
                    hover:scale-105
                  "
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                    <MovieImage
                      src={rec.poster_path}
                      alt={rec.name}
                      width={300}
                      height={450}
                    />
                    
                    {rec.vote_average > 0 && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-sm text-yellow-500 text-xs font-bold rounded-md">
                        ★ {rec.vote_average.toFixed(1)}
                      </div>
                    )}
                  </div>

                  <div className="mt-2">
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {rec.name}
                    </p>
                    {rec.first_air_date && (
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(rec.first_air_date).getFullYear()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}