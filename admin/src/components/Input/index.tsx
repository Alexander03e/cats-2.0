// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import styles from './Input.module.scss';
import { ComponentProps, forwardRef, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import ReactInputMask from '@mona-health/react-input-mask';

type TProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    maskProps?: ComponentProps<typeof ReactInputMask>;
};

export const Input = forwardRef<HTMLInputElement, TProps>(
    ({ className, maskProps, error, ...props }, ref) => {
        return (
            <div className={styles.wrapper}>
                {!!maskProps && (
                    <ReactInputMask
                        ref={ref}
                        className={cn(styles.input, className)}
                        {...maskProps}
                        {...props}
                    />
                )}
                {!maskProps && (
                    <input className={cn(styles.input, className)} {...props} ref={ref} />
                )}
                {!!error && <p>{error}</p>}
            </div>
        );
    },
);
