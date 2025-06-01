import '@scss/index.scss';
import { AppRoutes } from './routes.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from '@/Components/ScrollToTop';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@ant-design/v5-patch-for-react-19';
import { AuthPage } from '@/Pages/Auth';
import { createContext, useContext, useEffect, useState } from 'react';

interface IAppContext {
    isAuth: boolean;
    logout: () => void;
    login: () => void;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

export const useAppContext = (): IAppContext => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

function App() {
    const client = new QueryClient();
    const [isAuth, setIsAuth] = useState(false);

    const login = () => {
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    };

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    };

    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (auth) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, []);
    return (
        <QueryClientProvider client={client}>
            <AppContext value={{ isAuth, logout, login }}>
                <BrowserRouter>
                    {!isAuth ? <AuthPage /> : <AppRoutes />}
                    <ScrollToTop />
                </BrowserRouter>
            </AppContext>
        </QueryClientProvider>
    );
}

export default App;
