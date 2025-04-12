// api/job-openings/route.ts (or similar path)
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const address = formData.get('address')?.toString();
    const currentAddress = formData.get('current_address')?.toString();
    const phone = formData.get('phone')?.toString();
    const position = formData.get('position')?.toString();
    const resumeFile = formData.get('resume') as Blob;
    const additionalData = formData.get('additional_data')?.toString();
    
    if (!name || !email || !phone || !position || !resumeFile) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    // Save resume locally in the public folder
    const resumePath = path.join(process.cwd(), 'public/resumes', resumeFile.name);
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    
    // Write the file to disk
    fs.writeFileSync(resumePath, resumeBuffer);

    const jobOpening = await prisma.job_openings.create({
      data: {
        name,
        email,
        address,
        current_address: currentAddress,
        phone,
        position,
        resume_url: `/resumes/${resumeFile.name}`,
        additional_data: additionalData,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: jobOpening }, { status: 201 });
  } catch (error) {
    console.error('Error uploading job opening:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
};
