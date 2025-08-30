'use client';

import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { useState, ChangeEvent, FormEvent } from 'react';

// definisi interface tipe data form
interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  // event handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='kontak' className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-300">
      <main className="py-16 md:py-24">
        {/* Header Section */}
        <section className="container mx-auto px-4 md:px-8 text-center animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold">
            Hubungi Kami
          </h1>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Jangan ragu untuk bertanya. Tim kami siap membantu Anda.
          </p>
        </section>

        {/* Content Section (Form & Info) */}
        <section className="container mx-auto px-4 md:px-8 mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Kontak dengan Gaya Minimalis */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 animate-fadeIn delay-100">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'success' && (
                <div className="p-3 text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200 rounded-md text-sm">
                  Pesan Anda telah terkirim!
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 text-red-700 bg-red-100 dark:bg-red-800 dark:text-red-200 rounded-md text-sm">
                  Terjadi kesalahan. Silakan coba lagi nanti.
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alamat Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-8 animate-fadeIn delay-200">
            {/* Informasi Kontak */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Informasi Kontak</h2>
              <div className="flex items-start space-x-4">
                <MapPinIcon className="h-6 w-6 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold">Alamat</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Jl. Vokasi No. 123, Jakarta, Indonesia
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mt-4">
                <PhoneIcon className="h-6 w-6 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold">Telepon</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    +62 812 3456 7890
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mt-4">
                <EnvelopeIcon className="h-6 w-6 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold">Email</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    info@smklando.sch.id
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Iframe Embed */}
            <div className="w-full h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521876402447!2d106.8456!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3d9b0f2a7a1%3A0x5d9b2e7a1b4d0c15!2sMonumen%20Nasional%20(Monas)!5e0!3m2!1sen!2sid!4v1627885448386!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;