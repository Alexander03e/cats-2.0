import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/Components/Layout';
import { PATHS } from '@/Shared/consts';
import { HomePage } from '@/Pages/Home';
import { ProjectsPage } from '@/Pages/Projects';
import { ContactsPage } from '@/Pages/Contacts';
import { VacanciesPage } from '@/Pages/Vacancies';
import { CatsPage } from '@/Pages/Cats';
import { CatDetails } from '@/Pages/CatDetails';
import { ProjectDetails } from '@/Pages/ProjectDetails';
import { HowToHelp } from '@/Pages/HowToHelp';
import { NewsPage } from '@/Pages/News';

export const AppRoutes = () => {
    // Роутинг приложения
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path={PATHS.ARRIVED} element={<div>Прибыло</div>} />
                <Route path={PATHS.DROPPED} element={<div>Сброшено</div>} />
                <Route path={PATHS.ARTICLES} element={<div>Статьи</div>} />

                <Route path={PATHS.NEWS} element={<NewsPage />} />
                <Route path={PATHS.VACANCY} element={<VacanciesPage />} />
                <Route path={PATHS.HOME} element={<HomePage />} />
                <Route path={PATHS.CONTACTS} element={<ContactsPage />} />
                <Route path={PATHS.HELP} element={<HowToHelp />} />
                {/* Проекты /*/}
                <Route path={PATHS.PROJECTS_DETAILS.INDEX} element={<ProjectDetails />} />
                <Route path={PATHS.PROJECTS} element={<ProjectsPage />} />
                {/* Коты */}
                <Route path={PATHS.CATS} element={<CatsPage />}></Route>
                <Route path={PATHS.CATS_DETAILS.INDEX} element={<CatDetails />} />
            </Route>
        </Routes>
    );
};
