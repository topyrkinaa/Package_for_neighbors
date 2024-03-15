import axios from '../utils/api/axios';


export default {
    login: postData => axios.post("/api/auth/login", postData),
    getMe: () => axios.get("/api/auth/me")
};