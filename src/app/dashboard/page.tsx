'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()

    const user = JSON.parse(window.localStorage.getItem('user') || '{}');

    if(!user.token) {
        router.push('/')
    }

    return (
        <div>
            Dashboard Page
        </div>
    )
}

export default Page