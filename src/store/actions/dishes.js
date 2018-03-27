import * as actionTypes from './actionsTypes';
import axios from 'axios';
import {SHOW_DISH_IN_EDIT_FORM} from "./actionsTypes";

export const requestStart = () => {
    return {type: actionTypes.REQUEST_START}
};

export const requestEror = () => {
    return {type: actionTypes.REQUEST_ERROR}
};

export const dishesRequestSucces = (dishesData) => {
    return {type: actionTypes.DISHES_REQUEST_SUCCES, dishes: dishesData}
};

export const getDishes = () => {
    return dispatch => {
        dispatch(requestStart());
        axios.get('/dishes2.json').then(response => {
            dispatch(dishesRequestSucces(response.data));
        }, error => {
            dispatch(requestEror());
        })

    }
};


