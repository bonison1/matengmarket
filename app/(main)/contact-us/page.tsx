'use client'

import React, { useState } from 'react'
import Footer from '@/components/footer/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Mail, Phone, MapPinCheck, MessagesSquare, ArrowUpRight } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from "sonner";

export default function page() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Message sent successfully!', {
          position: 'top-right',
          duration: 4000,
        })
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        position: 'top-right',
        duration: 4000,
      })
      // console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScrollArea>
      <div className="w-[100vw] h-[100svh] relative flex flex-col justify-between poppins">
        <div className="w-full max-w-[1200px] mx-auto mb-4 px-8 py-4 xl:p-4 relative">
          <div className='h-16'></div>
          <div className='mb-6 space-y-2 mt-2'>
            <Button variant="outline" className='rounded-full text-xs'>Reach Us</Button>
            <CardTitle className='text-3xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400'>Speak with Our Friendly Team</CardTitle>
            <CardDescription className='text-base md:text-lg'>We'd love to assist you. Fill out the form or drop us an email.</CardDescription>
          </div>

          <div className='w-full flex flex-col md:flex-row gap-6 mb-6'>
            <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className='h-full p-4 flex flex-col justify-center'>
                <span><Mail /></span>
                <span className='text-xl sm:text-2xl font-semibold mt-3 sm:mt-6'>Email Us</span>
                <span className='text-gray-300 text-xs sm:text-sm'>Our team is ready to assist.</span>
                <span className='text-sm sm:text-base mt-2'>abc@example.com</span>
              </div>
              <div className='h-full p-4 flex flex-col justify-center'>
                <span><Phone /></span>
                <span className='text-xl sm:text-2xl font-semibold mt-3 sm:mt-6'>Call Us</span>
                <span className='text-gray-300 text-xs sm:text-sm'>We're available Mon-Fri, 9am-5pm.</span>
                <span className='text-sm sm:text-base mt-2'>+123 456 7890</span>
              </div>
              <div className='h-full p-4 flex flex-col justify-center'>
                <span><MapPinCheck /></span>
                <span className='text-xl sm:text-2xl font-semibold mt-3 sm:mt-6'>Visit Us</span>
                <span className='text-gray-300 text-xs sm:text-sm'>Drop by our office for a chat.</span>
                <span className='text-sm sm:text-base mt-2'>1234 Street Name, City Name</span>
              </div>
              <div className='h-full p-4 flex flex-col justify-center'>
                <span><MessagesSquare /></span>
                <span className='text-xl sm:text-2xl font-semibold mt-3 sm:mt-6'>Chat with Us</span>
                <span className='text-gray-300 text-xs sm:text-sm'>Our team is ready to assist you.</span>
                <span className='text-sm sm:text-base mt-2'>+123 456 7890</span>
              </div>
            </div>

            <div className='md:w-2/5'>
              <Card className='w-full'>
                <CardHeader>
                  <CardTitle className='text-2xl'>Get in Touch</CardTitle>
                  <CardDescription className='text-xs'>We're here to help—reach out with any questions or feedback.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className='space-y-4'>
                    <div className="flex gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="firstName" className='text-xs'>First Name</Label>
                        <Input
                          type="text"
                          id="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="lastName" className='text-xs'>Last Name</Label>
                        <Input
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="email" className='text-xs'>Email</Label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="subject" className='text-xs'>Subject</Label>
                      <Input
                        type="text"
                        id="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="message" className='text-xs'>Message</Label>
                      <Textarea
                        placeholder="Type your message here."
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className='w-full flex justify-end mt-4'>
                      <Button
                        type="submit"
                        className="w-fit text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </form>
              </Card>
            </div>
          </div>

          <div className='my-[5rem] space-y-2'>
            <div className='mb-4'>
              <CardTitle className='text-2xl sm:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400'>Stay Connected!</CardTitle>
              <CardDescription className='text-sm sm:text-base'>Join our community and never miss important announcements.</CardDescription>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {[
                {
                  name: 'LinkedIn',
                  url: 'https://www.linkedin.com/company/yourcompany',
                  description: 'Connect with us and explore career opportunities.',
                  path: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                },
                {
                  name: 'Instagram',
                  url: 'https://www.instagram.com/yourcompany',
                  description: 'Follow us for new updates, contents, and more.',
                  path: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                },
                {
                  name: 'Twitter',
                  url: 'https://twitter.com/yourcompany',
                  description: 'Follow our latest updates and announcements.',
                  path: "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"
                },
                {
                  name: 'Facebook',
                  url: 'https://www.facebook.com/yourcompany',
                  description: 'Like our page for news, updates, and community engagement.',
                  path: "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"
                }
              ].map((social) => (
                <Card
                  key={social.name}
                  className='w-full relative overflow-hidden cursor-pointer group'
                  onClick={() => window.open(social.url, '_blank')}
                >
                  <CardContent className="relative z-10">
                    <div className='flex flex-col justify-center'>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          width='32px'
                          fill='#fafafa'
                          className="transition-transform duration-300 group-hover:scale-110"
                        >
                          <path d={social.path} />
                        </svg>
                      </span>
                      <span className='text-xl font-semibold mt-6 transition-colors duration-300 group-hover:text-white'>
                        {social.name}
                      </span>
                      <span className='text-gray-300 text-sm transition-colors duration-300 group-hover:text-gray-100'>
                        {social.description}
                      </span>
                    </div>
                  </CardContent>

                  {/* Background overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/70 group-hover:to-blue-700/70 transition-all duration-300" />

                  {/* Animated arrow */}
                  <div className="absolute top-4 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:translate-x-2 z-100">
                  <ArrowUpRight />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div >
    </ScrollArea >
  )
}
