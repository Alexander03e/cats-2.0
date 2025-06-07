import { Section } from '@/Components/Section';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { projectQueries } from '@/Shared/api/projects.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/Components/Input';
import { Button } from '@/Components/Button';
import styles from './DonationPage.module.scss';
import { $api } from '@/Shared/api';
import { Loader } from '@/Components/Loader';

const donationSchema = z.object({
    amount: z
        .string()
        .nonempty('Введите сумму пожертвования')
        .regex(/^\d+$/, 'Сумма должна быть числом'),
    donor_name: z.string().nonempty('Введите ваше имя'),
    message: z.string().optional(),
});

type TDonationForm = z.infer<typeof donationSchema>;

export const DonationPage = () => {
    const { projectId } = useParams();
    const { data, isLoading, isError } = useQuery(projectQueries.detail(projectId!));

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TDonationForm>({
        resolver: zodResolver(donationSchema),
        defaultValues: {
            amount: '',
            donor_name: '',
            message: '',
        },
    });

    const onSubmit = async (formData: TDonationForm) => {
        if (!projectId) return;
        try {
            const response: { confirmation_url: string } = (
                await $api.post(`projects/${projectId}/donate/`, {
                    amount: parseFloat(formData.amount),
                    donor_name: formData.donor_name,
                    message: formData.message,
                    project: projectId,
                })
            ).data;
            if (response.confirmation_url) {
                window.open(response.confirmation_url, '_blank');
            }
        } catch {
            console.error('Ошибка при отправке пожертвования');
            alert('Произошла ошибка при отправке пожертвования. Пожалуйста, попробуйте позже.');
        }
    };

    const title = data
        ? `Пожертвовать проекту <span data-accent="true">"${data.title}"</span>`
        : '';

    if (isError) {
        return <div>Произошла ошибка!</div>;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Section title={title}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <p>Введите сумму в рублях</p>
                        <Input
                            min={1}
                            type='number'
                            placeholder='Сумма пожертвования'
                            {...register('amount')}
                            error={errors.amount?.message}
                        />
                    </label>
                    <label>
                        <p>Введите имя</p>
                        <Input
                            type='text'
                            placeholder='Ваше имя'
                            {...register('donor_name')}
                            error={errors.donor_name?.message}
                        />
                    </label>
                    <label>
                        <p>Введите сообщение</p>
                        <Input
                            type='text'
                            placeholder='Сообщение'
                            {...register('message')}
                            error={errors.message?.message}
                        />
                    </label>
                    <Button size='medium' type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Отправка...' : 'Пожертвовать'}
                    </Button>
                </form>
            </div>
        </Section>
    );
};
