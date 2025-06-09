// admin/src/features/News/Form.tsx
import React, { useEffect, useState } from 'react';
import { Form, Input, Upload, message, Button, Spin } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Button as AppButton } from '@/Components/Button';
import { $api } from '@/Shared/api';
import { INewsItem } from '@/Shared/types/news.ts';
import { createFileFromUrl } from '@/Shared/utils/createFileFromUrl.ts';

const { TextArea } = Input;

interface IProps {
    initialValues?: INewsItem;
    isEdit?: boolean;
}

export const NewsForm = ({ initialValues, isEdit }: IProps) => {
    const [form] = Form.useForm<INewsItem>();
    const [loading, setLoading] = React.useState(false);
    const [fileList] = useState([]);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('content', values.content);

            if (values.cover_image?.[0]) {
                if (values.cover_image?.[0]?.originFileObj) {
                    formData.append('cover_image', values.cover_image[0].originFileObj);
                } else {
                    const coverImageBlob = await createFileFromUrl(
                        values.cover_image[0].url,
                        values.cover_image[0].name || 'cover_image',
                    );
                    const ext = values.cover_image?.[0]?.url?.split('.')?.pop();
                    formData.append('cover_image', coverImageBlob, `image-new-${values.id}.${ext}`);
                }
            }

            if (values.images) {
                for (const file of values.images) {
                    if (file.originFileObj) {
                        formData.append('images', file.originFileObj);
                    } else if (file.url) {
                        const fileBlob = await createFileFromUrl(file.url, file.name);
                        formData.append('images', fileBlob);
                    }
                }
            }
            if (isEdit && initialValues?.id) {
                await $api.patch(`news/${initialValues.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success({ content: 'Новость успешно обновлена', key: 'loadingMessage' });
            } else {
                await $api.post('news/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success('Новость успешно создана');
                form.resetFields();
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            message.error('Ошибка при сохранении новости');
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
            // Преобразуем URL обложки в объект файла для Upload
            const coverImage = initialValues.cover_image_url
                ? [
                      {
                          uid: '-1',
                          name: 'cover_image',
                          status: 'done',
                          url: initialValues.cover_image_url,
                      },
                  ]
                : [];

            // Преобразуем массив URL изображений в объекты файлов для Upload
            const images = initialValues.images
                ? initialValues.images.map((url, index) => ({
                      uid: `-${index + 1}`,
                      name: `image-${index + 1}`,
                      status: 'done',
                      url,
                  }))
                : [];

            form.setFieldsValue({
                ...initialValues,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                cover_image: coverImage,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                images,
            });
        }
    }, [initialValues, form]);

    return (
        <Spin spinning={loading}>
            <Form form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item
                    name='title'
                    label='Заголовок'
                    rules={[{ required: true, message: 'Введите заголовок' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='description'
                    label='Краткое описание'
                    rules={[{ required: true, message: 'Введите описание' }]}
                >
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    name='content'
                    label='Содержание'
                    rules={[{ required: true, message: 'Введите содержание' }]}
                >
                    <ReactQuill theme='snow' />
                </Form.Item>

                <Form.Item
                    name='cover_image'
                    label='Обложка'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Загрузите обложку' }]}
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

                <Form.Item
                    name='images'
                    label='Дополнительные изображения'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                >
                    <Upload
                        accept='.jpg,.jpeg,.png'
                        fileList={fileList}
                        listType='picture'
                        multiple
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Загрузить изображения</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <AppButton type={'submit'} size={'small'}>
                        {isEdit ? 'Сохранить изменения' : 'Создать новость'}
                    </AppButton>
                </Form.Item>
            </Form>
        </Spin>
    );
};
