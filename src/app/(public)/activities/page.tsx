import Image from "next/image";
import { Activity } from "@prisma/client";

async function getActivities() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/activities`, {
    cache: 'no-store' 
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data kegiatan');
  }

  return res.json();
}

const ActivitiesPage = async () => {
  const activities: Activity[] = await getActivities();

  return (
    <div id="kegiatan" className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-300">
      <main className="container mx-auto px-4 md:px-8 py-16 md:py-24 animate-fadeIn">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Kegiatan Kami
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Berbagai kegiatan inspiratif dan edukatif yang diikuti oleh para
            siswa untuk mengasah keterampilan dan kreativitas mereka.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:gap-12 max-w-3xl mx-auto">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-lg animate-fadeIn"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {activity.date}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-tight">
                    {activity.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">Belum ada kegiatan yang tersedia.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ActivitiesPage;