import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Code, Palette, Network } from "lucide-react";

const HomePage = () => {
  return (
    <div id="beranda" className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="py-16 md:py-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-8 animate-fadeIn">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2 flex justify-center animate-slideUp">
              <Image
                src="/images/home-page.png"
                alt="Ilustrasi Pendidikan Vokasi"
                width={500}
                height={500}
                className="w-full h-auto max-w-xs md:max-w-md motion-safe:animate-pulse"
                priority
              />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 text-center md:text-left animate-slideUp delay-200">
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                SMK Rakyat Unggulan
              </p>
              <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight">
                Pendidikan Vokasi
                <br className="hidden md:inline" /> Masa Depan
              </h1>
              <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300">
                Mempersiapkan siswa menjadi tenaga kerja profesional di era digital.
              </p>
              <div className="mt-8 flex justify-center md:justify-start gap-4">
                <a
                  href="#jurusan"
                  className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                >
                  Lihat Jurusan
                </a>
                <a
                  href="#tentang"
                  className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Tentang Sekolah
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section Unggulan */}
        <section className="container mx-auto px-4 md:px-8 mt-16 md:mt-24">
          <div className="text-center animate-slideUp">
            <h2 className="text-3xl font-bold">Bidang Unggulan Kami</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Kami fokus pada keterampilan yang relevan dengan kebutuhan industri 4.0 dan dunia kerja modern.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-lg animate-fadeIn delay-100">
              <Code className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold">
                Rekayasa Perangkat Lunak
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Mengembangkan aplikasi web maupun mobile dengan teknologi terbaru, serta membekali siswa dengan keterampilan pemrograman yang siap pakai di dunia kerja.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-lg animate-fadeIn delay-200">
              <Palette className="w-10 h-10 text-pink-600 dark:text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold">
                Desain Komunikasi Visual
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Menciptakan karya desain grafis, ilustrasi, dan media digital yang inovatif, sehingga siswa mampu berkompetisi di industri kreatif modern.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-lg animate-fadeIn delay-300">
              <Network className="w-10 h-10 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-semibold">
                Teknik Jaringan Komputer
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Memahami instalasi, konfigurasi, dan manajemen jaringan komputer, serta membekali siswa dengan kemampuan troubleshooting yang dibutuhkan industri.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;