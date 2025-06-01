import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { INewsItem } from '@/Shared/types/news.ts';
import { message } from 'antd';

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

export const useDeleteNew = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number | string): Promise<void> =>
            (await $api.delete(`/news/${id}/`)).data,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['news'],
            });
            message.success('Новость успешно удалена');
        },
    });
};
