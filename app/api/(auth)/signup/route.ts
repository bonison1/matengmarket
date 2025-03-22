import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password, address, phone, whatsapp } = await req.json();

    const existingUser = await prisma.customers.findFirst({
      where: {
        OR: [{ email }, { phone: phone ?? undefined }],
      },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email or Phone already registered.' }, { status: 400 });
    }

    const newCustomer = await prisma.customers.create({
      data: {
        name,
        email,
        password,
        address,
        phone,
        whatsapp,
        token: crypto.randomUUID(),
        created_at: new Date(),
        // updated_at stays null
      },
    });

    // ✅ Send Email if email is provided
    // if (email) {
    //   await sendSignupEmail(email, name);
    // }

    return NextResponse.json({ success: true, data: newCustomer }, { status: 201 });
  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Signup failed' }, { status: 500 });
  }
};

// ✅ Email sending function
const sendSignupEmail = async (toEmail: string, name: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',    
      pass: 'your-app-password',        
    },
  });

  const mailOptions = {
    from: '"Your App Name" <your-email@gmail.com>',
    to: toEmail,
    subject: 'Welcome to Our Platform!',
    html: `<p>Hi ${name},</p><p>Thank you for signing up! We're excited to have you on board.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
