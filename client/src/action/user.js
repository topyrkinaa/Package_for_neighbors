import axios from 'axios';
import { setUser } from '../reducers/userReducer';

export const registration = async (email, username, surname, patronymic, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/register`, {
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


/* export const login = (email, password) => async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/login`, {
        email,
        password
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      alert(e);
    }
  }; */

  export const login = (email, password) => async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/login`, {
        email,
        password
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      alert(e);
    }
  };


  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };
