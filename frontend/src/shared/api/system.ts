import { queryOptions } from '@tanstack/react-query';
import { $api } from '@/Shared/api/index.ts';
import { ISystemInfo } from '@/Shared/types';
import head from 'lodash/head';

export const systemQueries = {
    info: () => {
        return queryOptions({
            queryKey: ['system'],
            queryFn: async () => (await $api.get('/system/system')).data,
            select: (data: ISystemInfo[]) => head(data) || undefined,
        });
    },
};
