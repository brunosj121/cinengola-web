"use client"

import Link from "next/link"
import { Instagram, Github, Linkedin, ArrowUp } from "lucide-react"

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-black text-gray-400 mt-20">

      {/* Gradiente Superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-800 to-black"></div>

      <div className="max-w-6xl mx-auto px-8 py-20 grid md:grid-cols-4 gap-12">

        {/* Logo + Descrição */}
        <div>
          <h2 className="text-3xl font-extrabold text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
            CineNgola
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            A plataforma angolana para descobrir filmes e séries populares
            do mundo com tecnologia moderna.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="text-white font-semibold mb-4">Explorar</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="filmes" className="hover:text-white transition">
                Filmes
              </Link>
            </li>
            <li>
              <Link href="/series" className="hover:text-white transition">
                Séries
              </Link>
            </li>
          </ul>
        </div>

        {/* Recursos */}
        <div>
          <h3 className="text-white font-semibold mb-4">Tecnologia</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                API TMDB
              </a>
            </li>
            <li>
              <a
                href="https://vercel.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Deploy com Vercel
              </a>
            </li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-white font-semibold mb-4">Conecte-se</h3>

          <div className="flex gap-4">
            <a href="#" className="hover:text-red-500 transition">
              <Instagram size={20} />
            </a>

            <a href="#" className="hover:text-red-500 transition">
              <Github size={20} />
            </a>

            <a href="#" className="hover:text-red-500 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Linha inferior */}
      <div className="border-t border-zinc-800 py-6 px-8 flex flex-col md:flex-row justify-between items-center text-sm">

        <p>
          © {new Date().getFullYear()} CineNgola. Todos os direitos reservados.
        </p>

        <p className="text-xs text-gray-500 mt-2 md:mt-0">
          Este produto usa a API do TMDB, mas não é endossado ou certificado pelo TMDB.
        </p>

      </div>

      {/* Botão Voltar ao Topo */}
      <button
        onClick={scrollToTop}
        className="absolute right-8 bottom-8 bg-red-600 hover:bg-red-700 p-3 rounded-full shadow-lg transition"
      >
        <ArrowUp size={20} className="text-white" />
      </button>

    </footer>
  )
}