import React from 'react'

const page = ({params}:{
    params: {
        buzzrId: string
    }
}) => {
  return (
    <div className='h-[98vh] p-5 w-full'>
        <h1 className='text-3xl text-semibold text-center'>{params.buzzrId}</h1>
    </div>
  )
}

export default page