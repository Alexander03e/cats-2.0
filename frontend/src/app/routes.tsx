import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/Components/Layout';
import { PATHS } from '@/Shared/consts';
import { HomePage } from '@/Pages/Home';
import { ProjectsPage } from '@/Pages/Projects';
import { ContactsPage } from '@/Pages/Contacts';

export const AppRoutes = () => {
    // Роутинг приложения
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path={PATHS.HELP} element={<HomePage />} />
                <Route path={PATHS.HOME} element={<HomePage />} />
                <Route path={PATHS.PROJECTS} element={<ProjectsPage />} />
                <Route path={PATHS.ARRIVED} element={<div>Прибыло</div>} />
                <Route path={PATHS.DROPPED} element={<div>Сброшено</div>} />
                <Route path={PATHS.VACANCY} element={<div>Вакансии</div>} />
                <Route path={PATHS.NEWS} element={<div>Новости</div>} />
                <Route path={PATHS.ARTICLES} element={<div>Статьи</div>} />
                <Route path={PATHS.CONTACTS} element={<ContactsPage />} />
            </Route>
        </Routes>
    );
};
