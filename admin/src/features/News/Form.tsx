// admin/src/features/News/Form.tsx
import React, { useEffect } from 'react';
import { Form, Input, Upload, message, Button } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Button as AppButton } from '@/Components/Button';
import { $api } from '@/Shared/api';
import { INewsItem } from '@/Shared/types/news.ts';

const { TextArea } = Input;

interface IProps {
    initialValues?: INewsItem;
    isEdit?: boolean;
}

export const NewsForm = ({ initialValues, isEdit }: IProps) => {
    const [form] = Form.useForm<INewsItem>();
    const [loading, setLoading] = React.useState(false);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('content', values.content);

            if (values.cover_image?.[0]?.originFileObj) {
                formData.append('cover_image', values.cover_image[0].originFileObj);
            }

            if (values.images) {
                console.log(values.images);
                values.images.forEach((file: UploadFile) => {
                    if (file.originFileObj) {
                        formData.append('images', file.originFileObj);
                    }
                });
            }

            if (isEdit && initialValues?.id) {
                await $api.patch(`news/${initialValues.id}/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success('Новость успешно обновлена');
            } else {
                await $api.post('news/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                message.success('Новость успешно создана');
                form.resetFields();
            }
        } catch (error) {
            message.error('Ошибка при сохранении новости');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = ({ fileList: newFileList, file }: any) => {
        // Если файл был удален и это существующее изображение
        if (file.status === 'removed' && file.url) {
            setRemovedImages(prev => [...prev, file.url]);
        }
        setFileList(newFileList);
        form.setFieldValue('images', newFileList);
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
                cover_image: coverImage,
                images,
            });
        }
    }, [initialValues, form]);

    return (
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
                <Upload listType='picture-card' maxCount={1} beforeUpload={() => false}>
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
                <Upload listType='picture' multiple beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Загрузить изображения</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <AppButton type={'submit'} size={'small'}>
                    {isEdit ? 'Сохранить изменения' : 'Создать новость'}
                </AppButton>
            </Form.Item>
        </Form>
    );
};
