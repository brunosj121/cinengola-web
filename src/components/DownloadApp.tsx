export default function DownloadApp() {
  return (
    <section className="bg-gradient-to-r from-red-700 to-black text-white py-20 text-center">
      <h2 className="text-3xl font-bold">Leve o CineNgola no seu bolso 📱</h2>
      <p className="mt-4 text-gray-300">
        Baixe o app para Android e iOS
      </p>

      <div className="mt-8 space-x-4">
        <button className="bg-white text-black px-6 py-3 rounded-lg">
          Google Play
        </button>
        <button className="bg-white text-black px-6 py-3 rounded-lg">
          App Store
        </button>
      </div>
    </section>
  )
}