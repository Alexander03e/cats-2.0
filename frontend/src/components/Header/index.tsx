import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';
import SVG from 'react-inlinesvg';
import { Button } from '@/Components/Button';

export const Header = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.navigation}>
                <NavLink to={PATHS.HELP}>Как помочь</NavLink>
                <NavLink to={PATHS.PROJECTS}>Проекты</NavLink>
                <NavLink to={PATHS.TAKE_CAT}>Взять котика</NavLink>
                <NavLink to={PATHS.HISTORY}>Истории успеха</NavLink>
                <NavLink to={PATHS.ABOUT}>О приюте</NavLink>
                <div className={styles.logo}>
                    <NavLink to={PATHS.HOME}>
                        <SVG src={'/icons/logo.svg'} />
                    </NavLink>
                </div>
                <NavLink to={PATHS.ARTICLES}>Полезные статьи</NavLink>
                <NavLink to={PATHS.FAQ}>FAQ</NavLink>
                <NavLink to={PATHS.CONTACTS}>Контакты</NavLink>
            </div>

            <Button className={styles.headerBtn}>Хочу помочь!</Button>
        </div>
    );
};
