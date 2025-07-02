import { Section } from '@/Components/Section';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/Components/Input';
import { Button } from '@/Components/Button';
import styles from './MoneySupport.module.scss';
import { MobileTitle } from '@/Components/MobileSectionTitle';
import { PATHS } from '@/Shared/consts';
import { useNavigate } from 'react-router-dom';
import { $api } from '@/Shared/api';

const donationSchema = z.object({
    amount: z
        .string()
        .nonempty('Введите сумму пожертвования')
        .regex(/^\d+$/, 'Сумма должна быть числом'),
    donor_name: z.string().nonempty('Введите ваше имя'),
    message: z.string().optional(),
});

type TDonationForm = z.infer<typeof donationSchema>;

export const MoneySupport = () => {
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
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(PATHS.HELP);
    };

    const onSubmit = async (formData: TDonationForm) => {
        try {
            const response: { confirmation_url: string } = (
                await $api.post(`money-support/`, {
                    amount: parseFloat(formData.amount),
                    name: formData.donor_name,
                    message: formData.message,
                    redirectUrl: `${window.location.origin}`,
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

    return (
        <Section
            topTitleSlot={
                <MobileTitle
                    className={styles.mobileTitle}
                    onBack={handleBack}
                    title={'Способы помочь'}
                />
            }
            title={`Финансовая помощь`}
        >
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
