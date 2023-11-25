import React from 'react'

interface Prop {
    children: React.ReactNode
}

const Workspace = ({children}:Prop) => {
  return (
    <div className='w-[100%] min-h-[98vh] ml-2 bg-[#eee] rounded-md flex flex-col items-center justify-evenly'>
        {children}
    </div>
  )
}

export default Workspace