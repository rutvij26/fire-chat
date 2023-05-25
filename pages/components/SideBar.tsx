import { Box, Button, Flex, List, Text, VStack } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import * as EmailValidator from 'email-validator';
import {
    useAuth,
    useFirebaseApp,
    useFirestoreCollectionData,
    useUser,
} from 'reactfire';
import {
    addDoc,
    collection,
    getFirestore,
    query,
    where,
} from 'firebase/firestore';
import { observer, useLocalObservable } from 'mobx-react-lite';
import ChatStore from '../store/ChatStore';

export default observer(function SideBar() {
    const store = useLocalObservable(() => ChatStore);
    const app = useFirebaseApp();
    const auth = useAuth();
    const firestore = getFirestore(app);

    const { status: userStatus, data: user } = useUser();

    const chatsCollection = collection(firestore, 'chats');
    const chatsQuery = query(
        chatsCollection,
        where('users', 'array-contains', user?.email)
    );

    const { status: queryStatus, data: chats } =
        useFirestoreCollectionData(chatsQuery);

    const contactList = useMemo(
        () =>
            chats?.map((chat) => {
                return {
                    id: chat.NO_ID_FIELD,
                    reciepent: chat.users.find(
                        (email: string) => email !== user?.email
                    ),
                };
            }),
        [chats, user]
    );

    const handleCreateNewChat = async () => {
        const input = prompt(
            'Please enter an email address for the user you would like to chat with'
        );

        if (!input) return null;

        if (
            user &&
            EmailValidator.validate(input) &&
            input !== user.email &&
            !chatAlreadyExists(input)
        ) {
            // create a new chat
            try {
                await addDoc(collection(firestore, 'chats'), {
                    users: [user.email, input],
                });
            } catch (error) {
                console.log('Error: Create new chat :', error);
            }
        }
        console.log(input);
    };

    const chatAlreadyExists = useCallback(
        (reciepent: string) => {
            console.log('Chats', chats);
            const searchedChats = chats.find((chat) =>
                chat.users.includes(reciepent)
            );
            console.log('Searched Chats', searchedChats);
            return searchedChats !== undefined; // true if there is at least one chat with the reciepent
        },
        [chats]
    );

    const handleContactClick = useCallback(
        (id: string, email: string) => {
            store.setActiveChatIdEmail(id, email, firestore);
        },
        [store]
    );

    console.log('store.activeChatEmail', store.activeEmail);

    return (
        <Flex
            flexDir="column"
            minH="full"
            justifyContent="space-between"
            alignItems="center"
            h="100%"
            mx={2}
        >
            <Flex flexDirection="column" w="full" h="full">
                <Button
                    _hover={{
                        backgroundColor: 'gray.600',
                    }}
                    onClick={handleCreateNewChat}
                    w="100%"
                >
                    Start a new Chat
                </Button>
                <List pt={4}>
                    {contactList?.map(({ id, reciepent }) => (
                        <Flex
                            w="full"
                            alignItems="center"
                            justifyContent="center"
                            key={reciepent}
                            _hover={{
                                backgroundColor: 'gray.600',
                            }}
                            backgroundColor={
                                reciepent === store.activeEmail
                                    ? 'gray.600'
                                    : 'gray.800'
                            }
                            p={1}
                            onClick={() => handleContactClick(id, reciepent)}
                        >
                            <Text py={4} color="gray.200" align="center">
                                {reciepent}
                            </Text>
                        </Flex>
                    ))}
                </List>
            </Flex>
            <Button
                _hover={{
                    backgroundColor: 'gray.600',
                }}
                mb="6"
                onClick={() => auth.signOut()}
                w="100%"
            >
                SignOut
            </Button>
        </Flex>
    );
});
