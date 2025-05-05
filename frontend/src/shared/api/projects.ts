import { queryOptions } from '@tanstack/react-query';

import { $api } from '@/Shared/api/index.ts';
import { IProjectItem } from '@/Shared/types/projects.ts';

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
};
