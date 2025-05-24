import { Section } from '@/Components/Section';
import { CatForm } from '@/Features/Cat/Form.tsx';
import { Flex, Spin } from 'antd';
import { Button } from '@/Components/Button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';
import { Error } from '@/Components/Error';

export const EditCatPage = () => {
    const navigate = useNavigate();

    const { catId } = useParams();

    const { data, isLoading, isError } = useQuery(catsQueries.detail(catId!));

    if (isError) {
        return <Error />;
    }

    return (
        <Spin spinning={isLoading}>
            <Section
                title={
                    <Flex gap={12}>
                        <Button size={'small'} onClick={() => navigate('/cats')}>
                            <ArrowLeftOutlined />
                        </Button>{' '}
                        {data ? `Редактирование "${data?.name}"` : ''}
                    </Flex>
                }
            >
                <CatForm initialData={data} />
            </Section>
        </Spin>
    );
};
