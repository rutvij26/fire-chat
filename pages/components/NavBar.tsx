import { Avatar, Box, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import Logo from './Logo';
import { useAuth, useUser } from 'reactfire';

const NavBar = () => {
    const { status, data: user } = useUser();
    const auth = useAuth();
    return (
        <Flex bg="gray.800" p="4" w="100%" justifyContent="space-between">
            <HStack spacing="4">
                {user && (
                    <>
                        <Avatar
                            size="sm"
                            src={user.photoURL ?? ''}
                            onClick={() => auth.signOut()}
                        />
                        <Text
                            fontWeight="bold"
                            color="gray.200"
                            fontFamily="mono"
                        >
                            {user?.displayName}
                        </Text>
                    </>
                )}
            </HStack>
            <HStack spacing={3} flexDir={'row-reverse'}>
                <Text fontWeight="bold" color="gray.200" fontFamily="mono">
                    Fire Chat
                </Text>
                <Logo />
            </HStack>
        </Flex>
    );
};

export default NavBar;
