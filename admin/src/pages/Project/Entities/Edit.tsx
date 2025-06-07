import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '@/Components/Section';
import { Flex, Spin } from 'antd';
import { Button } from '@/Components/Button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { ProjectForm } from '@/Features/Project/Form.tsx';
import { projectQueries } from '@/Shared/api/projects.ts';

export const EditProjectPage = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { data, isLoading } = useQuery(projectQueries.detail(projectId!));

    return (
        <Section
            title={
                <Flex gap={12}>
                    <Button size={'small'} onClick={() => navigate('/projects')}>
                        <ArrowLeftOutlined />
                    </Button>{' '}
                    Редактирование проекта
                </Flex>
            }
        >
            <Spin spinning={isLoading}>
                <ProjectForm isEdit initialValues={data} />
            </Spin>
        </Section>
    );
};
