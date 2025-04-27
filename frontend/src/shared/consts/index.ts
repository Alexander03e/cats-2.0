export const PATHS = {
    HOME: '/',
    ARRIVED: '/arrived',
    DROPPED: '/dropped',
    NEWS: '/news',
    TAKE_CAT: '/take-cat',
    HISTORY: 'history',
    ARTICLES: '/articles',
    HELP: '/help',
    FAQ: '/faq',
    ABOUT: '/about',
    CONTACTS: '/contacts',
    PROJECTS: '/projects',
    VACANCY: '/vacancy',
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
