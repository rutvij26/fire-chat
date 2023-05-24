import '@/styles/globals.css';
import { CSSReset, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
