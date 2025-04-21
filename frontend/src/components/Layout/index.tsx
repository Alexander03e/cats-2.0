import styles from './Layout.module.scss';
import { Header } from '@/Components/Header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};
