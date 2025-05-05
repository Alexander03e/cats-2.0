import { queryOptions } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { IHistoryItem } from '@/Shared/types/history.ts';

export const historyQueries = {
    list: () =>
        queryOptions<IHistoryItem[]>({
            queryKey: ['history'],
            queryFn: async () => (await $api.get('stories')).data,
        }),

    detail: (id: string) =>
        queryOptions<IHistoryItem>({
            queryKey: ['history', id],
            queryFn: async () => (await $api.get(`/stories/${id}`)).data,
        }),
};
