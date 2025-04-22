import styles from './ProjectsPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { mockCatCards } from '@/Pages/Home/mocks';
import { CatCard } from '@/Components/CatCard';

export const ProjectsPage = () => {
    const title = 'Наши <span data-accent="true">проекты</span>';

    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(mockCatCards, (item, index) => (
                    <CatCard
                        className={styles.card}
                        key={`projects-cat-card-item-${index}`}
                        {...item}
                    />
                ))}
            </div>
        </Section>
    );
};
