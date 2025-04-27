import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { ANCHORS, PATHS } from '@/Shared/consts';
import SVG from 'react-inlinesvg';
import { Button } from '@/Components/Button';
import { Link } from '@/Components/Link';

export const Header = () => {
    return (
        <header className={styles.wrapper}>
            <div className={styles.logo}>
                <NavLink to={PATHS.HOME}>
                    <SVG src={'/icons/logo.svg'} />
                </NavLink>
            </div>
            <div className={styles.navigation}>
                <Link mode={'hash'} href={ANCHORS.HELP}>
                    Как помочь
                </Link>
                <NavLink to={PATHS.PROJECTS}>Проекты</NavLink>
                <NavLink to={PATHS.CATS}>Взять котика</NavLink>
                <NavLink to={PATHS.HISTORY}>Истории успеха</NavLink>
                <NavLink to={PATHS.ABOUT}>О приюте</NavLink>
                <NavLink to={PATHS.ARTICLES}>Полезные статьи</NavLink>
                <Link mode={'hash'} href={ANCHORS.FAQ}>
                    FAQ
                </Link>
                <NavLink to={PATHS.CONTACTS}>Контакты</NavLink>
            </div>

            <Link className={styles.helpLink} mode={'hash'} href={ANCHORS.HELP}>
                <Button className={styles.headerBtn}>Хочу помочь!</Button>
            </Link>
        </header>
    );
};
