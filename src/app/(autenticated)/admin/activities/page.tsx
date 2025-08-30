'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Activity } from '@prisma/client';
import { Trophy, Pencil, Trash2 } from 'lucide-react';

const AdminActivityPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
    date: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/activities');
      if (!response.ok) {
        throw new Error('Gagal mengambil data kegiatan.');
      }
      const data = await response.json();
      setActivities(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = formData.image;
    const isEditing = !!formData.id;

    if (imageFile) {
      const uploadForm = new FormData();
      uploadForm.append('file', imageFile);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadForm,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        setError(errorData.message || 'Gagal mengunggah file.');
        setLoading(false);
        return;
      }

      const uploadResult = await uploadRes.json();
      imageUrl = uploadResult.url;
    }

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/admin/activities/${formData.id}` : '/api/admin/activities';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          image: imageUrl,
          date: formData.date,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan data.');
      }

      setFormData({ id: '', title: '', description: '', image: '', date: '' });
      setImageFile(null);
      fetchActivities();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Activity) => {
    setFormData({
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image,
      date: item.date,
    });
    setImageFile(null);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDeleteId) return;

    try {
      const response = await fetch(`/api/admin/activities/${itemToDeleteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Gagal menghapus kegiatan.');
      }
      fetchActivities();
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center p-8 bg-red-50 dark:bg-red-900 rounded-xl shadow-sm">
        <p className="text-red-600 dark:text-red-300 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4 animate-slideUp">
        <Trophy className="w-10 h-10 text-green-600 dark:text-green-400" />
        <h1 className="text-3xl md:text-4xl font-extrabold">Manajemen Kegiatan</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-lg animate-fadeIn delay-100">
        <h2 className="text-xl font-semibold mb-4">
          {formData.id ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Judul Kegiatan"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          />
          <textarea
            name="description"
            placeholder="Deskripsi Kegiatan"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          />
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Unggah Gambar
            </label>
            <input
              type="file"
              id="image-upload"
              name="image"
              onChange={handleFileChange}
              required={!formData.id && !formData.image}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
            {formData.image && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Gambar saat ini: {formData.image}
              </p>
            )}
          </div>
          <input
            type="date"
            name="date"
            placeholder="Tanggal"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-md transition-all hover:bg-blue-700 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Menyimpan...'
                : formData.id
                ? 'Simpan Perubahan'
                : 'Tambah Kegiatan'}
            </button>
            {formData.id && (
              <button
                type="button"
                onClick={() =>
                  setFormData({ id: '', title: '', description: '', image: '', date: '' })
                }
                className="px-6 py-3 rounded-full border border-gray-300 text-gray-800 font-semibold shadow-sm transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-lg animate-fadeIn delay-200">
        <h2 className="text-xl font-semibold mb-4">
          Daftar Kegiatan ({activities.length})
        </h2>
        <div className="space-y-4">
          {activities.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 transition-all hover:shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 text-sm rounded-full bg-yellow-500 text-white shadow-md hover:bg-yellow-600 transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="px-4 py-2 text-sm rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl w-full max-w-sm mx-4">
            <h3 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Apakah Anda yakin ingin menghapus kegiatan ini?
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

export default AdminActivityPage;