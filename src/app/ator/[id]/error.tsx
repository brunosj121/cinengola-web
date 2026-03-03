"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">

      <h2 className="text-3xl font-bold mb-4">
        😢 Ocorreu um erro inesperado
      </h2>

      <p className="text-gray-400 mb-6 max-w-md">
        Não conseguimos carregar as informações deste ator.
        Verifique sua conexão ou tente novamente.
      </p>

      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-lg shadow-lg"
      >
        🔄 Tentar novamente
      </button>

    </div>
  )
}