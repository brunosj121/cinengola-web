/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { MovieImage } from "./MovieImage"

interface Props {
  endpoint: "filme" | "serie"
}

export default function SearchBox({ endpoint }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Debounce da busca
  useEffect(() => {
    if (!query) {
      setResults([])
      setIsOpen(false)
      return
    }

    setIsOpen(true)
    const delay = setTimeout(async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/${endpoint}?query=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch (error) {
        console.error("Erro na busca:", error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(delay)
  }, [query, endpoint])

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  const displayName = endpoint === "filme" ? "filmes" : "séries"

  return (
    <div ref={searchRef} className="relative w-full sm:w-80">
      {/* Barra de busca - MESMO TAMANHO DO BOTÃO HOME */}
      <div className="relative group">
        <input
          type="text"
          placeholder={`Pesquisar ${displayName}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="
            w-full px-4 py-2.5 pl-10 pr-10
            bg-foreground/5 
            text-foreground placeholder-foreground/40 text-sm
            rounded-xl
            border border-foreground/10
            focus:border-foreground/30
            focus:outline-none focus:ring-2 focus:ring-foreground/20
            transition-all duration-300
          "
        />
        
        {/* Ícone de busca - reposicionado */}
        <Search 
          size={16} 
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            text-foreground/40
            group-focus-within:text-foreground/60
            transition-colors duration-300
          " 
        />

        {/* Botão de limpar */}
        {query && (
          <button
            onClick={clearSearch}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              p-1 rounded-full
              hover:bg-foreground/10
              text-foreground/40 hover:text-foreground/60
              transition-all duration-300
            "
            aria-label="Limpar busca"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown de resultados (igual) */}
      {isOpen && (query || loading) && (
        <div className="
          absolute z-50 w-full mt-2
          bg-background/95 backdrop-blur-md
          border border-foreground/10
          rounded-xl shadow-2xl
          overflow-hidden
          animate-fade-in
        ">
          {/* Loading state */}
          {loading && (
            <div className="flex items-center gap-3 p-4 text-foreground/60">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm">Buscando...</span>
            </div>
          )}

          {/* Resultados */}
          {!loading && results.length > 0 && (
            <div className="max-h-96 overflow-y-auto scrollbar-hide">
              <div className="p-3 border-b border-foreground/10 bg-foreground/5">
                <p className="text-xs text-foreground/50">
                  {results.length} {results.length === 1 ? 'resultado' : 'resultados'} encontrados
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3">
                {results.slice(0, 6).map((item) => {
                  const href = endpoint === "filme" 
                    ? `/filmes/${item.id}` 
                    : `/series/${item.id}`
                  const title = item.title || item.name

                  return (
                    <Link
                      key={item.id}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="
                        group block
                        rounded-lg overflow-hidden
                        hover:scale-105
                        transition-all duration-300
                      "
                    >
                      <div className="relative aspect-[2/3] w-full">
                        <MovieImage
                          src={item.poster_path}
                          alt={title}
                          width={200}
                          height={300}
                          className="rounded-lg"
                        />
                        
                        <div className="
                          absolute inset-0
                          bg-gradient-to-t from-background via-transparent to-transparent
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300
                        " />
                      </div>
                      
                      <div className="p-2">
                        <h3 className="
                          text-foreground text-sm font-medium
                          line-clamp-2
                          group-hover:text-foreground/80
                          transition-colors duration-300
                        ">
                          {title}
                        </h3>
                        
                        {item.vote_average > 0 && (
                          <p className="text-yellow-500 text-xs mt-1">
                            ★ {item.vote_average.toFixed(1)}
                          </p>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>

              {results.length > 6 && (
                <div className="p-3 border-t border-foreground/10">
                  <Link
                    href={`/busca?q=${encodeURIComponent(query)}&type=${endpoint}`}
                    onClick={() => setIsOpen(false)}
                    className="
                      block w-full text-center
                      py-2 px-4
                      bg-foreground/5 hover:bg-foreground/10
                      text-foreground/70 hover:text-foreground
                      rounded-lg text-sm
                      transition-colors duration-300
                    "
                  >
                    Ver todos os {results.length} resultados
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Sem resultados */}
          {!loading && query && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-foreground/40 mb-2">🔍</p>
              <p className="text-foreground/60 text-sm">
                Nenhum resultado encontrado para {query}
              </p>
              <p className="text-foreground/40 text-xs mt-1">
                Tente buscar por outro título
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}