import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error('Error fetching public news:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}