import React from 'react'

const notFound = () => {
    return (
        <div className="bg-[#222] text-[#ccc] font-semibold text-6xl h-[100vh] flex flex-col justify-center items-center">
          404
          <div className='text-3xl my-4'>Whoops! The page you are looking for does not exist.</div>
        </div>
    );
}

export default notFound