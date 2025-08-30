import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LayoutDashboard } from 'lucide-react';

const UserDashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4 animate-slideUp">
        <LayoutDashboard className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        <h1 className="text-3xl md:text-4xl font-extrabold">Selamat Datang!</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-lg animate-fadeIn delay-100">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Anda login sebagai: <span className="font-semibold text-blue-600 dark:text-blue-400">{session?.user?.email}</span>
        </p>
      </div>
    </div>
  );
};

export default UserDashboardPage;