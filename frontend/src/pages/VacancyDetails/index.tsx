import { Details } from '@/Components/DetailsTempalates';
import styles from './VacancyDetails.module.scss';
import { FeedbackVacancy } from '@/Features/feedback-vacancy';
import { useQuery } from '@tanstack/react-query';
import { vacancyQueries } from '@/Shared/api/vacancies.ts';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Loader } from '@/Components/Loader';

export const VacancyDetails = () => {
    const { vacancyId } = useParams();
    const { data, isLoading } = useQuery(vacancyQueries.detail(vacancyId!));

    if (isLoading) {
        return <Loader />;
    }

    if (!data) return null;

    return (
        <Details className={styles.wrapper}>
            <Details.Image images={['/images/mock-cat.png']} />
            <Details.Info title={data?.title}>
                <p>Опубликована: {dayjs(data?.created_at).format('DD.MM.YYYY')}</p> <br />
                {data?.description}
            </Details.Info>
            <Details.Bottom
                title={'Откликнуться на вакансию!'}
                subtitle={
                    'Если вас заинтересовала эта вакансия, оставьте свои контакты, мы с вами свяжемся.'
                }
            >
                <div className={styles.form}>
                    <FeedbackVacancy id={vacancyId!} />
                </div>
            </Details.Bottom>
        </Details>
    );
};
