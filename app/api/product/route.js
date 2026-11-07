import { NextResponse } from 'next/server';
import clientPromise from '@/utils/db';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("med-magic-db"); // Replace with your database name

    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}