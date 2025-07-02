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
import { VacancyDetails } from '@/Pages/VacancyDetails';
import { ArticlesPage } from '@/Pages/Articles';
import { ArticleDetails } from '@/Pages/ArticleDetails';
import { NewsDetails } from '@/Pages/NewsDetails';
import { HistoryPage } from '@/Pages/History';
import { HistoryDetails } from '@/Pages/HistoryDetails';
import { DonationPage } from '@/Pages/DonationPage';
import { MoneySupport } from '@/Pages/MoneySupport';
import { InDevelop } from '@/Components/InDevelop';

export const AppRoutes = () => {
    // Роутинг приложения
    return (
        <Routes>
            <Route path={PATHS.PROJECT_DONATE.INDEX} element={<DonationPage />} />

            <Route element={<Layout />}>
                <Route path={PATHS.HOME} element={<HomePage />} />
                <Route path={PATHS.CONTACTS} element={<ContactsPage />} />
                <Route path={PATHS.SUPPORT_MONEY} element={<MoneySupport />} />
                <Route path={PATHS.IN_DEVELOP} element={<InDevelop />} />
                <Route path={PATHS.HELP} element={<HowToHelp />} />

                {/* Истории успеха*/}
                <Route path={PATHS.HISTORY} element={<HistoryPage />} />
                <Route path={PATHS.HISTORY_DETAILS.INDEX} element={<HistoryDetails />} />
                {/* Новости */}
                <Route path={PATHS.NEWS_DETAILS.INDEX} element={<NewsDetails />} />
                <Route path={PATHS.NEWS} element={<NewsPage />} />
                {/* Статьи */}
                <Route path={PATHS.ARTICLES_DETAILS.INDEX} element={<ArticleDetails />} />
                <Route path={PATHS.ARTICLES} element={<ArticlesPage />} />
                {/* Вакансии */}
                <Route path={PATHS.VACANCY_DETAILS.INDEX} element={<VacancyDetails />} />
                <Route path={PATHS.VACANCY} element={<VacanciesPage />} />
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
