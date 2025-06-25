import styles from './Header.module.scss';
import { Link } from '@/Components/Link';
import { ANCHORS, PATHS } from '@/Shared/consts';
import { NavLink } from 'react-router-dom';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import SVG from 'react-inlinesvg';
import { AnimatePresence, motion } from 'framer-motion';

export const MobileBurger = forwardRef((_, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    useImperativeHandle(ref, () => ({
        close: () => setIsOpen(false),
    }));

    const handleNavigationClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) {
            setIsOpen(false);
        }
    }, []);

    return (
        <>
            <button onClick={() => setIsOpen(prev => !prev)} className={styles.burger}>
                {!isOpen ? (
                    <SVG src={'/icons/burger.svg'} />
                ) : (
                    <div className={styles.closeBurger}>
                        <SVG src={'/icons/plus.svg'} />
                    </div>
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        transition={{
                            duration: 0.2,
                            ease: 'easeInOut',
                            type: 'tween',
                        }}
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        className={styles.burgerWrapper}
                    >
                        <div className={styles.burgerInner}>
                            <div onClick={handleNavigationClick} className={styles.navigation}>
                                <Link mode={'hash'} href={ANCHORS.HELP}>
                                    Как помочь
                                </Link>
                                <NavLink to={PATHS.PROJECTS}>Проекты</NavLink>
                                <NavLink to={PATHS.CATS}>Взять котика</NavLink>
                                <NavLink to={PATHS.HISTORY}>Уже дома</NavLink>
                                <Link mode={'react'} href={PATHS.VACANCY}>
                                    Вакансии
                                </Link>
                                <Link mode={'react'} href={PATHS.NEWS}>
                                    Новости
                                </Link>
                                <Link mode={'hash'}>О приюте</Link>
                                <Link mode={'hash'} href={ANCHORS.FAQ}>
                                    FAQ
                                </Link>
                                <NavLink to={PATHS.CONTACTS}>Контакты</NavLink>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
});
