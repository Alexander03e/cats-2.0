import { Details } from '@/Components/DetailsTempalates';
import styles from './VacancyDetails.module.scss';
import { FeedbackVacancy } from '@/Features/feedback-vacancy';

export const VacancyDetails = () => {
    return (
        <Details className={styles.wrapper}>
            <Details.Image images={['/images/mock-cat.png']} />
            <Details.Info title={'Vacancy'}>info</Details.Info>
            <Details.Bottom
                title={'Откликнуться на вакансию!'}
                subtitle={
                    'Если вас заинтересовала эта вакансия, оставьте свои контакты, мы с вами свяжемся.'
                }
            >
                <div className={styles.form}>
                    <FeedbackVacancy />
                </div>
            </Details.Bottom>
        </Details>
    );
};
