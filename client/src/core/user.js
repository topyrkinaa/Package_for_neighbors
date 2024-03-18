import axios from '../utils/api/axios';


export default {
    login: postData => axios.post("/api/auth/login", postData),
    register: postData => axios.post("/api/auth/register", postData),
    getMe: () => axios.get("/api/auth/me"),
    findUser: qwery => axios.get("/api/auth/find?qwery=" + qwery),
    
};