import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import Logo from './Logo';

const NavBar = () => {
    return (
        <Box bg="gray.700" p="4">
            <HStack spacing={3} flexDir={'row-reverse'}>
                <Text fontWeight="bold" color="gray.200" fontFamily="mono">
                    Fire Chat
                </Text>
                <Logo />
            </HStack>
        </Box>
    );
};

export default NavBar;
