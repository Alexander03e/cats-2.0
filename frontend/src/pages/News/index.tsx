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

export const NewsPage = () => {
    const title = '<span data-accent="true">Новости</span> приюта';
    const { data } = useQuery(newsQueries.list());

    const navigate = useNavigate();

    return (
        <Section title={title} className={styles.wrapper}>
            <div className={styles.content}>
                {map(data, (item, index) => (
                    <CatCard
                        title={item.title}
                        img={item.cover_image}
                        description={item.content}
                        className={styles.card}
                        bottomClass={styles.cardBottom}
                        contentClass={styles.cardContent}
                        key={`news-card-${index}`}
                        bottomSlot={
                            <Button
                                onClick={() => navigate(PATHS.NEWS_DETAILS.ABSOLUTE(item.id))}
                                fullWidth
                                variant={'light'}
                            >
                                Читать
                            </Button>
                        }
                    />
                ))}
            </div>
            {size(data) > 3 && <Button fullWidth>Показать больше</Button>}
        </Section>
    );
};
