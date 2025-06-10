import { queryOptions, useMutation } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { IFeedbackVacancy, IVacancyItem } from '@/Shared/types/vacancies.ts';

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
        }),
};

export const useFeedbackVacancy = () => {
    return useMutation({
        mutationFn: async ({ data, id }: { data: IFeedbackVacancy; id: string }) => {
            const response = await $api.post(`/vacancies/${id}/apply/`, data);
            return response.data;
        },
    });
};
