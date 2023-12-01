'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutModal from './LogoutModal'

const navLinks = [
  {name: 'Home',link: '/dashboard'},
  {name: 'Question Bank',link: '/dashboard/questions'},
  {name: 'Leaderboards',link: '/dashboard/leaderboard'},
  {name: 'Library',link: '/dashboard/library'},
]

const Sidenav = () => {
  const pathname = usePathname()

  return (
    <div className='flex flex-col w-[16vw] min-h-[98vh] bg-[#eee] rounded-md'>
      <div className='text-3xl font-semibold p-4 w-[100%] text-center'>Buzzr</div>        
      <div className='flex flex-col items-center p-1 mt-[40%] [&>*]:w-full'>
        {navLinks.map((link, index) => {
          const isActive = pathname.endsWith(link.link)
          return (
            <Link className={`text-center shadow-md border-[#cba5d2] rounded-md py-2 my-1 ${(isActive)?'bg-[#8f6c95] text-white':'hover:bg-slate-300'}`} key={index} href={link.link}>
              {link.name}
            </Link>
          )
        }
        )}
      </div>
      <LogoutModal/>
    </div>
  )
}

export default Sidenav