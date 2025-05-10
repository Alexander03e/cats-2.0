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
import { clearObj } from '@/Shared/utils/common.ts';

export const ArticlesPage = () => {
    const title = 'Полезные <span data-accent="true">статьи</span>';
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(3);
    const [activeCategory, setActiveCategory] = useState<ICategory | undefined>(undefined);

    const params = clearObj({
        category: activeCategory?.slug,
    });

    const { data, isLoading, isFetching } = useQuery(historyQueries.list(params));

    console.log(isFetching);

    const handleClickCategory = (category: ICategory) => {
        if (activeCategory?.id === category?.id) {
            setActiveCategory(undefined);

            return;
        }

        setActiveCategory(category);
    };

    if (isLoading && !isFetching) {
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

    return (
        <Section title={title}>
            <div className={styles.content}>
                <div className={styles.categories}>
                    {map(categories, item => {
                        const isActive = item.id === activeCategory?.id;
                        return (
                            <Button
                                onClick={handleClickCategory.bind(null, item)}
                                isActive={isActive}
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
