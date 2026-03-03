// src/components/About.tsx
import Image from "next/image"
import Link from "next/link"

export default function About() {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background decorativo com gradiente */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      </div>

      {/* Círculos decorativos (opcional) */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-foreground/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-foreground/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Ícone ou avatar */}
          <div className="flex justify-center">
            <div className="
              relative w-20 h-20 sm:w-24 sm:h-24 
              rounded-full bg-foreground/10 
              flex items-center justify-center
              border border-foreground/20
              group hover:scale-110 transition-transform duration-300
            ">
              <span className="text-3xl sm:text-4xl group-hover:rotate-12 transition-transform duration-300">
                🎬
              </span>
            </div>
          </div>

          {/* Título com gradiente */}
          <h2 className="
            text-3xl sm:text-4xl lg:text-5xl font-bold
            bg-gradient-to-r from-foreground to-foreground/70 
            bg-clip-text text-transparent
          ">
            Sobre o CineNgola
          </h2>

          {/* Descrição com efeito de fade */}
          <div className="space-y-4 text-foreground/80 text-base sm:text-lg leading-relaxed">
            <p className="max-w-2xl mx-auto">
              <span className="text-foreground font-semibold">CineNgola</span> é uma plataforma angolana que nasce da paixão por cinema e tecnologia, 
              desenvolvida por <span className="text-foreground font-semibold">Bruno Sahuto José</span>.
            </p>
            
            <p className="max-w-2xl mx-auto">
              Utilizando <span className="text-foreground font-medium">Next.js 14</span> e a API do {' '}
              <span className="text-foreground font-medium">TMDB</span>, oferecemos uma experiência moderna 
              e acessível para descobrir os melhores filmes e séries.
            </p>
          </div>

          {/* Estatísticas ou destaques */}
          <div className="
            grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 
            pt-8 sm:pt-10
            border-t border-foreground/10
          ">
            {[
              { label: 'Filmes', value: '10K+' },
              { label: 'Séries', value: '2.5K+' },
              { label: 'Usuários', value: '50K+' },
              { label: 'Streams', value: '1M+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="
                  text-xl sm:text-2xl lg:text-3xl font-bold 
                  text-foreground group-hover:scale-110 transition-transform duration-300
                ">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-foreground/60 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tecnologias usadas */}
          <div className="pt-8 sm:pt-10">
            <h3 className="text-sm uppercase tracking-wider text-foreground/50 mb-4">
              Tecnologias
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Next.js', 'React', 'TypeScript', 'Tailwind', 'TMDB API'].map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1 text-sm
                    bg-foreground/5 hover:bg-foreground/10
                    text-foreground/70 hover:text-foreground
                    rounded-full border border-foreground/10
                    transition-all duration-300
                    hover:scale-105 hover:border-foreground/30
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="pt-8 sm:pt-10">
            <Link
              href="/sobre"
              className="
                group relative inline-flex items-center gap-2
                px-6 sm:px-8 py-3 sm:py-4
                bg-foreground text-background
                rounded-lg font-semibold
                overflow-hidden
                transition-all duration-300
                hover:scale-105 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-foreground/50
              "
            >
              <span className="relative z-10">Conheça mais</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-foreground to-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}