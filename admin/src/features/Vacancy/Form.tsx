import { Flex, Form, Input, Select, message, Spin, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Button as AppButton } from '@/Components/Button';
import { useEffect, useState } from 'react';
import { $api } from '@/Shared/api';
import { IVacancyItem, EVacancyOpenedStatus } from '@/Shared/types/vacancies.ts';
import { createFileFromUrl } from '@/Shared/utils/createFileFromUrl.ts';

interface IProps {
    initialData?: IVacancyItem;
    isEdit?: boolean;
}

export const VacancyForm = ({ initialData, isEdit }: IProps) => {
    const [form] = Form.useForm<IVacancyItem>();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: IVacancyItem) => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('status', values.status);

            if (values.image?.[0]) {
                if (values.image?.[0]?.originFileObj) {
                    formData.append('image', values.image?.[0].originFileObj);
                } else {
                    const coverImageBlob = await createFileFromUrl(
                        values.image?.[0].url,
                        values.image?.[0].name || 'image',
                    );
                    const ext = values.image[0]?.url?.split('.')?.pop();
                    formData.append('image', coverImageBlob, `image-vacancy-${values.id}.${ext}`);
                }
            }

            if (isEdit && initialData?.id) {
                await $api.patch(`vacancies/${initialData.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success('Вакансия успешно обновлена');
            } else {
                await $api.post('vacancies/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success('Вакансия успешно создана');
                form.resetFields();
            }
        } catch {
            message.error('Ошибка при сохранении вакансии');
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
            const image = initialData?.image
                ? [
                      {
                          uid: '-1',
                          name: 'image',
                          status: 'done',
                          url: initialData?.image,
                      },
                  ]
                : [];

            form.setFieldsValue({
                ...initialData,
                image,
            });
        }
    }, [initialData, form]);

    return (
        <Spin spinning={loading}>
            <Form<IVacancyItem> onFinish={onFinish} form={form} layout={'vertical'}>
                <Form.Item
                    label={'Название'}
                    name='title'
                    rules={[{ required: true, message: 'Пожалуйста, введите название вакансии' }]}
                >
                    <Input placeholder='Введите название' />
                </Form.Item>

                <Form.Item
                    label={'Описание'}
                    name='description'
                    rules={[{ required: true, message: 'Пожалуйста, добавьте описание вакансии' }]}
                >
                    <Input.TextArea rows={3} placeholder='Опишите вакансию' />
                </Form.Item>

                <Flex gap={12}>
                    <Form.Item
                        style={{ width: 200 }}
                        label={'Статус'}
                        name='status'
                        rules={[{ required: true, message: 'Пожалуйста, выберите статус' }]}
                    >
                        <Select
                            options={[
                                { value: EVacancyOpenedStatus.OPEN, label: 'Открыта' },
                                { value: EVacancyOpenedStatus.CLOSED, label: 'Закрыта' },
                            ]}
                        />
                    </Form.Item>
                </Flex>

                <Form.Item
                    label={'Изображение'}
                    name='image'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Пожалуйста, загрузите изображение' }]}
                >
                    <Upload
                        accept='.jpg,.jpeg,.png'
                        listType='picture-card'
                        maxCount={1}
                        beforeUpload={() => false}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Загрузить</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <AppButton type={'submit'} size={'small'}>
                        {isEdit ? 'Сохранить изменения' : 'Создать'}
                    </AppButton>
                </Form.Item>
            </Form>
        </Spin>
    );
};
