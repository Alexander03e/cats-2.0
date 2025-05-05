import styles from './ProjectsPage.module.scss';
import { Section } from '@/Components/Section';
import map from 'lodash/map';
import { CatCard } from '@/Components/CatCard';
import { useQuery } from '@tanstack/react-query';
import { projectQueries } from '@/Shared/api/projects.ts';
import { Progress } from '@/Components/Progress';
import { PATHS } from '@/Shared/consts';
import { useNavigate } from 'react-router-dom';

export const ProjectsPage = () => {
    const title = 'Наши <span data-accent="true">проекты</span>';
    const { data } = useQuery(projectQueries.list());
    const navigate = useNavigate();

    return (
        <Section title={title}>
            <div className={styles.content}>
                {map(data, (item, index) => (
                    <CatCard
                        className={styles.card}
                        key={`projects-cat-card-item-${index}`}
                        title={item.title}
                        onClick={() => navigate(PATHS.PROJECTS_DETAILS.ABSOLUTE(item.id))}
                        description={item.description}
                        bottomSlot={
                            <Progress
                                suffix={'₽'}
                                total={parseFloat(item.goal_amount)}
                                current={parseFloat(item.current_amount)}
                            />
                        }
                    />
                ))}
            </div>
        </Section>
    );
};
