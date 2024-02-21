import axios from '../utils/api/axios';

const dialogsAPI = {
    getAll: () => axios.get("/dialogs")
};

export default dialogsAPI;