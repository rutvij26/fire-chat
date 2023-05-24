import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Center, Grid, GridItem, Show } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <Grid
            templateAreas={{
                base: `"nav" "main"`,
                lg: `"nav nav" "aside main"`,
            }}
            templateColumns={{
                base: '1fr',
                lg: '200px 1fr',
            }}
            h="100vh"
            w="100%"
        >
            <GridItem area="nav" h="10%">
                {/* Navbar goes here*/}
                <Center>Navbar</Center>
            </GridItem>
            <Show above="lg">
                <GridItem area="aside">
                    {/* Sidebar goes here */}
                    <Center>Sidebar</Center>
                </GridItem>
            </Show>
            <GridItem area="main">
                <Center>Main</Center>
            </GridItem>
        </Grid>
    );
}
