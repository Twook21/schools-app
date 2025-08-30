import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding...');

  try {
    // Menghapus data lama (opsional, tergantung kebutuhan)
    await prisma.news.deleteMany({});
    await prisma.activity.deleteMany({});
    console.log('Data lama berhasil dihapus.');

    // Membuat data untuk model News
    const news1 = await prisma.news.create({
      data: {
        title: 'Pembukaan Acara Tahunan',
        summary: 'Acara tahunan yang dinanti-nantikan akhirnya dibuka dengan meriah oleh Rektor.',
        // Ini adalah URL gambar dari internet
        image: 'https://images.unsplash.com/photo-1549414283-d92e59e1964f?q=80&w=1470&auto=format&fit=crop',
        date: '2025-08-28',
      },
    });

    const news2 = await prisma.news.create({
      data: {
        title: 'Prestasi Mahasiswa di Kancah Internasional',
        summary: 'Tiga mahasiswa berhasil meraih medali emas dalam kompetisi robotik di Tokyo.',
        image: 'https://images.unsplash.com/photo-1522204523234-87295a70623b?q=80&w=1470&auto=format&fit=crop',
        date: '2025-08-25',
      },
    });

    // Membuat data untuk model Activity
    const activity1 = await prisma.activity.create({
      data: {
        title: 'Seminar Nasional Teknologi AI',
        description: 'Seminar ini akan membahas perkembangan terbaru dalam bidang Kecerdasan Buatan dan aplikasinya.',
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53347063d?q=80&w=1470&auto=format&fit=crop',
        date: '2025-09-10',
      },
    });

    const activity2 = await prisma.activity.create({
      data: {
        title: 'Lomba Desain Web Mahasiswa',
        description: 'Ajang kompetisi bagi mahasiswa untuk menunjukkan kreativitas dalam merancang website.',
        image: 'https://images.unsplash.com/photo-1550439062-609e1ba5ab56?q=80&w=1587&auto=format&fit=crop',
        date: '2025-10-05',
      },
    });

    console.log('Proses seeding berhasil!');
    console.log({ news1, news2, activity1, activity2 });
  } catch (error) {
    console.error('Terjadi kesalahan saat seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();