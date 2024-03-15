import { registration } from '../action/user_1';
import axios from '../utils/api/axios';


export default {
    login: postData => axios.post("/api/auth/login", postData),
    register: postData => axios.post("/api/auth/register", postData),
    getMe: () => axios.get("/api/auth/me")
    
};