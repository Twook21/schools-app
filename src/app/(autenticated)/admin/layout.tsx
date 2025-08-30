import { ReactNode } from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LogoutButton from '@/components/LogoutButton';
import { LayoutDashboard, Newspaper, Trophy, Mail } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== 'ADMIN') {
    return redirect('/auth/login?callbackUrl=/admin');
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar Navigasi */}
      <aside className="w-64 h-screen sticky top-0 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
        <nav className="space-y-2">
          <Link href="/admin" className="block w-full">
            <span className="flex items-center gap-3 p-3 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </span>
          </Link>
          <Link href="/admin/news" className="block w-full">
            <span className="flex items-center gap-3 p-3 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Newspaper className="w-5 h-5" /> Manajemen Berita
            </span>
          </Link>
          <Link href="/admin/activities" className="block w-full">
            <span className="flex items-center gap-3 p-3 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Trophy className="w-5 h-5" /> Manajemen Kegiatan
            </span>
          </Link>
          <Link href="/admin/contact" className="block w-full">
            <span className="flex items-center gap-3 p-3 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Mail className="w-5 h-5" /> Pesan Kontak
            </span>
          </Link>
        </nav>
        {/* Tombol logout */}
        <div className="pt-4 mt-auto">
          <LogoutButton />
        </div>
      </aside>

      {/* Konten Halaman */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;