import { Details } from '@/Components/DetailsTempalates';
import styles from './CatDetails.module.scss';
import { TakeCatForm } from '@/Features/take-cat';

export const CatDetails = () => {
    return (
        <Details className={styles.wrapper}>
            <Details.Image images={['/images/mock-cat.png', '/images/mock-cat.png']} />
            <Details.Info title={'Cat name'}>info</Details.Info>
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
