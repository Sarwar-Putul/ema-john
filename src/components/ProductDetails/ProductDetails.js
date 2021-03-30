import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    let {productKey} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://still-tor-85555.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productKey]);
    // const product = fakeData.find(pd => pd.key == productKey);
    return (
        <div>
            <h1>Your Product Details</h1>
            <Product ShowAddToCart= {false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;