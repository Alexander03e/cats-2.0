import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { mockCatCards } from '@/Pages/Home/mocks';
import { CatCard } from '@/Components/CatCard';
import styles from './OurCats.module.scss';

export const OurCats = () => {
    const title = 'Наши <span data-accent="true">подопечные</span>';

    return (
        <Section title={title}>
            <div className={styles.cards}>
                {map(mockCatCards, (item, index) => (
                    <CatCard key={`our-cats-item-${index}`} {...item} />
                ))}
            </div>
        </Section>
    );
};
