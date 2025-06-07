import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { $api } from '@/Shared/api/index.ts';
import { ISystemInfo } from '@/Shared/types';

export const systemQueries = {
    info: () => {
        return queryOptions({
            queryKey: ['system'],
            queryFn: async () => (await $api.get('/system/system/1')).data,
        });
    },
};

export const useEditInfo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<ISystemInfo>) =>
            (await $api.patch('/system/system/1/', data)).data,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['system'] });
        },
    });
};
