import cn from 'classnames';
import type { HTMLMotionProps } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import isNil from 'lodash/isNil';
import type { ReactNode } from 'react';
import { useState, forwardRef } from 'react';
import styles from './collapsible.module.scss';

type CollapsibleProps = {
    children?: ReactNode;
    renderHeader?: (props: { isActive: boolean; toggle: () => void }) => ReactNode;
    isActive?: boolean;
    onToggle?: (isActive: boolean) => void;
    headerPosition?: 'top' | 'bottom';
} & HTMLMotionProps<'div'>;

const ANIMATE_CONFIG = {
    opacity: 1,
    height: 'auto',
    transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 },
    },
};

const EXIT_CONFIG = {
    opacity: 0,
    height: 0,
    transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 },
    },
};

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
    (
        {
            children,
            renderHeader,
            isActive: externalIsActive,
            onToggle,
            className,
            headerPosition = 'top',
            ...props
        },
        ref,
    ) => {
        const [internalIsActive, setInternalIsActive] = useState(false);

        const isControlled = !isNil(externalIsActive);
        const isActive = isControlled ? externalIsActive : internalIsActive;

        const toggle = (): void => {
            if (!isControlled) {
                setInternalIsActive(prev => !prev);
            }
            onToggle?.(!isActive);
        };

        return (
            <motion.div
                {...props}
                ref={ref}
                className={cn(styles.wrapper, className)}
                initial={false}
            >
                {headerPosition === 'top' && renderHeader && renderHeader({ isActive, toggle })}

                <AnimatePresence initial={false}>
                    {isActive && (
                        <motion.div
                            animate={ANIMATE_CONFIG}
                            exit={EXIT_CONFIG}
                            initial={{ opacity: 0, height: 0 }}
                            style={{ overflow: 'hidden' }}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>

                {headerPosition === 'bottom' && renderHeader && renderHeader({ isActive, toggle })}
            </motion.div>
        );
    },
);
