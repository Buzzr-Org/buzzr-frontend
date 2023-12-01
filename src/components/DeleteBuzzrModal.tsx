import React from 'react'
import axios from 'axios'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
    ModalFooter
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { useBuzzrStore } from '@/store/Buzzr'

interface Props {
    id: string,
}

const ModalContainer = (props:Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { deleteBuzzr } = useBuzzrStore()
    
    const handleDelete = async() => {
        const user = JSON.parse(window.localStorage.getItem('user') || '{}')
        try {
            const res = await axios.delete(`/api/quiz/${props.id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            deleteBuzzr(props.id)
            onClose()
            toast.success(`${res.data.message}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err:any) {
            toast.error(`${err.response?.data.message || err.message} `, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleOpen = (e:any) => {
        e.stopPropagation()
        onOpen()
    }

    return (
        <>
          <button className={`bg-[#9c545f] py-1 px-2 text-white rounded-md`} onClick={(e)=>{handleOpen(e)}}>Delete</button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Are you sure?</ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <div className='flex gap-2 w-full justify-center'>
                    <button onClick={handleDelete}  className='w-[40%] border-2 border-[#333] rounded-md px-3 py-1'>Yes</button>
                    <button onClick={onClose}  className='w-[40%] bg-[#333] text-white border-2 border-[#333] rounded-md px-3 py-1'>No</button>
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ModalContainer