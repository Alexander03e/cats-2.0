import styles from './Progress.module.scss';
import { ReactNode, useCallback } from 'react';
import isNil from 'lodash/isNil';
import cn from 'classnames';
import { formatNumberWithDots } from '@/Shared/utils/formatNumberWithDot.ts';

interface IProps {
    total: number;
    current: number;
    suffix?: string;
    className?: string;
    size?: 'small' | 'large';
    bottomSlot?: ReactNode;
}
export const Progress = ({
    size = 'small',
    total,
    current,
    suffix,
    className,
    bottomSlot,
}: IProps) => {
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
        <div ref={progressRef} className={cn(styles.wrapper, styles[size], className)}>
            {size === 'large' && (
                <div className={styles.topMarks}>
                    <p>
                        {formatNumberWithDots(current)}
                        {suffix || ''}
                    </p>
                    <p>
                        из {formatNumberWithDots(total)}
                        {suffix || ''}
                    </p>
                </div>
            )}
            <div className={styles.progress} />
            {size === 'small' && (
                <div className={styles.marks}>
                    <p>{percent}%</p>
                    <p>{formattedTotal}</p>
                </div>
            )}
            {bottomSlot}
        </div>
    );
};
