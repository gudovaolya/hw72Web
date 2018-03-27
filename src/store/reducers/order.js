import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    isOrdered: false,
    orders: []
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ORDER_INIT:
            return {...state, isOrdered: false};
        case actionTypes.ORDER_REQUEST_SUCCES:
            return {...state, isOrdered: true};
        case actionTypes.ORDERS_REQUEST_SUCCES:
            return {...state, orders: action.orders};
        default:
            return state
    }

};

export default reducer;



