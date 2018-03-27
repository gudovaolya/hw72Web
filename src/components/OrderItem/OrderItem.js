import React from 'react';
import './OrderItem.css';

const OrderItem = (props) => {

    let orderItem = props.orderItem;
    let priceOrder = 150;

    let orderItemDishes = Object.keys(orderItem).map(dishInOrder => {
        if (dishInOrder !== 'orderId'){
            priceOrder += parseFloat(orderItem[dishInOrder].price, 10);
            return (
                <div className="dish-in-order" key={dishInOrder}>
                    <span>{orderItem[dishInOrder].title} x&nbsp;{orderItem[dishInOrder].amount}</span>
                    <span>{orderItem[dishInOrder].price}</span>
                </div>
            )
        }
    });

    return (
        <div className="order-item" key={orderItem}>
            <div className="order-item-inner">
                {orderItemDishes}
                <div className="order-bottom">
                    <p className="order-item-delivery">Delivery: <b>150 KGS</b></p>
                    <p>Total price: <b>{priceOrder} KGS</b></p>
                    <button onClick={props.remove}>Complete order</button>
                </div>
            </div>
        </div>
    )
};

export default OrderItem;