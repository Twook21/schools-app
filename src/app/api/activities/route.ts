import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    console.error('Error fetching public activities:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}