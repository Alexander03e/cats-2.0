import { ISystemInfo } from '@/Shared/types';

export const PATHS = {
    HOME: '/',
    ARRIVED: '/arrived',
    DROPPED: '/dropped',
    TAKE_CAT: '/take-cat',
    HELP: '/help',
    FAQ: '/faq',
    ABOUT: '/about',
    CONTACTS: '/contacts',
    PROJECTS: '/projects',
    VACANCY: '/vacancy',
    ARTICLES: '/articles',
    NEWS: '/news',
    HISTORY: 'history',
    HISTORY_DETAILS: {
        INDEX: '/history/:historyId',
        ABSOLUTE: (id: string | number) => `/history/${id}`,
    },
    NEWS_DETAILS: {
        INDEX: '/news/:newId',
        ABSOLUTE: (id: string | number) => `/news/${id}`,
    },
    ARTICLES_DETAILS: {
        INDEX: '/articles/:articleId',
        ABSOLUTE: (id: string | number) => `/articles/${id}`,
    },
    VACANCY_DETAILS: {
        INDEX: '/vacancy/:vacancyId',
        ABSOLUTE: (id: string | number) => `/vacancy/${id}`,
    },
    PROJECT_DONATE: {
        INDEX: '/projects/:projectId/donate',
        ABSOLUTE: (projectId: string | number) => `/projects/${projectId}/donate`,
    },
    PROJECTS_DETAILS: {
        INDEX: '/projects/:projectId',
        ABSOLUTE: (id: string | number) => `/projects/${id}`,
    },
    CATS: '/cats',
    CATS_DETAILS: {
        INDEX: '/cats/:catId',
        ABSOLUTE: (id: string | number) => `/cats/${id}`,
    },
};

export const ANCHORS = {
    HELP: 'help',
    FAQ: 'faq',
};

export const DEFAULT_SYSTEM_INFO = {
    id: 1,
    calendar_info: `
        пн-пт с 9:00 до 20:00
        сб-вс с 9:00 до 17:00
    `,
    address: '',
    phone_number: '+79023235350',
    email: 'kotodom@mail.ru',
    short_calendar_info: 'Ежедневно 11:00-20:00',
    vk_link: 'https://vk.com/priutsamara',
    telegram_link: 'https://t.me/kotodom_samara',
} as ISystemInfo;
