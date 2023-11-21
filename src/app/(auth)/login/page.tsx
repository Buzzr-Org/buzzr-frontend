'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000';


export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const User = JSON.parse(window.localStorage.getItem('user') || '{}');
    if(User.token) {
      router.push('/dashboard')
    }
  }, [])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    const { email, password } = formData

    try{
      const res = await axios.post('/api/login', {
        email,
        password,
      });
      const user = res.data.data.user;
      window.localStorage.setItem('user', JSON.stringify({
        name: user.name,
        email: user.email,
        token: res.data.data.token
      }));
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(`${err.response?.data.message || err.message} `, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="bg-[#222] h-[100vh] flex flex-col justify-center items-center">
      <form className="bg-[#eee] flex flex-col w-[65%] md:w-[35%] [&>input]:my-3 items-center p-[2rem] border rounded-lg" onSubmit={handleSubmit}>
        SIGN IN
        <input
          className='w-full py-1 px-2 border rounded-md'
          type="text" 
          name="email"
          placeholder='email'
          value={formData.email}
          onChange={(e) => setFormData({...formData,email:e.target.value})}
        />
        <input
          className='w-full py-1 px-2 border rounded-md'
          type="password" 
          name="password"
          placeholder='password'
          value={formData.password}
          onChange={(e) => setFormData({...formData,password:e.target.value})}
        />
        <button className='py-1 w-full my-4 rounded-md bg-[#222] text-[#eee]' type="submit">SUBMIT</button>
        <div>
            New User? <Link className='text-[#335] hover:text-[#444] mt-2' href='/signup'>Sign Up</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
