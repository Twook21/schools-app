import Image from "next/image";
import { News } from "@prisma/client";

// Komponen ini akan menjadi Server Component
async function getNews() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/news`, {
    cache: 'no-store' 
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data berita');
  }

  return res.json();
}

const NewsPage = async () => {
  const news: News[] = await getNews();

  return (
    <div id="berita" className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-300">
      <main className="container mx-auto px-4 md:px-8 py-16 md:py-24 animate-fadeIn">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Berita Terbaru
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dapatkan informasi terkini mengenai pencapaian sekolah, pengumuman
            penting, dan berbagai berita menarik lainnya.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:gap-12 max-w-3xl mx-auto">
          {news.length > 0 ? (
            news.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg animate-fadeIn"
              >
                <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 w-full md:w-2/3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.date}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    {item.summary}
                  </p>
                  <a
                    href={`/berita/${item.id}`} // Contoh link ke halaman detail
                    className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm transition-colors hover:text-blue-800"
                  >
                    Baca Selengkapnya &rarr;
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">Belum ada berita yang tersedia.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default NewsPage;