import { NextResponse } from "next/server"

const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const res = await fetch(
    `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=movie_credits,tv_credits`
  )

  const data = await res.json()

  return NextResponse.json(data)
}