import { Section } from '@/Components/Section';
import { Button as AntButton, Empty, Flex, message, Modal, Table, TableColumnsType } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/Components/Button';
import { projectQueries, useDeleteProject } from '@/Shared/api/projects.ts';
import { IProjectItem } from '@/Shared/types/projects.ts';
import { getProjectStatus } from '@/Features/Project/getProjectStatus.tsx';
import dayjs from 'dayjs';

export const ProjectsPage = () => {
    const { data, isLoading } = useQuery(projectQueries.list());
    const deleteProject = useDeleteProject();

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
                    await deleteProject.mutateAsync(id);
                    message.success('Проект успешно удален');
                } catch {
                    message.error('Ошибка при удалении проекта');
                }
            },
        });
    };

    const navigate = useNavigate();

    const columns: TableColumnsType<IProjectItem> = [
        {
            title: 'ID',
            ellipsis: true,
            width: 90,
            align: 'start',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Дата создания',
            ellipsis: true,
            width: 180,
            dataIndex: 'created_at',
            render: value => dayjs(value).format('DD.MM.YYYY'),
        },
        {
            title: 'Название',
            align: 'start',
            width: 220,
            ellipsis: true,
            dataIndex: 'title',
            key: 'title',
        },
        {
            ellipsis: true,
            title: 'Собрано средств',
            width: 220,
            render: (_, data) => {
                return (
                    <Flex>
                        {data.current_amount} / {data.goal_amount} ₽
                    </Flex>
                );
            },
        },
        {
            title: 'Статус',
            width: 180,
            dataIndex: 'status',
            render: value => getProjectStatus(value),
        },
        {
            title: '',
            width: 160,
            render: (_, data) => (
                <AntButton
                    size={'small'}
                    onClick={() => navigate(`/projects/donations/${data.id}`)}
                    type={'primary'}
                >
                    Пожертвования
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
                            onClick={() => navigate(`/projects/edit/${data.id}`)}
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
        <Section title={'Проекты'}>
            <Button
                onClick={() => navigate('/projects/create')}
                style={{ marginBottom: '16px' }}
                size={'small'}
            >
                <PlusOutlined /> Создать
            </Button>
            <Table<IProjectItem>
                rowKey='id'
                loading={isLoading}
                size={'middle'}
                scroll={{
                    x: 'max-content',
                }}
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
