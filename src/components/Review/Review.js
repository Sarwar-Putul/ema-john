import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSortAlphaUp} from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router';
import './Review.css'

const Review = () => {
const [cart, setCart] = useState([]);
const [orderPlace, setOrderPlace] = useState(false)
const history = useHistory()
const handleProceedCheckout =() => {
    history.push('/Shipment');
}

const removeProduct = (productKey)=>{
    //console.log('remove click', productKey)
    const newCart= cart.filter(pd => pd.key !==productKey)
    setCart(newCart);
    removeFromDatabaseCart(productKey);
}
    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://still-tor-85555.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

    }, []);

    let thankyou;
    if(orderPlace){
        thankyou= <img src={happyImage} alt=""/>
    }
    
    return (
        <div className="twin-container">
            <div className="product-container">
                    {
                    cart.map(pd => <ReviewItem 
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd}></ReviewItem>)
                    }
                    {
                        thankyou
                    }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button"><FontAwesomeIcon icon={faSortAlphaUp}/> Proceed Checkout</button>
                </Cart>

            </div>
        </div>
    );
};

export default Review;