import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// ✅ POST - Add or Update Order Items
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { order_id, items } = body;

    if (!order_id || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Missing order_id or items' }, { status: 400 });
    }

    // Start a transaction to ensure atomic operations
    const result = await prisma.$transaction(async (tx) => {
      // Check if order_id already has items
      const existingItems = await tx.order_item.findMany({
        where: { order_id },
        select: { product_id: true, quantity: true },
      });

      if (existingItems.length > 0) {
        // Update existing order: Sync items
        const existingMap = new Map(existingItems.map(item => [item.product_id, item.quantity]));
        const itemsToUpsert = items.map(item => ({
          order_id,
          product_id: item.product_id,
          product_name: item.product_name,
          quantity: item.quantity,
          added_at: new Date(),
        }));

        // Upsert items (update if exists, create if new)
        for (const item of itemsToUpsert) {
          await tx.order_item.upsert({
            where: {
              unique_id: {
                order_id: item.order_id,
                product_id: item.product_id,
              },
            },
            update: {
              quantity: item.quantity,
              product_name: item.product_name,
            },
            create: item,
          });
        }

        // Delete items that are no longer in the list
        const newProductIds = new Set(items.map(item => item.product_id));
        const itemsToDelete = existingItems
          .filter(item => !newProductIds.has(item.product_id))
          .map(item => item.product_id);

        if (itemsToDelete.length > 0) {
          await tx.order_item.deleteMany({
            where: {
              order_id,
              product_id: { in: itemsToDelete },
            },
          });
        }
      } else {
        // Create new order items
        await tx.order_item.createMany({
          data: items.map((item) => ({
            order_id,
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            added_at: new Date(),
          })),
          skipDuplicates: true,
        });
      }

      // Fetch updated items
      const updatedItems = await tx.order_item.findMany({
        where: { order_id },
        orderBy: { added_at: 'asc' },
      });

      return updatedItems;
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error('❌ Error processing order items:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};

// ✅ GET - Fetch Order Items
export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const order_id = url.searchParams.get('order_id');

    if (!order_id) {
      return NextResponse.json({ success: false, message: 'Missing order_id' }, { status: 400 });
    }

    const orderItems = await prisma.order_item.findMany({
      where: { order_id },
      orderBy: { added_at: 'asc' },
    });

    return NextResponse.json({ success: true, data: orderItems }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching order items:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};