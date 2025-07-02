import styles from './Section.module.scss';
import { HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import parse from 'html-react-parser';
import SVG from 'react-inlinesvg';
import { useNavigate } from 'react-router-dom';

export interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: string | ReactNode;
    innerClass?: string;
    contentClass?: string;
    topTitleSlot?: ReactNode;
    withBack?: boolean;
}

export const Section = ({
    children,
    contentClass,
    topTitleSlot,
    title,
    innerClass,
    className,
    withBack,
    ...props
}: IProps) => {
    const navigate = useNavigate();
    const onBack = () => navigate(-1);
    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <div className={cn(styles.inner, innerClass)}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        alignItems: 'center',
                    }}
                >
                    {topTitleSlot}
                    {!!title && (
                        <h2 className={styles.title}>
                            {withBack && (
                                <button className={styles.backBtn} onClick={onBack}>
                                    <SVG src={'/icons/arrow-back-btn.svg'} />
                                </button>
                            )}
                            {typeof title === 'string' ? parse(title) : title}
                        </h2>
                    )}
                </div>
                <div className={cn(styles.content, contentClass)}>{children}</div>
            </div>
        </div>
    );
};
