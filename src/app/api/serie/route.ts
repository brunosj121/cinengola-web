// src/app/api/serie/route.ts
import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const page = searchParams.get("page") || "1"
  const query = searchParams.get("query")

  let url = ""

  // 🔎 SE EXISTIR QUERY → BUSCA SÉRIES
  if (query) {
    url = `${BASE_URL}/search/tv?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`
  } else {
    // 📺 CASO CONTRÁRIO → POPULARES
    url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`
  }

  const res = await fetch(url)

  const data = await res.json()

  return NextResponse.json(data)
}