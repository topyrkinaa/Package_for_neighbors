import axios from 'axios';

const registration = async (email: string, username: string, surname: string, patronymic: string, password: string) => {
    try {
        const response = await axios.post(`http://localhost:5001/api/auth/register`, {
            email,
            username,
            surname,
            patronymic,
            password
        });
        alert(response.data.message);
    } catch (e) {
        alert(e);
    }
}

export default registration;