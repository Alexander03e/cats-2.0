import { queryOptions, useMutation } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { ICatListItem, ICatsData, ITakeCat } from '@/Shared/types/cats.ts';

export const catsQueries = {
    list: () =>
        queryOptions<ICatsData>({
            queryKey: ['cats'],
            queryFn: async () => (await $api.get('cats')).data,
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
