'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContactMessage } from '@prisma/client';
import { Loader2, Reply, ChevronLeft } from 'lucide-react';

interface ReplyPageProps {
  params: {
    id: string;
  };
}

const ReplyPage = ({ params }: ReplyPageProps) => {
  const router = useRouter();
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch(`/api/admin/contact/${params.id}`);
      const data = await response.json();
      setMessage(data);
      setReplySubject(`Re: ${data.subject || 'Pesan Kontak'}`);
      setLoading(false);
    };
    fetchMessage();
  }, [params.id]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replySubject || !replyMessage) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      alert('Balasan berhasil dikirim!');
      router.back();
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!message) {
    return (
      <div className="text-center p-8">
        <p>Pesan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-4 animate-slideUp">
        <h1 className="text-3xl md:text-4xl font-extrabold">Balas Pesan</h1>
      </div>

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Kembali ke Kotak Masuk
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-lg animate-fadeIn delay-100">
        <form onSubmit={handleSendReply} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Kepada
            </label>
            <input
              type="email"
              value={message.email}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 cursor-not-allowed"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Pengirim
            </p>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              info@smkrakyat.sch.id
            </p>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subjek
            </label>
            <input
              type="text"
              id="subject"
              value={replySubject}
              onChange={(e) => setReplySubject(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Pesan Balasan
            </label>
            <textarea
              id="message"
              rows={8}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSending}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-sm transition-all ${
                isSending
                  ? 'bg-blue-300 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSending && <Loader2 className="h-4 w-4 animate-spin" />}
              Kirim Balasan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyPage;
