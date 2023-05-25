import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import InputBar from './InputBar';
import { observer } from 'mobx-react-lite';

export default observer(function ChatInput() {
    return (
        <Box mx="2">
            <InputBar />
        </Box>
    );
});
