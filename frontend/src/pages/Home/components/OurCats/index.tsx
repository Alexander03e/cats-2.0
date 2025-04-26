import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { mockCatCards } from '@/Pages/Home/mocks';
import { CatCard } from '@/Components/CatCard';
import styles from './OurCats.module.scss';
import slice from 'lodash/slice';

export const OurCats = () => {
    const title = 'Наши <span data-accent="true">подопечные</span>';

    return (
        <Section title={title}>
            <div className={styles.cards}>
                {map(slice(mockCatCards, 0, 4), (item, index) => (
                    <CatCard hoverable key={`our-cats-item-${index}`} {...item} />
                ))}
            </div>
        </Section>
    );
};
