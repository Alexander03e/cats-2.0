import { Flex, Input, message, Typography } from 'antd';
import { Button } from '@/Components/Button';
import { useState } from 'react';
import { useAppContext } from '../../app/App.tsx';
import SVG from 'react-inlinesvg';

export const AuthPage = () => {
    const { login } = useAppContext();
    const [value, setValue] = useState('');
    const handleSubmit = async (value: string) => {
        if (value !== 'root') {
            message.error('Неверный пароль');
            localStorage.removeItem('auth');
        } else {
            message.success('Выполнен вход');
            localStorage.setItem('auth', 'true');
            login();
        }
    };
    return (
        <Flex
            style={{
                width: '100vw',
                height: '100vh',
                zIndex: 100,
                position: 'fixed',
                left: 0,
                background: 'white',
                top: 0,
            }}
            justify={'center'}
            align={'center'}
        >
            <Flex align={'center'} gap={24} vertical>
                <Flex vertical align={'center'}>
                    <SVG src={'/icons/logo.svg'} />
                </Flex>
                <Typography.Title style={{ margin: 0 }} level={3}>
                    Введите пароль
                </Typography.Title>
                <Input.Password
                    size={'large'}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={'Пароль'}
                />
                <Button disabled={!value} onClick={() => handleSubmit(value)} size={'small'}>
                    Войти
                </Button>
            </Flex>
        </Flex>
    );
};
