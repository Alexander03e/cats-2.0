import { Section } from '@/Components/Section';
import styles from './News.module.scss';
import { Button } from '@/Components/Button';
import map from 'lodash/map';
import { MediaCard } from '@/Components/MediaCard';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
import { useQuery } from '@tanstack/react-query';
import { newsQueries } from '@/Shared/api/news.ts';

export const News = () => {
    const { data } = useQuery(newsQueries.list());
    const title = '<span data-accent="true">Новости</span> приюта';
    const navigate = useNavigate();
    return (
        <Section className={styles.wrapper} innerClass={styles.inner} title={title}>
            <div className={styles.content}>
                {map(data, (item, index) => (
                    <MediaCard
                        imgClass={styles.cardImg}
                        title={item.title}
                        onButton={() => navigate(PATHS.NEWS_DETAILS.ABSOLUTE(item.id))}
                        description={item.content}
                        imgSrc={item.cover_image_url}
                        key={`home-news-item-${index}`}
                    />
                ))}
                <Button fullWidth onClick={() => navigate(PATHS.NEWS)}>
                    Все новости
                </Button>
            </div>
        </Section>
    );
};
