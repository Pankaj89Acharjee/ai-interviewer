import InterviewCards from '@/components/InterviewCards'
import { Button } from '@/components/ui/button'
import { getCurrentUser, } from '@/lib/actions/auth.action'
import { getInterviewByUserId, getLatestInterviews } from '@/lib/actions/general.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const user = await getCurrentUser()

  // PARALLEL DATA FETCHING = An advance method of calling two API calls at the same time independent of each other
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! })
  ]);




  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;


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
            <Link href='/interview' className='w-full'>
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
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCards {...interview} key={interview.id} />
            ))
          ) : (
            <p>Sorry! You don't have taken any interviews till now</p>
          )}
        </div>
      </section>



      <section className='flex flex-col gap-6 mt-8'>
        <h2 className='text-accent-foreground'>
          Practice Interview
        </h2>


        <div className='interviews-section'>

          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCards {...interview} key={interview.id} />
            ))
          ) : (
            <p>Sorry! No new interview is available.</p>
          )}


        </div>
      </section>
    </>
  )
}

export default page