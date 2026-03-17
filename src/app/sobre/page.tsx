import {
  Github,
  ExternalLink,
  Code2,
  Film,
  User,
  Briefcase,
  Award,
  Star,
  GitBranch,
  Terminal,
  Layout,
  Cpu,
  Database,
  Globe,
  Rocket,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | CineNgola",
  description: "Conheça Bruno Sahuto José, o desenvolvedor por trás do CineNgola",
};

export default function SobrePage() {
  const skills = [
    { name: "HTML5", icon: <Code2 className="w-5 h-5" />, level: 90 },
    { name: "CSS / Tailwind", icon: <Layout className="w-5 h-5" />, level: 95 },
    { name: "JavaScript", icon: <Terminal className="w-5 h-5" />, level: 85 },
    { name: "Next.js 15", icon: <Rocket className="w-5 h-5" />, level: 90 },
    { name: "React", icon: <Code2 className="w-5 h-5" />, level: 88 },
    { name: "Node.js", icon: <Cpu className="w-5 h-5" />, level: 80 },
    { name: "API Integration", icon: <Globe className="w-5 h-5" />, level: 92 },
    { name: "Git / GitHub", icon: <GitBranch className="w-5 h-5" />, level: 85 },
  ];

  const experiences = [
    {
      year: "2024 - Presente",
      title: "Desenvolvedor Full Stack",
      company: "CineNgola",
      description: "Desenvolvimento de plataforma de streaming com Next.js e TMDB API"
    },
    {
      year: "2023 - 2024",
      title: "Desenvolvedor Front-end",
      company: "Projetos Pessoais",
      description: "Criação de aplicações modernas com React e Tailwind CSS"
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">

<section className="relative h-screen w-full overflow-hidden bg-background">
  {/* Imagem de fundo (tag img padrão) */}
  <img
    src="/images/PARA_SITE4.png"
    alt="Fundo do cabeçalho - Bruno Sahuto José"
    className="
      absolute inset-0 w-full h-full
      md:object-cover
      object-contain /* Em mobile, mostra a imagem completa sem cortes */
      brightness-100 contrast-110 saturate-105
    "
    style={{
      // Em mobile, a imagem fica centralizada e dimensionada para caber
      objectPosition: 'center center'
    }}
  />

  {/* Overlay escuro para mobile (ajusta legibilidade) */}
  <div className="absolute inset-0 bg-black/20 md:bg-transparent" />

  {/* Padrão de grelha sobreposto para textura */}
  <div className="absolute inset-0 bg-grid-pattern opacity-10" />

  {/* Gradiente escuro na base para destacar o texto */}
  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

  {/* Conteúdo alinhado à parte inferior (rodapé da imagem) */}
  <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-10 pb-8 md:pb-16 lg:pb-20">
    <div className="max-w-xl space-y-3 md:space-y-4">
      {/* Título principal com gradiente vermelho */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
        <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
          Bruno Sahuto José
        </span>
      </h1>

      {/* Subtítulo com ícones */}
      <p className="text-lg sm:text-xl text-foreground/80 flex items-center gap-2 flex-wrap">
        <Sparkles className="text-red-500" size={20} />
        Desenvolvedor Full Stack
        <Sparkles className="text-red-500" size={20} />
      </p>
    </div>
  </div>
</section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">

        {/* Informações Pessoais */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-foreground/5 rounded-2xl p-6 border border-foreground/10">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-red-600" size={20} />
              <span className="text-foreground/70">Luanda, Angola</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-red-600" size={20} />
              <span className="text-foreground/70">brunosahuto@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-red-600" size={20} />
              <span className="text-foreground/70">Estudante de Ciências da Computação</span>
            </div>
          </div>

          <div className="md:col-span-2 bg-foreground/5 rounded-2xl p-6 border border-foreground/10">
            <div className="flex items-center gap-3 mb-4">
              <User className="text-red-600" size={24} />
              <h2 className="text-2xl font-bold">Sobre Mim</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed">
              Sou estudante de Ciências da Computação com foco em desenvolvimento
              de aplicações web modernas. Tenho interesse especial em
              arquitetura escalável, performance e integração com APIs
              externas. Busco constantemente evoluir como desenvolvedor e criar
              soluções digitais impactantes.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <Code2 className="text-red-600" size={28} />
            <h2 className="text-3xl font-bold">Tech Stack Principal</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="group relative bg-foreground/5 p-5 rounded-xl border border-foreground/10 hover:border-red-600/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-red-500 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </span>
                  <span className="font-medium">{skill.name}</span>
                </div>

                {/* Barra de progresso */}
                <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-800 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-red-600/30"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="absolute top-3 right-3 text-xs text-foreground/40">
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Experiência */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <Briefcase className="text-red-600" size={28} />
            <h2 className="text-3xl font-bold">Experiência</h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative bg-foreground/5 p-6 rounded-xl border border-foreground/10 hover:border-red-600/50 transition-all duration-300 group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-red-800 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <span className="text-red-500 font-mono text-sm px-3 py-1 bg-red-600/10 rounded-full">
                    {exp.year}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-foreground/60">{exp.company}</p>
                    <p className="text-foreground/70 mt-2">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projeto Destaque */}
        <section className="mb-20">
          <div className="relative bg-gradient-to-br from-red-600/10 via-red-800/5 to-red-900/10 p-8 md:p-10 rounded-3xl border border-red-600/20 overflow-hidden group">
            {/* Efeito de brilho */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <Film className="w-10 h-10 text-red-600" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  CineNgola
                </h2>
              </div>

              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                Plataforma de filmes e séries desenvolvida com{" "}
                <strong className="text-red-500">Next.js 15 (App Router)</strong>{" "}
                integrada à API do TMDB, oferecendo uma experiência cinematográfica moderna.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Server Components",
                  "Rotas dinâmicas",
                  "API Routes com cache",
                  "TMDB API Integration",
                  "Trailers via YouTube",
                  "Scroll estilo Netflix",
                  "Loading Boundaries",
                  "next/image optimization",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-foreground/70">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/"
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-red-900/30"
                >
                  <Film size={18} />
                  Ver Projeto
                </Link>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-foreground/20 rounded-xl hover:border-red-600/50 transition-all flex items-center gap-2 hover:scale-105"
                >
                  <Github size={18} />
                  Código
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Diferenciais Técnicos
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Performance",
                icon: <Rocket className="w-8 h-8" />,
                description: "Otimização de carregamento e renderização"
              },
              {
                title: "Arquitetura Moderna",
                icon: <Database className="w-8 h-8" />,
                description: "Server Components e App Router"
              },
              {
                title: "UX Cinematográfica",
                icon: <Star className="w-8 h-8" />,
                description: "Experiência inspirada em streaming"
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-foreground/5 p-8 rounded-2xl border border-foreground/10 hover:border-red-600/50 transition-all duration-300 text-center hover:scale-105"
              >
                <div className="flex justify-center mb-4 text-red-600 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16">
          <div className="max-w-2xl mx-auto space-y-6">
            <Heart className="mx-auto text-red-600 w-12 h-12 animate-pulse" />
            <h2 className="text-3xl font-bold">Vamos trabalhar juntos?</h2>
            <p className="text-foreground/70">
              Estou sempre aberto a novos desafios e oportunidades
            </p>
            <a
              href="mailto:brunosahuto@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-red-900/30"
            >
              <Mail size={20} />
              Entrar em contato
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center border-t border-foreground/10 pt-10">
          <p className="text-foreground/40">
            © 2025 Bruno Sahuto José — Desenvolvedor Full Stack
          </p>
          <p className="text-xs text-foreground/30 mt-2">
            Feito com Next.js 15 e Tailwind CSS em Angola 🇦🇴
          </p>
        </footer>

      </div>
    </main>
  );
}

