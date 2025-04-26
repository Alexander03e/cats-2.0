import { Section } from '@/Components/Section';
import styles from './NewsPage.module.scss';
import { mockCatCards } from '@/Pages/Home/mocks';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import { Button } from '@/Components/Button';

export const NewsPage = () => {
    const title = '<span data-accent="true">Новости</span> приюта';

    return (
        <Section title={title} contentClass={styles.content}>
            {map(mockCatCards, (item, index) => (
                <CatCard
                    className={styles.card}
                    bottomClass={styles.cardBottom}
                    contentClass={styles.cardContent}
                    key={`news-card-${index}`}
                    {...item}
                    bottomSlot={
                        <Button fullWidth variant={'light'}>
                            Читать
                        </Button>
                    }
                />
            ))}
            <Button fullWidth>Показать больше</Button>
        </Section>
    );
};
