import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const GET = async (req: NextRequest, { params }: { params: { buyer_id: string } }) => {
  try {
    const { buyer_id } = params;

    const latestOrder = await prisma.order_rec.findFirst({
      where: {
        buyer_id,
        is_ordered: 0,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!latestOrder) {
      return NextResponse.json({ success: false, message: 'No active draft order found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: latestOrder }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching latest order:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};
