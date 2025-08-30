import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 md:py-16 animate-fadeIn">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {/* Logo dan Deskripsi */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-start">
            <a href="#beranda" className="flex items-center space-x-3 transition-colors hover:text-blue-400">
              <Image
                src="/images/tutwuri.png" 
                alt="SMK Rakyat Logo"
                width={40}
                height={40}
                className="dark:filter dark:invert"
              />
              <span className="text-xl md:text-2xl font-bold">SMK Rakyat</span>
            </a>
            <p className="mt-4 text-sm text-gray-400 max-w-sm">
              Mencetak generasi yang siap menghadapi masa depan digital.
            </p>
          </div>

          {/* Navigasi Cepat */}
          <div>
            <h3 className="text-base font-semibold text-white uppercase tracking-wider">Navigasi</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><a href="#tentang" className="transition-colors hover:text-blue-400">Tentang Kami</a></li>
              <li><a href="#jurusan" className="transition-colors hover:text-blue-400">Jurusan</a></li>
              <li><a href="#kontak" className="transition-colors hover:text-blue-400">Kontak</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-base font-semibold text-white uppercase tracking-wider">Kontak</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:info@smkrakyat.sch.id" className="transition-colors hover:text-blue-400">
                  info@smkrakyat.sch.id
                </a>
              </li>
              <li>
                <a href="tel:+6281234567890" className="transition-colors hover:text-blue-400">
                  +62 812 3456 7890
                </a>
              </li>
              <li>
                <p>Jl. Vokasi No. 123, Jakarta, Indonesia</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Hak Cipta */}
        <div className="border-t border-gray-800 dark:border-gray-800 mt-10 pt-8 text-center text-xs text-gray-500">
          © 2025 SMK Rakyat. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;