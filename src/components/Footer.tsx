"use client"

import Link from "next/link"
import { Instagram, Github, Linkedin, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Mostrar botão apenas após rolar um pouco
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <footer className="relative bg-background text-foreground/70 mt-20 border-t border-foreground/10">
      {/* Gradiente Superior - mantido exatamente como você queria */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-800 to-black"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
        
        {/* Logo + Descrição */}
        <div className="space-y-4">
          {/* Logo EXATAMENTE como você pediu - NÃO MEXI */}
          <h2 className="text-3xl font-extrabold text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
            CineNgola
          </h2>
          <p className="text-sm leading-relaxed text-foreground/60">
            A plataforma angolana para descobrir filmes e séries populares
            do mundo com tecnologia moderna.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="text-foreground font-semibold mb-4 text-base sm:text-lg">Explorar</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link 
                href="/" 
                className="text-foreground/60 hover:text-foreground transition-colors duration-300 hover:translate-x-1 inline-block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/filmes" 
                className="text-foreground/60 hover:text-foreground transition-colors duration-300 hover:translate-x-1 inline-block"
              >
                Filmes
              </Link>
            </li>
            <li>
              <Link 
                href="/series" 
                className="text-foreground/60 hover:text-foreground transition-colors duration-300 hover:translate-x-1 inline-block"
              >
                Séries
              </Link>
            </li>
          </ul>
        </div>

        {/* Recursos */}
        <div>
          <h3 className="text-foreground font-semibold mb-4 text-base sm:text-lg">Tecnologia</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300 hover:translate-x-1 inline-block"
              >
                API TMDB
              </a>
            </li>
            <li>
              <a
                href="https://vercel.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300 hover:translate-x-1 inline-block"
              >
                Deploy com Vercel
              </a>
            </li>
            <li>
              <span className="text-foreground/40 text-xs">
                Next.js 14 · Tailwind CSS
              </span>
            </li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-foreground font-semibold mb-4 text-base sm:text-lg">Conecte-se</h3>

          <div className="flex gap-4">
            <a 
              href="#" 
              className="
                p-2 rounded-full
                bg-foreground/5 hover:bg-red-600 
                text-foreground/60 hover:text-white
                transition-all duration-300
                hover:scale-110 hover:shadow-lg hover:shadow-red-600/20
                focus:outline-none focus:ring-2 focus:ring-red-600/50
              "
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a 
              href="#" 
              className="
                p-2 rounded-full
                bg-foreground/5 hover:bg-red-600 
                text-foreground/60 hover:text-white
                transition-all duration-300
                hover:scale-110 hover:shadow-lg hover:shadow-red-600/20
                focus:outline-none focus:ring-2 focus:ring-red-600/50
              "
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>

            <a 
              href="#" 
              className="
                p-2 rounded-full
                bg-foreground/5 hover:bg-red-600 
                text-foreground/60 hover:text-white
                transition-all duration-300
                hover:scale-110 hover:shadow-lg hover:shadow-red-600/20
                focus:outline-none focus:ring-2 focus:ring-red-600/50
              "
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* Contato rápido */}
          <p className="mt-6 text-xs text-foreground/40">
            brunosahuto@gmail.com
          </p>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="border-t border-foreground/10 py-6 px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm gap-4">
        <p className="text-foreground/60">
          © {new Date().getFullYear()} CineNgola. Todos os direitos reservados.
        </p>

        <p className="text-foreground/40 text-center md:text-right">
          Este produto usa a API do TMDB, mas não é endossado ou certificado pelo TMDB.
        </p>
      </div>

      {/* Botão Voltar ao Topo - com animação de entrada/saída */}
      <button
        onClick={scrollToTop}
        className={`
          fixed right-4 sm:right-8 bottom-4 sm:bottom-8
          bg-red-600 hover:bg-red-700 
          p-3 sm:p-4 rounded-full
          shadow-lg hover:shadow-xl shadow-red-600/20
          transition-all duration-500
          hover:scale-110 hover:rotate-12
          focus:outline-none focus:ring-2 focus:ring-red-600/50
          ${showScrollButton 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 pointer-events-none'
          }
        `}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} className="text-white" />
      </button>

      {/* Crédito do desenvolvedor */}
      <div className="text-center py-4 text-foreground/30 text-xs border-t border-foreground/5">
        Desenvolvido por Bruno Sahuto José · {new Date().getFullYear()}
      </div>
    </footer>
  )
}