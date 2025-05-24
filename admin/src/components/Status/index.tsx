import styles from './Status.module.scss';
import { ECatStatus } from '@/Shared/types/cats';

interface IProps {
    status?: ECatStatus;
}

// eslint-disable-next-line react-refresh/only-export-components
export const StatusColor = {
    [ECatStatus.AVAILABLE]: 'var(--success-color)',
    [ECatStatus.UNAVAILABLE]: 'red',
    [ECatStatus.RESERVED]: 'gray',
    [ECatStatus.ADOPTED]: 'gray',
    [ECatStatus.QUARANTINE]: 'red',
};

export const Status = ({ status }: IProps) => {
    if (!status) return null;
    return <div className={styles.status} style={{ background: StatusColor[status] }} />;
};
