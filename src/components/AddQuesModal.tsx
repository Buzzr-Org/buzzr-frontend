import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import {BASE_URL} from '@/utils/constants'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
axios.defaults.baseURL = BASE_URL

const AddQuesModal = (params:{
    quizId: string
}) => {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = React.useState(true)
    const [questions, setQuestions] = React.useState([])

    useEffect(() => {
        if(typeof window !== 'undefined') {
        const user = JSON.parse(window.localStorage.getItem('user') || '{}')
        axios.get(`/api/quiz/${params.quizId}/getUnselectedQuestions`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
                "ngrok-skip-browser-warning":"any"
            }   
        }).then((res:any) => {
            console.log(res.data.data)
            setQuestions(res.data.data.questions)
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
        })
        }
    }, []);

    return (
        <>
            <button className={`bg-emerald-500 py-2 px-4 text-white rounded-md m-2 ml-6`} onClick={onOpen}>Create</button>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Question</ModalHeader>
                <ModalCloseButton />
                {loading ? (
                    <div className='flex justify-center items-center h-full p-5'>
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-3 border-gray-900"></div>
                    </div>
                    ) : (
                        <div>
                            {questions.map((question:any) => (
                                <div className='flex justify-between items-center p-2 border-b-2 border-gray-200'>
                                    <p className='text-lg font-bold'>{question.text}</p>
                                </div>
                            ))}
                        </div>
                    )
                }
            </ModalContent>
          </Modal>
        </>
    )
}

export default AddQuesModal