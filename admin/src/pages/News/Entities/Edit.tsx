import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '@/Components/Section';
import { Flex, Spin } from 'antd';
import { Button } from '@/Components/Button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { NewsForm } from '@/Features/News/Form.tsx';
import { useQuery } from '@tanstack/react-query';
import { newsQueries } from '@/Shared/api/news.ts';

export const EditNewsPage = () => {
    const navigate = useNavigate();
    const { newId } = useParams();
    const { data, isLoading } = useQuery(newsQueries.detail(newId!));

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
        >
            <Spin spinning={isLoading}>
                <NewsForm initialValues={data} isEdit />
            </Spin>
        </Section>
    );
};
