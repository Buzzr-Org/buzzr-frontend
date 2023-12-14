'use client'
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ModalContainer from '@/components/ModalContainer'
import DeleteQuesModal from '@/components/DeleteQuesModal'
import { BASE_URL } from '@/utils/constants'
import { toast } from 'react-toastify'
import CreateQuesModal from '@/components/CreateQuesModal'
import ViewQuesForm from '@/components/ViewQuesForm'
import { useQuestionStore } from '@/store/Questions'
axios.defaults.baseURL = BASE_URL


const page = () => {
  const router = useRouter()

  interface Question {
    _id: string
    text: string
    options: Array<{
      option: string
      isRight: boolean
    }>
    media:{
      link: string | null,
      type: string
    }
  }
  // const [questions, setQuestions] = React.useState<Array<Question>>([])
  const {questions, setQuestions, removeAllQuestions} = useQuestionStore()
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    if(typeof window !== 'undefined') {
      const user = JSON.parse(window.localStorage.getItem('user') || '{}')
      axios.get('/api/myquestions', {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "ngrok-skip-browser-warning":"any"
        }
      }).then((res:any) => {
        // console.log(res)
        removeAllQuestions()
        const questions = res.data.data.questions;
        setQuestions(questions)
        setLoading(false)
      }).catch((err:any) => {
        console.log(err)
        if(err.response?.status === 401){
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
        setLoading(false);
      })
    }
  }, [])

  return (
    <div className='h-[98vh] w-full mx-auto text-xl'>
      <div className="text-3xl font-semibold p-4 w-[100%] text-center">
        My Questions
      </div>
      <CreateQuesModal />
      <div className='w-full p-6 max-h-[70vh] overflow-y-scroll'>
        {loading ? (
          <div className="text-3xl font-semibold p-4 w-[100%] text-center">
            Loading...
          </div>
        ):
        (<div className="text-xl text-white overflow-y-scroll">
          {questions.map((question, index) => {
            return (
              <div className="bg-[#8f6c95] flex gap-4 p-2 mb-2 rounded-md w-full">
                <div className='flex px-1 text-2xl justify-center items-center'>
                <div className="mr-2">Q: &nbsp;{question.text}</div>
                Options:
                {
                  question.options.map((option, index) => {  
                    return (
                      <div key={index} className="pl-2">{index + 1}: &nbsp; {option.option}</div>
                    )
                  })
                }
                </div>
                <div className='ml-auto'>
                <ModalContainer
                  title='Question' 
                  buttonText='View' 
                  buttonColor='#222'
                >
                  <ViewQuesForm question={question}/>
                </ModalContainer>
                <DeleteQuesModal
                  id={question._id}
                />
                </div>
              </div>
              
            )
          })}
        </div>)}
      </div>
    </div>
  )
}

export default page