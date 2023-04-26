import React from 'react';
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    // console.log(props);
    const { img, name, price, ratings, seller, } = props.product;
    // const handleAddToCart = props.handleAddToCart; // handleAddToCart is handler function, select with (.) notation.
    const { handleAddToCart } = props; // select with destructuring.

    // const handleAddToCart = (product) => {
    //     console.log(product);
    // }

    return (
        <div className='product'>
            <div className='img'>
                <img src={img} alt="" />
            </div>
            <div className='product-info'>
                <h4 className='product-name'>{name}</h4>
                <p>Price: ${price}</p>
                <div style={{ color: "#2A414F", margin: "47px 0 60px 0", }}>
                    <p>Manufacturer: {seller}</p>
                    <p>Rating: {ratings}</p>
                </div>
            </div>
            <button onClick={() => handleAddToCart(props.product)} className='btn-cart'>
                Add To Cart
                <FontAwesomeIcon icon={faShoppingCart} />
            </button>
        </div>
    );
};

export default Product;