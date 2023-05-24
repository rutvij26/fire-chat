import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth, useFirebaseApp } from 'reactfire';

const LoginPage = () => {
    const app = useFirebaseApp();
    // const auth = useAuth();
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        provider.addScope('photo');
        const authInstance = getAuth(app);
        try {
            await signInWithPopup(authInstance, provider);
            // Redirect or perform additional actions upon successful login
            router.push('/');
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    return (
        <Flex
            justifyContent="space-evenly"
            alignItems="center"
            h="100vh"
            w="100%"
            flexDir="column"
        >
            <Text color="gray.200" fontSize="4xl">
                Login Page
            </Text>
            <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
        </Flex>
    );
};

export default LoginPage;
