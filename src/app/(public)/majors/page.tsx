import Navbar from '@/components/Navbar';
import { BriefcaseIcon, CodeBracketIcon, PaintBrushIcon } from '@heroicons/react/24/solid';

const MajorsPage = () => {
  const majors = [
    {
      name: 'Rekayasa Perangkat Lunak',
      description: 'Fokus pada pengembangan aplikasi desktop, web, dan mobile. Siswa akan belajar tentang logika pemrograman, basis data, dan manajemen proyek perangkat lunak.',
      icon: <CodeBracketIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Desain Komunikasi Visual',
      description: 'Menciptakan karya-karya visual yang kreatif dan komunikatif. Materi meliputi desain grafis, ilustrasi, videografi, dan fotografi.',
      icon: <PaintBrushIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Manajemen Perkantoran dan Layanan Bisnis',
      description: 'Mempersiapkan siswa untuk menjadi staf profesional di bidang administrasi dan perkantoran. Pembelajaran mencakup korespondensi, kearsipan, dan etika bisnis.',
      icon: <BriefcaseIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <div id='jurusan' className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="py-16 md:py-24">
        {/*Header Section*/}
        <section className="container mx-auto px-4 md:px-8 text-center animate-slideUp">
          <h1 className="text-3xl md:text-4xl font-bold">
            Jurusan Kami
          </h1>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pilih jurusan yang sesuai dengan minat dan bakatmu.
          </p>
        </section>

        {/*Majors Grid*/}
        <section className="container mx-auto px-4 md:px-8 mt-12 md:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {majors.map((major, index) => (
              <div
                key={index}
                className={`p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 animate-fadeIn delay-${index * 100}`}
              >
                <div className="flex items-center justify-center mb-4">
                  {major.icon}
                </div>
                <h2 className="text-xl font-semibold text-center">{major.name}</h2>
                <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">{major.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MajorsPage;