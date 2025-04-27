import { Section } from '@/Components/Section';
import styles from './NewsPage.module.scss';
import { mockCatCards } from '@/Pages/Home/mocks';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import { Button } from '@/Components/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';

export const NewsPage = () => {
    const title = '<span data-accent="true">Новости</span> приюта';

    const navigate = useNavigate();

    return (
        <Section title={title} className={styles.wrapper}>
            <div className={styles.content}>
                {map(mockCatCards, (item, index) => (
                    <CatCard
                        className={styles.card}
                        bottomClass={styles.cardBottom}
                        contentClass={styles.cardContent}
                        key={`news-card-${index}`}
                        {...item}
                        bottomSlot={
                            <Button
                                onClick={() => navigate(PATHS.NEWS_DETAILS.ABSOLUTE(1))}
                                fullWidth
                                variant={'light'}
                            >
                                Читать
                            </Button>
                        }
                    />
                ))}
            </div>
            <Button fullWidth>Показать больше</Button>
        </Section>
    );
};
