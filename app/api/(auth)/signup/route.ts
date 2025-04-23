import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password, address, phone, whatsapp, dob } = await req.json();

    const existingUser = await prisma.customers.findFirst({
      where: {
        OR: [{ email }, { phone: phone ?? undefined }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email or Phone already registered.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await prisma.customers.create({
      data: {
        name,
        dob: dob ? new Date(dob) : undefined,
        email,
        password: hashedPassword,
        address,
        phone,
        whatsapp,
        token: crypto.randomUUID(),
        created_at: new Date(),
      },
    });

    if (email) {
      await sendSignupEmail(email, name);
    }

    const { password: _, ...customerData } = newCustomer;

    return NextResponse.json(
      {
        success: true,
        data: customerData,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Signup failed' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

const sendSignupEmail = async (toEmail: string, name: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'justmatengservice@gmail.com',
      pass: 'yqpw aoca ppsi pnhk',
    },
  });

  const mailOptions = {
    from: '"Justmateng" <justmatengservice@gmail.com>',
    to: toEmail,
    subject: 'Welcome to Mateng - Start Shopping Today!',
    html: `
      <p>Hi ${name},</p>

      <p>Thank you for signing up with us!</p>

      <p>We're excited to have you join our mateng community. Explore a wide range of products, place orders easily, and enjoy a seamless shopping experience.</p>

      <p>Happy Shopping!</p>

      <p>Best regards,<br/>
      The Mateng Team</p>
    `,
  };


  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send signup email:", error);
  } finally {
    await prisma.$disconnect();
  }
};
