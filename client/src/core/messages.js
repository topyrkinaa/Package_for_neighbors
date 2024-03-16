import axios from '../utils/api/axios';


const messagesAPI = {
    getAllByDialogId: id => axios.get("/api/chat/messages?dialog=" + id),
    send: (text, dialogid) => 
    axios.post("/api/chat/messages", {
        "title": text,
        "dialogid": dialogid
    })
};

export default messagesAPI;