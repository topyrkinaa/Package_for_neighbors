import axios from '../utils/api/axios';

const filesAPI = {

    upload: file => {
      const formData = new FormData();
      formData.append('file', file);
      return axios.post("/api/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }
  };

  export default filesAPI;