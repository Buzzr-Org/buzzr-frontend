import React from 'react'

interface Prop {
    children: React.ReactNode
}

const Workspace = ({children}:Prop) => {
  return (
    <div className='w-[100%] h-[100%] ml-2 bg-[#eee] rounded-md flex flex-col items-center'>
        {children}
    </div>
  )
}

export default Workspace