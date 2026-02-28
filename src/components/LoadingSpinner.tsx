// src/components/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
  )
}

// src/components/InfiniteScrollLoader.tsx
interface InfiniteScrollLoaderProps {
  loading: boolean
  hasMore: boolean
  loaderRef: React.RefObject<HTMLDivElement | null>
}

export function InfiniteScrollLoader({ 
  loading, 
  hasMore, 
  loaderRef 
}: InfiniteScrollLoaderProps) {
  return (
    <div ref={loaderRef} className="h-20 flex justify-center items-center">
      {loading && <LoadingSpinner />}
      {!hasMore && (
        <p className="text-gray-500 text-sm">
          🎬 Você chegou ao fim.
        </p>
      )}
    </div>
  )
}