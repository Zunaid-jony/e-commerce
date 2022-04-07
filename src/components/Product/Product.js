import React from 'react';
import './Product.css'


const Product = (props) => {
    console.log(props.product)
    const {name, img, price, seller,stock } = props.product;
    return (
        <div className='product'> 
            <div>
            <img src={img} alt/>
            </div>
            <div className='text-1'>
                <h4 className='product-name'> {name}</h4>
                <p> <small> by:{seller}</small></p>
                <p className=''> Price: {price}</p>
                <p> <small>Only {stock} LEFT IN STOCK - order soon</small></p>
                <button className='btn-regular'>Add to cart</button>
            </div>
        </div>
    );
};

export default Product;