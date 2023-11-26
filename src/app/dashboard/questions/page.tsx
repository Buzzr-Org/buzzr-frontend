'use client'
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ModalContainer from '@/components/ModalContainer'
import { BASE_URL } from '@/utils/constants'
axios.defaults.baseURL = BASE_URL


const page = () => {
  const router = useRouter()

  interface Option {
    option: string
  }

  interface Question {
    _id: string
    text: string
    options: Array<Option>
    answer: string
  }
  const [questions, setQuestions] = React.useState<Array<Question>>([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    if(typeof window !== 'undefined') {
      const user = JSON.parse(window.localStorage.getItem('user') || '{}')
      axios.get('/api/myquestions', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }).then((res:any) => {
        // console.log(res)
        const questions = res.data.data.questions
        questions.forEach((question: any) => {
          setQuestions(questions => [...questions, {
            _id: question._id,
            text: question.text,
            options: question.options,
            answer: question.answer
          }])
        })
        setLoading(false)
      }).catch((err:any) => {
        console.log(err)
        window.localStorage.removeItem('user')
        router.push('/login')
      })
    }
  }, [])

  return (
    <div className='h-[98vh] w-full mx-auto text-xl'>
      <div className="text-3xl font-semibold p-4 w-[100%] text-center">
        My Questions
      </div>
      <ModalContainer buttonText='Create' buttonColor='#599159'>
        <></>
      </ModalContainer>
      {/* <button  className='py-2 px-4 bg-[#599159] text-white rounded-md m-2 ml-6'>Create New</button> */}
      {/* <button className='py-2 px-4 bg-[#4d4db7] text-white rounded-md m-2 ml-6'>Bulk Upload</button> */}
      <div className='w-full p-6 max-h-[65vh] overflow-y-scroll'>
        {loading ? (
          <div className="text-3xl font-semibold p-4 w-[100%] text-center">
            Loading...
          </div>
        ):
        (<div className="text-xl text-white">
          {questions.map((question, index) => {
            return (
              <div className="bg-[#8f6c95] flex gap-4 p-2 rounded-md w-full">
                <div className="">Q: &nbsp;{question.text}</div>
                Options:
                {
                  question.options.map((option, index) => {  
                    return (
                      <div key={index} className="">{index + 1}: &nbsp; {option.option}</div>
                    )
                  })
                }
              </div>
              
            )
          })}
        </div>)}
      </div>
    </div>
  )
}

export default page