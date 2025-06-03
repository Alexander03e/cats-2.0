import { Section } from '@/Components/Section';
import { Button as AntButton, Empty, Flex, message, Table, TableColumnsType, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useUpdateAppointment, vacancyQueries } from '@/Shared/api/vacancies.ts';
import { EVacancyStatus, IVacancyAppointment } from '@/Shared/types/vacancies.ts';
import dayjs from 'dayjs';
import { Button } from '@/Components/Button';
import orderBy from 'lodash/orderBy';

interface IUpdateAppointment {
    appId: number;
    vacancyId: number;
}

export const VacancyAppointments = () => {
    const { vacancyId } = useParams();
    const { data: initialData, isLoading } = useQuery(vacancyQueries.appointments(vacancyId!));

    const data = orderBy(
        initialData,
        [item => item.status === EVacancyStatus.REVIEW, 'status'],
        ['desc', 'asc'],
    );

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const updateAppointment = useUpdateAppointment();

    const navigate = useNavigate();

    const handleAccept = async ({ appId, vacancyId }: IUpdateAppointment) => {
        try {
            await updateAppointment.mutateAsync({
                id: appId,
                vacancy: vacancyId,
                status: EVacancyStatus.APPROVED,
            });
        } catch {
            message.error('Ошибка при обновлении статуса заявки');
        }
    };

    const handleDecline = async ({ appId, vacancyId }: IUpdateAppointment) => {
        try {
            await updateAppointment.mutateAsync({
                id: appId,
                vacancy: vacancyId,
                status: EVacancyStatus.REJECTED,
            });
        } catch {
            message.error('Ошибка при обновлении статуса заявки');
        }
    };

    const columns: TableColumnsType<IVacancyAppointment> = [
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
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: value => {
                if (value === EVacancyStatus.APPROVED) {
                    return <Tag color={'success'}>Принята</Tag>;
                }
                if (value === EVacancyStatus.REJECTED) {
                    return <Tag color={'error'}>Отклонена</Tag>;
                }
                if (value === EVacancyStatus.REVIEW) {
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
            width: 120,
            key: 'created_at',
            render: value => dayjs(value).format('DD.MM.YYYY HH:mm'),
        },
        {
            dataIndex: 'status',
            width: 120,
            align: 'center',
            render: (value, data) => {
                if (value !== EVacancyStatus.REVIEW) {
                    return;
                }
                return (
                    <Flex gap={12}>
                        <AntButton
                            onClick={() =>
                                handleAccept({ appId: data.id, vacancyId: data.vacancy })
                            }
                            variant={'solid'}
                            size={'small'}
                            color={'green'}
                        >
                            Принять
                        </AntButton>

                        <AntButton
                            onClick={() =>
                                handleDecline({ appId: data.id, vacancyId: data.vacancy })
                            }
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
                    Заявки на вакансию {vacancyId}
                </Flex>
            }
        >
            <Table<IVacancyAppointment>
                rowKey='id'
                size={'middle'}
                style={{
                    width: '100%',
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
