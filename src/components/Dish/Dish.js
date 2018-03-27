import React from 'react';
import './Dish.css';

const Dish = (props) => {
    return (
        <div className="dish">
            <div className="dish-pic">
                <img src={props.picture} alt=""/>
            </div>
           <div className="dish-info">
               <h4>{props.title}</h4>
               <p>Price: {props.price} KGS</p>
               <button className="btn" onClick={props.addToCart}>Add to cart</button>
               <div>
                   <button className="btn" onClick={props.delete}>Delete</button>
               </div>
           </div>
        </div>
    )
};

export default Dish;