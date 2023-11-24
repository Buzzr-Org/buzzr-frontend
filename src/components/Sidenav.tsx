'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter,usePathname } from 'next/navigation'

const navLinks = [
  {name: 'Home',link: '/dashboard'},
  {name: 'My Buzzrs',link: '/dashboard/buzzrs'},
  {name: 'Question Bank',link: '/dashboard/questions'},
  {name: 'Leaderboards',link: '/dashboard/leaderboard'},
  {name: 'Library',link: '/dashboard/library'},
]

const Sidenav = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div className='flex flex-col w-[16vw] h-[100%] bg-[#eee] rounded-md'>
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
      <button className='text-center bg-[#222] shadow-md text-[#ddd] rounded-md py-2 mt-auto mb-[10%] w-[95%] self-center' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Sidenav