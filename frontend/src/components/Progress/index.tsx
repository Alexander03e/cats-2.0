import styles from './Progress.module.scss';
import { useCallback } from 'react';
import isNil from 'lodash/isNil';
import cn from 'classnames';

interface IProps {
    total: number;
    current: number;
    suffix?: string;
    className?: string;
}
export const Progress = ({ total, current, suffix, className }: IProps) => {
    const percent = Math.floor((current / total) * 100);

    const progressRef = useCallback(
        (node: HTMLDivElement) => {
            if (node && !isNil(percent)) {
                node.style.setProperty('--progress', String(percent));
            }
        },
        [percent],
    );

    const formattedTotal = `${current}${suffix || ''} из ${total}${suffix || ''}`;

    return (
        <div ref={progressRef} className={cn(styles.wrapper, className)}>
            <div className={styles.progress} />
            <div className={styles.marks}>
                <p>{percent}%</p>
                <p>{formattedTotal}</p>
            </div>
        </div>
    );
};
