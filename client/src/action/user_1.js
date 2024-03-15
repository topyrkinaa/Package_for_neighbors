import axios from '../utils/api/axios';
import openNotification from '../components/auth/openNotification';

import UserActions from '../reducers/actions/user';

export const registration = async (email, username, surname, patronymic, password) => {
    try {
        const response = await axios.post(`/api/auth/register`, {
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

  export const login = (email, password) => async (dispatch) => {
    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password
      });
      if (response.data.status === 'error') {
        openNotification({
          title: 'Ошибка при авторизации',
          text: 'Неверный логин или пароль',
          type: 'error',

        });
      } else {
        openNotification({
          title: 'Отлично!',
          text: 'Авторизация успешна!',
          type: 'success',
        });
      }

      // alert(response.data.message);
      // dispatch(setUser(response.data.user));
     // localStorage.token = response.data.token;
    } catch (e) {
      alert(e);
    }
  };


  /* export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  }; */
