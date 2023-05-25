import React, { useCallback, useEffect, useMemo } from 'react';
import {
    Box,
    Center,
    Text,
    Flex,
    Avatar,
    Grid,
    GridItem,
    Code,
    Card,
    CardBody,
} from '@chakra-ui/react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import ChatStore from '../store/ChatStore';
import {
    collection,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { useFirebaseApp, useFirestoreCollectionData } from 'reactfire';

export default observer(function ChatBox() {
    const store = useLocalObservable(() => ChatStore);
    const app = useFirebaseApp();
    const db = getFirestore(app);
    const firestore = getFirestore(app);

    useEffect(() => {
        if (store.activeId) {
            const unsubscribe = onSnapshot(
                doc(db, 'chats', store.activeId),
                (snapshot) => {
                    const data = snapshot.data();
                    if (data) {
                        store.setActiveChat(data);
                    }
                }
            );

            return () => unsubscribe();
        }
    }, [db, store.activeId, store]);

    const userCollectionRef = collection(firestore, 'users');
    const activeChatUserQuery = query(
        userCollectionRef,
        where('email', '==', store.activeEmail ?? '')
    );

    const { status: activeUserStatus, data: activeUser } =
        useFirestoreCollectionData(activeChatUserQuery);
    console.log(activeUser);
    const recipentUser =
        activeUser?.length === 1 ? activeUser[0] : { email: store.activeEmail };

    return (
        <Grid
            templateAreas={{
                base: `"heading" "conversation"`,
            }}
            templateRows={'0.05fr 1fr'}
            h="full"
        >
            <GridItem area="heading">
                <Flex mx={4} alignItems="center">
                    <Avatar
                        size="md"
                        src={recipentUser.photoURL ?? ''}
                        mx={4}
                    />
                    <Text color="gray.200" fontSize="2xl" fontFamily="mono">
                        {recipentUser.name ?? recipentUser.email}{' '}
                    </Text>
                </Flex>
            </GridItem>
            <GridItem area="conversation">
                <Flex h="full" flexDir="column" justifyContent="flex-end">
                    {store.activeChat.conversation?.map(
                        (con: Record<string, string>, i) => (
                            <Flex
                                key={i}
                                flexDir="column"
                                w="full"
                                minH="2"
                                maxH="-webkit-max-content"
                                alignItems={
                                    con.to === store.activeEmail
                                        ? 'flex-end'
                                        : 'flex-start'
                                }
                                py={4}
                                px={10}
                            >
                                <Card
                                    backgroundColor={
                                        con.to === store.activeEmail
                                            ? 'blue.500'
                                            : 'red.500'
                                    }
                                    borderRadius={20}
                                >
                                    <CardBody>
                                        <Text>{con.message}</Text>
                                    </CardBody>
                                </Card>
                            </Flex>
                        )
                    )}
                </Flex>
            </GridItem>
        </Grid>
    );
});
