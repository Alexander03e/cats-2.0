import { Section } from '@/Components/Section';
import styles from './News.module.scss';
import { Button } from '@/Components/Button';
import map from 'lodash/map';
import { mockNews } from '@/Pages/Home/mocks';
import { MediaCard } from '@/Components/MediaCard';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';

export const News = () => {
    const title = '<span data-accent="true">Новости</span> приюта';
    const navigate = useNavigate();
    return (
        <Section className={styles.wrapper} innerClass={styles.inner} title={title}>
            <div className={styles.content}>
                {map(mockNews, (item, index) => (
                    <MediaCard key={`home-news-item-${index}`} {...item} />
                ))}
                <Button fullWidth onClick={() => navigate(PATHS.NEWS)}>
                    Все новости
                </Button>
            </div>
        </Section>
    );
};
