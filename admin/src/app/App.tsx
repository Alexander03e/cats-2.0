import '@scss/index.scss';
import { AppRoutes } from './routes.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from '@/Components/ScrollToTop';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@ant-design/v5-patch-for-react-19';

function App() {
    const client = new QueryClient();
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <AppRoutes />
                <ScrollToTop />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
