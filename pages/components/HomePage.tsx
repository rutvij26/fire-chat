import { Flex, Grid, GridItem, Show, Spinner } from '@chakra-ui/react';
import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import ChatContainer from './ChatContainer';
import { useSigninCheck } from 'reactfire';
import LoginPage from '../login';

const HomePage = () => {
    const { status, data: signInCheckResult } = useSigninCheck();

    if (status === 'loading') {
        return (
            <Flex
                h="100vh"
                w="full"
                justifyContent="center"
                alignItems="center"
            >
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <>
            {signInCheckResult?.signedIn ? (
                <Grid
                    templateAreas={{
                        base: `"nav" "main"`,
                        lg: `"nav nav" 
                    "aside main"`,
                    }}
                    templateRows={'0.05fr 1fr'}
                    templateColumns={{
                        base: '1fr',
                        lg: '200px 1fr',
                    }}
                    h="100vh"
                >
                    <GridItem area="nav" bg="gray.800">
                        {/* Navbar goes here*/}
                        <NavBar />
                    </GridItem>
                    <Show above="lg">
                        <GridItem area="aside" bg="gray.800">
                            {/* Sidebar goes here */}
                            <SideBar />
                        </GridItem>
                    </Show>
                    <GridItem area="main" bg="gray.800">
                        <ChatContainer />
                    </GridItem>
                </Grid>
            ) : (
                <LoginPage />
            )}
        </>
    );
};

export default HomePage;
