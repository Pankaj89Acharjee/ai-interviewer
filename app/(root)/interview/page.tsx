import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const Page = async () => {

    const user = await getCurrentUser();


    return (
        <div>
            Interview Page

            <Agent userName={user?.name || ''} userId={user?.id} type="generate" />
        </div>
    )
}

export default Page