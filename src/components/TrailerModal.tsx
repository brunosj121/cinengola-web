"use client"

import { useState, useEffect } from "react"
import { X, Play, Maximize2, Minimize2 } from "lucide-react"

interface Props {
  youtubeId: string
  title?: string
}

export default function TrailerModal({ youtubeId, title = "Trailer" }: Props) {
  const [open, setOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  // Fechar com tecla ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <>
      {/* Botão de abrir trailer */}
      <button
        onClick={() => setOpen(true)}
        className="
          group relative
          flex items-center gap-2
          px-6 py-3
          bg-red-600 hover:bg-red-700
          text-white font-semibold
          rounded-lg
          overflow-hidden
          transition-all duration-300
          hover:scale-105 hover:shadow-lg hover:shadow-red-600/20
          focus:outline-none focus:ring-2 focus:ring-red-600/50
        "
      >
        <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
        <span>Ver Trailer</span>
        
        {/* Efeito de brilho no hover */}
        <div className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          -translate-x-full
          group-hover:translate-x-full
          transition-transform duration-1000
          pointer-events-none
        " />
      </button>

      {/* Modal */}
      {open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)} // Fecha ao clicar no backdrop
        >
          {/* Backdrop com blur */}
          <div className="absolute inset-0 bg-background/95 backdrop-blur-md animate-fade-in" />

          {/* Container do modal */}
          <div 
            className={`
              relative z-10
              bg-background
              rounded-xl shadow-2xl
              overflow-hidden
              animate-slide-up
              ${isFullscreen 
                ? 'w-screen h-screen rounded-none' 
                : 'w-full max-w-4xl'
              }
            `}
            onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar no modal
          >
            {/* Cabeçalho do modal */}
            <div className="
              flex items-center justify-between
              px-4 py-3
              border-b border-foreground/10
              bg-foreground/5
            ">
              <h3 className="text-foreground font-medium flex items-center gap-2">
                <Play size={16} className="text-red-600" />
                {title}
              </h3>

              <div className="flex items-center gap-2">
                {/* Botão fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="
                    p-2 rounded-lg
                    hover:bg-foreground/10
                    text-foreground/60 hover:text-foreground
                    transition-colors duration-300
                  "
                  aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                {/* Botão fechar */}
                <button
                  onClick={() => setOpen(false)}
                  className="
                    p-2 rounded-lg
                    hover:bg-foreground/10
                    text-foreground/60 hover:text-foreground
                    transition-colors duration-300
                  "
                  aria-label="Fechar"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Container do vídeo */}
            <div className={`
              relative
              ${isFullscreen ? 'h-[calc(100vh-60px)]' : 'pt-[56.25%]'} // 16:9 aspect ratio
            `}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={`
                  absolute top-0 left-0 w-full h-full
                  ${isFullscreen ? 'object-cover' : ''}
                `}
              />
            </div>

            {/* Rodapé com informações */}
            <div className="
              px-4 py-3
              border-t border-foreground/10
              bg-foreground/5
              text-xs text-foreground/50
              flex items-center justify-between
            ">
              <span>🎬 Clique fora para fechar • ESC • Fullscreen</span>
              <span className="text-red-600/50">CineNgola</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}