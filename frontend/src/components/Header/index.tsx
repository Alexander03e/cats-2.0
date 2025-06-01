import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { ANCHORS, PATHS } from '@/Shared/consts';
import SVG from 'react-inlinesvg';
import { Button } from '@/Components/Button';
import { Link } from '@/Components/Link';
import { Dropdown } from '@/Components/Dropdown';
import { useMobile } from '@/Shared/hooks/useMobile.ts';
import { MobileBurger } from '@/Components/Header/MobileBurger.tsx';

export const Header = () => {
    const isMobile = useMobile();
    return (
        <header className={styles.wrapper}>
            <div className={styles.logo}>
                <NavLink to={PATHS.HOME}>
                    <SVG src={'/icons/logo.svg'} />
                </NavLink>
            </div>
            {!isMobile && (
                <div className={styles.navigation}>
                    <Link mode={'hash'} href={ANCHORS.HELP}>
                        Как помочь
                    </Link>
                    <NavLink to={PATHS.PROJECTS}>Проекты</NavLink>
                    <NavLink to={PATHS.CATS}>Взять котика</NavLink>
                    <NavLink to={PATHS.HISTORY}>Истории успеха</NavLink>
                    <Dropdown
                        overlay={
                            <div className={styles.about}>
                                <Link mode={'react'} href={PATHS.VACANCY}>
                                    Вакансии
                                </Link>
                                <Link mode={'hash'}>О приюте</Link>
                            </div>
                        }
                    >
                        <p style={{ cursor: 'pointer' }}>О приюте</p>
                    </Dropdown>
                    <NavLink to={PATHS.ARTICLES}>Полезные статьи</NavLink>
                    <Link mode={'hash'} href={ANCHORS.FAQ}>
                        FAQ
                    </Link>
                    <NavLink to={PATHS.CONTACTS}>Контакты</NavLink>
                </div>
            )}

            <div className={styles.rest}>
                <Link className={styles.helpLink} mode={'hash'} href={ANCHORS.HELP}>
                    <Button className={styles.headerBtn}>Хочу помочь!</Button>
                </Link>
                {isMobile && <MobileBurger />}
            </div>
        </header>
    );
};
