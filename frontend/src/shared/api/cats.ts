import { queryOptions } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { ICatListItem } from '@/Shared/types/cats.ts';

export const catsQueries = {
    list: () =>
        queryOptions<ICatListItem[]>({
            queryKey: ['cats'],
            queryFn: async () => (await $api.get('cats')).data,
        }),

    detail: (id: string) =>
        queryOptions<ICatListItem>({
            queryKey: ['cat', id],
            queryFn: async () => (await $api.get(`/cats/${id}`)).data,
        }),
};
