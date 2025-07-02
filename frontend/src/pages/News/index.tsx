import { Section } from '@/Components/Section';
import styles from './NewsPage.module.scss';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import { Button } from '@/Components/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
import { useQuery } from '@tanstack/react-query';
import { newsQueries } from '@/Shared/api/news.ts';
import size from 'lodash/size';
import { Loader } from '@/Components/Loader';
import { useState } from 'react';
import { Empty } from '@/Components/Empty';

export const NewsPage = () => {
    const title = '<span data-accent="true">Новости</span> приюта';
    const { data, isLoading } = useQuery(newsQueries.list());
    const navigate = useNavigate();
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
        <Section title={title} className={styles.wrapper}>
            {size(visibleItems) === 0 ? (
                <Empty />
            ) : (
                <div className={styles.content}>
                    {map(
                        [...visibleItems, ...visibleItems, ...visibleItems, ...visibleItems],
                        (item, index) => (
                            <CatCard
                                title={item.title}
                                img={item.cover_image_url}
                                description={item.description}
                                imgClass={styles.imgItem}
                                className={styles.card}
                                bottomClass={styles.cardBottom}
                                contentClass={styles.cardContent}
                                key={`news-card-${index}`}
                                bottomSlot={
                                    <Button
                                        onClick={() =>
                                            navigate(PATHS.NEWS_DETAILS.ABSOLUTE(item.id))
                                        }
                                        fullWidth
                                        variant={'light'}
                                    >
                                        Читать
                                    </Button>
                                }
                            />
                        ),
                    )}
                </div>
            )}
            {size(data) > visibleCount && (
                <Button fullWidth onClick={handleShowMore}>
                    Показать больше
                </Button>
            )}
        </Section>
    );
};
