"use client"

import { useState } from "react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  async function handleSearch() {
    const res = await fetch(`/api/search?q=${query}`)
    const data = await res.json()
    setResults(data.results)
  }

  return (
    <div className="p-6">
      <input
        className="border p-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar filme..."
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}