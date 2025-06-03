import { useNavigate } from 'react-router-dom';
import { Section } from '@/Components/Section';
import { Flex } from 'antd';
import { Button } from '@/Components/Button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { VacancyForm } from '@/Features/Vacancy/Form.tsx';

export const CreateVacancyPage = () => {
    const navigate = useNavigate();

    return (
        <Section
            title={
                <Flex gap={12}>
                    <Button size={'small'} onClick={() => navigate('/vacancy')}>
                        <ArrowLeftOutlined />
                    </Button>{' '}
                    Создание вакансии
                </Flex>
            }
        >
            <VacancyForm />
        </Section>
    );
};
