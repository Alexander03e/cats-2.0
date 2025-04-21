import styles from './CatCatd.module.scss';
import { HTMLAttributes, isValidElement, ReactNode } from 'react';
import cn from 'classnames';
import { ECatStatus } from '@/Shared/types';
import { Status } from '@/Components/Status';
import { getImage } from '@/Shared/utils/getImage.ts';

export interface ICatCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    title?: string;
    img?: string;
    description?: string;
    bottomSlot?: ReactNode;
    status?: ECatStatus;
}

export const CatCard = ({
    className,
    title,
    status,
    description,
    bottomSlot,
    img,
    ...props
}: ICatCardProps) => {
    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <div className={styles.img}>
                <img src={getImage(img)} />
            </div>

            <div className={styles.content}>
                <div className={styles.top}>
                    <h5 className={styles.title}>{title}</h5>
                    <Status status={status} />
                </div>

                {!!description && <p className={styles.description}>{description}</p>}
                {isValidElement(bottomSlot) && <div className={styles.content}>{bottomSlot}</div>}
            </div>
        </div>
    );
};
