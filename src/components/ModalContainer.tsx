import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'

interface Props {
    buttonText: string,
    buttonColor: string,
    children: React.ReactNode
}

const ModalContainer = (props:Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
          <button className={`bg-[${props.buttonColor}] py-2 px-4 text-white rounded-md m-2 ml-6`} onClick={onOpen}>{props.buttonText}</button>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {props.children}
              </ModalBody>
    
              <ModalFooter>
                <button onClick={onClose}>
                  Create
                </button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ModalContainer