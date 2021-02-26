import React from 'react';
import './Product.css';

const product = (props) => {
    console.log(props.product);
    const {name, img, seller, stock,price}= props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in the stock - order soon</small></p>
            </div>
            
        </div>
    );
};

export default product;