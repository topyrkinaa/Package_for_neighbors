import axios from '../utils/api/axios';

const dialogsAPI = {
    getAll: () => axios.get("/api/chat/dialogs"),
    create: (title, partnerid) => axios.post("/api/chat/dialogs", {
        "title": title,
        "partnerid": parseInt(partnerid)
    })
};

export default dialogsAPI;