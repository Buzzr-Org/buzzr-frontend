import React from 'react'
import axios from 'axios'
import Image from 'next/image'
import { toast } from "react-toastify";
import {BASE_URL} from '@/utils/constants'
import { useQuestionStore } from '@/store/Questions';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
axios.defaults.baseURL = BASE_URL

const options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4'
]

const CreateQuesForm = () => {
    const {addQuestion} = useQuestionStore();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [formData, setFormData] = React.useState({
        question: '',
        options: [
            {option: '', isRight: false},
            {option: '', isRight: false},
            {option: '', isRight: false},
            {option: '', isRight: false},
        ]
    })

    const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
    const [loading, setLoading] = React.useState(false)
    
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        const user = JSON.parse(window.localStorage.getItem('user') || '{}')
        setLoading(true)
        try {
            const res = await axios.post('/api/quiz/question/create', {
                    text: formData.question,
                    options: JSON.stringify(formData.options),
                    file: selectedFile
                }, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${user.token}`
                    }
                });
            setLoading(false)
            toast.success(`${res.data.message}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
            addQuestion(res.data.data.question)
            setFormData({
                question: '',
                options: [
                    {option: '', isRight: false},
                    {option: '', isRight: false},
                    {option: '', isRight: false},
                    {option: '', isRight: false},
                ]
            })
            setSelectedFile(null)
            onClose()
        } catch (err:any) {
            console.log(err)
            toast.error(`${err.response?.data.message || err.message} `, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
            setLoading(false)
        }
    }

    const handleQuestionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setFormData({
            ...formData,
            question: value
        })
    }

    const handleRadioClick = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        const updatedOptions = formData.options.map((option, index) => {
            if(index === Number(value)){
                return {
                    ...option,
                    isRight: true
                }
            } else {
                return {
                    ...option,
                    isRight: false
                }
            }
        })
        console.log(updatedOptions)
        setFormData({
            ...formData,
            options: updatedOptions
        })
    }

    const handleOptionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        const updatedOptions = formData.options.map((option, index) => {
            if(index === Number(e.target.name)){
                return {
                    ...option,
                    option: value
                }
            } else {
                return option
            }
        })
        setFormData({
            ...formData,
            options: updatedOptions
        })
    }

  return (
    <>
          <button className={`bg-emerald-500 py-2 px-4 text-white rounded-md m-2 ml-6`} onClick={onOpen}>Create</button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Question</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit} className='flex flex-col w-full items-center justify-center'>
                    <input type="text" autoComplete='off' onChange={handleQuestionChange} placeholder='Question' className='p-2 my-2 w-[80%] rounded-md border border-[#222] outline-none' required/>
                    <input type='file' onChange={(e:any)=>setSelectedFile(e.target.files[0])} className='p-2 my-2 w-[80%] rounded-md border border-[#222] outline-none' accept="image/png, image/jpeg, image/gif"/>
                    <div className='w-[80%] flex flex-wrap'>
                        {
                            options.map((option, index) => {
                                return (
                                    <div key={index} className='flex gap-2 items-center w-full'>
                                        <input type="radio" onChange={handleRadioClick} name='option' value={index} required/>
                                        <input type="text" autoComplete='off' onChange={handleOptionChange} name={`${index}`} placeholder={option} className='p-2 my-2 w-[90%] rounded-md border border-[#222] outline-none' required/>
                                    </div>
                                )
                            })
                        }
                        <button disabled={loading}  className='py-1 w-full h-10 my-4 rounded-md bg-emerald-500 text-[#eee] flex justify-center items-center'>
                            {(loading)?
                            <Image
                            src="/spinner.gif"
                            alt="loading"
                            width={25}
                            height={25}
                            />
                            :"CREATE"}
                        </button>
                    </div>
                </form>
            </ModalContent>
          </Modal>
        </>
  )
}

export default CreateQuesForm