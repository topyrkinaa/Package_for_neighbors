import userAPI from '../../core/user';
import openNotification from '../../components/auth/openNotification';

const Actions = {
    setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data,
      }),
      setIsAuth: bool => ({
        type: 'USER:SET_IS_AUTH',
        payload: bool,
      }),
      fetchUserData: () => dispatch => {
        userAPI.getMe().then(response => {
          dispatch(Actions.setUserData(response.data));
          //TODO доделать catch
        }).catch( err =>{
          if (err.status === 403) {
            dispatch(Actions.setIsAuth(false));
            delete window.localStorage.token;
          }
        });
      },
      fetchUserLogin: postData => dispatch => {        
        return userAPI.login(postData).then(({data}) => {
          const { status, token } = data;
          if (status === 'error') {
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

            window.axios.defaults.headers.common['token'] = token;
            window.localStorage['token'] = token;
            dispatch(Actions.fetchUserData());
          }
          return data;
        })
        .catch (({ response }) => {
          if (response.status === 403) {
            openNotification({
              title: 'Ошибка при авторизации',
              text: 'Неверный логин или пароль',
              type: 'error',
            });
          }
        } );
      }, 
      fetchUserRegister: postData => dispatch => {
        return userAPI.register(postData).then(({data}) => {
          const { status } = data;

          if (status === 'error') {
            openNotification({
              title: 'Ошибка при регистрации',
              type: 'error',
            });
          } else {
            openNotification({
              title: 'Отлично!',
              text: 'Регистрация прошла успешна!',
              type: 'success',
            });
          }
          
          return data;
        });
      }, 
};

export default Actions;