import styles from './VacanciesPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { mockNews } from '@/Pages/Home/mocks';
import { MediaCard } from '@/Components/MediaCard';
import { Button } from '@/Components/Button';

export const VacanciesPage = () => {
    const title = '<span data-accent="true">Вакансии</span>';

    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(mockNews, (item, index) => (
                    <MediaCard key={`home-news-item-${index}`} {...item} />
                ))}
                <Button fullWidth>Все новости</Button>
            </div>
        </Section>
    );
};
