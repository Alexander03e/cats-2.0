import { useNavigate, useParams } from 'react-router-dom';
import { Section } from '@/Components/Section';
import { Flex, Spin } from 'antd';
import { Button } from '@/Components/Button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { vacancyQueries } from '@/Shared/api/vacancies.ts';
import { VacancyForm } from '@/Features/Vacancy/Form.tsx';

export const EditVacancyPage = () => {
    const navigate = useNavigate();
    const { vacancyId } = useParams();
    const { data, isLoading } = useQuery(vacancyQueries.detail(vacancyId!));

    return (
        <Section
            title={
                <Flex gap={12}>
                    <Button size={'small'} onClick={() => navigate('/vacancy')}>
                        <ArrowLeftOutlined />
                    </Button>{' '}
                    Редактирование вакансии
                </Flex>
            }
        >
            <Spin spinning={isLoading}>
                <VacancyForm initialData={data} isEdit />
            </Spin>
        </Section>
    );
};
