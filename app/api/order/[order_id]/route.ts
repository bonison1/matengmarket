import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const PUT = async (req: NextRequest, { params }: { params: { order_id: string } }) => {
  try {
    const { order_id } = params;
    const body = await req.json();

    const updatedOrder = await prisma.order_rec.update({
      where: { order_id },
      data: body,
    });

    return NextResponse.json({ success: true, data: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error('❌ Error updating order:', error);
    return NextResponse.json({ success: false, message: 'Order not found or update failed' }, { status: 500 });
  }
};
