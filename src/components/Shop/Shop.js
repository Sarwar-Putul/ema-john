import React from 'react';
import fakeData from '../../fakeData';
import {useState} from 'react';
import './Shop.css';
import Product from '../Product/Product';

const Shop = () => {
    const first10= fakeData.slice(0,10);
    const [products, setproducts] = useState(first10);
    const [cart, setcart] = useState([])
    const handleAddProduct = (product) =>{
        console.log('click marche', product );
    const newCart =[...cart, product];
    setcart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product 
                        handleAddProduct = {handleAddProduct}
                        product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <h1>This is a cart</h1>
                <h5>Order Summary: {cart.length}</h5>
            </div>
           
        </div>
    );
};

export default Shop;