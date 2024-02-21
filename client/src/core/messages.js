import axios from '../utils/api/axios';


const messagesAPI = {
    getAllByDialogId: id => axios.get("/messages?dialog=" + id)
};

export default messagesAPI;