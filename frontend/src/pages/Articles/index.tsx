import { useState } from 'react';
import styles from './ArticlesPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { MediaCard } from '@/Components/MediaCard';
import { Button } from '@/Components/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
import { useQuery } from '@tanstack/react-query';
import { historyQueries } from '@/Shared/api/history.ts';
import { Loader } from '@/Components/Loader';

export const ArticlesPage = () => {
    const title = 'Полезные <span data-accent="true">статьи</span>';
    const navigate = useNavigate();
    const { data, isLoading } = useQuery(historyQueries.list());
    const [visibleCount, setVisibleCount] = useState(3);

    if (isLoading) {
        return <Loader />;
    }

    if (!data) {
        return null;
    }

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    const visibleItems = data.slice(0, visibleCount);

    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(visibleItems, (item, index) => (
                    <MediaCard
                        imgSrc={item?.photo}
                        description={item?.description}
                        title={item?.title}
                        onButton={() => navigate(PATHS.ARTICLES_DETAILS.ABSOLUTE(item?.id))}
                        className={styles.card}
                        key={`articles-item-${index}`}
                    />
                ))}
                {data.length > visibleCount && (
                    <Button fullWidth onClick={handleShowMore}>
                        Показать больше
                    </Button>
                )}
            </div>
        </Section>
    );
};
