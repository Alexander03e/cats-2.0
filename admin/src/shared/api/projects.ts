import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { IDonationItem, IProjectItem } from '@/Shared/types/projects.ts';

export const projectQueries = {
    list: () =>
        queryOptions<IProjectItem[]>({
            queryKey: ['projects'],
            queryFn: async () => (await $api.get('projects')).data,
        }),

    detail: (id: string) =>
        queryOptions<IProjectItem>({
            queryKey: ['projects', id],
            queryFn: async () => (await $api.get(`/projects/${id}`)).data,
        }),
    donates: (id: string) => {
        return queryOptions<IDonationItem[]>({
            queryKey: ['projects', id, 'donates'],
            queryFn: async () => (await $api.get(`/projects/${id}/donations`)).data,
        });
    },
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string | number) => {
            await $api.delete(`/projects/${id}/`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });
        },
    });
};

export const useUpdateProject = () => {};
