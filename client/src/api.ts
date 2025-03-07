import axios, { AxiosResponse } from 'axios';

interface User {
    _id: string;
    name: string;
    email: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getUsers = (): Promise<AxiosResponse<User[]>> => axios.get(`${API_URL}/users`);
export const createUser = (user: Omit<User, '_id'>): Promise<AxiosResponse<User>> => axios.post(`${API_URL}/users`, user);
export const updateUser = (id: string, user: Omit<User, '_id'>): Promise<AxiosResponse> => axios.put(`${API_URL}/users/${id}`, user);
export const deleteUser = (id: string): Promise<AxiosResponse> => axios.delete(`${API_URL}/users/${id}`);
