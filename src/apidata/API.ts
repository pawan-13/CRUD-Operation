import axios from "axios";
const API_URL = "http://localhost:3000/users";

export const PostUser = async (name: string, username: string, email: string, company: string) => {
    try {
        const res = await axios.post(API_URL, { name, username, email, company });
        return res;
    } catch (error: any) {
        console.log(error.message, 'error');
    }
}

export const GetUser = async () => {
    try {
        const response = await axios.get(API_URL);
        return response;
    } catch (error: any) {
        console.log(error.message, 'error');
    }
}

export const GetDetailUser = async (id: number) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        return res;
    } catch (error: any) {
        console.log(error.message, 'error');
    }
}

export const PostDetailUser = (data: any, id: number) => {
    try {
        const res = axios.put(`${API_URL}/${id}`, data);
        return res;
    } catch (error: any) {
        console.log(error.message, 'error');
    }
}

export const DeleteUser = async (id:number) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response;
    } catch (error: any) {
        console.log(error.message, 'error');
    }
}

