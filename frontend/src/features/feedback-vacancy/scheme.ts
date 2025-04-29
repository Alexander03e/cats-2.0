import { z } from 'zod';

export const formSchema = z.object({
    firstName: z.string().min(1, { message: 'Имя обязательно' }),
    lastName: z.string().min(1, { message: 'Фамилия обязательна' }),
    phone: z.string().min(1, { message: 'Телефон обязателен' }),
    email: z.string().email({ message: 'Неверный формат email' }),
    agree: z.literal(true, {
        errorMap: () => ({ message: 'Необходимо согласие на обработку данных' }),
    }),
});

export type TForm = z.infer<typeof formSchema>;
