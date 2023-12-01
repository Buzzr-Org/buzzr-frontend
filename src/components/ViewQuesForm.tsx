import React from 'react'
import Image from 'next/image'
import { smoochSans } from '@/utils/fonts'

interface Props {
    question: {
        _id: string,
        text: string,
        options: Array<{
            option: string,
            isRight: boolean
        }>
        media: {
            link: string | null,
            type: string
        }
    }
}

const ViewQuesForm = (props:Props) => {
  return (
    <div  className={`flex flex-col ${smoochSans.className}`}>
        <div className='text-3xl font-bold'>{props.question.text}</div>
        {props.question.media.link && props.question.media.type === 'image' 
        && <Image
            className='rounded-md mx-auto'
            src={props.question.media.link}
            placeholder='blur'
            alt="question media"
            blurDataURL='/blur.png'
            width={200}
            height={200}
         />}
        <div className='flex flex-wrap'>
            {props.question.options.map((option, index) => {
                return (
                    <div key={index} className={`flex justify-center items-center w-[45%] m-1 text-xl rounded-sm bg-${option.isRight ? 'emerald-500' : 'sky-400'}`}>
                        <label className='ml-2'>{option.option}</label>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ViewQuesForm