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
    const activities = await prisma.activity.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(activities, { status: 200 });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, description, image, date } = await request.json();

    if (!title || !description || !image || !date) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newActivity = await prisma.activity.create({
      data: {
        title,
        description,
        image,
        date,
      },
    });

    return NextResponse.json(newActivity, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}