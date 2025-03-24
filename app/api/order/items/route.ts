import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { order_id, items } = body;

    if (!order_id || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Missing order_id or items' }, { status: 400 });
    }

    // ✅ Bulk Insert Order Items
    const newItems = await prisma.order_item.createMany({
      data: items.map((item) => ({
        order_id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        added_at: new Date(),
      })),
      skipDuplicates: true, // Prevents inserting duplicates
    });

    return NextResponse.json({ success: true, data: newItems }, { status: 201 });

  } catch (error) {
    console.error('❌ Error adding order items:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};


export const GET = async (req: NextRequest) => {
    try {
      const url = new URL(req.url);
      const order_id = url.searchParams.get('order_id');
  
      if (!order_id) {
        return NextResponse.json({ success: false, message: 'Missing order_id' }, { status: 400 });
      }
  
      const orderItems = await prisma.order_item.findMany({
        where: { order_id },
      });
  
      return NextResponse.json({ success: true, data: orderItems }, { status: 200 });
  
    } catch (error) {
      console.error('❌ Error fetching order items:', error);
      return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
  };
  

  export const PUT = async (req: NextRequest) => {
    try {
      const body = await req.json();
      const { order_id, items } = body;
  
      if (!order_id || !Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ success: false, message: 'Missing order_id or items' }, { status: 400 });
      }
  
      // ✅ Delete existing items for this order_id
      await prisma.order_item.deleteMany({ where: { order_id } });
  
      // ✅ Re-insert updated items
      const updatedItems = await prisma.order_item.createMany({
        data: items.map((item) => ({
          order_id,
          product_id: item.product_id,
          product_name: item.product_name,
          quantity: item.quantity,
          added_at: new Date(),
        })),
      });
  
      return NextResponse.json({ success: true, data: updatedItems }, { status: 200 });
  
    } catch (error) {
      console.error('❌ Error updating order items:', error);
      return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
  };
  