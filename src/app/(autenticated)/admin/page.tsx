import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Mail, Newspaper, Trophy } from 'lucide-react';

const AdminDashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== 'ADMIN') {
    return redirect('/auth/login?callbackUrl=/admin');
  }

  const [newsCount, activitiesCount, messagesCount, unreadMessagesCount] = await Promise.all([
    prisma.news.count(),
    prisma.activity.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({
      where: { isRead: false },
    }),
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center md:text-left animate-slideUp">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          Selamat Datang, Admin
        </h1>
        <p className="mt-2 text-base md:text-lg text-gray-600 dark:text-gray-300">
          Anda masuk sebagai: {session?.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Pesan */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-lg animate-fadeIn delay-100">
          <Mail className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
          <h2 className="text-xl font-semibold">Total Pesan</h2>
          <p className="text-4xl mt-2 font-bold text-gray-900 dark:text-white">{messagesCount}</p>
          <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
            ({unreadMessagesCount} belum dibaca)
          </p>
        </div>

        {/* Card 2: Berita */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-lg animate-fadeIn delay-200">
          <Newspaper className="w-10 h-10 text-pink-600 dark:text-pink-400 mb-4" />
          <h2 className="text-xl font-semibold">Total Berita</h2>
          <p className="text-4xl mt-2 font-bold text-gray-900 dark:text-white">{newsCount}</p>
        </div>

        {/* Card 3: Kegiatan */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-lg animate-fadeIn delay-300">
          <Trophy className="w-10 h-10 text-green-600 dark:text-green-400 mb-4" />
          <h2 className="text-xl font-semibold">Total Kegiatan</h2>
          <p className="text-4xl mt-2 font-bold text-gray-900 dark:text-white">{activitiesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;