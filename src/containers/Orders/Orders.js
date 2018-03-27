import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {getOrders} from "../../store/actions/order";
import OrderItem from "../../components/OrderItem/OrderItem";
import withLoader from "../../hoc/withLoader/withLoader";
import './Orders.css';

class Orders extends Component{

    componentDidMount() {
        this.props.onGetOrders();
    }

    removeOrderHandler = (id) => {
        axios.delete(`/orders2/${id}.json`).then(() => {
            this.props.onGetOrders();
        });
    };


    render () {

        let ordersBlock = this.props.orders.map(order => {
            return(
                <OrderItem
                    orderItem={order}
                    remove={() => this.removeOrderHandler(order.orderId)}
                />
            )
        });

        return (
           <div class="orders-block">
               {ordersBlock}
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
       orders: state.order_reducer.orders
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: () => dispatch(getOrders())
    }
};

export default withLoader(connect(mapStateToProps, mapDispatchToProps)(Orders), axios);