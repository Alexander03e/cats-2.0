import { queryOptions } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { IHistoryData, IHistoryItem } from '@/Shared/types/history.ts';

export const historyQueries = {
    list: () =>
        queryOptions<IHistoryData>({
            queryKey: ['history'],
            queryFn: async () => (await $api.get('stories')).data,
        }),

    detail: (id: string) =>
        queryOptions<IHistoryItem>({
            queryKey: ['history', id],
            queryFn: async () => (await $api.get(`/stories/${id}`)).data,
        }),
};
