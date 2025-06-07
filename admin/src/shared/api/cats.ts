import { keepPreviousData, queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { $api } from '@/Shared/api/index.ts';
import {
    ECatApplicationStatus,
    ICatApplication,
    ICatListItem,
    ICatsData,
    ITakeCat,
} from '@/Shared/types/cats.ts';
import entries from 'lodash/entries';
import { ICatAttribute } from '@/Features/Cat/Form.tsx';

export const catsQueries = {
    list: (params?: Record<string, string>) =>
        queryOptions<ICatsData>({
            queryKey: ['cats', entries(params)],
            queryFn: async () => (await $api.get('cats', { params })).data,
            placeholderData: keepPreviousData,
        }),

    attributes: () => {
        return queryOptions<ICatAttribute[]>({
            queryKey: ['cat-attributes'],
            queryFn: async () => (await $api.get('cats/attributes/')).data,
        });
    },

    detail: (id: string) =>
        queryOptions<ICatListItem>({
            queryKey: ['cat', id],
            queryFn: async () => (await $api.get(`/cats/${id}`)).data,
        }),

    appointments: (id: string) => {
        return queryOptions<ICatApplication[]>({
            queryKey: ['cat', id, 'applications'],
            queryFn: async () => (await $api.get(`/cats/${id}/applications/`)).data,
        });
    },
};

export const useTakeCat = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: ITakeCat }): Promise<void> =>
            (await $api.post(`/cats/${id}/adopt/`, data)).data,
    });
};

export const useDeleteCat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id }: { id: number | string }): Promise<void> =>
            (await $api.delete(`/cats/${id}/`)).data,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cats'],
            });
        },
    });
};

interface ICreateAttribute {
    name: string;
}

export const useCreateAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: ICreateAttribute): Promise<void> =>
            (await $api.post('/cats/attributes/', data)).data,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cat-attributes'],
            });
        },
    });
};

export const useEditAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: ICatAttribute): Promise<void> =>
            (await $api.put(`/cats/attributes/${data.id}/`, { name: data.name })).data,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cat-attributes'],
            });
        },
    });
};

export const useDeleteAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number | string): Promise<void> =>
            (await $api.delete(`/cats/attributes/${id}/`)).data,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cat-attributes'],
            });
        },
    });
};

interface IUpdateCatApplication {
    catId: number;
    appId: number;
    status: ECatApplicationStatus;
}

export const useUpdateCatApplication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: IUpdateCatApplication): Promise<ICatApplication> =>
            (
                await $api.patch(`/cats/${data.catId}/applications/${data.appId}/`, {
                    status: data.status,
                })
            ).data,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cat'],
            });
        },
    });
};
