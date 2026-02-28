// src/app/api/serie/[id]/route.ts
import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(
      `${BASE_URL}/tv/${params.id}?api_key=${API_KEY}&language=pt-BR`
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar série" },
      { status: 500 }
    );
  }
}