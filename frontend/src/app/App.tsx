import '@scss/index.scss';
import { AppRoutes } from './routes.tsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
