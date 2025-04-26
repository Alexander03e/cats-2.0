import styles from './CatsPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { mockCatCards } from '@/Pages/Home/mocks';
import { CatCard } from '@/Components/CatCard';
import { ECatStatus } from '@/Shared/types';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';

export const CatsPage = () => {
    const title = 'Наши <span data-accent="true">подопечные</span>';

    const navigate = useNavigate();

    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(mockCatCards, (item, index) => (
                    <CatCard
                        onClick={() => navigate(PATHS.CATS_DETAILS.ABSOLUTE(1))}
                        status={ECatStatus.ACTIVE}
                        className={styles.card}
                        key={`projects-cat-card-item-${index}`}
                        {...item}
                    />
                ))}
            </div>
        </Section>
    );
};
