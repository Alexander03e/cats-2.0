import axios from 'axios';

export const BACKEND_URL = 'https://api.котодом-самара.рф/';
// export const BACKEND_URL = 'http://127.0.0.1:8000/';
export const BACKEND_URL_WITHOUT_SLASH = 'https://api.котодом-самара.рф';

export const $api = axios.create({
    baseURL: BACKEND_URL,
});
