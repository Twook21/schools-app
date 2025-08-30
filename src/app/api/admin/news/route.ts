import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, summary, image, date } = await request.json();

    if (!title || !summary || !image || !date) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newNews = await prisma.news.create({
      data: {
        title,
        summary,
        image, 
        date,
      },
    });

    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}