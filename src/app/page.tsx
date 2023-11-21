'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const User = JSON.parse(window.localStorage.getItem('user') || '{}')
    if(User.token) {
      router.push('/dashboard')
    }else{
      router.push('/login')
    }
  }, [])
  return (
    <div className="bg-[#222] text-[#ccc] font-semibold text-3xl h-[100vh] flex flex-col justify-center items-center">
      Buzzr
    </div>
  )
}
