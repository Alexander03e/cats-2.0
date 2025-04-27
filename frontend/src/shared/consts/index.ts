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
