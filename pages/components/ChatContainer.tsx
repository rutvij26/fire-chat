import { Flex, Center, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

const ChatContainer = () => {
    return (
        <Grid
            bg="gray.800"
            templateAreas={{
                base: `"box" "input"`,
            }}
            templateRows={'1fr 0.07fr'}
            h="full"
        >
            <GridItem area="box">
                <ChatBox />
            </GridItem>
            <GridItem area="input" bg="gray.800">
                <ChatInput />
            </GridItem>
        </Grid>
    );
};

export default ChatContainer;
