export const PATHS = {
    HOME: '/',
    ARRIVED: '/arrived',
    DROPPED: '/dropped',
    VACANCY: '/vacancy',
    NEWS: '/news',
    TAKE_CAT: '/take-cat',
    HISTORY: 'history',
    ARTICLES: '/articles',
    HELP: '/help',
    FAQ: '/faq',
    ABOUT: '/about',
    CONTACTS: '/contacts',
    PROJECTS: '/projects',
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
