import createDataContext from './createDataContext';
import createContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from "../navigationRef";


const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'signup':
            return {errorMessage: '', token: action.payload}
        case 'signin':
            return {errorMessage: '', token: action.payload}
        case 'clear_error_message':
            return { ...state, errorMessage: ''}
        case 'signout':
            return { token: null, errorMessage: ''}
        default:
            return state;
    }
}

const tryLocalSignin =  dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    if(token){
        dispatch({ type: 'signin', payload: token })
        navigate('TrackList')
    }else{
        navigate('loginFlow')
    }

}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message'})
}

// const signup = (dispatch) => {
//     return async ({ email, password}) => {
//         try {
//             const response = await trackerApi.post('/signup', { email, password})
//             console.log(response.data);
//
//             await AsyncStorage.setItem('token', response.data.token)
//
//             dispatch({type: 'signup', payload: response.data.token})
//         } catch (error) {
//             dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'})
//             console.log(error.message)
//         }
//         //make api request
//
//         // if we sign up, modify our state and say we are authenticated
//
//         //if signin up fails, we probably need to reflect an error message
//     }
// }

const signup = dispatch => async ({email, password}) => {
    try {
        const response = await trackerApi.post('/signup', {email, password})

        console.log(response.data);

        await AsyncStorage.setItem('token', response.data.token)

        dispatch({type: 'signin', payload: response.data.token})

        navigate('TrackList')
    } catch (error) {
        dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
        console.log(error.message)
    }
    //make api request

    // if we sign up, modify our state and say we are authenticated

    //if signin up fails, we probably need to reflect an error message
}

// const signin = (dispatch) => {
//     return ({ email, password}) => {
//         //make api request
//
//         // if we sign in, modify our state and say we are authenticated
//
//         //if signin up fails, we probably need to reflect an error message
//         try {
//
//         }catch (err) {
//             dispatch({
//                 type: 'add_error',
//                 payload: 'Something went wrong with sign in'
//             })
//         }
//     }
// }

const signin = dispatch => async ({email, password}) => {
    try {
        //make api request
        const response = await trackerApi.post('/signin', {email, password});
        // if we sign in, modify our state and say we are authenticated
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({type: 'signin', payload: response.data.token})
        navigate('TrackList')
        //if signin up fails, we probably need to reflect an error message
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        })
    }
}

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token')
        dispatch({type: 'signout'})
        navigate('loginFlow')
        //make api request

        // if we sign in, modify our state and say we are authenticated

        //if signin up fails, we probably need to reflect an error message
    }
}

// const signout = (dispatch) =>  async () => {
//     await AsyncStorage.removeItem('token')
//     dispatch({type: 'signout'})
//     navigate('loginFlow')
//         //make api request
//
//         // if we sign in, modify our state and say we are authenticated
//
//         //if signin up fails, we probably need to reflect an error message
//     }




export const {Provider, Context} = createDataContext(
    authReducer, { signin, signout, signup, clearErrorMessage, tryLocalSignin }, {token: null, errorMessage: ''}
)