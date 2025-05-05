import styles from './History.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import { ECatStatus } from '@/Shared/types/cats';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
import { useQuery } from '@tanstack/react-query';
import { historyQueries } from '@/Shared/api/history.ts';

export const HistoryPage = () => {
    const title = 'Уже <span data-accent="true">дома</span>';
    const { data } = useQuery(historyQueries.list());
    const navigate = useNavigate();

    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(data, (item, index) => (
                    <CatCard
                        onClick={() => navigate(PATHS.HISTORY_DETAILS.ABSOLUTE(item.id))}
                        status={ECatStatus.AVAILABLE}
                        className={styles.card}
                        key={`history-cat-item-${index}`}
                        img={item.photo}
                        description={item.description}
                        title={item.title}
                    />
                ))}
            </div>
        </Section>
    );
};
