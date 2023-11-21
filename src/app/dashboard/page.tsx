'use client'
import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user') || '{}');
        if(!user.token) {
            router.push('/')
        }
    }, [])

    return (
        <div  className='text-3xl font-semibold p-4 w-[100%] text-center'>Welcome to the Dashboard!</div>
    )
}

export default Page