import { useNavigate } from 'react-router-dom';
import { Section } from '@/Components/Section';
import { Flex } from 'antd';
import { Button } from '@/Components/Button';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const EditNewsPage = () => {
    const navigate = useNavigate();

    return (
        <Section
            title={
                <Flex gap={12}>
                    <Button size={'small'} onClick={() => navigate('/news')}>
                        <ArrowLeftOutlined />
                    </Button>{' '}
                    Редактирование новости
                </Flex>
            }
        ></Section>
    );
};
