import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/Components/Input';
import styles from './TakeCat.module.scss';
import { Button } from '@/Components/Button';
import { formSchema, TForm } from '@/Features/take-cat/scheme.ts';

export const TakeCatForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
        },
    });

    const onSubmit = (data: TForm) => {
        console.log(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder='Имя' {...register('firstName')} error={errors.firstName?.message} />
            <Input
                placeholder='Фамилия'
                {...register('lastName')}
                error={errors.lastName?.message}
            />
            <Input placeholder='Телефон' {...register('phone')} error={errors.phone?.message} />
            <Input placeholder='E-mail' {...register('email')} error={errors.email?.message} />

            <label className={styles.checkbox}>
                <input type='checkbox' {...register('agree')} />
                <div className={styles.checkmark} />
                <p>
                    Я подтверждаю Согласие на обработку персональных данных и принимаю Политику
                    конфидециальности
                </p>
                {errors.agree && <span className={styles.error}>{errors.agree.message}</span>}
            </label>

            <Button size='medium' type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </Button>
        </form>
    );
};
