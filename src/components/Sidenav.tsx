import React from 'react'
import Link from 'next/link'

interface Props {
  page?: string
}

const Sidenav = (props: Props) => {

  const { page='' } = props

  return (
    <div className='flex flex-col w-[16vw] h-[100%] bg-[#eee] rounded-md'>
      <div className='text-3xl font-semibold p-4 w-[100%] text-center'>Buzzr</div>        
      <div className='flex flex-col items-center p-1 [&>*]:w-full'>
        <Link className='text-center border border-[#222] rounded-md py-2 my-1' href='/dashboard'>Home</Link>
        <Link className='text-center border border-[#222] rounded-md py-2 my-1' href='/dashboard'>Home</Link>
        <Link className='text-center border border-[#222] rounded-md py-2 my-1' href='/dashboard'>Home</Link>
        <Link className='text-center border border-[#222] rounded-md py-2 my-1' href='/dashboard'>Home</Link>
      </div>
    </div>
  )
}

export default Sidenav