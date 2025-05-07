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
import size from 'lodash/size';
import { ICategory } from '@/Shared/types/history.ts';
import { includes } from 'lodash';

export const ArticlesPage = () => {
    const title = 'Полезные <span data-accent="true">статьи</span>';
    const navigate = useNavigate();
    const { data, isLoading } = useQuery(historyQueries.list());
    const [visibleCount, setVisibleCount] = useState(3);
    const [activeCategories, setCategories] = useState<ICategory[]>([]);

    const handleClickCategory = (category: ICategory) => {
        const found = activeCategories?.find(item => item.id === category.id);

        if (found) {
            setCategories(prev => prev?.filter(item => item.id !== category.id));
        } else {
            setCategories(prev => [...prev, category]);
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!data) {
        return null;
    }

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    const results = data?.results || [];
    const categories = data?.categories || [];

    const visibleItems = results.slice(0, visibleCount);
    const activeIds = map(activeCategories, item => item.id);

    return (
        <Section title={title}>
            <div className={styles.content}>
                <div className={styles.categories}>
                    {map(categories, item => {
                        return (
                            <Button
                                onClick={handleClickCategory.bind(null, item)}
                                isActive={includes(activeIds, item.id)}
                                variant={'tab'}
                            >
                                {item.name}
                            </Button>
                        );
                    })}
                </div>
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
                {size(results) > visibleCount && (
                    <Button fullWidth onClick={handleShowMore}>
                        Показать больше
                    </Button>
                )}
            </div>
        </Section>
    );
};
