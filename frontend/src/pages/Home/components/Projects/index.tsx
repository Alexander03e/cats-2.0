import styles from './HomeProjects.module.scss';
import map from 'lodash/map';
import slice from 'lodash/slice';
import { CatCard } from '@/Components/CatCard';
import { Button } from '@/Components/Button';
import { Section } from '@/Components/Section';
import { mockCatCards } from '@/Pages/Home/mocks';

export const HomeProjects = () => {
    const title = 'Наши <span data-accent="true">проекты</span>';

    return (
        <Section contentClass={styles.wrapper} title={title}>
            <div className={styles.cards}>
                {map(slice(mockCatCards, 0, 3), (item, index) => (
                    <CatCard key={`project-card-${index}`} {...item} />
                ))}
            </div>

            <Button fullWidth>Все проекты</Button>
        </Section>
    );
};
