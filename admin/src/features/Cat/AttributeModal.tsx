import { Button, Divider, Flex, Form, Input, message, Modal, Typography } from 'antd';
import {
    catsQueries,
    useCreateAttribute,
    useDeleteAttribute,
    useEditAttribute,
} from '@/Shared/api/cats.ts';
import { useQuery } from '@tanstack/react-query';
import map from 'lodash/map';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

interface IProps {
    open: boolean;
    onClose: () => void;
}

export const AttributeModal = ({ open, onClose }: IProps) => {
    const { mutateAsync: deleteAttribute } = useDeleteAttribute();
    const { mutateAsync: editAttribute } = useEditAttribute();
    const { mutateAsync: createAttribute } = useCreateAttribute();
    const { data } = useQuery(catsQueries.attributes());
    const [newAttr, setNewAttr] = useState('');

    useEffect(() => {
        if (!open) {
            setNewAttr('');
        }
    }, [open]);

    const handleCreate = async (name: string) => {
        try {
            await createAttribute({ name });
            setNewAttr('');
            message.success('Аттрибут успешно добавлен');
        } catch {
            message.error('Ошибка при добавлении аттрибута');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteAttribute(id);
            message.success('Аттрибут успешно удален');
        } catch {
            message.error('Ошибка при удалении аттрибута');
        }
    };

    const handleEdit = async (id: number, name: string) => {
        try {
            await editAttribute({ id, name });
            message.success('Аттрибут успешно изменен');
        } catch {
            message.error('Ошибка при изменении аттрибута');
        }
    };

    return (
        <Modal
            centered
            maskClosable
            closable
            footer={null}
            open={open}
            title={'Список аттрибутов'}
            onCancel={onClose}
        >
            <Flex style={{ marginBlock: 20 }} vertical gap={12}>
                {map(data, item => (
                    <Flex flex={1} justify={'space-between'}>
                        <Typography.Text
                            editable={{
                                onChange: value => handleEdit(item.id, value),
                                text: item.name,
                            }}
                            style={{ flex: 1 }}
                        >
                            {item.name}
                        </Typography.Text>
                        <Button
                            onClick={() => handleDelete(item.id)}
                            icon={<DeleteOutlined />}
                            size={'small'}
                            danger
                            type={'primary'}
                        />
                    </Flex>
                ))}
            </Flex>
            <Divider />
            <Flex gap={12} align={'flex-end'}>
                <Form.Item
                    style={{ marginBottom: 0, flex: 1 }}
                    layout={'vertical'}
                    label={'Добавить новый аттрибут'}
                >
                    <Input
                        onChange={e => setNewAttr(e.target.value)}
                        value={newAttr}
                        placeholder={'Введите название аттрибута'}
                    />
                </Form.Item>
                <Button
                    icon={<PlusOutlined />}
                    type={'primary'}
                    disabled={!newAttr}
                    onClick={() => handleCreate(newAttr)}
                >
                    Добавить
                </Button>
            </Flex>
        </Modal>
    );
};
