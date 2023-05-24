import '@/styles/globals.css';
import theme from '@/theme';
import { CSSReset, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from '@/firebase';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <ChakraProvider theme={theme}>
                <CSSReset />
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <Component {...pageProps} />
            </ChakraProvider>
        </FirebaseAppProvider>
    );
}
