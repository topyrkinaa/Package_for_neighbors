const SET_USER = "SET_USER";

const defaultState = {
    currentUser: {},
    isAuth: false // исправлено с inAuth на isAuth
};

export default function userReducer(state = defaultState, action) { // изменен порядок аргументов
    switch (action.type) {
        case SET_USER:
            return {
               ...state,
               currentUser: action.payload.user,
               isAuth: true
            };
        default:
            return state;
    }
}

export const setUser = user => ({type: SET_USER, payload: { user }}); // обернуто в объект payload
