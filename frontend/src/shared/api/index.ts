import axios from 'axios';

export const BACKEND_URL = 'http://109.73.194.62:8000/';

export const $api = axios.create({
    baseURL: BACKEND_URL,
});
