import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
  try {
    const { emailOrPhone, dob, newPassword } = await req.json();

    if (!emailOrPhone || !dob || !newPassword) {
      return NextResponse.json({ message: 'Email/Phone, DOB, and new password are required.' }, { status: 400 });
    }

    const customer = await prisma.customers.findFirst({
      where: {
        AND: [
          {
            OR: [{ email: emailOrPhone }, { phone: emailOrPhone }]
          },
          { dob: new Date(dob) }
        ]
      }
    });

    if (!customer) {
      return NextResponse.json({ message: 'Customer not found or DOB does not match.' }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.customers.update({
      where: { customer_id: customer.customer_id },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ message: 'Password updated successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
};
