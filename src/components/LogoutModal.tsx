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
import { useRouter } from 'next/navigation'

const LogoutModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()

    const handleLogout = async() => {
      window.localStorage.removeItem('user')
      router.push('/login')
    }
    
    return (
        <>
            <button className='text-center bg-[#222] shadow-md text-[#ddd] rounded-md py-2 mt-auto mb-[10%] w-[95%] self-center' onClick={onOpen}>Logout</button>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Are you sure you want to logout?</ModalHeader>
              <ModalCloseButton />
              <ModalFooter>
                <div className='flex gap-2 w-full justify-center'>
                    <button onClick={handleLogout}  className='w-[40%] border-2 border-[#333] rounded-md px-3 py-1'>Yes</button>
                    <button onClick={onClose}  className='w-[40%] bg-[#333] text-white border-2 border-[#333] rounded-md px-3 py-1'>No</button>
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    )
}

export default LogoutModal