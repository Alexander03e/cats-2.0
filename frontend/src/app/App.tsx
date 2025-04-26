import '@scss/index.scss';
import { AppRoutes } from './routes.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from '@/Components/ScrollToTop';

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
            <ScrollToTop />
        </BrowserRouter>
    );
}

export default App;
