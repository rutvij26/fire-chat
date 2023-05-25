import {
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { FaKeyboard } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useFirebaseApp, useUser } from 'reactfire';
import ChatStore from '../store/ChatStore';

export default observer(function InputBar() {
    const ref = useRef<HTMLInputElement>(null);
    const app = useFirebaseApp();
    const db = getFirestore(app);
    const { status, data: user } = useUser();
    const store = useLocalObservable(() => ChatStore);
    return (
        <form
            onSubmit={async (event) => {
                event.preventDefault();
                const chatRef = doc(db, 'chats', store.activeId);
                user &&
                    ref.current?.value &&
                    (await updateDoc(chatRef, {
                        conversation: arrayUnion({
                            to: store.activeEmail,
                            from: user.email,
                            message: ref.current.value,
                        }),
                    }));
                if (ref.current) {
                    ref.current.value = '';
                }
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
});
