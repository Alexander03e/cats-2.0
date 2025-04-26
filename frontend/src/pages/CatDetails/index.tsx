import { Details } from '@/Components/DetailsTempalates';
import styles from './CatDetails.module.scss';

export const CatDetails = () => {
    return (
        <Details className={styles.wrapper}>
            <Details.Image images={['/images/mock-cat.png', '/images/mock-cat.png']} />
            <Details.Info title={'Cat name'}>info</Details.Info>
            <Details.Bottom title={'Form'} subtitle={'form subtitle'}>
                form
            </Details.Bottom>
        </Details>
    );
};
