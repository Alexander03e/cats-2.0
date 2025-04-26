import styles from './CatCatd.module.scss';
import { HTMLAttributes, isValidElement, ReactNode, useEffect } from 'react';
import cn from 'classnames';
import { ECatStatus } from '@/Shared/types';
import { Status } from '@/Components/Status';
import { getImage } from '@/Shared/utils/getImage.ts';
import { useHover } from '@uidotdev/usehooks';
import { Button } from '@/Components/Button';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';

const DefaultHoverState = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.hoveredState}>
            <div className={styles.hoveredTop}>
                <h6>Еще больше очаровательных малышей</h6>
                <p>
                    Узнайте о уникальных чертах, включая веселые способности, предпочтения игр и
                    особенности личности :)
                </p>
            </div>
            <Button onClick={() => navigate(PATHS.CATS)} size={'small'}>
                Смотреть всех
            </Button>
        </div>
    );
};

export interface ICatCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    title?: string;
    img?: string;
    description?: string;
    bottomSlot?: ReactNode;
    status?: ECatStatus;
    hoverable?: boolean;
    hoverStateRender?: ReactNode;
    contentClass?: string;
    bottomClass?: string;
}

export const CatCard = ({
    className,
    title,
    status,
    description,
    contentClass,
    onClick,
    hoverable,
    bottomSlot,
    hoverStateRender,
    bottomClass,
    img,
    ...props
}: ICatCardProps) => {
    const [ref, hovering] = useHover();
    const isHovered = hovering && hoverable;
    const mainControls = useAnimation();
    const hoverControls = useAnimation();

    useEffect(() => {
        if (isHovered) {
            mainControls.start({ x: '-100%' });
            hoverControls.start({ x: 0 });
        } else {
            mainControls.start({ x: 0 });
            hoverControls.start({ x: '100%' });
        }
    }, [isHovered, mainControls, hoverControls]);

    return (
        <div
            onClick={onClick}
            ref={ref}
            className={cn(styles.wrapper, className, {
                [styles.hovered]: isHovered,
                [styles.clickable]: !!onClick,
            })}
            {...props}
        >
            <motion.div
                className={styles.inner}
                initial={{ x: 0 }}
                animate={mainControls}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
                <div className={styles.img}>
                    <img src={getImage(img)} />
                </div>
                <div className={cn(styles.content, contentClass)}>
                    <div className={styles.top}>
                        <h5 className={styles.title}>{title}</h5>
                        <Status status={status} />
                    </div>
                    {!!description && <p className={styles.description}>{description}</p>}
                    {isValidElement(bottomSlot) && (
                        <div className={cn(styles.bottomSlot, bottomClass)}>{bottomSlot}</div>
                    )}
                </div>
            </motion.div>

            {hoverable && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={hoverControls}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className={styles.hoverContainer}
                >
                    {hoverStateRender || <DefaultHoverState />}
                </motion.div>
            )}
        </div>
    );
};
