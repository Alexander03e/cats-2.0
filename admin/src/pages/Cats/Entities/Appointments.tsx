import { Section } from '@/Components/Section';
import { Button as AntButton, Empty, Flex, message, Table, TableColumnsType, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Button } from '@/Components/Button';
import orderBy from 'lodash/orderBy';
import { catsQueries, useUpdateCatApplication } from '@/Shared/api/cats.ts';
import { ECatApplicationStatus, ICatApplication } from '@/Shared/types/cats.ts';

interface IUpdateAppointment {
    appId: number;
    catId: number;
}

export const CatAppointmentsPage = () => {
    const { catId } = useParams();
    const { data: initialData, isLoading } = useQuery(catsQueries.appointments(catId!));

    const data = orderBy(
        initialData,
        [item => item.status === ECatApplicationStatus.IN_REVIEW, 'status'],
        ['desc', 'asc'],
    );

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const updateAppointment = useUpdateCatApplication();

    const navigate = useNavigate();

    const handleAccept = async ({ appId, catId }: IUpdateAppointment) => {
        try {
            await updateAppointment.mutateAsync({
                appId,
                catId,
                status: ECatApplicationStatus.APPROVED,
            });
        } catch {
            message.error('Ошибка при обновлении статуса заявки');
        }
    };

    const handleDecline = async ({ appId, catId }: IUpdateAppointment) => {
        try {
            await updateAppointment.mutateAsync({
                appId,
                catId,
                status: ECatApplicationStatus.REJECTED,
            });
        } catch {
            message.error('Ошибка при обновлении статуса заявки');
        }
    };

    const columns: TableColumnsType<ICatApplication> = [
        {
            title: 'ID',
            ellipsis: true,
            width: 90,
            align: 'start',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Имя/Фамилия',
            align: 'start',
            dataIndex: 'applicant_name',
            width: 180,
            key: 'title',
            render: (_, data) => `${data.last_name} ${data.first_name}`,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 100,
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: value => {
                if (value === ECatApplicationStatus.APPROVED) {
                    return <Tag color={'success'}>Принята</Tag>;
                }
                if (value === ECatApplicationStatus.REJECTED) {
                    return <Tag color={'error'}>Отклонена</Tag>;
                }
                if (
                    value === ECatApplicationStatus.IN_REVIEW ||
                    value === ECatApplicationStatus.NEW
                ) {
                    return <Tag color={'warning'}>На рассмотрении</Tag>;
                }
            },
            width: 120,
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            key: 'phone',
            width: 120,
        },
        {
            title: 'Дата создания',
            dataIndex: 'date',
            width: 150,
            key: 'created_at',
            render: value => dayjs(value).format('DD.MM.YYYY HH:mm'),
        },
        {
            dataIndex: 'status',
            width: 120,
            align: 'center',
            render: (value, data) => {
                if (
                    value === ECatApplicationStatus.REJECTED ||
                    value === ECatApplicationStatus.APPROVED
                ) {
                    return;
                }
                return (
                    <Flex gap={12}>
                        <AntButton
                            onClick={() => handleAccept({ appId: data.id, catId: Number(catId)! })}
                            variant={'solid'}
                            size={'small'}
                            color={'green'}
                        >
                            Принять
                        </AntButton>

                        <AntButton
                            onClick={() => handleDecline({ appId: data.id, catId: Number(catId)! })}
                            variant={'solid'}
                            size={'small'}
                            color={'danger'}
                        >
                            Отклонить
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
        <Section
            title={
                <Flex gap={12}>
                    <Button size={'small'} onClick={() => navigate(-1)}>
                        <ArrowLeftOutlined />
                    </Button>{' '}
                    Заявки на усыновление кошки {catId}
                </Flex>
            }
        >
            <Table<ICatApplication>
                rowKey='id'
                size={'middle'}
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
