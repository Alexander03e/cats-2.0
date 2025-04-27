import styles from './Input.module.scss';
import { forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';

type TProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
};

export const Input = forwardRef<HTMLInputElement, TProps>(({ className, error, ...props }, ref) => {
    return (
        <div className={styles.wrapper}>
            <input className={cn(styles.input, className)} {...props} ref={ref} />
            {!!error && <p>{error}</p>}
        </div>
    );
});
