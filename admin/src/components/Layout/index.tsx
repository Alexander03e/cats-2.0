import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/Components/Sidebar';
import { Layout as AntLayout } from 'antd';

export const Layout = () => {
    return (
        <AntLayout className={styles.layout}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </AntLayout>
    );
};
