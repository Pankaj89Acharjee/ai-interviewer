import React from 'react'
import daysjs from 'dayjs'
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';
import TechIcons from './TechIcons';

const InterviewCards = ({ interviewId, role, type, techstack, createdAt }: InterviewCardProps) => {

    const feedback = null as Feedback | null
    //gi = global and case insensitive
    // if type is mix, then set it to mixed, else set it to the type
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    const formattedDate = daysjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY') //format the date to be like Jan 1, 2023


    return (
        <div className='card-border w-[360px] max-sm:w-full min-h-80'>
            <div className='card-interview'>
                <div>
                    <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-800'>
                        <p className='badge-text'>{normalizedType}</p>
                    </div>

                    <Image src={getRandomInterviewCover()} alt='interview-cover' width={45} height={45} className='text-end rounded-full object-fit size-[90px]' />

                    {/* Interview Topic section */}
                    <div className="mt-5">
                        <h1>{role} Interview</h1>
                    </div>

                    {/* Date and Rating section */}
                    <div className='flex flex-row gap-5 mt-3'>
                        <div className='flex flex-row gap-2'>
                            <Image src="/calendar.svg"
                                alt='calendar-icon'
                                width={15}
                                height={15}
                            />

                            <p>{formattedDate}</p>
                        </div>

                        <div className='flex flex-row gap-2 items-center'>
                            <Image src="/star.svg"
                                alt='rating-icon'
                                width={22}
                                height={22}
                            />

                            <p>{feedback?.totalScore || '---'}/100</p>
                        </div>
                    </div>

                    {/* Feedback message */}
                    <p className='line-clamp-3 mt-4'>
                        {feedback?.finalAssessment || 'No interview taken, try it out now.'}
                    </p>
                </div>

                {/* For techstack icons */}
                <div className='flex flex-row gap-2 mt-4 justify-between items-center'>
                <TechIcons techStack={ techstack} />

                    <Button className='btn-primary'>
                        <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>

                            {feedback ? 'View Feedback' : 'Start Interview'}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default InterviewCards