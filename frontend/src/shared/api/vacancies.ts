import { queryOptions } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { IVacancyItem } from '@/Shared/types/vacancies.ts';

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
