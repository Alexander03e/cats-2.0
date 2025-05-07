import styles from './CatsPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';
import { getBackendImage } from '@/Shared/utils/getImage.ts';
import { Loader } from '@/Components/Loader';

export const CatsPage = () => {
    const { data, isLoading } = useQuery(catsQueries.list());
    const title = 'Наши <span data-accent="true">подопечные</span>';
    const navigate = useNavigate();

    if (isLoading) {
        return <Loader />;
    }

    if (!data) return null;

    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(data?.results, (item, index) => (
                    <CatCard
                        onClick={() => navigate(PATHS.CATS_DETAILS.ABSOLUTE(item.id))}
                        status={item.status}
                        className={styles.card}
                        title={item.name}
                        description={item.description}
                        img={getBackendImage(item?.photos?.[0])}
                        key={`our-cats-item-${index}`}
                    />
                ))}
            </div>
        </Section>
    );
};
