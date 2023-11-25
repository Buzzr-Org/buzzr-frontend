import React from 'react'
import { ToastContainer } from 'react-toastify';
import { smoochSans } from '@/utils/fonts';

const layout = ({children}:{children: React.ReactElement}) => {
  return (
    <div className={`bg-[#222] h-[100vh] w-[100vw] flex flex-col justify-center items-center ${smoochSans.className}`}>
        {children}
        <ToastContainer />
    </div>
  )
}

export default layout