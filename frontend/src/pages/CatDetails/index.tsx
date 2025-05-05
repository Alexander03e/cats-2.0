import { Details } from '@/Components/DetailsTempalates';
import styles from './CatDetails.module.scss';
import { TakeCatForm } from '@/Features/take-cat';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';
import { useParams } from 'react-router-dom';

export const CatDetails = () => {
    const { catId } = useParams();

    const { data } = useQuery(catsQueries.detail(catId!));

    if (!data) return null;

    return (
        <Details className={styles.wrapper}>
            <Details.Image images={[data.photo]} />
            <Details.Info title={data.name}>{data.description}</Details.Info>
            <Details.Bottom
                title={'Забрать котика'}
                subtitle={
                    'Если вас заинтересовал этот котик, оставьте свои контакты, мы с вами свяжемся.'
                }
            >
                <div className={styles.form}>
                    <TakeCatForm />
                </div>
            </Details.Bottom>
        </Details>
    );
};
