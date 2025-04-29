import styles from './ArticlesPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { mockNews } from '@/Pages/Home/mocks';
import { MediaCard } from '@/Components/MediaCard';
import { Button } from '@/Components/Button';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';

export const ArticlesPage = () => {
    const title = 'Полезные <span data-accent="true">статьи</span>';
    const navigate = useNavigate();
    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(mockNews, (item, index) => (
                    <MediaCard
                        onButton={() => navigate(PATHS.ARTICLES_DETAILS.ABSOLUTE(1))}
                        className={styles.card}
                        key={`articles-item-${index}`}
                        {...item}
                    />
                ))}
                <Button fullWidth>Показать больше</Button>
            </div>
        </Section>
    );
};
