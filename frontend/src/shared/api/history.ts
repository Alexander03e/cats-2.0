import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { $api } from '@/Shared/api/index.ts';
import { IHistoryData, IHistoryItem } from '@/Shared/types/history.ts';
import entries from 'lodash/entries';

export const historyQueries = {
    list: (params?: Record<string, unknown>) =>
        queryOptions<IHistoryData>({
            queryKey: ['history', entries(params)],
            queryFn: async () => (await $api.get('stories', { params })).data,
            placeholderData: keepPreviousData,
        }),

    detail: (id: string) =>
        queryOptions<IHistoryItem>({
            queryKey: ['history', id],
            queryFn: async () => (await $api.get(`/stories/${id}`)).data,
        }),
};
