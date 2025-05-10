import { keepPreviousData, queryOptions, useMutation } from '@tanstack/react-query';
import { $api } from '@/Shared/api/index.ts';
import { ICatListItem, ICatsData, ITakeCat } from '@/Shared/types/cats.ts';
import entries from 'lodash/entries';

export const catsQueries = {
    list: (params?: Record<string, string>) =>
        queryOptions<ICatsData>({
            queryKey: ['cats', entries(params)],
            queryFn: async () => (await $api.get('cats', { params })).data,
            placeholderData: keepPreviousData,
        }),

    detail: (id: string) =>
        queryOptions<ICatListItem>({
            queryKey: ['cat', id],
            queryFn: async () => (await $api.get(`/cats/${id}`)).data,
        }),
};

export const useTakeCat = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: ITakeCat }): Promise<void> =>
            (await $api.post(`/cats/${id}/adopt/`, data)).data,
    });
};
