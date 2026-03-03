/* eslint-disable @typescript-eslint/no-explicit-any */
const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3"

export async function fetchFromTMDB(endpoint: string) {
  if (!API_KEY) {
    throw new Error("TMDB_API_KEY não definida")
  }

  const separator = endpoint.includes("?") ? "&" : "?"

  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=pt-BR`

  const res = await fetch(url, { cache: "no-store" })

  if (!res.ok) {
    console.error("Erro TMDB:", res.status, url)
    throw new Error("Erro ao buscar dados do TMDB")
  }

  return res.json()
}


export async function getTrending() {
  return fetchFromTMDB("/trending/movie/week")
}

export async function getFilme(id: string) {
  return fetchFromTMDB(`/movie/${id}?append_to_response=credits`)
}

export async function getSerie(id: string) {
  return fetchFromTMDB(`/tv/${id}?append_to_response=credits,videos`)
}


export async function getTrailerFilme(id: string) {
  const data = await fetchFromTMDB(`/movie/${id}/videos`)

  const trailer = data.results.find(
    (video: any) =>
      video.type === "Trailer" && video.site === "YouTube"
  )

  return trailer?.key || null
}


export function extractTrailer(data: any) {
  const trailer = data.videos?.results?.find(
    (video: any) =>
      video.type === "Trailer" && video.site === "YouTube"
  )

  return trailer?.key || null
}


export async function searchFilmes(query: string) {
  return fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`)
}

export async function searchSeries(query: string) {
  return fetchFromTMDB(`/search/tv?query=${encodeURIComponent(query)}`)
}


