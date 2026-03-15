import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { totalAmount, customerName, phoneNumber, items } = body;

    // ១. បញ្ចូលទិន្នន័យទៅក្នុងតារាង `order`
    // យើងបន្ថែម customerName និង phoneNumber ដើម្បីឱ្យ Frontend បង្ហាញឈ្មោះបាន
    const orderQuery = "INSERT INTO `order` (totalAmount, customerName, phoneNumber, status, createdAt) VALUES (?, ?, ?, ?, NOW())";
    const orderValues = [totalAmount || 0, customerName || 'Guest', phoneNumber || '', 'Pending'];

    const [orderResult]: any = await db.execute(orderQuery, orderValues);
    const orderId = orderResult.insertId;

    if (items && Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        // item គួរតែមាន productId, quantity, price
        const itemQuery = "INSERT INTO `order_items` (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)";
        await db.execute(itemQuery, [orderId, item.productId, item.quantity, item.price]);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "ការកុម្ម៉ង់ត្រូវបានរក្សាទុក",
      id: orderId 
    });

  } catch (error: any) {
    console.error("SERVER_ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// បន្ថែម GET Method ដើម្បីឱ្យ Frontend ទាញទិន្នន័យបាន (Optional បើអ្នកមិនទាន់មាន)
export async function GET() {
  try {
    // ទាញយក Order ទាំងអស់មកបង្ហាញ
    const [rows] = await db.execute("SELECT * FROM `order` ORDER BY createdAt DESC");
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}