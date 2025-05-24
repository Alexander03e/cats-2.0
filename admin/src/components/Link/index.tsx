import { AnchorHTMLAttributes, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Link.module.scss';
import cn from 'classnames';
import { HashLink } from 'react-router-hash-link';

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
    mode?: 'react' | 'html' | 'hash';
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
    const classNames = cn(styles.wrapper, className);
    const content = (
        <>
            {iconPosition === 'start' && icon}
            {children}
            {iconPosition === 'end' && icon}
        </>
    );

    if (mode === 'react') {
        return (
            <NavLink className={classNames} to={href || '#'} {...props}>
                {content}
            </NavLink>
        );
    }

    if (mode === 'hash') {
        return (
            <HashLink to={href ? `/#${href}` : ''} className={classNames} {...props}>
                {content}
            </HashLink>
        );
    }

    return (
        <a className={classNames} href={href} {...props}>
            {content}
        </a>
    );
};
