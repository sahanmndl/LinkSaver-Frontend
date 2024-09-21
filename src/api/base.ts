import axios from "axios";
import {clearAuthData, getToken, refreshToken} from "@/utils/auth.ts";

export const API_URLS = {
    DEV: 'http://localhost:8008/api/v1',
    PROD: ''
}

export interface ApiResponse<T> {
    body: T;
    success: boolean;
}

export type API_ERROR_RESPONSE = {
    response: {
        data: {
            error: string
            success: boolean
        }
    }
}

export const createAPI = (route: string) => {
    const api = axios.create({
        baseURL: `${API_URLS.DEV}/${route}`,
        withCredentials: true
    });

    api.interceptors.request.use((config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const {token} = await refreshToken();
                    localStorage.setItem('token', token);
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return api(originalRequest);
                } catch (err) {
                    console.error('Failed to refresh token:', err);
                    clearAuthData();
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
};