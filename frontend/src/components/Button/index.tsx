import styles from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'blue' | 'yellow' | 'default' | 'light' | 'tab';
    size?: 'small' | 'medium';
    isActive?: boolean;
    fullWidth?: boolean;
}

export const Button = ({
    variant = 'default',
    size = 'medium',
    className,
    isActive,
    children,
    fullWidth,
    ...props
}: IProps) => {
    return (
        <button
            className={cn(styles.button, styles[variant], styles[size], className, {
                [styles.active]: isActive,
                [styles.fullWidth]: fullWidth,
            })}
            {...props}
        >
            {children}
        </button>
    );
};
