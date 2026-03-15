import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // ហៅ File ដែលយើងបង្កើតខាងលើ

export async function GET() {
  try {
    // ទាញទិន្នន័យទាំងអស់ពី Table products
    const [rows] = await db.execute('SELECT * FROM products ORDER BY createdAt DESC');
    
    // បញ្ជូនទិន្នន័យទៅឱ្យ Frontend ជាទម្រង់ JSON
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'មិនអាចទាញទិន្នន័យបានទេ' }, 
      { status: 500 }
    );
  }
}