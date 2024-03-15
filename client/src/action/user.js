import { withFormik } from 'formik';

import Login from '../components/auth/login/Login';
import store from '../../src/store/store'
import Actions from '../reducers/actions/user';


const LoginFormContainer = withFormik({
    enableReinitialize: true,
    
    mapPropsToValues: () => ({
        email: "",
        password: "",
    }),
    handleSubmit: (values, {setSubmitting}) => 
   
    store.dispatch(Actions.fetchUserLogin(values)).then(() => {
        console.log('fhbf'),
        setSubmitting(false);
    }),
    displayName: 'Login'
})(Login);

export default LoginFormContainer;
