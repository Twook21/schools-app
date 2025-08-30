import Navbar from '@/components/Navbar';

const AboutUsPage = () => {
  return (
    <div id='tentang' className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="py-16 md:py-24">
        {/*Header Section*/}
        <section className="container mx-auto px-4 md:px-8 text-center animate-slideUp">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Tentang SMK Rakyat
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            SMK Rakyat adalah sekolah vokasi yang berfokus pada pengembangan
            keahlian digital dan teknologi untuk mencetak generasi muda
            yang siap menghadapi tantangan industri.
          </p>
        </section>

        {/* Visi & Misi Section */}
        <section className="container mx-auto px-4 md:px-8 mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-lg animate-fadeIn delay-100">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Visi</h2>
            <p className="mt-4 text-sm md:text-base text-gray-700 dark:text-gray-300">
              Menjadi lembaga pendidikan vokasi terdepan yang menghasilkan
              lulusan unggul, berkarakter, dan kompetitif di tingkat nasional
              maupun global.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-lg animate-fadeIn delay-200">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Misi</h2>
            <ul className="mt-4 space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300 list-inside list-disc marker:text-blue-500 dark:marker:text-blue-300">
              <li>Melaksanakan pembelajaran berbasis proyek yang inovatif.</li>
              <li>Membangun kemitraan dengan dunia industri.</li>
              <li>Menciptakan ekosistem belajar yang kolaboratif dan suportif.</li>
              <li>Mengembangkan soft skill dan karakter siswa.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;