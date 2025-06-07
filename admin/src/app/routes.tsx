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
import { ProjectsPage } from '@/Pages/Project';
import { EditProjectPage } from '@/Pages/Project/Entities/Edit.tsx';
import { CreateProjectPage } from '@/Pages/Project/Entities/Create.tsx';
import { ProjectDonationPage } from '@/Pages/Project/Entities/Donates.tsx';
import { CatAppointmentsPage } from '@/Pages/Cats/Entities/Appointments.tsx';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                {/* Проекты */}
                <Route path={'/projects'} element={<ProjectsPage />} />
                <Route path={'/projects/create'} element={<CreateProjectPage />} />
                <Route path={'/projects/edit/:projectId'} element={<EditProjectPage />} />
                <Route path={'/projects/donations/:projectId'} element={<ProjectDonationPage />} />
                {/* Вакансии */}
                <Route path={'/vacancy'} element={<VacanciesPage />} />
                <Route path={'/vacancy/create'} element={<CreateVacancyPage />} />
                <Route
                    path={'/vacancy/appointments/:vacancyId'}
                    element={<VacancyAppointments />}
                />
                <Route path={'/vacancy/edit/:vacancyId'} element={<EditVacancyPage />} />
                {/* Новости */}
                <Route path={'/news'} element={<NewsPage />} />
                <Route path={'/news/create'} element={<CreateNewsPage />} />
                <Route path={'/news/edit/:newId'} element={<EditNewsPage />} />
                {/* Коты */}
                <Route path={'/cats'} element={<CatsPage />} />
                <Route path={'/cats/appointments/:catId'} element={<CatAppointmentsPage />} />
                <Route path={'/cats/create'} element={<CreateCatPage />} />
                <Route path={'/cats/edit/:catId'} element={<EditCatPage />} />
                <Route path={'*'} element={<Navigate to={'/cats'} />} />
            </Route>
        </Routes>
    );
};
