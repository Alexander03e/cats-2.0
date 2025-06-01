import styles from './Sidebar.module.scss';
import Sider from 'antd/es/layout/Sider';
import SVG from 'react-inlinesvg';
import { Flex } from 'antd';
import { useLocation } from 'react-router-dom';
import { Link } from '@/Components/Link';
import { Button } from '@/Components/Button';
import { useAppContext } from '../../app/App.tsx';

export const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAppContext();
    const pathname = location.pathname;

    const activeStyles = {
        textDecoration: 'underline',
    };

    return (
        <Sider width={300} className={styles.wrapper}>
            <Flex vertical style={{ height: '100%' }}>
                <Flex align={'flex-end'} gap={16}>
                    <SVG src={'/icons/logo.svg'} />
                    <p style={{ fontWeight: '600', fontSize: '24px' }}>Котодом</p>
                </Flex>

                <Flex
                    gap={12}
                    vertical
                    style={{
                        flex: '1 0 auto',
                        // padding: '16px',
                        borderRadius: '16px',
                        // background: 'white',
                        marginBlock: '32px',
                    }}
                >
                    <Link
                        href={'/cats'}
                        mode={'react'}
                        style={{
                            fontSize: '24px',
                            color: 'var(--default-dark)',
                            ...(pathname === '/cats' && activeStyles),
                        }}
                    >
                        Коты
                    </Link>
                    <Link
                        href={'/news'}
                        mode={'react'}
                        style={{
                            fontSize: '24px',
                            color: 'var(--default-dark)',
                            ...(pathname === '/news' && activeStyles),
                        }}
                    >
                        Новости
                    </Link>
                </Flex>

                <Button onClick={() => logout()}>Выйти</Button>
            </Flex>
        </Sider>
    );
};
