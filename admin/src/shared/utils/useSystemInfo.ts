import { useQuery } from '@tanstack/react-query';
import { systemQueries } from '@/Shared/api/system.ts';
import { useEffect, useState } from 'react';
import { DEFAULT_SYSTEM_INFO } from '@/Shared/consts';

export const useSystemInfo = () => {
    const [systemData, setSystemData] = useState({});
    const { data, isLoading, isError } = useQuery(systemQueries.info());

    useEffect(() => {
        if (data) {
            setSystemData(data);
        }

        if ((!data && !isLoading) || isError) {
            setSystemData(DEFAULT_SYSTEM_INFO);
        }

        if (isLoading) {
            setSystemData({});
        }
    }, [isLoading, data, isError]);

    return { isLoading, data: systemData };
};
