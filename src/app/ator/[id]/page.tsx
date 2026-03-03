/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Film, Tv, Star, Award, ChevronLeft } from "lucide-react"
import { MovieImage } from "../../../components/MovieImage"

export default function AtorPage() {
  const { id } = useParams()
  const [ator, setAtor] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/ator/${id}`)
      .then(res => res.json())
      .then(data => {
        setAtor(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return <AtorPageSkeleton />
  }

  if (!ator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Ator não encontrado</h1>
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-foreground/10 rounded-lg hover:bg-foreground/20 transition"
          >
            Voltar para Home
          </Link>
        </div>
      </div>
    )
  }

  const filmes = ator?.movie_credits?.cast || []
  const series = ator?.tv_credits?.cast || []
  
  const filmesOrdenados = filmes.sort((a: any, b: any) => b.popularity - a.popularity)
  const seriesOrdenadas = series.sort((a: any, b: any) => b.popularity - a.popularity)

  const calcularIdade = (dataNascimento: string, dataFalecimento?: string) => {
    if (!dataNascimento) return null

    const nascimento = new Date(dataNascimento)
    const fim = dataFalecimento ? new Date(dataFalecimento) : new Date()
    
    let idade = fim.getFullYear() - nascimento.getFullYear()
    const mesDiff = fim.getMonth() - nascimento.getMonth()
    
    if (mesDiff < 0 || (mesDiff === 0 && fim.getDate() < nascimento.getDate())) {
      idade--
    }

    return idade
  }

  const idade = calcularIdade(ator.birthday, ator.deathday)
  const isDead = !!ator.deathday

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Botão voltar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/"
          className="
            inline-flex items-center gap-2
            text-foreground/60 hover:text-foreground
            transition-colors duration-300
            group
          "
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar</span>
        </Link>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho do ator */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Foto do ator */}
          <div className="relative w-full md:w-72 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
            <MovieImage
              src={ator.profile_path}
              alt={ator.name}
              width={500}
              height={750}
              className="object-cover"
              priority
            />
            
            {isDead && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-red-600/80 backdrop-blur-sm text-white text-sm font-bold rounded-full">
                In Memoriam
              </div>
            )}
          </div>

          {/* Informações do ator */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {ator.name}
              </h1>

              <div className="flex flex-wrap gap-4 text-foreground/70">
                {idade && (
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>
                      {idade} anos {isDead ? '(falecido)' : ''}
                    </span>
                  </div>
                )}
                
                {ator.place_of_birth && (
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{ator.place_of_birth}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Datas de nascimento/falecimento */}
            <div className="flex flex-wrap gap-6 text-sm text-foreground/60 border-y border-foreground/10 py-4">
              {ator.birthday && (
                <div>
                  <span className="block text-foreground/40 mb-1">Nascimento</span>
                  <span className="font-medium">
                    {new Date(ator.birthday).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
              
              {ator.deathday && (
                <div>
                  <span className="block text-foreground/40 mb-1">Falecimento</span>
                  <span className="font-medium">
                    {new Date(ator.deathday).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Biografia */}
            {ator.biography && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Award size={20} className="text-foreground/50" />
                  Biografia
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  {ator.biography}
                </p>
              </div>
            )}

            {/* Estatísticas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="text-center p-4 bg-foreground/5 rounded-xl">
                <div className="text-2xl font-bold text-foreground">{filmes.length}</div>
                <div className="text-xs text-foreground/50">Filmes</div>
              </div>
              <div className="text-center p-4 bg-foreground/5 rounded-xl">
                <div className="text-2xl font-bold text-foreground">{series.length}</div>
                <div className="text-xs text-foreground/50">Séries</div>
              </div>
              {ator.popularity && (
                <div className="text-center p-4 bg-foreground/5 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-500">
                    {Math.round(ator.popularity)}
                  </div>
                  <div className="text-xs text-foreground/50">Popularidade</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filmes conhecidos */}
        {filmesOrdenados.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Film size={24} className="text-foreground/50" />
              <span>Filmes Conhecidos</span>
              <span className="text-sm text-foreground/50 font-normal ml-2">
                ({filmesOrdenados.length})
              </span>
            </h2>

            <div className="relative group">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {filmesOrdenados.slice(0, 15).map((filme: any) => (
                  <Link
                    key={filme.id}
                    href={`/filmes/${filme.id}`}
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
                        src={filme.poster_path}
                        alt={filme.title}
                        width={300}
                        height={450}
                      />
                      
                      {/* Overlay com nota */}
                      {filme.vote_average > 0 && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-sm text-yellow-500 text-xs font-bold rounded-md">
                          ★ {filme.vote_average.toFixed(1)}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-center">
                      <p className="text-foreground text-sm font-medium line-clamp-2">
                        {filme.title}
                      </p>
                      {filme.character && (
                        <p className="text-foreground/50 text-xs mt-1">
                          {filme.character}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Séries conhecidas */}
        {seriesOrdenadas.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Tv size={24} className="text-foreground/50" />
              <span>Séries Conhecidas</span>
              <span className="text-sm text-foreground/50 font-normal ml-2">
                ({seriesOrdenadas.length})
              </span>
            </h2>

            <div className="relative group">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {seriesOrdenadas.slice(0, 15).map((serie: any) => (
                  <Link
                    key={serie.id}
                    href={`/series/${serie.id}`}
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
                        src={serie.poster_path}
                        alt={serie.name}
                        width={300}
                        height={450}
                      />
                      
                      {/* Overlay com nota */}
                      {serie.vote_average > 0 && (
                        <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur-sm text-yellow-500 text-xs font-bold rounded-md">
                          ★ {serie.vote_average.toFixed(1)}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-center">
                      <p className="text-foreground text-sm font-medium line-clamp-2">
                        {serie.name}
                      </p>
                      {serie.character && (
                        <p className="text-foreground/50 text-xs mt-1">
                          {serie.character}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

// Componente de skeleton
function AtorPageSkeleton() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-72 aspect-[2/3] bg-foreground/10 rounded-2xl animate-pulse" />
          
          <div className="flex-1 space-y-6">
            <div className="h-12 bg-foreground/10 rounded-lg w-2/3 animate-pulse" />
            <div className="h-6 bg-foreground/10 rounded-lg w-1/2 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-foreground/10 rounded-lg w-full animate-pulse" />
              <div className="h-4 bg-foreground/10 rounded-lg w-5/6 animate-pulse" />
              <div className="h-4 bg-foreground/10 rounded-lg w-4/6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}