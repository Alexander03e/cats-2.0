import { Section } from '@/Components/Section';
import { Form, Input, message, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { systemQueries, useEditInfo } from '@/Shared/api/system.ts';
import { useEffect } from 'react';
import { Button } from '@/Components/Button';

export const ContactsPage = () => {
    const { data, isLoading } = useQuery(systemQueries.info());
    const update = useEditInfo();

    const [form] = Form.useForm();
    console.log(data);

    const onSubmit = async (values: any) => {
        try {
            await update.mutateAsync(values);
            message.success('Информация успешно обновлена');
        } catch (error) {
            console.error('Ошибка при сохранении', error);
            message.error('Ошибка при сохранении');
        }
    };

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data]);

    return (
        <Section title={'Контакты'}>
            <Spin spinning={isLoading}>
                <Form form={form} layout='vertical' onFinish={onSubmit}>
                    <Form.Item
                        label='Адрес'
                        name='address'
                        rules={[{ required: true, message: 'Please enter the address' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Номер телефона'
                        name='phone_number'
                        rules={[{ required: true, message: 'Please enter the phone number' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please enter a valid email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Ссылка на VK'
                        name='vk_link'
                        rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Ссылка на Telegram'
                        name='telegram_link'
                        rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Ссылка на Instagram'
                        name='instagram_link'
                        rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Ссылка на WhatsApp'
                        name='whatsapp_link'
                        rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label='График работы' name='calendar_info'>
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label='График работы (сокращенная версия)'
                        name='short_calendar_info'
                    >
                        <Input.TextArea rows={2} />
                    </Form.Item>

                    <Form.Item>
                        <Button type={'submit'}>Сохранить</Button>
                    </Form.Item>
                </Form>
            </Spin>
        </Section>
    );
};
