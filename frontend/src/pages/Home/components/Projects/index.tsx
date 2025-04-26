import styles from './HomeProjects.module.scss';
import map from 'lodash/map';
import slice from 'lodash/slice';
import { CatCard } from '@/Components/CatCard';
import { Button } from '@/Components/Button';
import { Section } from '@/Components/Section';
import { mockCatCards } from '@/Pages/Home/mocks';
import { Progress } from '@/Components/Progress';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';

export const HomeProjects = () => {
    const title = 'Наши <span data-accent="true">проекты</span>';
    const navigate = useNavigate();

    return (
        <Section contentClass={styles.wrapper} title={title}>
            <div className={styles.cards}>
                {map(slice(mockCatCards, 0, 3), (item, index) => (
                    <CatCard
                        onClick={() => navigate(PATHS.PROJECTS_DETAILS.ABSOLUTE(1))}
                        bottomSlot={<Progress current={80} total={120} suffix={'₽'} />}
                        key={`project-card-${index}`}
                        {...item}
                    />
                ))}
            </div>

            <Button fullWidth onClick={() => navigate(PATHS.PROJECTS)}>
                Все проекты
            </Button>
        </Section>
    );
};
