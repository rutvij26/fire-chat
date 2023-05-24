import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Center, Grid, GridItem, Show } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import ChatContainer from './components/ChatContainer';
import { useFirebaseApp } from 'reactfire';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const app = useFirebaseApp();

    return (
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
    );
}
