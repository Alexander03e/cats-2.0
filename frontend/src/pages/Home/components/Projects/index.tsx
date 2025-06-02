import styles from './HomeProjects.module.scss';
import map from 'lodash/map';
import slice from 'lodash/slice';
import { CatCard } from '@/Components/CatCard';
import { Button } from '@/Components/Button';
import { Section } from '@/Components/Section';
import { Progress } from '@/Components/Progress';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
import { useQuery } from '@tanstack/react-query';
import { projectQueries } from '@/Shared/api/projects.ts';

export const HomeProjects = () => {
    const { data } = useQuery(projectQueries.list());

    const title = 'Наши <span data-accent="true">проекты</span>';
    const navigate = useNavigate();

    return (
        <Section contentClass={styles.wrapper} title={title}>
            <div className={styles.cards}>
                {map(slice(data, 0, 3), (item, index) => (
                    <CatCard
                        isProject
                        title={item.title}
                        className={styles.catCard}
                        img={item?.cover_image}
                        description={item.description}
                        onClick={() => navigate(PATHS.PROJECTS_DETAILS.ABSOLUTE(item.id))}
                        bottomSlot={
                            <Progress
                                suffix={'₽'}
                                total={parseFloat(item.goal_amount)}
                                current={parseFloat(item.current_amount)}
                            />
                        }
                        key={`project-card-${index}`}
                    />
                ))}
            </div>

            <Button fullWidth onClick={() => navigate(PATHS.PROJECTS)}>
                Все проекты
            </Button>
        </Section>
    );
};
