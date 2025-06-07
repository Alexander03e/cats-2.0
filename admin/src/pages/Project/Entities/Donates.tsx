import { Section } from '@/Components/Section';
import { Empty, Flex, Table, TableColumnsType, Tag, Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Button } from '@/Components/Button';
import orderBy from 'lodash/orderBy';
import { projectQueries } from '@/Shared/api/projects.ts';
import { EDonationStatus, IDonationItem } from '@/Shared/types/projects.ts';

export const ProjectDonationPage = () => {
    const { projectId } = useParams();
    const { data: initialData, isLoading } = useQuery(projectQueries.donates(projectId!));

    const data = orderBy(
        initialData,
        [item => item.status === EDonationStatus.PENDING, 'status'],
        ['desc', 'asc'],
    );

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const navigate = useNavigate();

    const columns: TableColumnsType<IDonationItem> = [
        {
            title: 'ID',
            ellipsis: true,
            width: 60,
            align: 'start',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Дата создания',
            dataIndex: 'date',
            width: 160,
            key: 'date',
            render: value => dayjs(value).format('DD.MM.YYYY HH:mm'),
        },
        {
            title: 'Имя донатера',
            align: 'start',
            ellipsis: true,
            dataIndex: 'donor_name',
            width: 200,
            key: 'title',
            render: value => <Tooltip title={value}>{value}</Tooltip>,
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: value => {
                if (value === EDonationStatus.SUCCESS) {
                    return <Tag color={'success'}>Оплачено</Tag>;
                }
                if (value === EDonationStatus.FAILED) {
                    return <Tag color={'error'}>Просрочен</Tag>;
                }
                if (value === EDonationStatus.PENDING) {
                    return <Tag color={'geekblue'}>Ожидается</Tag>;
                }
            },
            width: 140,
        },
        {
            title: 'Сумма',
            dataIndex: 'amount',
            key: 'amount',
            width: 120,
            render: value => `${value} ₽`,
        },
        {
            title: 'Комментарий',
            dataIndex: 'message',
            ellipsis: true,
            render: value => <Tooltip title={value}>{value}</Tooltip>,
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
        <Section
            title={
                <Flex gap={12}>
                    <Button size={'small'} onClick={() => navigate(-1)}>
                        <ArrowLeftOutlined />
                    </Button>{' '}
                    Донаты на проект {projectId}
                </Flex>
            }
        >
            <Table<IDonationItem>
                rowKey='id'
                size={'middle'}
                style={{
                    width: '100%',
                }}
                scroll={{
                    x: '100%',
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
