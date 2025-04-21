import styles from './Section.module.scss';
import { HTMLAttributes } from 'react';
import cn from 'classnames';
import parse from 'html-react-parser';

export interface IProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    innerClass?: string;
    contentClass?: string;
}

export const Section = ({
    children,
    contentClass,
    title,
    innerClass,
    className,
    ...props
}: IProps) => {
    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <div className={cn(styles.inner, innerClass)}>
                <h2 className={styles.title}>{parse(title)}</h2>
                <div className={cn(styles.content, contentClass)}>{children}</div>
            </div>
        </div>
    );
};
