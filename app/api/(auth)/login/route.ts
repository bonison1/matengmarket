import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const POST = async (req: NextRequest) => {
  try {
    const { emailOrPhone, password } = await req.json();

    // Find customer by email or phone
    const customer = await prisma.customers.findFirst({
      where: {
        OR: [
          { email: emailOrPhone },
          { phone: emailOrPhone },
        ],
      },
    });

    if (!customer) {
      return NextResponse.json({ success: false, message: 'Customer not found' }, { status: 404 });
    }

    if (customer.password !== password) {
      return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    }

    // Return only required fields (customer_id and token)
    return NextResponse.json(
      {
        success: true,
        data: {
          customer_id: customer.customer_id,
          token: customer.token,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Login failed' }, { status: 500 });
  }
};
