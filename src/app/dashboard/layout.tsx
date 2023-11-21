import React from 'react'
import Sidenav from '@/components/Sidenav'
import Workspace from '@/components/Workspace'

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className='h-[100vh] p-2 flex bg-[#222] text-[#1b1b2e] items-center'>
            <Sidenav />
            <Workspace>
                {children}
            </Workspace>
        </div>
    )
}