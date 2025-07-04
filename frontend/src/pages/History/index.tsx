import styles from './History.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import { ECatStatus } from '@/Shared/types/cats';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';
import filter from 'lodash/filter';
import { getBackendImage } from '@/Shared/utils/getImage.ts';
import size from 'lodash/size';
import { Loader } from '@/Components/Loader';
import dayjs from 'dayjs';
import { Empty } from '@/Components/Empty';

import { useState } from 'react';
import { Button } from '@/Components/Button';

export const HistoryPage = () => {
    const title = 'Уже <span data-accent="true">дома</span>';
    const { data, isLoading } = useQuery(catsQueries.list());
    const navigate = useNavigate();

    const filteredData = filter(data?.results, { status: ECatStatus.ADOPTED });
    const [visibleCount, setVisibleCount] = useState(6);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 6);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (size(filteredData) === 0) {
        return (
            <Section title={title}>
                <Empty />
            </Section>
        );
    }

    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(filteredData.slice(0, visibleCount), (item, index) => (
                    <CatCard
                        onClick={() => navigate(PATHS.CATS_DETAILS.ABSOLUTE(item.id))}
                        status={ECatStatus.AVAILABLE}
                        className={styles.card}
                        key={`history-cat-item-${index}`}
                        img={getBackendImage(item?.photos?.[0])}
                        description={
                            item?.left_at
                                ? `Выбыл: ${dayjs(item?.left_at).format('DD.MM.YYYY')}`
                                : item?.short_description
                        }
                        title={item.name}
                    />
                ))}
                {visibleCount < size(filteredData) && (
                    <Button
                        style={{ margin: '0 auto' }}
                        variant={'light'}
                        className={styles.showMoreBtn}
                        onClick={handleShowMore}
                    >
                        Показать ещё
                    </Button>
                )}
            </div>
        </Section>
    );
};
