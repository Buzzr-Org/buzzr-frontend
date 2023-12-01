import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'

interface Props {
    title: string,
    buttonText: string,
    buttonColor: string,
    children: React.ReactNode
}

const ModalContainer = (props:Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
          <button className={`bg-[${props.buttonColor}] py-2 px-4 text-white rounded-md m-2`} onClick={onOpen}>{props.buttonText}</button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{props.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {props.children}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ModalContainer