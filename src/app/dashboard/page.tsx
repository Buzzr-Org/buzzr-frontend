'use client'
import React,{useEffect, useState} from 'react'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'


const Container = ({children}:{
    children: React.ReactElement
}) =>{
    return (
        <div className='h-[55vh] w-[45%] m-5 rounded-md text-[#444] shadow-lg shadow-[#b086b7]'>
            {children}
        </div>
    )
}

const Page = () => {
    const router = useRouter()

    const [formData,setFormData] = useState({
        title: '',
        questions: 0
    })
    const [isDisabled,setDisabled] = useState(true)

    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const {name,value} = e.target
        setFormData(formData=>{
            return {
                ...formData,
                [name]: value
            }
        });
    }

    const handleQuesChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const {name,value} = e.target
        setFormData(formData=>{
            return {
                ...formData,
                [name]: Number(value)
            }
        })
    }

    useEffect(() => {
        if(formData.title.length>0 && formData.questions){
            setDisabled(prev=>false)
        }else{
            setDisabled(prev=>true)
        }
    }, [formData])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        try{
            const user = JSON.parse(window.localStorage.getItem('user') || '{}');
            const res = await axios.post('/api/quiz/create',{
                title: formData.title,
                maxQuestions: formData.questions
            },{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            console.log(res)
            toast.success(`${res.data.message}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
        }catch(err:any){
            console.log(err)
            if(err.response?.status == 401){
                window.localStorage.removeItem('user')
                router.push('/login')
            }
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
        <>
            <div  className='text-3xl font-semibold p-4 w-[100%] text-center'>Welcome to the Dashboard!</div>
            <div className='flex justify-center items-center w-[100%] h-[100%]'>
                <Container>
                    <>
                    <div className='text-3xl font-semibold p-4 w-[100%] text-center'>Create New Buzzr</div>
                    <form onSubmit={handleSubmit}  className='flex flex-col text-xl w-[80%] mx-auto [&>*]:mb-4 [&>*]:p-2 [&>*]:rounded-sm'>
                        <input className='' type="text" placeholder='Title' name='title' value={formData.title} onChange={handleTitleChange}/>
                        <select name="questions" onChange={handleQuesChange}>
                            <option value="" disabled selected>Number of questions</option>
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                            <option value='20'>20</option>
                        </select>
                        <button className='bg-[#333] text-white mt-10' disabled={isDisabled}>
                            CREATE
                        </button>
                    </form>
                    </>   
                </Container>
                <Container>
                    <div className='text-3xl font-semibold p-4 w-[100%] text-center'>My Buzzrs</div>   
                </Container>
            </div>
        </>
    )
}

export default Page