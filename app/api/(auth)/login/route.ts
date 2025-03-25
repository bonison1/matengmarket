import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
  try {
    const { emailOrPhone, password } = await req.json();

    const customer = await prisma.customers.findFirst({
      where: {
        OR: [
          { email: emailOrPhone },
          { phone: emailOrPhone },
        ],
      },
    });

    if (!customer) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          customer_id: customer.customer_id,
          token: customer.token,
          name: customer.name,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Login failed' }, { status: 500 });
  }
};
