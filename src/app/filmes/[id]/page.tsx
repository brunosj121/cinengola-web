/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFilme, getTrailerFilme } from "../../../lib/tmdb"
import TrailerModal from "../../../components/TrailerModal"
import CastCarousel from "../../../components/CastCarousel"
import { MovieImage } from "../../../components/MovieImage"
import Link from "next/link"
import { Calendar, Clock, Star, Film, ChevronLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function FilmeDetalhe({ params }: PageProps) {
  const { id } = await params
  const filme = await getFilme(id)
  const youtubeKey = await getTrailerFilme(filme.id)

  const ano = filme.release_date?.split("-")[0]
  const duracao = filme.runtime
  const avaliacao = filme.vote_average?.toFixed(1)
  
  const generos = filme.genres || []
  const elencoPrincipal = filme.credits?.cast?.slice(0, 15) || []
  const diretores = filme.credits?.crew?.filter((p: any) => p.job === "Director") || []
  const roteiristas = filme.credits?.crew?.filter((p: any) => p.job === "Screenplay" || p.job === "Writer") || []

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero section com backdrop */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {/* Imagem de fundo (backdrop) */}
        {filme.backdrop_path && (
          <div className="absolute inset-0">
            <MovieImage
              src={filme.backdrop_path}
              alt={filme.title}
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
                src={filme.poster_path}
                alt={filme.title}
                width={500}
                height={750}
                className="object-cover"
                priority
              />
            </div>

            {/* Informações do filme */}
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {filme.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-foreground/70">
                {ano && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{ano}</span>
                  </div>
                )}
                
                {duracao && (
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{duracao} min</span>
                  </div>
                )}
                
                {avaliacao && (
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>{avaliacao}</span>
                  </div>
                )}
              </div>

              {/* Gêneros */}
              {generos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {generos.map((genero: any) => (
                    <span
                      key={genero.id}
                      className="px-3 py-1 text-xs bg-foreground/10 rounded-full border border-foreground/10"
                    >
                      {genero.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Botões de ação */}
              <div className="flex flex-wrap gap-4 pt-4">
                {youtubeKey && (
                  <TrailerModal youtubeId={youtubeKey} title={`Trailer de ${filme.title}`} />
                )}
                
                <Link
                  href="/filmes"
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
                  <span>Voltar</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da esquerda - Informações adicionais */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sinopse */}
            <div className="bg-foreground/5 rounded-2xl p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Film size={20} className="text-foreground/50" />
                Sinopse
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {filme.overview || "Sinopse não disponível."}
              </p>
            </div>

            {/* Diretores e Roteiristas */}
            {(diretores.length > 0 || roteiristas.length > 0) && (
              <div className="bg-foreground/5 rounded-2xl p-6 space-y-4">
                {diretores.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground/50 mb-2">Direção</h3>
                    <div className="flex flex-wrap gap-2">
                      {diretores.slice(0, 3).map((diretor: any) => (
                        <Link
                          key={diretor.id}
                          href={`/pessoa/${diretor.id}`}
                          className="
                            px-3 py-1
                            bg-foreground/10 hover:bg-foreground/20
                            text-foreground/70 hover:text-foreground
                            rounded-full text-sm
                            transition-colors duration-300
                          "
                        >
                          {diretor.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {roteiristas.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground/50 mb-2">Roteiro</h3>
                    <div className="flex flex-wrap gap-2">
                      {roteiristas.slice(0, 3).map((roteirista: any) => (
                        <Link
                          key={roteirista.id}
                          href={`/pessoa/${roteirista.id}`}
                          className="
                            px-3 py-1
                            bg-foreground/10 hover:bg-foreground/20
                            text-foreground/70 hover:text-foreground
                            rounded-full text-sm
                            transition-colors duration-300
                          "
                        >
                          {roteirista.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}


          </div>

          {/* Coluna da direita - Elenco */}
          <div className="lg:col-span-2">
            <CastCarousel cast={elencoPrincipal} title="Elenco Principal" />
          </div>
        </div>

        {/* Seção de recomendados (opcional) */}
        {filme.recommendations?.results?.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star size={24} className="text-foreground/50" />
              <span>Filmes Recomendados</span>
            </h2>
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {filme.recommendations.results.slice(0, 10).map((rec: any) => (
                <Link
                  key={rec.id}
                  href={`/filmes/${rec.id}`}
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
                      alt={rec.title}
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
                    <p className="text-foreground text-sm font-medium line-clamp-2">
                      {rec.title}
                    </p>
                    {rec.release_date && (
                      <p className="text-foreground/50 text-xs mt-1">
                        {new Date(rec.release_date).getFullYear()}
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