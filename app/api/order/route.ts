import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Generate Unique Order ID
const generateOrderId = () => `ORD-${Date.now()}`;

// ✅ POST - Create New Order
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { buyer_id, ...rest } = body;

    if (!buyer_id) {
      return NextResponse.json({ success: false, message: 'buyer_id is required' }, { status: 400 });
    }

    const newOrder = await prisma.order_rec.create({
      data: {
        order_id: generateOrderId(),
        buyer_id,
        is_ordered: 0,
        ...rest,
      },
    });

    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};

// ✅ GET - Get All Orders
export const GET = async () => {
  try {
    const orders = await prisma.order_rec.findMany({
      include: { order_item: true, customers: true },
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};
