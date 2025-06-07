import { Section } from '@/Components/Section';
import {
    Button as AntButton,
    Empty,
    Flex,
    message,
    Modal,
    Table,
    TableColumnsType,
    Tag,
} from 'antd';
import { useQuery } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/Components/Button';
import { useDeleteVacancy, vacancyQueries } from '@/Shared/api/vacancies.ts';
import { EVacancyOpenedStatus, IVacancyItem } from '@/Shared/types/vacancies.ts';
import dayjs from 'dayjs';

export const VacanciesPage = () => {
    const { data, isLoading } = useQuery(vacancyQueries.list());
    const deleteNew = useDeleteVacancy();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const handleDelete = (id: number | string) => {
        Modal.confirm({
            centered: true,
            maskClosable: true,
            closable: true,
            okText: 'Удалить',
            cancelText: 'Отмена',
            title: 'Вы действительно хотите удалить?',
            onOk: async () => {
                try {
                    await deleteNew.mutateAsync(id);
                } catch {
                    message.error('Ошибка при удалении вакансии');
                }
            },
        });
    };

    const navigate = useNavigate();

    const columns: TableColumnsType<IVacancyItem> = [
        {
            title: 'ID',
            ellipsis: true,
            width: 60,
            align: 'start',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название',
            align: 'start',
            dataIndex: 'title',
            width: 150,
            key: 'title',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: value => {
                if (value === EVacancyOpenedStatus.OPEN) {
                    return <Tag color={'success'}>Открыта</Tag>;
                }
                if (value === EVacancyOpenedStatus.CLOSED) {
                    return <Tag color={'error'}>Закрыта</Tag>;
                }
            },
            width: 120,
        },
        {
            title: 'Дата создания',
            dataIndex: 'created_at',
            width: 120,
            key: 'created_at',
            render: value => dayjs(value).format('DD.MM.YYYY HH:mm'),
        },
        {
            width: 80,
            title: 'Заявки',
            render: (_, data) => {
                return (
                    <AntButton
                        size={'small'}
                        type={'primary'}
                        onClick={() => navigate(`/vacancy/appointments/${data.id}`)}
                    >
                        Список заявок
                    </AntButton>
                );
            },
        },
        {
            title: '',
            align: 'center',
            width: 40,
            render: (_value, data) => {
                if (!data) return;

                return (
                    <Flex gap={12} justify={'space-around'}>
                        <AntButton
                            onClick={() => handleDelete(data.id)}
                            type={'primary'}
                            danger
                            size={'small'}
                        >
                            <DeleteOutlined />
                        </AntButton>
                        <AntButton
                            onClick={() => navigate(`/vacancy/edit/${data.id}`)}
                            type={'primary'}
                            size={'small'}
                        >
                            <EditOutlined />
                        </AntButton>
                    </Flex>
                );
            },
        },
    ];

    const handleTableChange = (pagination: any) => {
        setPagination(pagination);
    };

    const paginatedData = data?.slice(
        (pagination.current - 1) * pagination.pageSize,
        pagination.current * pagination.pageSize,
    );

    return (
        <Section title={'Вакансии'}>
            <Button
                onClick={() => navigate('/vacancy/create')}
                style={{ marginBottom: '16px' }}
                size={'small'}
            >
                <PlusOutlined /> Создать
            </Button>
            <Table<IVacancyItem>
                rowKey='id'
                size={'middle'}
                style={{
                    width: '100%',
                }}
                scroll={{
                    x: 'max-content',
                }}
                onChange={handleTableChange}
                loading={isLoading}
                locale={{
                    emptyText: (
                        <Empty description={isLoading ? 'Загрузка...' : 'Данные не найдены'} />
                    ),
                }}
                pagination={{
                    ...pagination,
                    total: data?.length,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                }}
                columns={columns}
                dataSource={paginatedData}
            />
        </Section>
    );
};
