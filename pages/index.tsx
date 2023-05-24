import { Inter } from 'next/font/google';
import {
    AuthCheck,
    AuthProvider,
    DatabaseProvider,
    useFirebaseApp,
    useSigninCheck,
} from 'reactfire';
import { getAuth } from 'firebase/auth'; // Firebase v9+
import { getDatabase } from 'firebase/database';
import HomePage from './components/HomePage';
import LoginPage from './login';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const app = useFirebaseApp();
    const database = getDatabase(app);
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={database}>
                <HomePage />
            </DatabaseProvider>
        </AuthProvider>
    );
}
