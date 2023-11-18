'use client'
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidenav from '@/components/Sidenav'
import Workspace from '@/components/Workspace'

const Page = () => {
    const router = useRouter()

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user') || '{}');
        if(!user.token) {
            router.push('/')
        }
    }, [])

    return (
        <div className='h-[100vh] p-2 flex bg-[#222] text-[#1b1b2e] items-center'>
            <Sidenav page='' />
            <Workspace>
                <div className='text-3xl font-semibold p-4 w-[100%] text-center'>Welcome to the Dashboard!</div>
            </Workspace>
        </div>
    )
}

export default Page