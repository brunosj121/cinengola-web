import { getTrending } from "../lib/tmdb"

export default async function Hero() {
  const data = await getTrending()
  const movie = data.results[0]

  return (
    <section
      className="h-screen bg-cover bg-center flex items-center px-10"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="bg-black/60 p-8 rounded-lg max-w-xl">
        <h2 className="text-4xl font-bold text-white">{movie.title}</h2>
        <p className="text-gray-300 mt-4 line-clamp-3">
          {movie.overview}
        </p>
        <button className="mt-6 bg-red-600 px-6 py-3 rounded-lg">
          Explorar
        </button>
      </div>
    </section>
  )
}