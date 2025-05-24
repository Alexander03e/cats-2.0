import { queryOptions } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { INewsItem } from '@/Shared/types/news.ts';

export const newsQueries = {
    list: () =>
        queryOptions<INewsItem[]>({
            queryKey: ['news'],
            queryFn: async () => (await $api.get('news')).data,
        }),

    detail: (id: string) =>
        queryOptions<INewsItem>({
            queryKey: ['news', id],
            queryFn: async () => (await $api.get(`/news/${id}`)).data,
        }),
};
