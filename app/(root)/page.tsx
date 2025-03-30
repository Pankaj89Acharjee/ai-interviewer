import InterviewCards from '@/components/InterviewCards'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg mx-auto text-center'>
          <h2>Practice with AI to grade up your interview Skills</h2>

          <p className='text-lg'>Explore with numerous fields of study to match your topic and stay updated and skilled with your knowledge
          </p>

          <Button
            asChild
            className='btn-primary max-sm:w-full justify-center items-center text-center'>
            <Link href='/practice' className='w-full'>
              Start Practicing
            </Link>
          </Button>
        </div>

        <Image
          src='/robot.png'
          alt='robot-image'
          width={300}
          height={300}
          className='max-sm:hidden'
        />
      </section>



      <section className='flex flex-col gap-6 mt-8'>
        <h2 className='text-accent-foreground'>Your Interview Section</h2>

        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCards {...interview} key={interview.id} />
          ))}
        </div>
      </section>



      <section className='flex flex-col gap-6 mt-8'>
        <h2 className='text-accent-foreground'>Practice Interview</h2>


        <div className='interviews-section'>

          {dummyInterviews.map((interview) => (
            <InterviewCards {...interview} key={interview.id}/>
          ))}


        </div>
      </section>
    </>
  )
}

export default page