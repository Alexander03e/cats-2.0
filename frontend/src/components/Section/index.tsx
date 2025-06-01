import styles from './Section.module.scss';
import { HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import parse from 'html-react-parser';

export interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: string | ReactNode;
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
                {!!title && (
                    <h2 className={styles.title}>
                        {typeof title === 'string' ? parse(title) : title}
                    </h2>
                )}
                <div className={cn(styles.content, contentClass)}>{children}</div>
            </div>
        </div>
    );
};
