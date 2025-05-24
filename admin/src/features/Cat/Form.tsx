import { Flex, Form, Input, Select, Upload, Button, UploadProps, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button as AppButton } from '@/Components/Button';
import { ICatListItem } from '@/Shared/types/cats.ts';
import { useEffect } from 'react';
import { BACKEND_URL } from '@/Shared/api';

const { TextArea } = Input;

interface IProps {
    initialData?: ICatListItem;
}

export const CatForm = ({ initialData }: IProps) => {
    const [form] = Form.useForm<ICatListItem>();

    const uploadProps: UploadProps = {
        action: BACKEND_URL,
        listType: 'picture',
        multiple: true,
        beforeUpload: () => {
            // Можно добавить проверки файлов
            return false; // Возвращаем false для ручной загрузки
        },
    };

    const getFileListFromUrls = (urls: string[] = []) => {
        return urls.map((url, index) => ({
            uid: `-${index}`, // отрицательные uid для уже загруженных файлов
            name: `photo-${index}.jpg`, // можно извлечь имя файла из URL если нужно
            status: 'done' as const, // статус 'done' означает загруженный файл
            url: url, // ссылка на изображение
        }));
    };

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        }
    }, [initialData]);

    return (
        <Form<ICatListItem> form={form} layout={'vertical'} initialValues={{ ...initialData }}>
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
                    <InputNumber min={0} max={30} placeholder='Лет' style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label={'Пол'}
                    style={{ width: 180 }}
                    name='gender'
                    rules={[{ required: true, message: 'Пожалуйста, выберите пол' }]}
                >
                    <Select
                        options={[
                            { value: 'male', label: 'Мужской' },
                            { value: 'female', label: 'Женский' },
                            { value: 'unknown', label: 'Неизвестно' },
                        ]}
                    />
                </Form.Item>

                <Form.Item style={{ width: 180 }} label={'Статус здоровья'} name='health_status'>
                    <Select
                        options={[
                            { value: 'healthy', label: 'Здоров' },
                            { value: 'treatment', label: 'На лечении' },
                            { value: 'recovery', label: 'Восстановление' },
                            { value: 'critical', label: 'Критическое состояние' },
                        ]}
                    />
                </Form.Item>
            </Flex>

            <Form.Item label={'Статус'} name='status'>
                <Select
                    options={[
                        { value: 'healthy', label: 'Здоров' },
                        { value: 'treatment', label: 'На лечении' },
                        { value: 'recovery', label: 'Восстановление' },
                        { value: 'critical', label: 'Критическое состояние' },
                    ]}
                />
            </Form.Item>

            <Form.Item label={'Атрибуты'} name='attributes'>
                <Select
                    mode='multiple'
                    placeholder='Выберите атрибуты'
                    options={[
                        { value: 'sterilized', label: 'Стерилизован' },
                        { value: 'vaccinated', label: 'Вакцинирован' },
                        { value: 'chipped', label: 'Чипирован' },
                        { value: 'pedigree', label: 'Родословная' },
                    ]}
                />
            </Form.Item>

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

            <Form.Item label={'Фотографии'} name='photos'>
                <Upload
                    fileList={initialData?.photos ? getFileListFromUrls(initialData.photos) : []}
                    {...uploadProps}
                >
                    <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <AppButton>Сохранить</AppButton>
            </Form.Item>
        </Form>
    );
};
