"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play, Maximize2, Minimize2, Loader2 } from "lucide-react"

interface Props {
  youtubeId: string
  title?: string
}

export default function TrailerModal({ youtubeId, title = "Trailer" }: Props) {
  const [open, setOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [iframeLoading, setIframeLoading] = useState(true)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      // Focar no botão de fechar para acessibilidade
      closeButtonRef.current?.focus()
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
      if (event.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [open])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleIframeLoad = () => {
    setIframeLoading(false)
  }

  // Classes base reutilizáveis
  const iconButtonClass = `
    p-2 rounded-lg
    hover:bg-foreground/10
    text-foreground/60 hover:text-foreground
    transition-colors duration-300
    focus:outline-none focus:ring-2 focus:ring-red-600/50
    min-h-[44px] min-w-[44px] flex items-center justify-center
  `

  return (
    <>
      {/* Botão de abrir trailer */}
      <button
        onClick={() => setOpen(true)}
        className="
          group relative
          flex items-center justify-center gap-2
          px-6 py-3
          bg-red-600 hover:bg-red-700
          text-white font-semibold
          rounded-lg
          overflow-hidden
          transition-all duration-300
          hover:scale-105 hover:shadow-lg hover:shadow-red-600/20
          focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:ring-offset-2 focus:ring-offset-background
          min-h-[44px] min-w-[44px]
        "
        aria-label={`Ver trailer de ${title}`}
      >
        <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Ver Trailer</span> {/* Texto apenas em ecrãs maiores */}
        
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
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setOpen(false)} // Fecha ao clicar no backdrop
        >
          {/* Backdrop com blur */}
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
            aria-hidden="true"
          />

          {/* Container do modal */}
          <div 
            className={`
              relative z-10
              bg-background
              rounded-xl shadow-2xl
              overflow-hidden
              w-full
              transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-4
              ${isFullscreen 
                ? 'w-screen h-screen rounded-none' 
                : 'max-w-4xl'
              }
            `}
            onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar no modal
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Cabeçalho do modal */}
            <div className="
              flex items-center justify-between
              px-3 sm:px-4 py-2 sm:py-3
              border-b border-foreground/10
              bg-foreground/5
            ">
              <h3 id="modal-title" className="text-foreground font-medium flex items-center gap-2 text-sm sm:text-base">
                <Play size={16} className="text-red-600" />
                <span className="truncate max-w-[200px] sm:max-w-none">{title}</span>
              </h3>

              <div className="flex items-center gap-1 sm:gap-2">
                {/* Botão fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className={iconButtonClass}
                  aria-label={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                >
                  {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>

                {/* Botão fechar */}
                <button
                  ref={closeButtonRef}
                  onClick={() => setOpen(false)}
                  className={iconButtonClass}
                  aria-label="Fechar"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Container do vídeo */}
            <div className={`
              relative
              ${isFullscreen ? 'h-[calc(100vh-60px)]' : 'pt-[56.25%]'} // 16:9 aspect ratio
              bg-foreground/5
            `}>
              {/* Loader enquanto o iframe carrega */}
              {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                  <Loader2 size={32} className="text-red-600 animate-spin" />
                </div>
              )}

              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
                className={`
                  absolute top-0 left-0 w-full h-full
                  transition-opacity duration-500
                  ${iframeLoading ? 'opacity-0' : 'opacity-100'}
                `}
              />
            </div>

            {/* Rodapé com informações */}
            <div className="
              px-3 sm:px-4 py-2 sm:py-3
              border-t border-foreground/10
              bg-foreground/5
              text-xs text-foreground/50
              flex items-center justify-between
            ">
              <span>🎬 Fullscreen disponível</span>
              <span className="text-red-600/50">CineNgola</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}