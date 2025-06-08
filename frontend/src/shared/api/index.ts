import axios from 'axios';

export const BACKEND_URL = 'https://api.котодом-самара.рф/';

export const $api = axios.create({
    baseURL: BACKEND_URL,
});
