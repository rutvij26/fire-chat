import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const SideBar = () => {
    return (
        <Box minH="full">
            <VStack spacing="10" pt="5">
                <Text color="gray.200">Contact 1</Text>
                <Text color="gray.200">Contact 2</Text>
                <Text color="gray.200">Contact 3</Text>
            </VStack>
        </Box>
    );
};

export default SideBar;
