import { Section } from '@/Components/Section';
import { useQuery } from '@tanstack/react-query';
import { catsQueries, useDeleteCat } from '@/Shared/api/cats.ts';
import {
    TableColumnsType,
    Table,
    Empty,
    Spin,
    Flex,
    Button as AntButton,
    Modal,
    message,
} from 'antd';
import { ICatListItem } from '@/Shared/types/cats.ts';
import { useState } from 'react';
import { Error } from '@/Components/Error';
import { Button } from '@/Components/Button';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const CatsPage = () => {
    const { mutateAsync } = useDeleteCat();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const handleDelete = (id: number) => {
        Modal.confirm({
            centered: true,
            maskClosable: true,
            closable: true,
            okText: 'Удалить',
            cancelText: 'Отмена',
            title: 'Вы действительно хотите удалить?',
            onOk: async () => {
                try {
                    await mutateAsync({ id });
                    message.success('Кот успешно удален');
                } catch {
                    message.error('Ошибка при удалении кота');
                }
            },
        });
    };

    const { data, isLoading, isError } = useQuery(catsQueries.list());

    const columns: TableColumnsType<ICatListItem> = [
        {
            title: 'ID',
            ellipsis: true,
            width: 90,
            align: 'start',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название',
            align: 'start',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            width: 120,
            render: (_, data) => (
                <AntButton
                    size={'small'}
                    type={'primary'}
                    onClick={() => navigate(`/cats/appointments/${data.id}`)}
                >
                    Заявки
                </AntButton>
            ),
        },
        {
            title: '',
            align: 'center',
            width: 100,
            render: (_value, data) => {
                if (!data) return;

                return (
                    <Flex gap={12} justify={'right'}>
                        <AntButton
                            onClick={() => handleDelete(data.id)}
                            type={'primary'}
                            danger
                            size={'small'}
                        >
                            <DeleteOutlined />
                        </AntButton>
                        <AntButton
                            onClick={() => navigate(`/cats/edit/${data.id}`)}
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

    const results = data?.results || [];

    const navigate = useNavigate();

    // Клиентская пагинация
    const paginatedData = results.slice(
        (pagination.current - 1) * pagination.pageSize,
        pagination.current * pagination.pageSize,
    );

    if (isError) {
        return <Error />;
    }

    return (
        <Section title='Список котов'>
            <Button
                onClick={() => navigate('/cats/create')}
                style={{ marginBottom: '16px' }}
                size={'small'}
            >
                <PlusOutlined /> Создать
            </Button>
            <Spin spinning={isLoading} delay={300}>
                <Table<ICatListItem>
                    size={'middle'}
                    style={{
                        width: '100%',
                    }}
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey='id'
                    pagination={{
                        ...pagination,
                        total: results.length,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50'],
                    }}
                    onChange={handleTableChange}
                    locale={{
                        emptyText: (
                            <Empty description={isLoading ? 'Загрузка...' : 'Данные не найдены'} />
                        ),
                    }}
                    loading={isLoading}
                />
            </Spin>
        </Section>
    );
};
