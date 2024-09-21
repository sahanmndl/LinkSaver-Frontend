import {ApiResponse, createAPI} from "./base.ts";

const userAPI = createAPI('user');

export interface User {
    _id: string;
    name: string;
    email: string;
}

export const registerUser = async (name: string, email: string, password: string) => {
    const response = await userAPI.post('/register', {name, email, password});
    return response.data.body;
};

export const loginUser = async (email: string, password: string) => {
    const response = await userAPI.post('/login', {email, password});
    return response.data.body;
};

export const getUserByToken = async () => {
    const response = await userAPI.get<ApiResponse<User>>('/');
    return response.data.body;
};

export const getUserById = async (userId: string) => {
    const response = await userAPI.get<ApiResponse<User>>(`/${userId}`);
    return response.data.body;
};