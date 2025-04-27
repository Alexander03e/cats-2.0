import { Details } from '@/Components/DetailsTempalates';
import styles from './HistoryDetails.module.scss';

export const HistoryDetails = () => {
    return (
        <Details className={styles.wrapper}>
            <Details.Image images={['/images/mock-cat.png', '/images/mock-cat.png']} />
            <Details.Info title={'Cat name'}>info</Details.Info>
        </Details>
    );
};
