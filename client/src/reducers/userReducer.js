const SET_USER = "SET_USER";

const defaultState = {
    currentUser: {},
    isAuth: false 
};

export default function userReducer( action, state = defaultState) { 
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

export const setUser = user => ({type: SET_USER, payload: { user }}); 
