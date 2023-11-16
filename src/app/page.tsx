'use client'
// import { usePostsStore } from '@/store/Posts'
import { useState } from 'react'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000';


export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log(email, password)
    try{
      const res = await axios.post('/api/login', {
        email,
        password,
      });
      console.log(res.data);
    } catch (err: any) {
      console.log(err.response.data);
    }
  }

  return (
    <div className="bg-slate-300 h-[100vh] flex flex-col justify-center items-center">
      Login Page
      <form className="flex flex-col w-[40%] [&>*]:my-2" onSubmit={handleSubmit}>
        <input
          type="text" 
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password" 
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
