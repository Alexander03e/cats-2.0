import styles from './Status.module.scss';
import { ECatStatus } from '@/Shared/types';

interface IProps {
    status?: ECatStatus;
}

export const StatusColor = {
    [ECatStatus.ACTIVE]: 'var(--success-color)',
    [ECatStatus.INACTIVE]: 'red',
    [ECatStatus.PENDING]: 'gray',
};

export const Status = ({ status }: IProps) => {
    if (!status) return null;
    return <div className={styles.status} style={{ background: StatusColor[status] }} />;
};
