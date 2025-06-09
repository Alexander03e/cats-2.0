import { useEffect, useState } from 'react';
import { Form, Input, Upload, message, Spin, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Button as AppButton } from '@/Components/Button';
import { $api } from '@/Shared/api';
import { EProjectStatus, IProjectItem } from '@/Shared/types/projects.ts';
import { getProjectTranslate } from '@/Features/Project/getProjectStatus.tsx';
import { createFileFromUrl } from '@/Shared/utils/createFileFromUrl.ts';

const { TextArea } = Input;

interface IProps {
    initialValues?: IProjectItem;
    isEdit?: boolean;
}

export const ProjectForm = ({ initialValues, isEdit }: IProps) => {
    const [form] = Form.useForm<IProjectItem>();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('details', values.details);
            formData.append('goal_amount', values.goal_amount);
            formData.append('status', values.status);

            if (values.cover_image?.[0]) {
                if (values.cover_image?.[0]?.originFileObj) {
                    formData.append('cover_image', values.cover_image[0].originFileObj);
                } else {
                    const coverImageBlob = await createFileFromUrl(
                        values.cover_image[0].url,
                        values.cover_image[0].name || 'cover_image',
                    );
                    const ext = values.cover_image?.[0]?.url?.split('.')?.pop();
                    formData.append('image', coverImageBlob, `image-project-${values.id}.${ext}`);
                }
            }

            if (isEdit && initialValues?.id) {
                await $api.patch(`projects/${initialValues.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success({ content: 'Проект успешно обновлен', key: 'loadingMessage' });
            } else {
                await $api.post('projects/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success('Проект успешно создан');
                form.resetFields();
            }
        } catch (error) {
            console.error(error);
            message.error('Ошибка при сохранении проекта');
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
        if (initialValues) {
            console.log(initialValues);
            const coverImage = initialValues.cover_image
                ? [
                      {
                          uid: '-1',
                          name: 'cover_image',
                          status: 'done',
                          url: initialValues.cover_image,
                      },
                  ]
                : [];

            form.setFieldsValue({
                ...initialValues,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                cover_image: coverImage,
            });
        }
    }, [initialValues, form]);

    return (
        <Spin spinning={loading}>
            <Form form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item
                    name='title'
                    label='Название'
                    rules={[{ required: true, message: 'Введите название проекта' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='description'
                    label='Описание'
                    rules={[{ required: true, message: 'Введите описание проекта' }]}
                >
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name='details'
                    label='Детали'
                    rules={[{ required: true, message: 'Введите детали проекта' }]}
                >
                    <ReactQuill theme='snow' />
                </Form.Item>

                <Form.Item
                    name='goal_amount'
                    label='Целевая сумма'
                    rules={[{ required: true, message: 'Введите целевую сумму' }]}
                >
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    name='status'
                    label='Статус'
                    rules={[{ required: true, message: 'Выберите статус проекта' }]}
                >
                    <Select>
                        {Object.values(EProjectStatus).map(status => (
                            <Select.Option key={status} value={status}>
                                {getProjectTranslate(status)}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name='cover_image'
                    label='Обложка'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Загрузите обложку проекта' }]}
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
                        {isEdit ? 'Сохранить изменения' : 'Создать проект'}
                    </AppButton>
                </Form.Item>
            </Form>
        </Spin>
    );
};
