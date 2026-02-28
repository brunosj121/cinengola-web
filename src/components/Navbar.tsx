// src/components/Navbar.tsx
"use client"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-md px-8 py-4 flex justify-between items-center">
      
      <h1 className="text-red-600 text-2xl font-bold">
        CineNgola
      </h1>

      <div className="space-x-6 hidden md:flex text-white">
        <Link href="/" className="hover:text-red-500 transition">
          Home
        </Link>

        <Link href="/filmes" className="hover:text-red-500 transition">
          Filmes
        </Link>

        <Link href="/series" className="hover:text-red-500 transition">
          Séries
        </Link>

        <Link href="/search" className="hover:text-red-500 transition">
          Buscar
        </Link>
      </div>
    </nav>
  )
}