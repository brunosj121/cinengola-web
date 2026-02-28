// src/app/api/filme/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  // exemplo de resposta
  return NextResponse.json({
    id,
    titulo: "Filme exemplo",
  })
}