import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/Components/Input';
import styles from './TakeCat.module.scss';
import { Button } from '@/Components/Button';
import { formSchema, TForm } from '@/Features/take-cat/scheme.ts';
import { useTakeCat } from '@/Shared/api/cats.ts';
import { asyncHandle } from '@/Shared/utils/async.ts';

export const TakeCatForm = ({ id }: { id: string }) => {
    const {
        register,
        handleSubmit,
        reset,
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

    const { mutateAsync } = useTakeCat();

    const onSubmit = async (data: TForm) => {
        try {
            await asyncHandle(
                mutateAsync.bind(null, {
                    id,
                    data: {
                        consent: true,
                        email: data.email,
                        phone: data.phone,
                        first_name: data.firstName,
                        last_name: data.lastName,
                    },
                }),
                {
                    successMsg: 'Заявка отправлена',
                    errorMsg: 'Не удалось отправить заявку',
                },
            );
            reset();
        } catch {
            console.log('error');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder='Имя' {...register('firstName')} error={errors.firstName?.message} />
            <Input
                placeholder='Фамилия'
                {...register('lastName')}
                error={errors.lastName?.message}
            />
            <Input
                maskProps={{
                    mask: '+79999999999',
                }}
                placeholder='Телефон'
                {...register('phone')}
                error={errors.phone?.message}
            />
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
