import axios from '../utils/api/axios';

const dialogsAPI = {
    getAll: () => axios.get("/api/chat/dialogs")
};

export default dialogsAPI;