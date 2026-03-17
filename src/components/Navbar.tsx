// src/components/Navbar.tsx
"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Home, Film, Tv, Info, Clapperboard, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Previne scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Detecta scroll para modificar o backdrop
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/filmes", label: "Filmes", icon: Film },
    { href: "/series", label: "Séries", icon: Tv },
    { href: "/sobre", label: "Sobre", icon: Info },
  ]

  // Verifica se o link está ativo
  const isActive = (href: string) => pathname === href

  return (
    <>
      <nav 
        className={`
          fixed w-full z-50 px-4 sm:px-8 py-3
          flex justify-between items-center
          transition-all duration-500
          safe-top
          ${scrolled 
            ? 'bg-background/80 backdrop-blur-md shadow-lg border-b border-foreground/10' 
            : 'bg-background/50 backdrop-blur-sm border-b border-foreground/5'
          }
        `}
      >
        {/* Logo à esquerda */}
        <Link 
          href="/" 
          className="
            group flex items-center gap-2
            hover:scale-105 transition-all duration-300
            active:scale-95
          "
        >
          <div className="relative">
            <Clapperboard className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
            <Sparkles className="
              absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5
              text-yellow-500 opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            " />
          </div>
          <h1 className="
            text-2xl sm:text-3xl lg:text-4xl font-black
            bg-gradient-to-r from-red-600 via-red-500 to-red-600
            bg-clip-text text-transparent
            tracking-tight
            drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]
          ">
            CineNgola
          </h1>
        </Link>

        {/* Desktop Menu - AGORA À DIREITA COM ÍCONES MAIORES */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className="
                  group relative
                  flex items-center gap-3
                  px-5 py-3
                  rounded-xl
                  transition-all duration-300
                  hover:scale-110
                "
              >
                {/* Background no hover/active */}
                <div className={`
                  absolute inset-0 rounded-xl
                  transition-all duration-300
                  ${active 
                    ? 'bg-red-600/20 border border-red-600/30' 
                    : 'group-hover:bg-foreground/10'
                  }
                `} />
                
                {/* Ícone MAIOR */}
                <Icon size={22} className={`
                  relative z-10 transition-all duration-300
                  ${active 
                    ? 'text-red-600' 
                    : 'text-foreground/70 group-hover:text-foreground'
                  }
                `} />
                
                {/* Label MAIOR */}
                <span className={`
                  relative z-10 text-base font-semibold
                  transition-all duration-300
                  ${active 
                    ? 'text-red-600' 
                    : 'text-foreground/80 group-hover:text-foreground'
                  }
                `}>
                  {link.label}
                </span>

                {/* Indicador de ativo */}
                {active && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Mobile Menu Button - MELHORADO COM CLASSES DO GLOBALS.CSS */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`
            md:hidden 
            mobile-touch-target
            rounded-xl
            transition-all duration-300
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-red-600/50
            ${isMenuOpen ? 'bg-red-600/20 text-red-600' : 'text-foreground/80 hover:text-foreground'}
          `}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay - MELHORADO COM CLASSES DO GLOBALS.CSS */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-all duration-500 ease-in-out
          ${isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
          }
          safe-top safe-bottom
        `}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop com blur */}
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Content - MELHORADO */}
        <div className="
          relative z-10 h-full 
          flex flex-col items-center justify-center
          space-y-4 p-4
          overflow-y-auto
        ">
          {/* Links com ícones no mobile */}
          <div className="w-full max-w-sm space-y-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon
              const active = isActive(link.href)
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    group relative
                    flex items-center gap-4
                    w-full
                    px-4 py-3
                    rounded-xl
                    transition-all duration-500
                    active:scale-[0.98]
                  "
                  style={{
                    transitionDelay: `${index * 70}ms`,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isMenuOpen ? 1 : 0
                  }}
                >
                  {/* Background com gradiente */}
                  <div className={`
                    absolute inset-0 rounded-xl
                    transition-all duration-300
                    ${active 
                      ? 'bg-gradient-to-r from-red-600/20 to-red-600/5 border border-red-600/30' 
                      : 'bg-foreground/5 group-hover:bg-foreground/10'
                    }
                  `} />

                  {/* Ícone com animação - TAMANHO AJUSTADO */}
                  <div className={`
                    relative z-10 p-2.5 rounded-lg
                    transition-all duration-300
                    ${active 
                      ? 'bg-red-600/30 text-red-600' 
                      : 'bg-foreground/10 text-foreground/60'
                    }
                  `}>
                    <Icon size={24} />
                  </div>

                  {/* Texto - TAMANHO AJUSTADO */}
                  <div className="relative z-10 flex-1">
                    <p className={`
                      text-lg font-semibold
                      ${active ? 'text-red-600' : 'text-foreground'}
                    `}>
                      {link.label}
                    </p>
                  </div>

                  {/* Indicador de ativo */}
                  {active && (
                    <div className="relative z-10 mr-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    </div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Rodapé do menu mobile - MELHORADO */}
          <div className="absolute bottom-8 left-0 right-0 text-center safe-bottom">
            <p className="text-xs text-foreground/30">
              © 2024 CineNgola · Feito em Angola 
            </p>
          </div>
        </div>
      </div>
    </>
  )
}