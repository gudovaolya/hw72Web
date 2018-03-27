import React from 'react';
import './FormsDish.css';

const AddDish =(props) => {
    return (
        <div className="form-block content">
            <h3>Add new dish</h3>
            <form>
                <div className="form-row">
                    <input
                        className="field"
                        type="text"
                        name="title"
                        placeholder="Enter the title of the dish"
                        onChange={props.changeDish}
                        value={props.title}
                    />
                </div>
                <div className="form-row">
                    <input
                        className="field"
                        type="number"
                        name="price"
                        placeholder="Enter the price of the dish"
                        onChange={props.changeDish}
                        value={props.price}
                    />
                </div>
                <div className="form-row">
                    <input
                        className="field"
                        type="text"
                        name="image"
                        placeholder="Enter a link to the picture"
                        onChange={props.changeDish}
                        value={props.image}
                    />
                </div>
                <div className="form-row-btn">
                    <button className="form-btn" onClick={props.addDish}>Add</button>
                </div>
            </form>
        </div>
    )
};

export default AddDish;