import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/Components/Layout';
import { CatsPage } from '@/Pages/Cats';
import { NewsPage } from '@/Pages/News';
import { CreateCatPage } from '@/Pages/Cats/Entities/Create.tsx';
import { EditCatPage } from '@/Pages/Cats/Entities/Edit.tsx';
import { CreateNewsPage } from '@/Pages/News/Entities/Create.tsx';
import { EditNewsPage } from '@/Pages/News/Entities/Edit.tsx';
import { VacanciesPage } from '@/Pages/Vacancies';
import { CreateVacancyPage } from '@/Pages/Vacancies/Entities/Create.tsx';
import { EditVacancyPage } from '@/Pages/Vacancies/Entities/Edit.tsx';
import { VacancyAppointments } from '@/Pages/Vacancies/Entities/Appointments.tsx';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path={'/vacancy'} element={<VacanciesPage />} />
                <Route path={'/vacancy/create'} element={<CreateVacancyPage />} />
                <Route
                    path={'/vacancy/appointments/:vacancyId'}
                    element={<VacancyAppointments />}
                />
                <Route path={'/vacancy/edit/:vacancyId'} element={<EditVacancyPage />} />
                <Route path={'/news'} element={<NewsPage />} />
                <Route path={'/news/create'} element={<CreateNewsPage />} />
                <Route path={'/news/edit/:newId'} element={<EditNewsPage />} />
                <Route path={'/cats'} element={<CatsPage />} />
                <Route path={'/cats/create'} element={<CreateCatPage />} />
                <Route path={'/cats/edit/:catId'} element={<EditCatPage />} />
                <Route path={'*'} element={<Navigate to={'/cats'} />} />
            </Route>
        </Routes>
    );
};
