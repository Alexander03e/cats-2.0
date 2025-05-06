import styles from './VacanciesPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { MediaCard } from '@/Components/MediaCard';
import { Button } from '@/Components/Button';
import { useQuery } from '@tanstack/react-query';
import { vacancyQueries } from '@/Shared/api/vacancies.ts';
import filter from 'lodash/filter';
import { EVacancyStatus } from '@/Shared/types/vacancies.ts';
import { useNavigate } from 'react-router-dom';
import size from 'lodash/size';
import { useState } from 'react';
import slice from 'lodash/slice';
import { PATHS } from '@/Shared/consts';
import dayjs from 'dayjs';
import { Loader } from '@/Components/Loader';

export const VacanciesPage = () => {
    const { data, isLoading } = useQuery(vacancyQueries.list());
    const title = '<span data-accent="true">Вакансии</span>';
    const navigate = useNavigate();
    const [all, setAll] = useState(false);

    const filtered = filter(data, { status: EVacancyStatus.OPEN });

    if (isLoading) {
        return <Loader />;
    }

    if (!filtered || size(filtered) < 0) return;

    const vacancies = all ? filtered : slice(filtered, 0, 3);

    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(vacancies, (item, index) => (
                    <MediaCard
                        title={item.title}
                        description={`Опубликована: ${dayjs(item.created_at).format('DD.MM.YYYY')}<br /> ${item.description}`}
                        key={`home-news-item-${index}`}
                        onButton={() => navigate(PATHS.VACANCY_DETAILS.ABSOLUTE(item?.id))}
                    />
                ))}
                {!all && size(vacancies) > 3 && (
                    <Button onClick={setAll.bind(null, true)} fullWidth>
                        Все новости
                    </Button>
                )}
            </div>
        </Section>
    );
};
