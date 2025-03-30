import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated()

    if(!isUserAuthenticated) redirect('/sign-in')

    return (
        <div className='root-layout'>
            <nav>
                <Link href="/" className='flex items-center gap-2'>
                    <Image src="/logo.png" alt="Logo" width={50} height={50} className='rounded-full' />
                    <h1 className='text-2xl font-bold text-primary-100'>AI Interviewer</h1>
                </Link>
            </nav>
            {children}
        </div>
    )
}

export default RootLayout