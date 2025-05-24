import { Section } from '@/Components/Section';
import { Button as AntButton, Empty, Flex, Modal, Table, TableColumnsType } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { newsQueries } from '@/Shared/api/news.ts';
import { INewsItem } from '@/Shared/types/news.ts';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/Components/Button';

export const NewsPage = () => {
    const { data, isLoading } = useQuery(newsQueries.list());
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
        });
    };

    const navigate = useNavigate();

    const columns: TableColumnsType<INewsItem> = [
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
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '',
            align: 'center',
            width: 100,
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
                            onClick={() => navigate(`/news/edit/${data.id}`)}
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
        <Section title={'Новости'}>
            <Button
                onClick={() => navigate('/news/create')}
                style={{ marginBottom: '16px' }}
                size={'small'}
            >
                <PlusOutlined /> Создать
            </Button>
            <Table<INewsItem>
                rowKey='id'
                size={'middle'}
                style={{
                    width: '100%',
                }}
                onChange={handleTableChange}
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
