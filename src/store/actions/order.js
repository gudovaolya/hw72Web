import * as actionTypes from './actionsTypes';
import axios from 'axios';
import  {requestStart, requestEror} from './dishes';

export const orderRequestSucces = () => {
    return {type: actionTypes.ORDER_REQUEST_SUCCES}
};

export const orderInit = () => {
    return {type: actionTypes.ORDER_INIT}
};

export const placeOrder = order => {
    return dispatch => {
        dispatch(requestStart());
        axios.post('/orders2.json', order).then(() => {
            dispatch(orderRequestSucces());
        }, error => {
            dispatch(requestEror())
        })
    }
};

export const ordersRequestSucces = (ordersData) => {
    return {type: actionTypes.ORDERS_REQUEST_SUCCES, orders: ordersData}
};

export const getOrders = () => {
    return dispatch => {
        dispatch(requestStart());
        axios.get('/orders2.json').then(response => {
            let orders = [];
            if (response.data) {
                orders = Object.keys(response.data).map(orderItemKey => {
                    return ({...response.data[orderItemKey], orderId: orderItemKey})
                });
            }

            dispatch(ordersRequestSucces(orders));
        }, error => {
            dispatch(requestEror());
        })

    }
};


