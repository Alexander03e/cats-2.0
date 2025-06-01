import { Flex, Form, Input, Select, Upload, Button, InputNumber, message, Spin } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Button as AppButton } from '@/Components/Button';
import { ICatListItem } from '@/Shared/types/cats.ts';
import { useEffect, useState } from 'react';
import { $api } from '@/Shared/api';
import { getBackendImage } from '@/Shared/utils/getImage.ts';
import map from 'lodash/map';
import { useQuery } from '@tanstack/react-query';
import { catsQueries } from '@/Shared/api/cats.ts';
import size from 'lodash/size';
import { AttributeModal } from '@/Features/Cat/AttributeModal.tsx';

const { TextArea } = Input;

interface IProps {
    initialData?: ICatListItem;
    isEdit?: boolean;
}

export interface ICatAttribute {
    id: number;
    name: string;
}

const mapAttributes = (data?: ICatAttribute[]) => {
    if (!data) return [];
    return map(data, item => item.id);
};

const attributesToOptions = (data?: ICatAttribute[]) => {
    if (!data) return [];
    return map(data, item => ({
        value: item.id,
        label: item.name,
    }));
};

export const CatForm = ({ initialData, isEdit }: IProps) => {
    const [form] = Form.useForm<ICatListItem>();
    const [loading, setLoading] = useState(false);
    const [fileList] = useState();
    const [openAttr, setOpenAttrs] = useState(false);

    const { data: attributesData, isLoading: attributesLoading } = useQuery(
        catsQueries.attributes(),
    );

    const catAttributes = attributesToOptions(attributesData);

    const createFileFromUrl = async (url: string, fileName: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    };

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const formData = new FormData();

            console.log(values);

            // Append basic fields
            Object.keys(values).forEach(key => {
                if (key !== 'photos' && values[key] !== undefined && key !== 'attributes') {
                    if (Array.isArray(values[key])) {
                        formData.append(key, JSON.stringify(values[key]));
                    } else {
                        formData.append(key, values[key]);
                    }
                }
            });

            if (size(values.attributes)) {
                values.attributes.forEach((id: number) => {
                    formData.append('attribute_ids', id.toString());
                });
            }

            // Handle photo uploads
            if (values.photos) {
                for (const file of values.photos) {
                    if (file.originFileObj) {
                        formData.append('photos', file.originFileObj);
                    } else if (file.url) {
                        const fileBlob = await createFileFromUrl(file.url, file.name);
                        formData.append('photos', fileBlob);
                    }
                }
            }

            if (isEdit && initialData?.id) {
                await $api.patch(`cats/${initialData.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success({ content: 'Кот успешно обновлен', key: 'loadingMessage' });
            } else {
                await $api.post('cats/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success({ content: 'Кот успешно создан', key: 'loadingMessage' });
                form.resetFields();
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            message.error('Ошибка при сохранении');
        } finally {
            setLoading(false);
        }
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    useEffect(() => {
        if (initialData) {
            const photos = initialData.photos
                ? initialData.photos.map((url, index) => ({
                      uid: `-${index + 1}`,
                      name: `photo-${index + 1}`,
                      status: 'done',
                      url: getBackendImage(url),
                  }))
                : [];

            form.setFieldsValue({
                ...initialData,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                attributes: mapAttributes(initialData?.attributes),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                photos,
            });
        }
    }, [initialData, form]);
    return (
        <>
            <AttributeModal open={openAttr} onClose={() => setOpenAttrs(false)} />
            <Spin spinning={loading}>
                <Form<ICatListItem> onFinish={onFinish} form={form} layout={'vertical'}>
                    <Form.Item
                        label={'Имя'}
                        name='name'
                        rules={[{ required: true, message: 'Пожалуйста, введите имя кота' }]}
                    >
                        <Input placeholder='Введите имя' />
                    </Form.Item>

                    <Form.Item label={'Порода'} name='breed'>
                        <Input placeholder='Введите породу' />
                    </Form.Item>

                    <Flex gap={12}>
                        <Form.Item
                            label={'Цвет'}
                            name='color'
                            rules={[{ required: true, message: 'Пожалуйста, укажите цвет' }]}
                        >
                            <Input placeholder='Введите цвет' />
                        </Form.Item>

                        <Form.Item
                            label={'Возраст'}
                            name='age'
                            rules={[{ required: true, message: 'Пожалуйста, укажите возраст' }]}
                        >
                            <InputNumber
                                min={0}
                                max={30}
                                placeholder='Лет'
                                style={{ width: '100%' }}
                            />
                        </Form.Item>

                        <Form.Item
                            label={'Пол'}
                            style={{ width: 180 }}
                            name='gender'
                            rules={[{ required: true, message: 'Пожалуйста, выберите пол' }]}
                        >
                            <Select
                                options={[
                                    { value: 'MALE', label: 'Мужской' },
                                    { value: 'FEMALE', label: 'Женский' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            style={{ width: 180 }}
                            label={'Статус здоровья'}
                            name='health_status'
                        >
                            <Select
                                options={[
                                    { value: 'HEALTHY', label: 'Здоров' },
                                    { value: 'RECOVERING', label: 'На лечении' },
                                    { value: 'SICK', label: 'Болеет' },
                                ]}
                            />
                        </Form.Item>
                    </Flex>

                    <Form.Item label={'Статус'} name='status'>
                        <Select
                            options={[
                                { value: 'AVAILABLE', label: 'Доступен(а)' },
                                { value: 'RESERVED', label: 'Зарезервирован(а)' },
                                { value: 'ADOPTED', label: 'Усыновлен(а)' },
                                { value: 'QUARANTINE', label: 'На карантине' },
                                { value: 'UNAVAILABLE', label: 'Не доступен(а)' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label={'Тип шерсти'} name='coat_type'>
                        <Select
                            options={[
                                { value: 'SHORT', label: 'Гладкошерстный' },
                                { value: 'LONG', label: 'Пушистый' },
                            ]}
                        />
                    </Form.Item>

                    <Flex gap={12} align={'center'}>
                        <Form.Item style={{ flex: 1 }} label={'Атрибуты'} name='attributes'>
                            <Select
                                mode='multiple'
                                placeholder='Выберите атрибуты'
                                options={catAttributes}
                                loading={attributesLoading}
                            />
                        </Form.Item>

                        <Flex flex={1} gap={12}>
                            <Button
                                icon={<EditOutlined />}
                                type={'primary'}
                                onClick={() => setOpenAttrs(true)}
                            >
                                Редактировать аттрибуты
                            </Button>
                        </Flex>
                    </Flex>

                    <Flex gap={12}>
                        <Form.Item label={'Диагноз'} name='diagnosis' style={{ flex: 1 }}>
                            <TextArea rows={3} placeholder='Опишите диагноз' />
                        </Form.Item>

                        <Form.Item
                            label={'Описание'}
                            name='description'
                            rules={[{ required: true, message: 'Пожалуйста, добавьте описание' }]}
                            style={{ flex: 1 }}
                        >
                            <TextArea rows={3} placeholder='Опишите кота/кошку' />
                        </Form.Item>
                    </Flex>

                    <Form.Item
                        label={'Фотографии'}
                        name='photos'
                        valuePropName='fileList'
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            fileList={fileList}
                            listType='picture'
                            accept='.jpg,.jpeg,.png'
                            multiple
                            beforeUpload={() => false}
                        >
                            <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <AppButton type={'submit'} size={'small'}>
                            {isEdit ? 'Сохранить изменения' : 'Создать'}
                        </AppButton>
                    </Form.Item>
                </Form>
            </Spin>
        </>
    );
};
