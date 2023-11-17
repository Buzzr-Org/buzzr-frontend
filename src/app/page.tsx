'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000';


export default function Home() {

  const router = useRouter()

  const User = JSON.parse(window.localStorage.getItem('user') || '{}');

  if(User.token) {
    router.push('/dashboard')
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    const { email, password } = formData
    console.log(formData)

    try{
      const res = await axios.post('/api/login', {
        email,
        password,
      });

      console.log(res.data);
      const user = res.data.data.user;
      window.localStorage.setItem('user', JSON.stringify({
        name: user.name,
        email: user.email,
        token: res.data.data.token
      }));
      toast.success(`Login successful`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.push('/dashboard');
    } catch (err: any) {
      console.log(err.response.data);
      toast.error(`${err.response.data.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // alert(err.response.data.message || "Something went wrong")
    }
  }

  return (
    <div className="bg-slate-300 h-[100vh] flex flex-col justify-center items-center">
      <form className="flex flex-col w-[35%] [&>*]:my-2 items-center p-[2rem] border rounded-lg" onSubmit={handleSubmit}>
        Login
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
        <button className='py-1 w-full border rounded-md' type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  )
}
