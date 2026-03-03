import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import MovieRow from "../components/MovieRow"
import DownloadApp from "../components/DownloadApp"
import About from "../components/About"
import Footer from "../components/Footer"
import SerieRow from "../components/SerieRow"
import { fetchFromTMDB } from "../lib/tmdb"

export default async function Home() {
  const popular = await fetchFromTMDB("/movie/popular")
  const tv = await fetchFromTMDB("/tv/popular") 
  const trending = await fetchFromTMDB("/trending/movie/week")

  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />

      <MovieRow title="🔥 Trending" movies={trending.results} />
      <MovieRow title="🎬 Filmes Populares" movies={popular.results} />

      <SerieRow
        title=" Séries em Alta"
        series={tv.results}
      />

      <DownloadApp />
      <About />
      <Footer />
    </main>
  )
}

export const metadata = {
  title: 'CineNgola - Streaming de Filmes e Séries',
  description: 'Descubra os melhores filmes e séries em Angola. Streaming com curadoria especial para você.',
  openGraph: {
    title: 'CineNgola',
    description: 'Streaming de filmes e séries em Angola',
    type: 'website',
  }
}