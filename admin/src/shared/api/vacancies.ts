import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { IFeedbackVacancy, IVacancyAppointment, IVacancyItem } from '@/Shared/types/vacancies.ts';
import { message } from 'antd';

export const vacancyQueries = {
    list: () =>
        queryOptions<IVacancyItem[]>({
            queryKey: ['vacancies'],
            queryFn: async () => (await $api.get('vacancies')).data,
        }),

    detail: (id: string) =>
        queryOptions<IVacancyItem>({
            queryKey: ['vacancies', id],
            queryFn: async () => (await $api.get(`/vacancies/${id}`)).data,
            staleTime: 0,
        }),
    appointments: (id: string | number) => {
        return queryOptions<IVacancyAppointment[]>({
            queryKey: ['vacancies', id, 'appointments'],
            queryFn: async () => (await $api.get(`/vacancies/${id}/applications/`)).data,
        });
    },
};

export const useFeedbackVacancy = () => {
    return useMutation({
        mutationFn: async ({ data, id }: { data: IFeedbackVacancy; id: string }) => {
            const response = await $api.post(`/vacancies/${id}/applications/`, data);
            return response.data;
        },
    });
};

export const useUpdateAppointment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<IVacancyAppointment>): Promise<IVacancyAppointment> =>
            (
                await $api.patch(`/vacancies/${data.vacancy}/applications/${data.id}/`, {
                    status: data.status,
                })
            ).data,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['vacancies'],
            });
            message.success('Заявка успешно обновлена');
        },
    });
};

export const useDeleteVacancy = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number | string): Promise<void> =>
            (await $api.delete(`/vacancies/${id}/`)).data,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['vacancies'],
            });
            message.success('Вакансия успешно удалена');
        },
    });
};
