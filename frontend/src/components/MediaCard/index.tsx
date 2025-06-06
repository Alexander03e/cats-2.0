import styles from './MediaCard.module.scss';
import { HTMLAttributes, ReactNode } from 'react';
import { getImage } from '@/Shared/utils/getImage.ts';
import { Button } from '@/Components/Button';
import cn from 'classnames';
import parse from 'html-react-parser';

export interface IMediaCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    title?: string;
    imgSrc?: string;
    description?: string;
    renderButton?: ReactNode;
    onButton?: () => void;
    imgClass?: string;
}

export const MediaCard = ({
    title,
    imgClass,
    description,
    imgSrc,
    renderButton,
    className,
    onButton,
}: IMediaCardProps) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            <div className={cn(styles.image, imgClass)}>
                <img src={getImage(imgSrc)} />
            </div>
            <div className={styles.content}>
                <div className={styles.top}>
                    <h5>{title}</h5>
                    <p>{description ? parse(description || '') : ''}</p>
                </div>
                {renderButton || (
                    <Button variant={'light'} size={'small'} onClick={onButton}>
                        Подробнее
                    </Button>
                )}
            </div>
        </div>
    );
};
