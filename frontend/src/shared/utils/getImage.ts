import { BACKEND_URL } from '@/Shared/api';

export const getImage = (src?: string) => {
    return src || '/images/placeholder-cat.webp';
};

export const getBackendImage = (src?: string) => {
    if (!src) return undefined;
    return `${BACKEND_URL}${src}`;
};
