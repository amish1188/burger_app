import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, signUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToker: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRhyJ9NQ29jS8zAs2JY_rCgWkvdVdbaN0';
        if(!signUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRhyJ9NQ29jS8zAs2JY_rCgWkvdVdbaN0';
        }
        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}