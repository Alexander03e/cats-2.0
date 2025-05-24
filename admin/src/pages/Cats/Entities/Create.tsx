import { Section } from '@/Components/Section';
import { CatForm } from '@/Features/Cat/Form.tsx';
import { Flex } from 'antd';
import { Button } from '@/Components/Button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const CreateCatPage = () => {
    const navigate = useNavigate();

    return (
        <Section
            title={
                <Flex gap={12}>
                    <Button size={'small'} onClick={() => navigate('/cats')}>
                        <ArrowLeftOutlined />
                    </Button>{' '}
                    Создание кошки
                </Flex>
            }
        >
            <CatForm />
        </Section>
    );
};
