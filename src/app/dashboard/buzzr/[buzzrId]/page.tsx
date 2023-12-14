'use client'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { BASE_URL } from '@/utils/constants'
axios.defaults.baseURL = BASE_URL
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import AddQuesModal from '@/components/AddQuesModal'

interface Question {
    question: {
    _id: string;
    text: string;
    options: Array<{
        option: string;
        isRight: boolean;
    }>;
    media:{
        link: string | null,
        type: string
    }
    },
    time: number,
    points: number
}

interface Buzzr {
    _id: string;
    title: string;
    maxQuestions: number;
    questions: Array<Question>;
}

const page = ({params}:{
    params: {
        buzzrId: string
    }
}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [buzzr, setBuzzr] = useState<Buzzr>({
        _id: params.buzzrId,
        title: '',
        maxQuestions: 0,
        questions: []
    })

    useEffect(() => {
        if(typeof window !== 'undefined') {
            const user = JSON.parse(window.localStorage.getItem('user') || '{}')
            axios.get(`/api/quiz/${params.buzzrId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }).then((res:any) => {
                // console.log(res)
                setBuzzr(res.data.data.quiz)
                setLoading(false)
            }).catch((err:any) => {
                console.log(err)
                if(err.response?.status === 401){
                    window.localStorage.removeItem('user')
                    router.push('/login')
                }
                toast.error(`${err.response?.data.message || err.message} `, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(false);
            })
        }
    }, [])

    return (
      <div className='h-[98vh] p-5 w-full'>
          {loading ? (
              <div className='flex justify-center items-center h-full'>
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-3 border-gray-900"></div>
              </div>
          ) : (
              <>
                <h1 className='text-3xl font-bold text-center py-4'>{buzzr.title}</h1>
                <div className='text-2xl font-semibold flex justify-around'>
                    <div>Max Questions: {buzzr.maxQuestions}</div>
                    <div>Total Questions: {buzzr.questions.length}</div>
                </div>
                <AddQuesModal quizId={buzzr._id} />
                <div className='mt-5'>
                    {buzzr.questions.map((question, index) => (
                        <div key={question.question._id} className='border-2 border-gray-900 rounded-lg p-5 mb-5'>
                            <h3 className='text-lg font-semibold'>{index+1}. {question.question.text}</h3>
                        </div>
                    ))}
                </div>
              </>  
              )}
      </div>
    )
}

export default page