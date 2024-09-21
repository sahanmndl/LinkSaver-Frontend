import {jwtDecode} from "jwt-decode";
import {User} from "../api/user.ts";
import axios from "axios";
import {API_URLS} from "@/api/base.ts";

interface DecodedToken {
    exp: number;
}

export const setAuthData = (user: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
};

export const clearAuthData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export const getUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const refreshToken = async () => {
    let result = {isRefreshed: false, token: ""};
    try {
        const {data} = await axios.post(`${API_URLS.DEV}/user/refresh-token`, {}, {withCredentials: true});
        const newAccessToken = data.body.token;
        localStorage.setItem('token', newAccessToken);
        result.isRefreshed = true;
        result.token = newAccessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
    return result;
};

export const isAuthenticated = async (): Promise<boolean> => {
    const token = getToken();
    if (!token) return false;

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken.exp > Date.now() / 1000) {
            return true;
        } else {
            const {isRefreshed} = await refreshToken();
            return isRefreshed;
        }
    } catch (error) {
        return false;
    }
};

export const getUserTimezone = (): string | null => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}