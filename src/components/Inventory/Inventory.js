import React from 'react';
import './Inventory.css'

const Inventory = () => {

    const handleAddProduct =() => {
        const product = {};
        fetch('https://still-tor-85555.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(product)
        })
    }

    
    return (
        <div className="inventory col-md-3">
            <form action="">
                <p><span>Name</span><input type="text"/></p>
                <p><span>Price</span><input type="text"/></p>
                <p><span>Quantity</span><input type="text"/></p>
                <p><span>Upload image</span><input type="file"/></p>
                <button className="btn-danger"  onClick={handleAddProduct}>Add Product</button>
            </form>   
        </div>
    );
};

export default Inventory;