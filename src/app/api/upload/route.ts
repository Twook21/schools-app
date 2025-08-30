import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Buat nama file unik untuk menghindari konflik
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${crypto.randomBytes(16).toString('hex')}.${fileExtension}`;
    const filePath = join(process.cwd(), 'public', 'uploads', uniqueFilename);
    const fileUrl = `/uploads/${uniqueFilename}`;

    // Tulis file ke direktori lokal
    await writeFile(filePath, buffer);

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}