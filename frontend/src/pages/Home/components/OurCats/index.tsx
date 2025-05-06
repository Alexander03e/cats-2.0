import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import styles from './OurCats.module.scss';
import slice from 'lodash/slice';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
import { Button } from '@/Components/Button';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';
import { getBackendImage } from '@/Shared/utils/getImage.ts';

const LastItem = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.lastItem}>
            <div className={styles.lastTop}>
                <h6>Еще больше очаровательных малышей</h6>
                <p>
                    Узнайте о уникальных чертах, включая веселые способности, предпочтения игр и
                    особенности личности :)
                </p>
            </div>
            <Button onClick={() => navigate(PATHS.CATS)} size={'small'}>
                Смотреть всех
            </Button>
        </div>
    );
};

export const OurCats = () => {
    const { data } = useQuery(catsQueries.list());

    const title = 'Наши <span data-accent="true">подопечные</span>';

    const navigate = useNavigate();
    return (
        <Section title={title}>
            <div className={styles.cards}>
                {map(slice(data?.results, 0, 3), (item, index) => (
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
                <LastItem />
            </div>
        </Section>
    );
};
