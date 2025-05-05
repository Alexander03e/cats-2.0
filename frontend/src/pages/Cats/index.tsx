import styles from './CatsPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';

export const CatsPage = () => {
    const { data } = useQuery(catsQueries.list());
    const title = 'Наши <span data-accent="true">подопечные</span>';

    const navigate = useNavigate();

    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(data, (item, index) => (
                    <CatCard
                        onClick={() => navigate(PATHS.CATS_DETAILS.ABSOLUTE(item.id))}
                        status={item.status}
                        className={styles.card}
                        title={item.name}
                        description={item.description}
                        img={item?.photo}
                        key={`projects-cat-card-item-${index}`}
                    />
                ))}
            </div>
        </Section>
    );
};
