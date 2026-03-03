export default function Loading() {
  return (
    <div className="p-6 max-w-6xl mx-auto animate-pulse">

      <div className="flex flex-col md:flex-row gap-8">

        {/* Foto skeleton */}
        <div className="w-64 h-[400px] bg-gray-800 rounded-lg" />

        {/* Informações skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-10 bg-gray-800 rounded w-1/2" />
          <div className="h-6 bg-gray-800 rounded w-1/3" />
          <div className="h-6 bg-gray-800 rounded w-1/4" />
          <div className="h-24 bg-gray-800 rounded w-full" />
        </div>

      </div>

      {/* Filmes skeleton */}
      <div className="mt-10 space-y-4">
        <div className="h-8 bg-gray-800 rounded w-1/4" />

        <div className="flex gap-4 overflow-x-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-40 h-60 bg-gray-800 rounded-lg"
            />
          ))}
        </div>
      </div>

    </div>
  )
}