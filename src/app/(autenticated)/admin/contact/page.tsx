'use client';

import { useState, useEffect } from 'react';
import { ContactMessage } from '@prisma/client';
import { Mail, Eye, EyeOff, Trash2, Loader2, X, CheckCircle2, Reply, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminContactPage = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/contact');
      if (!response.ok) {
        throw new Error('Gagal mengambil pesan kontak.');
      }
      const data = await response.json();
      setMessages(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui status pesan.');
      }

      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg.id === id ? { ...msg, isRead: newStatus } : msg))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteClick = (id: string) => {
    setItemToDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDeleteId) return;

    try {
      const response = await fetch(`/api/admin/contact/${itemToDeleteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Gagal menghapus pesan.');
      }
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== itemToDeleteId));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setShowDeleteModal(false);
      setItemToDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDeleteId(null);
  };

  // Function to handle reply action, navigating to the new page
  const handleReplyClick = (id: string) => {
    router.push(`/admin/contact/reply/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 dark:bg-red-900 rounded-xl shadow-sm">
        <p className="text-red-600 dark:text-red-300 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4 animate-slideUp">
        <Mail className="w-10 h-10 text-pink-600 dark:text-pink-400" />
        <h1 className="text-3xl md:text-4xl font-extrabold">Pesan Kontak Masuk</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-lg animate-fadeIn delay-100">
        <h2 className="text-xl font-semibold mb-4">Total Pesan ({messages.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Nama
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Pesan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Tanggal
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {messages.map((message) => (
                <tr
                  key={message.id}
                  className={`${
                    message.isRead
                      ? 'bg-gray-50 dark:bg-gray-700 text-gray-500'
                      : 'bg-white dark:bg-gray-800'
                  } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span
                      className={`py-1 px-3 rounded-full text-xs font-semibold flex items-center gap-1 ${
                        message.isRead
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                      }`}
                    >
                      {message.isRead ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Mail className="w-3 h-3" />
                      )}{' '}
                      {message.isRead ? 'Sudah Dibaca' : 'Belum Dibaca'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{message.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{message.email}</td>
                  <td className="px-6 py-4 text-sm max-w-sm truncate">{message.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-2">
                    <button
                      onClick={() => handleMarkAsRead(message.id, message.isRead)}
                      className={`py-2 px-3 rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-1 ${
                        message.isRead
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {message.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {message.isRead ? 'Belum Dibaca' : 'Sudah Dibaca'}
                    </button>
                    <button
                      onClick={() => handleReplyClick(message.id)}
                      className="py-2 px-3 rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-1 bg-green-600 text-white hover:bg-green-700"
                    >
                      <Reply className="w-4 h-4" />
                      Balas
                    </button>
                    <button
                      onClick={() => handleDeleteClick(message.id)}
                      className="py-2 px-3 rounded-full text-xs font-semibold bg-red-600 text-white shadow-sm hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl w-full max-w-sm mx-4 animate-scaleUp">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Konfirmasi Hapus</h3>
              <button
                onClick={handleDeleteCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Apakah Anda yakin ingin menghapus pesan ini? Aksi ini tidak dapat diurungkan.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-800 font-semibold transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold transition-all hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactPage;
