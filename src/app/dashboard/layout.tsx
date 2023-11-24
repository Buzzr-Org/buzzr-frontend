'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidenav from '@/components/Sidenav'
import Workspace from '@/components/Workspace'
import { smoochSans } from '@/utils/fonts';

export default function Layout({children}: {children: React.ReactNode}) {
    const router = useRouter()

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user') || '{}');
        if(!user.token) {
            router.push('/login')
        }
    }, [])

    return (
        <div className={`h-[100vh] p-2 flex bg-[#222] text-[#1b1b2e] items-center ${smoochSans.className}`}>
            <Sidenav />
            <Workspace>
                {children}
            </Workspace>
            <ToastContainer />
        </div>
    )
}