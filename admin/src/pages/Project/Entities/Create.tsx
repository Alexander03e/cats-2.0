import { useNavigate } from 'react-router-dom';
import { Section } from '@/Components/Section';
import { Flex } from 'antd';
import { Button } from '@/Components/Button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ProjectForm } from '@/Features/Project/Form.tsx';

export const CreateProjectPage = () => {
    const navigate = useNavigate();

    return (
        <Section
            title={
                <Flex gap={12}>
                    <Button size={'small'} onClick={() => navigate('/projects')}>
                        <ArrowLeftOutlined />
                    </Button>{' '}
                    Создание проекта
                </Flex>
            }
        >
            <ProjectForm />
        </Section>
    );
};
