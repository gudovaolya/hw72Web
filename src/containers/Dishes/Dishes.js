import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import './Dishes.css';
import Dish from '../../components/Dish/Dish';
import Cart from '../Cart/Cart';
import {getDishes, showDishInEditForm} from "../../store/actions/dishes";
import {addDishToCart, initCart} from "../../store/actions/cart";
import {orderInit, placeOrder} from "../../store/actions/order";
import withLoader from "../../hoc/withLoader/withLoader";
import AddDish from "../FormsDish/AddDish";
import Modal from "../../components/UI/Modal/Modal";

const INITIAL_DISH = {
    image: '',
    title: '',
    price: ''
};

class Dishes extends Component {
    state = {
        dish: INITIAL_DISH,
        loading: false,
        showModal: false
    };

    changeDishInForm = (event) => {
        const dishNew = {...this.state.dish};
        const key = event.target.name;
        dishNew[key] = event.target.value;
        this.setState({dish: dishNew});
    };

    addDishHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        axios.post('/dishes2.json', this.state.dish).then(() => {
            this.setState({loading: false, showModal: false, dish: INITIAL_DISH});
            this.props.onGetDishes();
        });
    };

    removeDishHandler = (id) => {
        axios.delete(`/dishes2/${id}.json`).then(() => {
            this.props.onGetDishes();
        });
    };

    componentDidMount() {
        this.props.onGetDishes();
    };

    componentDidUpdate() {
        if (this.props.isOrdered) {
            this.props.onOrderInit();
            this.props.onInitCart();
        }
    };

    orderHandler = (event) => {
        event.preventDefault();
        const dishesToOrder = {};
        Object.keys(this.props.dishesInCart).map(dishId => {
            return (dishesToOrder[dishId] = {
                 title: this.props.dishesInCart[dishId].title,
                 amount: this.props.dishesInCart[dishId].amount,
                 price: this.props.dishesInCart[dishId].price
            });
        });
        this.props.onPlaceOrder(dishesToOrder);
    };

    showModalHandler = () => {
        this.setState({showModal: true});
    };

    closeModalHandler = () => {
         this.setState({showModal: false});
    };

    render () {

        let dishesBlock = null;

        if (this.props.dishes) {
            dishesBlock = (
                <div className="dishes-block">
                    {Object.keys(this.props.dishes).map(dishKey => {
                        return (
                            <Dish
                                key = {dishKey}
                                picture = {this.props.dishes[dishKey].image}
                                title = {this.props.dishes[dishKey].title}
                                price = {this.props.dishes[dishKey].price}
                                addToCart = {() => this.props.onAddDishToCart(dishKey, this.props.dishes[dishKey])}
                                delete={() => this.removeDishHandler(dishKey)}
                            />
                        )
                    })}
                </div>
            );
        } else {
            dishesBlock = (
                <p>There are no dishes in the database!</p>
            )
        }

        let modal = (
            <Modal
                show = {this.state.showModal}
                closed = {this.closeModalHandler}
            >
                <AddDish
                    changeDish={(event)=>this.changeDishInForm(event)}
                    addDish={(event => this.addDishHandler(event))}
                    title={this.state.dish.title}
                    price={this.state.dish.price}
                    image={this.state.dish.image}
                />
            </Modal>
        );

        return (
            <Fragment>
                <div className="btn-add-block">
                    <button className="btn" onClick={this.showModalHandler}>Add new Dish</button>
                </div>
                {modal}
                <div className="main-column">
                    {dishesBlock}
                </div>
               <div className="sidebar">
                   <Cart order={this.orderHandler}/>
               </div>
            </Fragment>

        )
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes_reducer.dishes,
        dishesInCart: state.cart_reducer.dishesInCart,
        isOrdered: state.order_reducer.isOrdered,
        editingDish: state.dishes_reducer.editingDish
    }

};
const mapDispatchToProps = dispatch => {
    return {
        onGetDishes: () => dispatch(getDishes()),
        onAddDishToCart: (dishId, dish) => dispatch(addDishToCart(dishId, dish)),
        onPlaceOrder: (order) => dispatch(placeOrder(order)),
        onOrderInit: () => dispatch(orderInit()),
        onInitCart: () => dispatch(initCart())

    }
};
export default withLoader(connect(mapStateToProps, mapDispatchToProps)(Dishes), axios);

