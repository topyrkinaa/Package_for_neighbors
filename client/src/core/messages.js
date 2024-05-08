import axios from '../utils/api/axios';

const messagesAPI = {
    getAllByDialogId: id => axios.get("/api/chat/messages?dialog=" + id),
    removeById: id => axios.delete("/api/chat/messages?id=" + id),
    send: (text, dialogid, attachments) => 
    axios.post("/api/chat/messages", {
        "title": text,
        "dialogid": dialogid,
        "attachments": attachments
    })
};

export default messagesAPI;