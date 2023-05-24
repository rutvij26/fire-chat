import {
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { FaKeyboard } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';

const InputBar = () => {
    const ref = useRef<HTMLInputElement>(null);
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                console.log('text', ref.current?.value);
            }}
        >
            <InputGroup>
                <InputLeftElement>
                    <FaKeyboard />
                </InputLeftElement>
                <Input
                    bg="gray.600"
                    ref={ref}
                    borderRadius={20}
                    placeholder="Type a Text..."
                    variant="outline"
                />
                <InputRightElement>
                    <AiOutlineSend />
                </InputRightElement>
            </InputGroup>
        </form>
    );
};

export default InputBar;
