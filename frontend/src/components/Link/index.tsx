import { AnchorHTMLAttributes, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Link.module.scss';
import cn from 'classnames';

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
    mode?: 'react' | 'html';
}
export const Link = ({
    mode = 'html',
    icon,
    iconPosition = 'start',
    className,
    href,
    children,
    ...props
}: IProps) => {
    const content = (
        <>
            {iconPosition === 'start' && icon}
            {children}
            {iconPosition === 'end' && icon}
        </>
    );

    if (mode === 'react') {
        return (
            <NavLink className={cn(styles.wrapper, className)} to={href || '#'} {...props}>
                {content}
            </NavLink>
        );
    }

    return (
        <a className={cn(styles.wrapper, className)} href={href} {...props}>
            {content}
        </a>
    );
};
