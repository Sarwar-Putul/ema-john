import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const ReviewItemStyle = {
        borderBottom: '1px solid lightgrey',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={ReviewItemStyle} className="review-item">
            <h1 className="product-name">{name}</h1>
            <p>Quantity: {quantity}</p>
            <p><small>$ {price}</small></p>
            <button className="main-button" onClick={()=>props.removeProduct(key)}><FontAwesomeIcon icon={faTrashAlt} /> Remove</button>
        </div>
    );
};

export default ReviewItem;